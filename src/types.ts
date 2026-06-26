export type BillingCycle = 'monthly' | 'annual';

export type Currency = 'USD' | 'INR' | 'EUR';

export interface PricingPlan {
  id: string;
  name: string;
  priceMonthly: number;
  priceAnnual: number;
  description: string;
  features: string[];
  ctaText: string;
  badge?: string;
}

export interface FeatureItem {
  id: number;
  title: string;
  description: string;
  icon: string;
  details: string;
}
