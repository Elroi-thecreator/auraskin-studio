'use client';

import React, { useState } from 'react';
import { X, ShoppingBag, Trash2, ArrowRight, ShieldCheck, Check, Sparkles } from 'lucide-react';
import { CartItem } from '@/types/skincare';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}) => {
  const [promoCode, setPromoCode] = useState('AURASKIN18');
  const [promoApplied, setPromoApplied] = useState(true);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);

  if (!isOpen) return null;

  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const discount = promoApplied ? Math.round(subtotal * 0.18) : 0;
  const shipping = subtotal > 75 || subtotal === 0 ? 0 : 9;
  const total = Math.max(0, subtotal - discount + shipping);

  const handleCheckout = () => {
    setIsCheckingOut(true);
    setTimeout(() => {
      setIsCheckingOut(false);
      setOrderComplete(true);
      onClearCart();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-950/80 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-md bg-slate-900 border-l border-slate-800 h-full flex flex-col shadow-2xl">
        
        {/* Header */}
        <div className="p-6 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
          <div className="flex items-center space-x-2">
            <ShoppingBag className="h-5 w-5 text-rose-400" />
            <h3 className="font-serif text-lg font-bold text-slate-100">Your Skincare Bag</h3>
            <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-slate-800 text-slate-300">
              {items.length} {items.length === 1 ? 'item' : 'items'}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-slate-800 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Cart Contents */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {orderComplete ? (
            <div className="py-16 text-center space-y-4">
              <div className="h-16 w-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/10">
                <Check className="h-8 w-8 stroke-[3]" />
              </div>
              <h4 className="font-serif text-2xl font-bold text-slate-100">
                Order Confirmed!
              </h4>
              <p className="text-xs text-slate-300 max-w-xs mx-auto leading-relaxed">
                Your personalized clinical regimen is being formulated. You will receive tracking and dermatological usage guidelines via email.
              </p>
              <button
                onClick={() => {
                  setOrderComplete(false);
                  onClose();
                }}
                className="mt-4 px-6 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold uppercase tracking-wider transition-colors"
              >
                Continue Browsing
              </button>
            </div>
          ) : items.length === 0 ? (
            <div className="py-20 text-center space-y-3">
              <ShoppingBag className="h-12 w-12 text-slate-700 mx-auto" />
              <p className="text-sm text-slate-400 font-medium">Your bag is currently empty.</p>
              <p className="text-xs text-slate-500">
                Add products from your personalized clinical diagnosis above.
              </p>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.product.id}
                className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-center space-x-4"
              >
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="h-16 w-16 rounded-xl object-cover border border-slate-800 shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <span className="text-[10px] font-mono uppercase text-rose-400">
                    {item.product.step}
                  </span>
                  <h5 className="text-xs font-serif font-bold text-slate-100 truncate">
                    {item.product.name}
                  </h5>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs font-mono font-bold text-slate-200">
                      ${item.product.price}
                    </span>
                    <div className="flex items-center space-x-2 bg-slate-900 border border-slate-800 rounded-lg px-2 py-0.5">
                      <button
                        onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                        className="text-xs text-slate-400 hover:text-slate-100 px-1"
                      >
                        -
                      </button>
                      <span className="text-xs font-mono text-slate-200 font-bold">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                        className="text-xs text-slate-400 hover:text-slate-100 px-1"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => onRemoveItem(item.product.id)}
                  className="p-1.5 text-slate-600 hover:text-rose-400 transition-colors"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer Order Summary */}
        {items.length > 0 && !orderComplete && (
          <div className="p-6 border-t border-slate-800 bg-slate-950 space-y-4">
            
            {/* Promo Code Input */}
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
                placeholder="PROMO CODE"
                className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs font-mono text-slate-200 uppercase focus:outline-none focus:border-rose-500"
              />
              <button
                onClick={() => setPromoApplied(promoCode === 'AURASKIN18')}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-mono font-bold transition-colors"
              >
                Apply
              </button>
            </div>

            {/* Calculations */}
            <div className="space-y-1.5 text-xs font-mono">
              <div className="flex justify-between text-slate-400">
                <span>Subtotal</span>
                <span>${subtotal}</span>
              </div>
              {promoApplied && (
                <div className="flex justify-between text-emerald-400">
                  <span>Prescription Bundle Savings (18%)</span>
                  <span>-${discount}</span>
                </div>
              )}
              <div className="flex justify-between text-slate-400">
                <span>Clinical Express Shipping</span>
                <span>{shipping === 0 ? 'FREE' : `$${shipping}`}</span>
              </div>
              <div className="pt-2 border-t border-slate-800 flex justify-between text-base font-bold text-slate-100">
                <span>Total Due</span>
                <span className="text-rose-300 font-mono">${total}</span>
              </div>
            </div>

            {/* Checkout Button */}
            <button
              onClick={handleCheckout}
              disabled={isCheckingOut}
              className="w-full flex items-center justify-center space-x-2 py-3.5 rounded-2xl bg-gradient-to-r from-rose-500 to-amber-500 hover:from-rose-400 hover:to-amber-400 disabled:opacity-50 text-slate-950 text-xs font-bold uppercase tracking-wider shadow-xl shadow-rose-500/25 transition-all"
            >
              {isCheckingOut ? (
                <span>Authorizing Order...</span>
              ) : (
                <>
                  <span>Instant 1-Click Checkout</span>
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>

            <div className="flex items-center justify-center space-x-2 text-[10px] text-slate-500 font-mono">
              <ShieldCheck className="h-3.5 w-3.5 text-slate-400" />
              <span>HIPAA Compliant • 30-Day Money-Back Guarantee</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
