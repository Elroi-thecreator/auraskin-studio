'use client';

import React from 'react';
import { Sparkles, Activity, ShieldCheck, ArrowDown, ChevronRight, Zap } from 'lucide-react';

interface HeroProps {
  onStartScan: () => void;
  onExplorePersonas: () => void;
  onOpenStory: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onStartScan, onExplorePersonas, onOpenStory }) => {
  return (
    <div className="relative pt-12 pb-20 sm:pt-20 sm:pb-28 overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-rose-600/10 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-amber-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        
        {/* Pill Badge */}
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-slate-900/80 border border-rose-500/30 text-rose-300 text-xs font-mono mb-8 shadow-lg shadow-rose-950/40">
          <Sparkles className="h-3.5 w-3.5 text-rose-400 animate-pulse" />
          <span>Powered by Perfect Corp YouCam Skin AI & Look VTO</span>
          <span className="hidden sm:inline text-slate-500">•</span>
          <span className="hidden sm:inline text-amber-300">Devpost Hackathon Contender</span>
        </div>

        {/* Hero Title */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif font-bold tracking-tight text-slate-100 leading-[1.1]">
          Clinical Skin Intelligence Meets{' '}
          <span className="bg-gradient-to-r from-rose-300 via-champagne-200 to-amber-300 bg-clip-text text-transparent italic font-serif">
            Corrective Virtual Try-On
          </span>
        </h1>

        {/* Subtitle */}
        <p className="mt-6 text-base sm:text-xl text-slate-300 max-w-3xl mx-auto font-sans leading-relaxed">
          The first unified beauty platform connecting deep dermatological diagnostics with instant Look VTO. Discover your biological skin age, map active ingredients to your exact cellular concerns, and experience corrective radiance in seconds.
        </p>

        {/* Action CTAs */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={onStartScan}
            className="w-full sm:w-auto flex items-center justify-center space-x-2.5 px-8 py-4 rounded-2xl bg-gradient-to-r from-rose-500 via-rose-400 to-amber-400 hover:from-rose-400 hover:to-amber-300 text-slate-950 font-bold text-xs uppercase tracking-widest shadow-2xl shadow-rose-500/30 transition-all hover:scale-102"
          >
            <Activity className="h-4 w-4 text-slate-950" />
            <span>Start Clinical Facial Scan</span>
          </button>

          <button
            onClick={onExplorePersonas}
            className="w-full sm:w-auto flex items-center justify-center space-x-2 px-6 py-4 rounded-2xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 text-xs font-semibold uppercase tracking-wider transition-colors"
          >
            <span>Explore 3 Test Personas</span>
            <ChevronRight className="h-4 w-4 text-slate-400" />
          </button>
        </div>

        {/* Trust & Spec Metrics Bar */}
        <div className="mt-16 pt-10 border-t border-slate-800/80 grid grid-cols-2 md:grid-cols-4 gap-6 text-left">
          <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800">
            <div className="text-2xl font-bold font-mono text-rose-300">10 Metrics</div>
            <div className="text-xs text-slate-400 mt-1 font-mono">Wrinkles, Pores, Redness, Acne & More</div>
          </div>
          <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800">
            <div className="text-2xl font-bold font-mono text-amber-300">0 - 100 Score</div>
            <div className="text-xs text-slate-400 mt-1 font-mono">YouCam Multi-Spectral Composite Health</div>
          </div>
          <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800">
            <div className="text-2xl font-bold font-mono text-emerald-300">Split-Slider VTO</div>
            <div className="text-xs text-slate-400 mt-1 font-mono">Raw Scan vs Finished Look Comparison</div>
          </div>
          <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800">
            <div className="text-2xl font-bold font-mono text-cyan-300">4-Week Projection</div>
            <div className="text-xs text-slate-400 mt-1 font-mono">Cellular Regeneration & Cart Checkout</div>
          </div>
        </div>
      </div>
    </div>
  );
};
