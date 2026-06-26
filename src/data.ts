import { PricingPlan, FeatureItem } from './types';

export const pricingPlans: PricingPlan[] = [
  {
    id: 'starter',
    name: 'Starter',
    priceMonthly: 29,
    priceAnnual: 23, // 20% discount computed is 23 (29 * 0.8 ≈ 23.2)
    description: 'Perfect for small projects and individual developers.',
    features: [
      '10,000 Operations/mo',
      '5 Shared Projects',
      'Basic Support'
    ],
    ctaText: 'Get Started'
  },
  {
    id: 'pro',
    name: 'Pro',
    priceMonthly: 79,
    priceAnnual: 63, // 79 * 0.8 ≈ 63.2
    description: 'For growing teams requiring advanced orchestration.',
    features: [
      '100,000 Operations/mo',
      'Unlimited Projects',
      'Priority 24/7 Support',
      'Predictive Scaling'
    ],
    ctaText: 'Upgrade to Pro',
    badge: 'MOST POPULAR'
  },
  {
    id: 'scale',
    name: 'Scale',
    priceMonthly: 199,
    priceAnnual: 159, // 199 * 0.8 ≈ 159.2
    description: 'Enterprise-grade performance and security controls.',
    features: [
      '1M+ Operations/mo',
      'Dedicated Compute',
      'SSO & Advanced Security',
      'Dedicated Success Manager'
    ],
    ctaText: 'Contact Sales'
  }
];

export const currencyRates = {
  USD: { symbol: '$', rate: 1.0 },
  INR: { symbol: '₹', rate: 83.5 },
  EUR: { symbol: '€', rate: 0.92 }
};

export const featuresList: FeatureItem[] = [
  {
    id: 0,
    title: 'Universal Sync',
    description: 'Connect 200+ sources with sub-millisecond latency. Proprietary algorithms ensure global data integrity.',
    icon: 'sync',
    details: 'Our synchronization pipeline operates via a multi-threaded parallel execution model, maintaining atomic transactional boundaries during bulk mutations.'
  },
  {
    id: 1,
    title: 'Predictive Scaling',
    description: 'AI-driven auto-scaling that anticipates load spikes before they happen, saving up to 40% in compute costs.',
    icon: 'trending_up',
    details: 'By analyzing ingestion velocities and sequence patterns over historical windows, NexaFlow dynamically sizes worker sets in anticipation of peaks.'
  },
  {
    id: 2,
    title: 'Deep Observability',
    description: 'End-to-end lineage tracking with real-time health metrics and automated alerting for every data node.',
    icon: 'bar_chart',
    details: 'Granular tracing spans every stage of transformation, visualizing topological dependency graphs and isolating latency bottlenecks instantly.'
  },
  {
    id: 3,
    title: 'Enterprise Governance',
    description: 'SOC2, GDPR, and HIPAA compliant with fine-grained RBAC and automated PII masking built into the core engine.',
    icon: 'lock',
    details: 'Enforce security compliance policies programmatically. Sensitive attributes are encrypted and hashed before hitting cloud persistence layers.'
  }
];

export const trustedLogos = [
  {
    name: 'AlphaCloud',
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBYZB1OmmywMdSRKYnFvun9yj414db70YQGjx0xRfpMQOI1jMw_9pLjU0g7v_4-WDLTDY6UXyTnW2Cx8GFt6s7M683eAGOribMvNDIr3T3U8DOPuwEDe05b_Gc7x1NZc4TknlcaN7FLTwa5XAQuUkCQO7_8Y3H9-ULmTy2N0o-gj4P25vKfINUq5I9Zt3_HJArTKrqjX5W93r4f6x0EvKDBvpvf_WA6cBKcXjX0YSBTd9UfN1LOJdWwGLxXgIxtjclMX13KwW5lE3qw'
  },
  {
    name: 'MetricData',
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDPsA0R7qBUDtHc13kxmJPrr0D_wI4KZDQnnk0DNhZD0AEGYc3rQ5Fa58lxCQmJvXmg4ehY0Zuk9YBTKtxLbfzGuKfVEQOfRz2PnBSk_L-RyqLK84Jl6GmkqYM-5M7OvQoKF4fvV6eL_STgU7IStjL3O6bmXc283xAnTdookq36hzvKG32A-yCHyojazKvivCl3y4tJGnWReUiwPwAZ3sHYFDo-iMjW40EezG_5KsdRy8ndQ3UcCu6OGfKmYVVWbjCPDZnNBvc5Jv34'
  },
  {
    name: 'NeuralLabs',
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC4KLpCQ5ziiIhP-iNsHvMHYiuAy4lHXE5GcbdklgxRdpqM_2o26J1I6pxhQr25Eg0tDmesz8sCXyfcroLT7sR4J8bsgGaGWl8B8JsPEn5TebyCKL7wDVJlKHJ7VQ3JQhAz3M9pm4eZaslz79nRsHnufXFkIs2TmZMyq_f-Fmnbw99bNj-JbZXMGwYDfcptfeayqaVyvpAbRaZrZuhw0L8wRO89e82dbtO52IRf1PNoQzcVUxWf3A0oV_ZGJVDZrZXF-gEFAgKlP58c'
  },
  {
    name: 'AuraPay',
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDFsbZzmXnjOVm02I5uPElDfLnMUUzrCwoKhZ-0bhlo2rwgPGxKIhgjW1XQhTVS04ZECQ9dSC6MJLzMZID46l2KFBugHADXVG0zwH7h98Xw199MdeT3VdHZoK6dPCr7poH3v-EGT03Jr0Ng-uYqpBd9MMTvWftQ3Ep2aw_tN8XvTt6ma40j7jWR5JHb_ibJwBKo4ZGOyBNdZFaU_RIAQngZmiYIz-NKZF7y9IVWXko83uZNGTpdqI6NB9EwCQ7DATS-FRhgHazmi2vf'
  }
];

export const syncSources = [
  { id: 'postgres', label: 'PostgreSQL', icon: 'database' },
  { id: 'mongodb', label: 'MongoDB', icon: 'file-text' },
  { id: 'salesforce', label: 'Salesforce', icon: 'cloud' },
  { id: 'mysql', label: 'MySQL', icon: 'database' }
];

export const syncDestinations = [
  { id: 'snowflake', label: 'Snowflake', icon: 'snowflake' },
  { id: 'bigquery', label: 'BigQuery', icon: 'bar-chart' },
  { id: 'clickhouse', label: 'ClickHouse', icon: 'zap' },
  { id: 'redshift', label: 'Redshift', icon: 'hard-drive' }
];
