'use client';

import React, { useState } from 'react';
import { Sun, Moon, Sparkles, Plus, Check, ShoppingBag, ShieldCheck, Star } from 'lucide-react';
import { RecommendedRegimen } from '@/lib/ingredients-matcher';
import { SkincareProduct } from '@/types/skincare';

interface RegimenBuilderProps {
  regimen: RecommendedRegimen;
  onAddToCart: (product: SkincareProduct) => void;
  onAddAllToCart: (products: SkincareProduct[]) => void;
}

export const RegimenBuilder: React.FC<RegimenBuilderProps> = ({
  regimen,
  onAddToCart,
  onAddAllToCart,
}) => {
  const [activeTab, setActiveTab] = useState<'AM' | 'PM'>('AM');

  const activeRoutine = activeTab === 'AM' ? regimen.amRoutine : regimen.pmRoutine;
  const allUniqueProducts = Array.from(new Set([...regimen.amRoutine, ...regimen.pmRoutine]));

  return (
    <div className="w-full bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8 backdrop-blur-xl shadow-2xl">
      
      {/* Header and Add All Bundle CTA */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-8 gap-4">
        <div>
          <span className="text-xs uppercase tracking-widest text-rose-400 font-mono font-semibold">
            Step 3: Personalized Treatment Regimen
          </span>
          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-slate-100 mt-1">
            Clinical AM & PM Routine Formulation
          </h3>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
            Each formula is paired directly to your YouCam diagnostic metrics to reverse skin age and restore barrier integrity.
          </p>
        </div>

        {/* 1-Click Add All Regimen Button */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
          <div className="text-right hidden sm:block">
            <span className="text-xs text-slate-400 font-mono block">Complete Bundle Price</span>
            <div className="flex items-center space-x-2 justify-end">
              <span className="text-xs line-through text-slate-500 font-mono">
                ${regimen.originalBundlePrice}
              </span>
              <span className="text-xl font-bold font-mono text-rose-300">
                ${regimen.bundlePrice}
              </span>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800/40">
                {regimen.discountPercentage}% OFF
              </span>
            </div>
          </div>

          <button
            onClick={() => onAddAllToCart(allUniqueProducts)}
            className="flex items-center justify-center space-x-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-rose-500 to-amber-500 hover:from-rose-400 hover:to-amber-400 text-slate-950 text-xs font-bold uppercase tracking-wider shadow-xl shadow-rose-500/25 transition-all group"
          >
            <ShoppingBag className="h-4 w-4 text-slate-950 group-hover:scale-110 transition-transform" />
            <span>Add Complete Routine ({allUniqueProducts.length} Items)</span>
          </button>
        </div>
      </div>

      {/* Active Ingredients Spotlight */}
      <div className="mb-10">
        <span className="text-xs font-mono uppercase tracking-wider text-rose-400 font-bold block mb-3">
          Prescribed Active Clinical Ingredients
        </span>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          {regimen.activeIngredients.map((ing, idx) => (
            <div
              key={idx}
              className="p-4 rounded-2xl bg-slate-950 border border-slate-800/80 hover:border-slate-700 transition-colors"
            >
              <div className="flex items-center justify-between text-[10px] font-mono mb-1.5">
                <span className="text-rose-400 font-bold">{ing.concentration}</span>
                <span className="text-slate-400 uppercase">{ing.category}</span>
              </div>
              <h4 className="font-serif font-bold text-sm text-slate-200 mb-1">{ing.name}</h4>
              <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed mb-2">
                {ing.benefits}
              </p>
              <div className="pt-2 border-t border-slate-800/60 text-[10px] font-mono text-slate-400">
                Targets: <span className="text-slate-300">{ing.targeted_concerns.join(', ')}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Routine Tabs: AM vs PM */}
      <div className="flex items-center space-x-2 mb-6 border-b border-slate-800 pb-4">
        <button
          onClick={() => setActiveTab('AM')}
          className={`flex items-center space-x-2 px-5 py-2.5 rounded-xl text-xs font-bold font-mono uppercase tracking-wider transition-all ${
            activeTab === 'AM'
              ? 'bg-amber-500/10 text-amber-300 border border-amber-500/40 shadow-md shadow-amber-500/10'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Sun className="h-4 w-4 text-amber-400" />
          <span>Morning Shield & Glow (AM)</span>
        </button>

        <button
          onClick={() => setActiveTab('PM')}
          className={`flex items-center space-x-2 px-5 py-2.5 rounded-xl text-xs font-bold font-mono uppercase tracking-wider transition-all ${
            activeTab === 'PM'
              ? 'bg-rose-500/10 text-rose-300 border border-rose-500/40 shadow-md shadow-rose-500/10'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Moon className="h-4 w-4 text-rose-400" />
          <span>Evening Cellular Repair (PM)</span>
        </button>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {activeRoutine.map((product, idx) => (
          <div
            key={`${product.id}-${idx}`}
            className="group rounded-2xl bg-slate-950 border border-slate-800 hover:border-slate-700 p-4 flex flex-col justify-between transition-all"
          >
            <div>
              {/* Product Image */}
              <div className="relative aspect-square rounded-xl overflow-hidden mb-3 border border-slate-800/60 bg-slate-900 group-hover:scale-102 transition-transform">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 left-2 bg-slate-950/80 backdrop-blur-md text-[10px] font-mono px-2 py-0.5 rounded text-rose-300 border border-slate-800">
                  Step {idx + 1}: {product.step}
                </div>
              </div>

              {/* Product Info */}
              <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-1">
                <span>{product.brand}</span>
                <span className="flex items-center text-amber-400 font-bold">
                  <Star className="h-3 w-3 fill-amber-400 mr-0.5" />
                  {product.rating}
                </span>
              </div>

              <h4 className="font-serif font-bold text-sm text-slate-100 group-hover:text-rose-300 transition-colors line-clamp-1">
                {product.name}
              </h4>
              <p className="text-[11px] text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                {product.tagline}
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-800/80">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-baseline space-x-1.5">
                  <span className="text-base font-bold font-mono text-slate-100">${product.price}</span>
                  {product.originalPrice && (
                    <span className="text-xs line-through text-slate-500 font-mono">
                      ${product.originalPrice}
                    </span>
                  )}
                </div>
                <span className="text-[10px] font-mono text-emerald-400">In Stock</span>
              </div>

              <button
                onClick={() => onAddToCart(product)}
                className="w-full flex items-center justify-center space-x-1.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 text-xs font-semibold uppercase tracking-wider transition-colors"
              >
                <Plus className="h-3.5 w-3.5 text-rose-400" />
                <span>Add to Bag</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
