'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Sparkles, Sliders, CheckCircle2, ChevronRight, Layers, RefreshCw } from 'lucide-react';
import { VTO_LOOK_OPTIONS } from '@/lib/mock-data';
import { YouCamVtoLookOption, YouCamVtoResult } from '@/types/youcam';

interface VtoSplitSliderProps {
  originalImage: string;
  vtoResult: YouCamVtoResult | null;
  selectedLookId: string;
  onSelectLook: (lookId: string) => void;
  isLoadingVto: boolean;
}

export const VtoSplitSlider: React.FC<VtoSplitSliderProps> = ({
  originalImage,
  vtoResult,
  selectedLookId,
  onSelectLook,
  isLoadingVto,
}) => {
  const [sliderPosition, setSliderPosition] = useState(50); // percentage 0-100
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const activeLook = VTO_LOOK_OPTIONS.find((l) => l.id === selectedLookId) || VTO_LOOK_OPTIONS[0];
  const renderedVtoImage = vtoResult?.result_image_url || activeLook.swatch_colors[0] || originalImage;

  const handleMove = useCallback(
    (clientX: number) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = clientX - rect.left;
      const width = rect.width;
      const percentage = Math.max(0, Math.min(100, (x / width) * 100));
      setSliderPosition(percentage);
    },
    []
  );

  const handleTouchMove = (e: React.TouchEvent) => {
    handleMove(e.touches[0].clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      handleMove(e.clientX);
    }
  };

  useEffect(() => {
    const handleMouseUp = () => setIsDragging(false);
    window.addEventListener('mouseup', handleMouseUp);
    return () => window.removeEventListener('mouseup', handleMouseUp);
  }, []);

  return (
    <div className="w-full bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8 backdrop-blur-xl shadow-2xl">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="text-xs uppercase tracking-widest text-rose-400 font-mono font-semibold">
              Step 2: Instant Corrective VTO
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-rose-950/80 text-rose-300 border border-rose-800/40">
              YouCam Look VTO Engine
            </span>
          </div>
          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-slate-100 mt-1">
            From Clinical Diagnostic to Flawless Radiance
          </h3>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
            See how YouCam&apos;s Look Virtual Try-On camouflages diagnosed redness, dark circles, and pores with active beauty shades while your treatment regimen operates at cellular depth.
          </p>
        </div>

        {/* Selected Look Tag */}
        <div className="flex items-center space-x-3 shrink-0">
          <div className="text-right hidden sm:block">
            <div className="text-xs font-mono text-slate-400">Current Template</div>
            <div className="text-sm font-serif font-bold text-rose-300">{activeLook.name}</div>
          </div>
          <div className="flex -space-x-1.5 overflow-hidden p-1 rounded-xl bg-slate-950 border border-slate-800">
            {activeLook.swatch_colors.map((color, i) => (
              <div
                key={i}
                className="inline-block h-6 w-6 rounded-full ring-2 ring-slate-900 shadow"
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Look Selector Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
        {VTO_LOOK_OPTIONS.map((look) => {
          const isSelected = look.id === selectedLookId;
          return (
            <button
              key={look.id}
              onClick={() => onSelectLook(look.id)}
              disabled={isLoadingVto}
              className={`p-4 rounded-2xl text-left border transition-all relative overflow-hidden ${
                isSelected
                  ? 'bg-gradient-to-b from-rose-950/80 to-slate-900 border-rose-500 ring-2 ring-rose-500/30 shadow-lg shadow-rose-950/50'
                  : 'bg-slate-950/60 hover:bg-slate-950 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[10px] font-mono uppercase tracking-wider font-bold px-2 py-0.5 rounded bg-rose-500/10 text-rose-300 border border-rose-500/20">
                  {look.finish}
                </span>
                {isSelected && <CheckCircle2 className="h-4 w-4 text-rose-400" />}
              </div>
              <h4 className="font-serif font-bold text-sm text-slate-100 truncate">{look.name}</h4>
              <p className="text-[11px] text-slate-400 mt-1 line-clamp-1">{look.subtitle}</p>
            </button>
          );
        })}
      </div>

      {/* Split-Slider Interactive Canvas */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* Interactive Comparison Viewport */}
        <div className="lg:col-span-7 flex flex-col items-center">
          <div
            ref={containerRef}
            onMouseDown={() => setIsDragging(true)}
            onMouseMove={handleMouseMove}
            onTouchMove={handleTouchMove}
            className="relative w-full max-w-md aspect-[3/4] rounded-2xl overflow-hidden border border-slate-700 shadow-2xl shadow-rose-950/40 select-none cursor-ew-resize group bg-black"
          >
            {/* VTO After Layer (Full bottom image) */}
            <img
              src={renderedVtoImage}
              alt="VTO Render"
              className="absolute inset-0 w-full h-full object-cover"
            />

            {/* Original Raw Diagnostic Layer (Clipped left side) */}
            <div
              className="absolute inset-0 overflow-hidden"
              style={{ width: `${sliderPosition}%` }}
            >
              <img
                src={originalImage}
                alt="Original Scan"
                className="absolute inset-0 w-full h-full object-cover max-w-none"
                style={{
                  width: containerRef.current?.getBoundingClientRect().width || '100%',
                }}
              />
              <div className="absolute top-4 left-4 bg-slate-950/80 backdrop-blur-md border border-slate-800 text-[10px] font-mono uppercase tracking-wider px-2.5 py-1 rounded-full text-slate-300">
                Raw Clinical Scan
              </div>
            </div>

            {/* VTO Badge on Right Side */}
            <div className="absolute top-4 right-4 bg-rose-950/80 backdrop-blur-md border border-rose-800/60 text-[10px] font-mono uppercase tracking-wider px-2.5 py-1 rounded-full text-rose-300 flex items-center space-x-1">
              <Sparkles className="h-3 w-3 text-rose-400" />
              <span>YouCam VTO Look</span>
            </div>

            {/* Loading Indicator */}
            {isLoadingVto && (
              <div className="absolute inset-0 bg-slate-950/70 backdrop-blur-sm flex flex-col items-center justify-center z-30">
                <RefreshCw className="h-8 w-8 text-rose-400 animate-spin mb-2" />
                <span className="text-xs font-mono text-slate-200 uppercase tracking-wider">
                  Rendering YouCam VTO...
                </span>
              </div>
            )}

            {/* Draggable Divider Line & Knob */}
            <div
              className="absolute top-0 bottom-0 w-1 bg-white shadow-[0_0_15px_rgba(255,255,255,0.7)] z-20 pointer-events-none"
              style={{ left: `${sliderPosition}%` }}
            >
              <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 h-9 w-9 rounded-full bg-slate-950 border-2 border-white flex items-center justify-center shadow-2xl">
                <Sliders className="h-4 w-4 text-rose-400 rotate-90" />
              </div>
            </div>
          </div>

          <p className="mt-3 text-xs font-mono text-slate-400 flex items-center space-x-2">
            <span>◀ Drag slider left/right to compare ▶</span>
          </p>
        </div>

        {/* Applied Products Breakdown Card */}
        <div className="lg:col-span-5 space-y-6">
          <div>
            <div className="flex items-center space-x-2 text-xs font-mono uppercase tracking-wider text-rose-400 font-semibold mb-2">
              <Layers className="h-4 w-4" />
              <span>VTO Aesthetic Breakdown</span>
            </div>
            <h4 className="font-serif text-2xl font-bold text-slate-100">
              {activeLook.name}
            </h4>
            <p className="text-xs text-slate-300 mt-2 leading-relaxed bg-slate-950/50 p-4 rounded-2xl border border-slate-800/80">
              {activeLook.description}
            </p>
          </div>

          {/* Applied SKU Products */}
          <div>
            <span className="text-xs font-mono uppercase tracking-wider text-slate-400 block mb-3">
              Rendered Makeup & Skincare Products (3 SKUs)
            </span>
            <div className="space-y-3">
              {activeLook.applied_products.map((item, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800/80 flex items-center justify-between"
                >
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-rose-950 text-rose-300 border border-rose-800/40">
                        {item.category}
                      </span>
                      <h5 className="text-xs font-semibold text-slate-200">{item.name}</h5>
                    </div>
                    <p className="text-[11px] text-slate-400 mt-1">
                      Shade: <span className="text-slate-200 font-medium">{item.shade}</span> • {item.benefit}
                    </p>
                  </div>
                  <ChevronRight className="h-4 w-4 text-slate-600" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
