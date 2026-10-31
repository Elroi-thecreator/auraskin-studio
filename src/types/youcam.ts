export type SkinConcernKey =
  | 'wrinkle'
  | 'pore'
  | 'texture'
  | 'acne'
  | 'spots'
  | 'redness'
  | 'oiliness'
  | 'dark_circle'
  | 'moisture'
  | 'radiance';

export interface SkinConcernDetail {
  score: number; // 0 - 100 (higher = healthier or normalized)
  severity: 'low' | 'mild' | 'moderate' | 'high' | 'severe';
  area_coverage_pct: number;
  description: string;
  heatmap_mask_url?: string;
  overlay_color: string;
}

export interface YouCamSkinAnalysisResult {
  task_id: string;
  task_status: 'pending' | 'processing' | 'success' | 'error';
  execution_mode: 'live_api' | 'demo_simulation';
  skin_score: number; // 0-100 overall health
  skin_age: number; // biological skin age estimate
  chronological_age?: number;
  concerns: Record<SkinConcernKey, SkinConcernDetail>;
  primary_concerns: SkinConcernKey[];
  overlay_masks?: {
    all?: string;
    wrinkles?: string;
    pores?: string;
    redness?: string;
    blemishes?: string;
  };
  processed_at: string;
}

export interface YouCamVtoLookOption {
  id: string;
  template_id: string;
  name: string;
  subtitle: string;
  badge: string;
  description: string;
  finish: 'Dewy' | 'Velvet Matte' | 'Radiant Satin' | 'Natural';
  tags: string[];
  swatch_colors: string[];
  applied_products: {
    category: string;
    name: string;
    shade: string;
    benefit: string;
  }[];
}

export interface YouCamVtoResult {
  task_id: string;
  task_status: 'pending' | 'processing' | 'success' | 'error';
  execution_mode: 'live_api' | 'demo_simulation';
  look_id: string;
  look_name: string;
  result_image_url: string;
  original_image_url: string;
  processed_at: string;
}
