'use client';

import React, { useState } from 'react';
import { TrendingUp, Sparkles, CheckCircle2, Calendar, ShieldCheck, Zap } from 'lucide-react';
import { RecommendedRegimen } from '@/lib/ingredients-matcher';

interface SkinProgressionTimelineProps {
  regimen: RecommendedRegimen;
  currentSkinScore: number;
}

export const SkinProgressionTimeline: React.FC<SkinProgressionTimelineProps> = ({
  regimen,
  currentSkinScore,
}) => {
  const [selectedWeek, setSelectedWeek] = useState(4); // Default to Week 4 final outcome

  const timelineData = regimen.fourWeekProjection;
  const activeMilestone = timelineData.find((t) => t.week === selectedWeek) || timelineData[timelineData.length - 1];

  const scoreDelta = activeMilestone.projectedSkinScore - currentSkinScore;

  return (
    <div className="w-full bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8 backdrop-blur-xl shadow-2xl">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="text-xs uppercase tracking-widest text-rose-400 font-mono font-semibold">
              Predictive Dermatology
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-950/80 text-emerald-300 border border-emerald-800/40">
              AI Cell Regeneration Model
            </span>
          </div>
          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-slate-100 mt-1">
            4-Week Projected Skin Health Journey
          </h3>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
            Simulate your expected clinical recovery when adhering to the prescribed active ingredient regimen.
          </p>
        </div>

        {/* Projected Score Badge */}
        <div className="flex items-center space-x-4 p-3 rounded-2xl bg-slate-950 border border-slate-800 shrink-0">
          <div>
            <div className="text-[10px] uppercase font-mono text-slate-400">Target Score</div>
            <div className="text-xl font-bold font-mono text-emerald-400">
              {activeMilestone.projectedSkinScore}/100
            </div>
          </div>
          <div className="h-8 w-px bg-slate-800" />
          <div>
            <div className="text-[10px] uppercase font-mono text-slate-400">Projected Gain</div>
            <div className="text-sm font-bold font-mono text-rose-300">
              +{scoreDelta} pts
            </div>
          </div>
        </div>
      </div>

      {/* Week Tabs Selector */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
        {timelineData.map((stage) => {
          const isSelected = stage.week === selectedWeek;
          return (
            <button
              key={stage.week}
              onClick={() => setSelectedWeek(stage.week)}
              className={`p-4 rounded-2xl text-left border transition-all ${
                isSelected
                  ? 'bg-rose-950/60 border-rose-500 ring-2 ring-rose-500/30 shadow-lg shadow-rose-950/40'
                  : 'bg-slate-950/60 hover:bg-slate-950 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-mono font-bold text-slate-400">Week {stage.week}</span>
                {isSelected ? (
                  <CheckCircle2 className="h-4 w-4 text-rose-400" />
                ) : (
                  <Calendar className="h-3.5 w-3.5 text-slate-600" />
                )}
              </div>
              <h4 className="font-serif font-bold text-sm text-slate-100 line-clamp-1">
                {stage.label.split(':')[1]?.trim() || stage.label}
              </h4>
              <div className="text-[11px] font-mono text-emerald-400 mt-1 font-semibold">
                Score: {stage.projectedSkinScore}
              </div>
            </button>
          );
        })}
      </div>

      {/* Deep-dive Milestone Detail */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 rounded-2xl bg-slate-950 border border-slate-800">
        <div>
          <div className="flex items-center space-x-2 text-xs font-mono uppercase tracking-wider text-rose-400 font-semibold mb-2">
            <TrendingUp className="h-4 w-4" />
            <span>Clinical Milestone for Week {activeMilestone.week}</span>
          </div>
          <h4 className="font-serif text-xl font-bold text-slate-100 mb-2">
            {activeMilestone.label}
          </h4>
          <p className="text-xs text-slate-300 leading-relaxed">
            {activeMilestone.keyMilestone}
          </p>
        </div>

        <div className="border-t md:border-t-0 md:border-l border-slate-800/80 pt-4 md:pt-0 md:pl-6">
          <div className="flex items-center space-x-2 text-xs font-mono uppercase tracking-wider text-amber-400 font-semibold mb-2">
            <Zap className="h-4 w-4" />
            <span>Cellular Mechanism of Action</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed font-mono bg-slate-900/80 p-3 rounded-xl border border-slate-800">
            {activeMilestone.cellularAction}
          </p>
        </div>
      </div>
    </div>
  );
};
