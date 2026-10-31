'use client';

import React from 'react';
import { Sparkles, ShoppingBag, ShieldCheck, Code, Award, SlidersHorizontal } from 'lucide-react';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  onOpenInspector: () => void;
  onOpenStory: () => void;
  isLiveApi: boolean;
  onToggleApiSettings: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  onOpenCart,
  onOpenInspector,
  onOpenStory,
  isLiveApi,
  onToggleApiSettings,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-xl bg-slate-950/80 border-b border-rose-900/20 text-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Brand Logo & Tagline */}
        <div className="flex items-center space-x-3 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-rose-500 via-rose-400 to-amber-300 p-[1px] shadow-lg shadow-rose-500/20">
            <div className="h-full w-full bg-slate-950 rounded-[11px] flex items-center justify-center">
              <Sparkles className="h-5 w-5 text-rose-400" />
            </div>
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-serif tracking-wider text-xl font-bold bg-gradient-to-r from-rose-100 via-champagne-200 to-rose-300 bg-clip-text text-transparent">
                AURASKIN
              </span>
              <span className="text-xs uppercase tracking-widest text-rose-400/90 font-mono px-1.5 py-0.5 rounded bg-rose-950/60 border border-rose-800/40">
                STUDIO
              </span>
            </div>
            <p className="text-[10px] text-slate-400 uppercase tracking-widest hidden sm:block">
              YouCam AI Skin Analysis & eCommerce VTO
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center space-x-2 sm:space-x-4">
          
          {/* API Mode Indicator */}
          <button
            onClick={onToggleApiSettings}
            className={`flex items-center space-x-1.5 text-xs font-mono px-3 py-1.5 rounded-full border transition-all ${
              isLiveApi
                ? 'bg-emerald-950/50 text-emerald-300 border-emerald-700/50 hover:bg-emerald-900/50 shadow-sm shadow-emerald-500/20'
                : 'bg-rose-950/50 text-rose-300 border-rose-700/40 hover:bg-rose-900/50 shadow-sm shadow-rose-500/10'
            }`}
            title="Click to configure YouCam API Key or switch modes"
          >
            <span className={`h-2 w-2 rounded-full animate-ping ${isLiveApi ? 'bg-emerald-400' : 'bg-rose-400'}`} />
            <span className="hidden sm:inline">{isLiveApi ? 'Live YouCam API' : 'Interactive Demo Mode'}</span>
            <span className="sm:hidden">{isLiveApi ? 'Live' : 'Demo'}</span>
            <SlidersHorizontal className="h-3 w-3 ml-1 text-slate-400" />
          </button>

          {/* Devpost Project Story Button */}
          <button
            onClick={onOpenStory}
            className="flex items-center space-x-1 text-xs font-medium px-3 py-1.5 rounded-lg bg-slate-900/80 hover:bg-slate-800 border border-slate-800 text-slate-300 transition-colors"
          >
            <Award className="h-3.5 w-3.5 text-amber-400" />
            <span className="hidden md:inline">Devpost Pitch</span>
          </button>

          {/* API Inspector Modal Button */}
          <button
            onClick={onOpenInspector}
            className="flex items-center space-x-1 text-xs font-medium px-3 py-1.5 rounded-lg bg-slate-900/80 hover:bg-slate-800 border border-slate-800 text-slate-300 transition-colors"
          >
            <Code className="h-3.5 w-3.5 text-rose-400" />
            <span className="hidden md:inline">API Inspector</span>
          </button>

          {/* Cart Drawer Trigger */}
          <button
            onClick={onOpenCart}
            className="relative flex items-center justify-center p-2.5 rounded-xl bg-gradient-to-r from-rose-500/10 to-amber-500/10 hover:from-rose-500/20 hover:to-amber-500/20 border border-rose-500/30 text-rose-200 transition-all shadow-md shadow-rose-500/10 group"
            aria-label="Open Shopping Bag"
          >
            <ShoppingBag className="h-5 w-5 text-rose-300 group-hover:scale-105 transition-transform" />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-gradient-to-r from-rose-500 to-amber-500 text-slate-950 font-bold text-[11px] h-5 w-5 rounded-full flex items-center justify-center shadow-lg animate-bounce">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
