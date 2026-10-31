'use client';

import React, { useState } from 'react';
import { Layers, Eye, EyeOff, Info, Sparkles, Crosshair } from 'lucide-react';
import { SkinConcernKey, YouCamSkinAnalysisResult } from '@/types/youcam';

interface ConcernHeatmapOverlayProps {
  imageUrl: string;
  diagnostic: YouCamSkinAnalysisResult;
  selectedConcern: SkinConcernKey | null;
  onSelectConcern: (concern: SkinConcernKey) => void;
}

export const ConcernHeatmapOverlay: React.FC<ConcernHeatmapOverlayProps> = ({
  imageUrl,
  diagnostic,
  selectedConcern,
  onSelectConcern,
}) => {
  const [showOverlays, setShowOverlays] = useState(true);
  const activeConcern = selectedConcern || diagnostic.primary_concerns[0] || 'redness';
  const detail = diagnostic.concerns[activeConcern];

  // Specific simulated hotspot coordinates based on concern type
  const getHotspots = (concern: SkinConcernKey) => {
    switch (concern) {
      case 'wrinkle':
        return [
          { top: '35%', left: '26%', label: "Crow's Feet (Left)", depth: 'High' },
          { top: '36%', left: '72%', label: "Crow's Feet (Right)", depth: 'Moderate' },
          { top: '24%', left: '48%', label: 'Glabellar Tension', depth: 'Mild' },
        ];
      case 'pore':
        return [
          { top: '48%', left: '42%', label: 'Nasal Wing Pores', depth: 'Dilated' },
          { top: '50%', left: '56%', label: 'Malar Ridge Pores', depth: 'Congested' },
          { top: '32%', left: '50%', label: 'Mid-Forehead Pores', depth: 'Moderate' },
        ];
      case 'redness':
        return [
          { top: '52%', left: '36%', label: 'Malar Flushing', depth: 'Erythema' },
          { top: '54%', left: '63%', label: 'Capillary Dilation', depth: 'Vascular' },
          { top: '65%', left: '50%', label: 'Perioral Irritation', depth: 'Micro-flare' },
        ];
      case 'acne':
        return [
          { top: '62%', left: '45%', label: 'Inflammatory Papule', depth: 'Active' },
          { top: '66%', left: '54%', label: 'Follicular Comedone', depth: 'Closed' },
          { top: '38%', left: '52%', label: 'Sebaceous Congestion', depth: 'Mild' },
        ];
      case 'dark_circle':
        return [
          { top: '42%', left: '38%', label: 'Sub-Orbital Trough', depth: 'Vascular' },
          { top: '43%', left: '60%', label: 'Periorbital Shadow', depth: 'Melanin' },
        ];
      default:
        return [
          { top: '45%', left: '50%', label: 'Target Zone', depth: 'Moderate' },
        ];
    }
  };

  const hotspots = getHotspots(activeConcern);

  return (
    <div className="w-full bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8 backdrop-blur-xl shadow-2xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-3">
        <div>
          <span className="text-xs uppercase tracking-widest text-rose-400 font-mono font-semibold">
            Visual Diagnostics
          </span>
          <h3 className="font-serif text-xl sm:text-2xl font-bold text-slate-100 mt-1">
            Clinical Concern Heatmap & Cluster Localization
          </h3>
          <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
            YouCam AI segmented coordinates mapped onto your facial topology.
          </p>
        </div>

        {/* Toggle Overlays Button */}
        <button
          onClick={() => setShowOverlays(!showOverlays)}
          className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-slate-950 border border-slate-800 hover:border-slate-700 text-slate-300 text-xs font-mono font-medium transition-all"
        >
          {showOverlays ? (
            <>
              <EyeOff className="h-4 w-4 text-rose-400" />
              <span>Hide Heatmap</span>
            </>
          ) : (
            <>
              <Eye className="h-4 w-4 text-slate-400" />
              <span>Show Heatmap</span>
            </>
          )}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* Facial Visualizer Canvas */}
        <div className="lg:col-span-7 flex justify-center">
          <div className="relative w-full max-w-md aspect-[3/4] rounded-2xl overflow-hidden border border-slate-700 shadow-2xl shadow-rose-950/40 bg-black group">
            <img
              src={imageUrl}
              alt="Subject Face"
              className="w-full h-full object-cover select-none"
            />

            {/* Heatmap Overlay Simulation Shader */}
            {showOverlays && (
              <div
                className="absolute inset-0 pointer-events-none transition-opacity duration-500 mix-blend-color-dodge opacity-60"
                style={{
                  background: `radial-gradient(circle at 50% 50%, ${detail?.overlay_color || '#f43f5e'}40 0%, transparent 70%)`,
                }}
              />
            )}

            {/* Interactive Pins on Detected Hotspots */}
            {showOverlays &&
              hotspots.map((pin, idx) => (
                <div
                  key={idx}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer z-20 group/pin"
                  style={{ top: pin.top, left: pin.left }}
                >
                  <div className="relative flex items-center justify-center">
                    <span
                      className="absolute h-8 w-8 rounded-full animate-ping opacity-75"
                      style={{ backgroundColor: detail?.overlay_color || '#f43f5e' }}
                    />
                    <div
                      className="h-5 w-5 rounded-full border-2 border-white flex items-center justify-center shadow-lg"
                      style={{ backgroundColor: detail?.overlay_color || '#f43f5e' }}
                    >
                      <Crosshair className="h-3 w-3 text-white" />
                    </div>

                    {/* Tooltip on hover */}
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover/pin:flex flex-col items-center bg-slate-950/95 text-slate-100 text-[10px] font-mono px-2.5 py-1.5 rounded-lg border border-slate-700 shadow-xl whitespace-nowrap pointer-events-none z-30">
                      <span className="font-bold">{pin.label}</span>
                      <span className="text-slate-400">Severity: {pin.depth}</span>
                    </div>
                  </div>
                </div>
              ))}

            {/* Mode badge */}
            <div className="absolute top-3 left-3 bg-slate-950/80 backdrop-blur-md border border-slate-800 text-[10px] font-mono px-3 py-1 rounded-full text-slate-300 flex items-center space-x-1.5 z-20">
              <Layers className="h-3 w-3 text-rose-400" />
              <span className="capitalize font-semibold text-rose-300">
                Overlay: {activeConcern}
              </span>
            </div>
          </div>
        </div>

        {/* Clinical Deep Dive Panel */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
          <div>
            <div className="flex items-center space-x-2 text-xs font-mono uppercase tracking-wider text-rose-400 font-semibold mb-2">
              <Info className="h-4 w-4" />
              <span>Clinical Analysis & Rationale</span>
            </div>
            <h4 className="font-serif text-2xl font-bold text-slate-100 capitalize">
              {activeConcern.replace('_', ' ')} Evaluation
            </h4>
            <div className="flex items-center space-x-3 mt-2">
              <span className="text-sm font-mono text-slate-400">
                Severity Index: <strong className="text-slate-100 uppercase">{detail?.severity}</strong>
              </span>
              <span className="text-slate-600">•</span>
              <span className="text-sm font-mono text-slate-400">
                Area Density: <strong className="text-rose-400">{detail?.area_coverage_pct}%</strong>
              </span>
            </div>

            <p className="text-sm text-slate-300 mt-4 leading-relaxed bg-slate-950/50 p-4 rounded-2xl border border-slate-800/80">
              {detail?.description || 'Diagnostic mapping performed by YouCam high-definition computer vision.'}
            </p>
          </div>

          {/* Quick switcher tabs */}
          <div>
            <span className="text-xs font-mono uppercase tracking-wider text-slate-400 block mb-2">
              Switch Heatmap View
            </span>
            <div className="flex flex-wrap gap-2">
              {diagnostic.primary_concerns.map((key) => (
                <button
                  key={key}
                  onClick={() => onSelectConcern(key)}
                  className={`text-xs font-mono px-3 py-1.5 rounded-xl border capitalize transition-all ${
                    activeConcern === key
                      ? 'bg-rose-500 text-slate-950 font-bold border-rose-400 shadow-md shadow-rose-500/25'
                      : 'bg-slate-950 text-slate-300 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  {key}
                </button>
              ))}
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-gradient-to-r from-rose-950/30 to-amber-950/30 border border-rose-500/20">
            <div className="flex items-center space-x-2 text-xs text-rose-300 font-mono font-bold uppercase mb-1">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Recommended Next Step</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Slide below to the <strong>Virtual Try-On Engine</strong> to see how clinical color correction & Look VTO eliminates these concerns instantly while your active regimen heals them.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
