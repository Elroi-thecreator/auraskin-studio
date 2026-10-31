import { SkinConcernKey } from './youcam';

export interface ActiveIngredient {
  name: string;
  category: 'Exfoliant' | 'Antioxidant' | 'Hydrator' | 'Peptide / Anti-Aging' | 'Soothing / Barrier';
  concentration: string;
  benefits: string;
  targeted_concerns: SkinConcernKey[];
  mechanism: string;
}

export interface SkincareProduct {
  id: string;
  name: string;
  brand: string;
  step: 'Cleanse' | 'Treat' | 'Hydrate' | 'Protect';
  time: 'AM' | 'PM' | 'Both';
  price: number;
  originalPrice?: number;
  rating: number;
  reviewsCount: number;
  image: string;
  tagline: string;
  keyIngredients: string[];
  targetedConcerns: SkinConcernKey[];
  clinicalResultText: string;
}

export interface PersonaProfile {
  id: string;
  name: string;
  age: number;
  tagline: string;
  skinType: string;
  primaryIssues: string;
  avatarUrl: string;
  presetData: {
    skinScore: number;
    skinAge: number;
    concerns: Record<SkinConcernKey, { score: number; severity: 'low' | 'mild' | 'moderate' | 'high' | 'severe'; area: number }>;
  };
  vtoBeforeAfter: {
    cleanGirl: { vtoUrl: string; focus: string };
    goldenHour: { vtoUrl: string; focus: string };
    softSunset: { vtoUrl: string; focus: string };
    freshDew: { vtoUrl: string; focus: string };
  };
}

export interface CartItem {
  product: SkincareProduct;
  quantity: number;
}
