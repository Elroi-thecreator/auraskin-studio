'use client';

import React, { useRef } from 'react';
import { Camera, Upload, Sparkles, Check, User } from 'lucide-react';
import { DEMO_PERSONAS } from '@/lib/mock-data';
import { PersonaProfile } from '@/types/skincare';

interface PersonaSelectorProps {
  selectedPersona: PersonaProfile | null;
  onSelectPersona: (persona: PersonaProfile) => void;
  onOpenLiveCamera: () => void;
  onCustomImageUpload: (base64: string) => void;
  isLoading: boolean;
}

export const PersonaSelector: React.FC<PersonaSelectorProps> = ({
  selectedPersona,
  onSelectPersona,
  onOpenLiveCamera,
  onCustomImageUpload,
  isLoading,
}) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          onCustomImageUpload(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="w-full">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
        <div>
          <span className="text-xs uppercase tracking-widest text-rose-400 font-mono font-semibold">
            Step 1: Input Subject
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-100 mt-1">
            Choose a Clinical Persona or Scan Your Face
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
            Select one of our 3 diverse benchmark clinical profiles, capture directly via webcam, or upload your own selfie to initiate the YouCam AI Skin Diagnostic pipeline.
          </p>
        </div>

        {/* Live capture / Upload Action Buttons */}
        <div className="flex items-center space-x-3 shrink-0">
          <button
            onClick={onOpenLiveCamera}
            disabled={isLoading}
            className="flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-rose-500/30 hover:border-rose-500/60 text-rose-200 text-xs font-semibold uppercase tracking-wider transition-all shadow-md shadow-rose-950/40"
          >
            <Camera className="h-4 w-4 text-rose-400" />
            <span>Live Scan</span>
          </button>

          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={isLoading}
            className="flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-slate-300 text-xs font-semibold uppercase tracking-wider transition-all"
          >
            <Upload className="h-4 w-4 text-slate-400" />
            <span>Upload Photo</span>
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />
        </div>
      </div>

      {/* 3 Benchmark Persona Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
        {DEMO_PERSONAS.map((persona) => {
          const isSelected = selectedPersona?.id === persona.id;
          return (
            <div
              key={persona.id}
              onClick={() => !isLoading && onSelectPersona(persona)}
              className={`group relative rounded-2xl p-5 cursor-pointer transition-all duration-300 border ${
                isSelected
                  ? 'bg-gradient-to-b from-rose-950/60 to-slate-900/90 border-rose-500/80 ring-2 ring-rose-500/40 shadow-xl shadow-rose-950/50'
                  : 'bg-slate-900/60 hover:bg-slate-900/90 border-slate-800/80 hover:border-slate-700'
              }`}
            >
              {/* Selected Badge */}
              {isSelected && (
                <div className="absolute top-4 right-4 z-10 bg-rose-500 text-slate-950 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full flex items-center space-x-1 shadow-md">
                  <Check className="h-3 w-3 stroke-[3]" />
                  <span>Active Subject</span>
                </div>
              )}

              <div className="flex items-start space-x-4">
                {/* Persona Avatar */}
                <div className="relative h-20 w-20 rounded-xl overflow-hidden shrink-0 border border-slate-700/60 group-hover:scale-105 transition-transform">
                  <img
                    src={persona.avatarUrl}
                    alt={persona.name}
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />
                </div>

                {/* Identity info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2">
                    <h3 className="font-serif text-lg font-bold text-slate-100 truncate">
                      {persona.name}
                    </h3>
                    <span className="text-xs font-mono text-slate-400">
                      Age {persona.age}
                    </span>
                  </div>
                  <p className="text-xs text-rose-300 font-medium mt-0.5 truncate">
                    {persona.skinType}
                  </p>
                  <p className="text-[11px] text-slate-400 mt-2 line-clamp-2 leading-relaxed">
                    {persona.primaryIssues}
                  </p>
                </div>
              </div>

              {/* Benchmark Summary Metrics */}
              <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono">
                <div className="flex items-center space-x-1.5">
                  <span className="text-slate-400">Baseline Score:</span>
                  <span className={`font-bold ${persona.presetData.skinScore < 70 ? 'text-amber-400' : 'text-emerald-400'}`}>
                    {persona.presetData.skinScore}/100
                  </span>
                </div>
                <div className="flex items-center space-x-1 text-slate-400">
                  <span>Skin Age:</span>
                  <span className="font-bold text-slate-200">{persona.presetData.skinAge}y</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
