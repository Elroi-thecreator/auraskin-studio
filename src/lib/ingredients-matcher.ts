import { ACTIVE_INGREDIENTS_DB, CURATED_PRODUCTS_CATALOG } from './mock-data';
import { ActiveIngredient, SkincareProduct } from '@/types/skincare';
import { SkinConcernKey, YouCamSkinAnalysisResult } from '@/types/youcam';

export interface RecommendedRegimen {
  primaryConcerns: SkinConcernKey[];
  activeIngredients: ActiveIngredient[];
  amRoutine: SkincareProduct[];
  pmRoutine: SkincareProduct[];
  bundlePrice: number;
  originalBundlePrice: number;
  discountPercentage: number;
  fourWeekProjection: {
    week: number;
    label: string;
    projectedSkinScore: number;
    keyMilestone: string;
    cellularAction: string;
  }[];
}

export function matchIngredientsAndRegimen(diagnostic: YouCamSkinAnalysisResult): RecommendedRegimen {
  const topConcerns = diagnostic.primary_concerns || ['redness', 'pore', 'wrinkle'];

  // 1. Filter matching active ingredients
  const matchedIngredients = ACTIVE_INGREDIENTS_DB.filter((ing) =>
    ing.targeted_concerns.some((c) => topConcerns.includes(c))
  );

  // Fallback to top 4 if fewer matched
  const activeIngredients = matchedIngredients.length >= 3 ? matchedIngredients.slice(0, 4) : ACTIVE_INGREDIENTS_DB.slice(0, 4);

  // 2. Curate AM and PM Routine from catalog
  const amRoutine: SkincareProduct[] = [];
  const pmRoutine: SkincareProduct[] = [];

  // AM Cleanser
  const cleanser = CURATED_PRODUCTS_CATALOG.find((p) => p.step === 'Cleanse') || CURATED_PRODUCTS_CATALOG[0];
  amRoutine.push(cleanser);
  pmRoutine.push(cleanser);

  // AM Treatment (e.g. Niacinamide or Vitamin C)
  const amTreatment = CURATED_PRODUCTS_CATALOG.find((p) => p.step === 'Treat' && (p.time === 'AM' || p.time === 'Both')) || CURATED_PRODUCTS_CATALOG[1];
  amRoutine.push(amTreatment);

  // PM Treatment (e.g. Retinal or Active Repair)
  const pmTreatment = CURATED_PRODUCTS_CATALOG.find((p) => p.step === 'Treat' && (p.time === 'PM' || p.time === 'Both')) || CURATED_PRODUCTS_CATALOG[2];
  pmRoutine.push(pmTreatment);

  // Barrier Hydration Cream (Both)
  const barrierCream = CURATED_PRODUCTS_CATALOG.find((p) => p.step === 'Hydrate') || CURATED_PRODUCTS_CATALOG[3];
  amRoutine.push(barrierCream);
  pmRoutine.push(barrierCream);

  // AM SPF Shield
  const spf = CURATED_PRODUCTS_CATALOG.find((p) => p.step === 'Protect') || CURATED_PRODUCTS_CATALOG[4];
  amRoutine.push(spf);

  // Optional PM Eye serum if dark circle or wrinkle is a concern
  if (topConcerns.includes('dark_circle') || topConcerns.includes('wrinkle')) {
    const eyeSerum = CURATED_PRODUCTS_CATALOG.find((p) => p.id === 'prod-caffeine-eye-serum');
    if (eyeSerum) pmRoutine.push(eyeSerum);
  }

  // Calculate pricing & bundle discounts
  const uniqueProducts = Array.from(new Set([...amRoutine, ...pmRoutine]));
  const originalBundlePrice = uniqueProducts.reduce((sum, p) => sum + (p.originalPrice || p.price), 0);
  const bundlePrice = Math.round(originalBundlePrice * 0.82); // 18% bundle savings

  // 3. Generate 4-Week Projection based on starting skin score
  const baseScore = diagnostic.skin_score || 70;
  const fourWeekProjection = [
    {
      week: 1,
      label: 'Week 1: Barrier Stabilization',
      projectedSkinScore: Math.min(100, Math.round(baseScore + 4)),
      keyMilestone: 'Immediate reduction in epidermal tightness, redness, and micro-flaking.',
      cellularAction: 'Stratum corneum lipid reconstruction with bio-identical ceramides and CICA.',
    },
    {
      week: 2,
      label: 'Week 2: Cellular Turnover Boost',
      projectedSkinScore: Math.min(100, Math.round(baseScore + 10)),
      keyMilestone: 'Follicular sebum balance restored; 28% reduction in visible pore congestion.',
      cellularAction: 'Niacinamide suppresses excessive sebocyte lipid synthesis.',
    },
    {
      week: 3,
      label: 'Week 3: Dermal Matrix Synthesis',
      projectedSkinScore: Math.min(100, Math.round(baseScore + 16)),
      keyMilestone: 'Smoothing of static expression lines; diminished periorbital shadow depth.',
      cellularAction: 'Retinaldehyde accelerates dermal collagen I & III gene expression.',
    },
    {
      week: 4,
      label: 'Week 4: Peak Clinical Radiance',
      projectedSkinScore: Math.min(100, Math.round(baseScore + 22)),
      keyMilestone: 'Biological skin age index reduced by an average of -3.2 years.',
      cellularAction: 'Optimized epidermal light refractivity and continuous antioxidant defense.',
    },
  ];

  return {
    primaryConcerns: topConcerns,
    activeIngredients,
    amRoutine,
    pmRoutine,
    bundlePrice,
    originalBundlePrice,
    discountPercentage: 18,
    fourWeekProjection,
  };
}
