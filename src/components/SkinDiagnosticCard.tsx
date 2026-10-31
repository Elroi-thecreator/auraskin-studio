'use client';

import React from 'react';
import { Activity, ShieldAlert, Award, Clock, Sparkles, CheckCircle } from 'lucide-react';
import { SkinConcernKey, YouCamSkinAnalysisResult } from '@/types/youcam';

interface SkinDiagnosticCardProps {
  diagnostic: YouCamSkinAnalysisResult;
  selectedConcern: SkinConcernKey | null;
  onSelectConcern: (concern: SkinConcernKey) => void;
}

export const SkinDiagnosticCard: React.FC<SkinDiagnosticCardProps> = ({
  diagnostic,
  selectedConcern,
  onSelectConcern,
}) => {
  const { skin_score, skin_age, chronological_age, concerns, primary_concerns } = diagnostic;
  const ageDelta = chronological_age ? skin_age - chronological_age : 0;

  const concernKeys = Object.keys(concerns) as SkinConcernKey[];

  const getSeverityBadgeClass = (severity: string) => {
    switch (severity) {
      case 'severe':
        return 'bg-red-950/70 text-red-400 border-red-800/60';
      case 'high':
        return 'bg-rose-950/70 text-rose-300 border-rose-800/60';
      case 'moderate':
        return 'bg-amber-950/70 text-amber-300 border-amber-800/60';
      case 'mild':
        return 'bg-blue-950/70 text-blue-300 border-blue-800/60';
      default:
        return 'bg-emerald-950/70 text-emerald-300 border-emerald-800/60';
    }
  };

  return (
    <div className="w-full bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8 backdrop-blur-xl shadow-2xl shadow-slate-950/50">
      
      {/* Top Banner: Clinical Summary Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pb-8 border-b border-slate-800">
        
        {/* Metric 1: Overall Skin Health Score */}
        <div className="flex items-center space-x-5">
          <div className="relative h-20 w-20 shrink-0">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
              <path
                className="text-slate-800"
                strokeWidth="3.5"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path
                className="text-rose-500 transition-all duration-1000 ease-out"
                strokeDasharray={`${skin_score}, 100`}
                strokeWidth="3.5"
                strokeLinecap="round"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-xl font-bold font-mono text-slate-100">{skin_score}</span>
              <span className="text-[9px] text-slate-400 uppercase tracking-wider font-mono">/100</span>
            </div>
          </div>
          <div>
            <div className="flex items-center space-x-1.5 text-xs text-rose-400 font-mono font-semibold uppercase tracking-wider">
              <Activity className="h-3.5 w-3.5" />
              <span>YouCam Health Index</span>
            </div>
            <h4 className="text-xl font-serif font-bold text-slate-100 mt-0.5">
              {skin_score >= 80 ? 'Optimal Vitality' : skin_score >= 65 ? 'Reactive Barrier' : 'Clinical Attention Needed'}
            </h4>
            <p className="text-xs text-slate-400 mt-1">
              Quantitative multi-spectral composite score
            </p>
          </div>
        </div>

        {/* Metric 2: Biological Skin Age Differential */}
        <div className="flex items-center space-x-4 border-t md:border-t-0 md:border-l border-slate-800 pt-4 md:pt-0 md:pl-6">
          <div className="h-14 w-14 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-center shrink-0">
            <Clock className="h-6 w-6 text-amber-400" />
          </div>
          <div>
            <div className="text-xs text-amber-400/90 font-mono font-semibold uppercase tracking-wider">
              Biological Skin Age
            </div>
            <div className="flex items-baseline space-x-2 mt-0.5">
              <span className="text-2xl font-bold font-mono text-slate-100">{skin_age} yrs</span>
              {chronological_age && (
                <span className={`text-xs font-mono font-bold px-2 py-0.5 rounded-full ${
                  ageDelta > 0 ? 'bg-rose-950/60 text-rose-300' : 'bg-emerald-950/60 text-emerald-300'
                }`}>
                  {ageDelta > 0 ? `+${ageDelta} yrs vs actual` : `${ageDelta} yrs vs actual`}
                </span>
              )}
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Estimated cellular regeneration benchmark
            </p>
          </div>
        </div>

        {/* Metric 3: Top Priority Concerns */}
        <div className="border-t md:border-t-0 md:border-l border-slate-800 pt-4 md:pt-0 md:pl-6">
          <div className="text-xs text-rose-400 font-mono font-semibold uppercase tracking-wider flex items-center space-x-1.5">
            <ShieldAlert className="h-3.5 w-3.5" />
            <span>Top Diagnosed Concerns</span>
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            {primary_concerns.map((key) => {
              const c = concerns[key];
              if (!c) return null;
              return (
                <button
                  key={key}
                  onClick={() => onSelectConcern(key)}
                  className={`text-xs font-mono px-2.5 py-1 rounded-lg border capitalize transition-all ${
                    selectedConcern === key
                      ? 'bg-rose-500 text-slate-950 font-bold border-rose-400 shadow-md shadow-rose-500/30'
                      : 'bg-slate-950 text-slate-300 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  {key} ({c.severity})
                </button>
              );
            })}
          </div>
          <p className="text-[11px] text-slate-400 mt-2">
            Click any concern to activate its diagnostic heatmap overlay below.
          </p>
        </div>
      </div>

      {/* Granular 10-Concern Matrix */}
      <div className="mt-8">
        <div className="flex items-center justify-between mb-4">
          <h5 className="font-serif text-lg font-bold text-slate-200">
            Clinical Metric Breakdown (10 Diagnostic Indicators)
          </h5>
          <span className="text-xs font-mono text-slate-400">
            Selected: <span className="text-rose-400 font-bold uppercase">{selectedConcern || 'All Areas'}</span>
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {concernKeys.map((key) => {
            const detail = concerns[key];
            const isSelected = selectedConcern === key;

            return (
              <div
                key={key}
                onClick={() => onSelectConcern(key)}
                className={`p-3.5 rounded-2xl cursor-pointer border transition-all ${
                  isSelected
                    ? 'bg-rose-950/40 border-rose-500 ring-1 ring-rose-500/50 shadow-lg shadow-rose-950/40'
                    : 'bg-slate-950/60 hover:bg-slate-950 border-slate-800/80 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium capitalize text-slate-200 font-mono">
                    {key.replace('_', ' ')}
                  </span>
                  <span
                    className={`text-[10px] font-mono uppercase px-1.5 py-0.5 rounded border ${getSeverityBadgeClass(
                      detail.severity
                    )}`}
                  >
                    {detail.severity}
                  </span>
                </div>

                {/* Severity bar */}
                <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden my-2">
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{
                      width: `${detail.score}%`,
                      backgroundColor: detail.overlay_color || '#f43f5e',
                    }}
                  />
                </div>

                <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
                  <span>Score: {detail.score}</span>
                  <span>{detail.area_coverage_pct}% area</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
