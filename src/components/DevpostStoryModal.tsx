'use client';

import React, { useState } from 'react';
import { X, Award, Copy, Check, ExternalLink, Sparkles } from 'lucide-react';

interface DevpostStoryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DevpostStoryModal: React.FC<DevpostStoryModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const pitchText = `
# AuraSkin Studio: Clinical Skin AI to Instant eCommerce VTO Platform

## 💡 Inspiration
Modern digital beauty is fractured: clinical skin diagnostic apps give users anxiety-inducing scores without immediate cosmetic relief, while Virtual Try-On (VTO) filters offer pure vanity without addressing underlying epidermal health.
We created **AuraSkin Studio** to bridge this gap: connecting **YouCam AI Clinical Skin Diagnostics** with **Instant Corrective Look VTO** and **Active Ingredient Regimens**. Users see exactly what their skin needs at the cellular level, how corrective beauty enhances their confidence *today*, and how their skin barrier recovers over a 4-week clinical trajectory.

## ✨ What It Does
1. **Clinical AI Skin Diagnostics (YouCam Skin AI API):**
   - Scans user selfies via webcam or benchmark profiles across 10 clinical concerns (wrinkles, pores, texture, acne, redness, dark circles, moisture).
   - Generates an overall Skin Health Index (0-100), biological skin age estimation, and toggleable visual heatmap overlays with pinpoint cluster localization.
2. **Instant Corrective & Glam VTO (YouCam Look VTO API):**
   - Connects clinical diagnoses directly to corrective beauty. Neutralizes cheek flushing, disguises fatigue with periorbital awakening, and diffuses enlarged pores.
   - Interactive split-slider allows users to slide between raw clinical reality and high-definition virtual try-on looks.
3. **Active Ingredient Prescription Engine:**
   - Automatically maps diagnosed concerns to scientifically proven active ingredients (Centella Asiatica for redness, Niacinamide 10% for pores, Liposomal Retinaldehyde for wrinkles).
4. **4-Week Skin Progression Simulator:**
   - Predictive AI model showing milestone-by-milestone cellular recovery (Week 1 barrier stabilization to Week 4 peak radiance).
5. **Turnkey eCommerce Regimen & 1-Click Cart:**
   - Formulates tailored AM and PM routines with bundled prescription pricing, discount application, and seamless cart checkout.

## 🛠️ How We Built It
- **Code Repository:** https://github.com/Elroi-thecreator/auraskin-studio
- **Frontend:** Next.js 14 (App Router), React 18, TypeScript, Tailwind CSS, Lucide icons.
- **Backend / API Layer:** Next.js Serverless Route Handlers (\`/api/youcam/analyze\`, \`/api/youcam/vto\`, \`/api/youcam/templates\`) acting as a secure proxy to YouCam's S2S REST APIs (\`makeupar.com\`).
- **Resilient Dual-Mode Architecture:** Seamlessly supports live YouCam API keys while bundling intelligent offline presets and telemetry so judges can evaluate the entire application with zero friction.
- **Interactive UI/UX:** Custom touch/drag before-after slider, canvas heatmap shader overlay, real-time webcam face-alignment oval, and developer telemetry console.

## 🧗 Challenges We Ran Into
- Aligning YouCam's asynchronous polling architecture (\`POST /task/skin-analysis\` -> \`GET /task/...\`) with sub-second responsive frontend feedback.
- Developing an intuitive "Diagnostic to Glam" visual paradigm so users understand that makeup try-on works harmoniously alongside clinical skincare healing.

## 🏆 Accomplishments We're Proud Of
- A production-grade, luxury aesthetic combining clinical dermatology with high-fashion eCommerce.
- Complete implementation of both core hackathon tracks (Skin AI + Look VTO) into a cohesive, high-converting customer journey.
- Zero-friction judge testing with preloaded diverse skin types (Maya, Elena, Chloe) and live webcam support.

## 🚀 What's Next for AuraSkin Studio
- Real-time video stream VTO integration with Gemini Multimodal Live API for conversational voice consultations.
- Dermatology electronic health records (EHR) export for telemedicine dermatologists.
- Expanded shade-matching with localized global retail inventory integrations.
`.trim();

  const handleCopy = () => {
    navigator.clipboard.writeText(pitchText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-3xl bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[85vh]">
        
        {/* Header */}
        <div className="p-6 border-b border-slate-800 flex items-center justify-between bg-slate-950/70">
          <div className="flex items-center space-x-2.5">
            <div className="h-8 w-8 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
              <Award className="h-4 w-4 text-amber-400" />
            </div>
            <div>
              <h3 className="font-serif text-lg font-bold text-slate-100">
                Devpost Submission Story & Pitch Deck
              </h3>
              <p className="text-[11px] text-slate-400 font-mono">
                Ready to copy directly into your Devpost submission form
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={handleCopy}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-white text-xs font-mono font-bold transition-colors"
            >
              {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
              <span>{copied ? 'Copied Markdown!' : 'Copy for Devpost'}</span>
            </button>
            <button
              onClick={onClose}
              className="p-1 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-slate-800 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Markdown Content Viewport */}
        <div className="p-6 overflow-y-auto space-y-4 flex-1 text-slate-300 text-xs font-mono leading-relaxed bg-slate-950/60">
          <pre className="whitespace-pre-wrap font-mono text-[11px] text-slate-300 select-all">
            {pitchText}
          </pre>
        </div>

        <div className="p-4 bg-slate-950 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <span>Target: YouCam API Skin AI & eCommerce VTO Hackathon</span>
          <a
            href="https://youcam-api-skin-ai-ecommerce.devpost.com/"
            target="_blank"
            rel="noreferrer"
            className="text-rose-400 hover:underline flex items-center space-x-1 font-mono"
          >
            <span>Open Devpost Portal</span>
            <ExternalLink className="h-3 w-3" />
          </a>
        </div>
      </div>
    </div>
  );
};
