'use client';

import React, { useState, useEffect } from 'react';
import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { PersonaSelector } from '@/components/PersonaSelector';
import { CameraModal } from '@/components/CameraModal';
import { SkinDiagnosticCard } from '@/components/SkinDiagnosticCard';
import { ConcernHeatmapOverlay } from '@/components/ConcernHeatmapOverlay';
import { VtoSplitSlider } from '@/components/VtoSplitSlider';
import { SkinProgressionTimeline } from '@/components/SkinProgressionTimeline';
import { RegimenBuilder } from '@/components/RegimenBuilder';
import { CartDrawer } from '@/components/CartDrawer';
import { ApiInspectorModal } from '@/components/ApiInspectorModal';
import { DevpostStoryModal } from '@/components/DevpostStoryModal';

import { DEMO_PERSONAS, VTO_LOOK_OPTIONS } from '@/lib/mock-data';
import { matchIngredientsAndRegimen, RecommendedRegimen } from '@/lib/ingredients-matcher';
import { PersonaProfile, CartItem, SkincareProduct } from '@/types/skincare';
import { SkinConcernKey, YouCamSkinAnalysisResult, YouCamVtoResult } from '@/types/youcam';
import { Sparkles, Activity, ShieldCheck, ArrowDown } from 'lucide-react';

export default function HomePage() {
  // Application State
  const [selectedPersona, setSelectedPersona] = useState<PersonaProfile | null>(DEMO_PERSONAS[0]);
  const [currentImage, setCurrentImage] = useState<string>(DEMO_PERSONAS[0].avatarUrl);
  const [selectedConcern, setSelectedConcern] = useState<SkinConcernKey | null>('redness');
  const [selectedLookId, setSelectedLookId] = useState<string>('clean-girl');

  // Diagnostic & VTO Results
  const [diagnostic, setDiagnostic] = useState<YouCamSkinAnalysisResult | null>(null);
  const [vtoResult, setVtoResult] = useState<YouCamVtoResult | null>(null);
  const [regimen, setRegimen] = useState<RecommendedRegimen | null>(null);

  // Loading States
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isLoadingVto, setIsLoadingVto] = useState(false);

  // Modals & Drawers
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isInspectorOpen, setIsInspectorOpen] = useState(false);
  const [isStoryOpen, setIsStoryOpen] = useState(false);

  // Cart State
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // API Key & Telemetry State
  const [apiKey, setApiKey] = useState<string>('');
  const [isLiveApi, setIsLiveApi] = useState<boolean>(false);
  const [lastTelemetry, setLastTelemetry] = useState<any>(null);

  // Initial load: run default Maya diagnostic
  useEffect(() => {
    runAnalysis(DEMO_PERSONAS[0].avatarUrl, DEMO_PERSONAS[0].id);
  }, []);

  const runAnalysis = async (image: string, personaId?: string) => {
    setIsAnalyzing(true);
    const startTime = performance.now();

    try {
      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
      };
      if (apiKey) {
        headers['x-youcam-api-key'] = apiKey;
      }

      const res = await fetch('/api/youcam/analyze', {
        method: 'POST',
        headers,
        body: JSON.stringify({
          image,
          personaId,
        }),
      });

      const latencyMs = Math.round(performance.now() - startTime);
      const data: YouCamSkinAnalysisResult = await res.json();

      setDiagnostic(data);
      const matched = matchIngredientsAndRegimen(data);
      setRegimen(matched);
      setSelectedConcern(data.primary_concerns[0] || 'redness');

      setLastTelemetry({
        endpoint: '/s2s/v2.0/task/skin-analysis',
        method: 'POST',
        status: res.status,
        latencyMs,
        requestBody: { src_file_id: 'file_id_hash', dst_actions: Object.keys(data.concerns) },
        responseBody: data,
      });

      // Automatically run VTO for active look
      runVto(image, selectedLookId, personaId);
    } catch (err) {
      console.error('Failed to run skin analysis:', err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const runVto = async (image: string, lookId: string, personaId?: string) => {
    setIsLoadingVto(true);
    const startTime = performance.now();

    try {
      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
      };
      if (apiKey) {
        headers['x-youcam-api-key'] = apiKey;
      }

      const res = await fetch('/api/youcam/vto', {
        method: 'POST',
        headers,
        body: JSON.stringify({
          image,
          lookId,
          personaId,
        }),
      });

      const latencyMs = Math.round(performance.now() - startTime);
      const data: YouCamVtoResult = await res.json();

      setVtoResult(data);
      setLastTelemetry({
        endpoint: '/s2s/v2.0/task/look-vto',
        method: 'POST',
        status: res.status,
        latencyMs,
        requestBody: { template_id: lookId },
        responseBody: data,
      });
    } catch (err) {
      console.error('Failed to run VTO:', err);
    } finally {
      setIsLoadingVto(false);
    }
  };

  // Handlers
  const handleSelectPersona = (persona: PersonaProfile) => {
    setSelectedPersona(persona);
    setCurrentImage(persona.avatarUrl);
    runAnalysis(persona.avatarUrl, persona.id);
  };

  const handleCustomImage = (base64: string) => {
    setSelectedPersona(null);
    setCurrentImage(base64);
    runAnalysis(base64);
  };

  const handleSelectLook = (lookId: string) => {
    setSelectedLookId(lookId);
    runVto(currentImage, lookId, selectedPersona?.id);
  };

  const handleAddToCart = (product: SkincareProduct) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const handleAddAllToCart = (products: SkincareProduct[]) => {
    products.forEach((p) => handleAddToCart(p));
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveItem(productId);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) => (item.product.id === productId ? { ...item, quantity } : item))
    );
  };

  const handleRemoveItem = (productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const handleSaveApiKey = (key: string) => {
    setApiKey(key);
    setIsLiveApi(!!key);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* Navigation */}
      <Navbar
        cartCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenInspector={() => setIsInspectorOpen(true)}
        onOpenStory={() => setIsStoryOpen(true)}
        isLiveApi={isLiveApi}
        onToggleApiSettings={() => setIsInspectorOpen(true)}
      />

      {/* Hero Section */}
      <Hero
        onStartScan={() => setIsCameraOpen(true)}
        onExplorePersonas={() => {
          const el = document.getElementById('persona-section');
          el?.scrollIntoView({ behavior: 'smooth' });
        }}
        onOpenStory={() => setIsStoryOpen(true)}
      />

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 pb-24 w-full">
        
        {/* Step 1: Persona Selector & Input Section */}
        <section id="persona-section" className="scroll-mt-24">
          <PersonaSelector
            selectedPersona={selectedPersona}
            onSelectPersona={handleSelectPersona}
            onOpenLiveCamera={() => setIsCameraOpen(true)}
            onCustomImageUpload={handleCustomImage}
            isLoading={isAnalyzing}
          />
        </section>

        {/* Step 2: Diagnostic & Heatmap Section */}
        {diagnostic && (
          <section className="space-y-8 animate-fade-in">
            <SkinDiagnosticCard
              diagnostic={diagnostic}
              selectedConcern={selectedConcern}
              onSelectConcern={(c) => setSelectedConcern(c)}
            />

            <ConcernHeatmapOverlay
              imageUrl={currentImage}
              diagnostic={diagnostic}
              selectedConcern={selectedConcern}
              onSelectConcern={(c) => setSelectedConcern(c)}
            />
          </section>
        )}

        {/* Step 3: Virtual Try-On Split Slider */}
        <section className="animate-fade-in">
          <VtoSplitSlider
            originalImage={currentImage}
            vtoResult={vtoResult}
            selectedLookId={selectedLookId}
            onSelectLook={handleSelectLook}
            isLoadingVto={isLoadingVto}
          />
        </section>

        {/* Step 4: 4-Week Skin Health Journey Simulation */}
        {regimen && diagnostic && (
          <section className="animate-fade-in">
            <SkinProgressionTimeline
              regimen={regimen}
              currentSkinScore={diagnostic.skin_score}
            />
          </section>
        )}

        {/* Step 5: Clinical AM/PM Regimen Builder */}
        {regimen && (
          <section className="animate-fade-in">
            <RegimenBuilder
              regimen={regimen}
              onAddToCart={handleAddToCart}
              onAddAllToCart={handleAddAllToCart}
            />
          </section>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950/80 py-12 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between text-xs font-mono text-slate-500 gap-4">
          <div className="flex items-center space-x-2">
            <span className="font-serif font-bold text-slate-300 tracking-wider">AURASKIN STUDIO</span>
            <span>• Developed for YouCam API Skin AI & eCommerce VTO Hackathon (Devpost)</span>
          </div>
          <div className="flex items-center space-x-6">
            <button onClick={() => setIsInspectorOpen(true)} className="hover:text-rose-400">
              API Telemetry
            </button>
            <button onClick={() => setIsStoryOpen(true)} className="hover:text-rose-400">
              Pitch Deck
            </button>
            <a
              href="https://youcam-api-skin-ai-ecommerce.devpost.com/"
              target="_blank"
              rel="noreferrer"
              className="hover:text-rose-400"
            >
              Devpost Page
            </a>
          </div>
        </div>
      </footer>

      {/* Modals & Slide-overs */}
      <CameraModal
        isOpen={isCameraOpen}
        onClose={() => setIsCameraOpen(false)}
        onCapture={handleCustomImage}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={() => setCartItems([])}
      />

      <ApiInspectorModal
        isOpen={isInspectorOpen}
        onClose={() => setIsInspectorOpen(false)}
        apiKey={apiKey}
        onSaveApiKey={handleSaveApiKey}
        lastTelemetry={lastTelemetry}
      />

      <DevpostStoryModal
        isOpen={isStoryOpen}
        onClose={() => setIsStoryOpen(false)}
      />
    </div>
  );
}
