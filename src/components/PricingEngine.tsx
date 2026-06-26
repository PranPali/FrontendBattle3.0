import React, { useEffect, useRef } from 'react';

// SPECIFIED PRICING MATRIX
const PRICING_MATRIX = {
  tiers: {
    starter: { baseMonthlyUSD: 29 },
    pro:     { baseMonthlyUSD: 79 },
    scale:   { baseMonthlyUSD: 199 },
  },
  billing: {
    monthly: { multiplier: 1 },
    annual:  { multiplier: 0.8 }, // 20% discount
  },
  currency: {
    USD: { symbol: '$', tariff: 1.00 },
    INR: { symbol: '₹', tariff: 83.5 },
    EUR: { symbol: '€', tariff: 0.92 },
  }
};

// SPECIFIED COMPUTE FUNCTION
function computePrice(tier: 'starter' | 'pro' | 'scale', billing: 'monthly' | 'annual', currency: 'USD' | 'INR' | 'EUR') {
  const base    = PRICING_MATRIX.tiers[tier].baseMonthlyUSD;
  const bMult   = PRICING_MATRIX.billing[billing].multiplier;
  const cMult   = PRICING_MATRIX.currency[currency].tariff;
  return Math.round(base * bMult * cMult);
}

interface PricingEngineProps {
  onPlanSelect: (planId: string, planName: string) => void;
}

export const PricingEngine: React.FC<PricingEngineProps> = ({ onPlanSelect }) => {
  // Direct DOM references for isolated state updates (No layout reflow or parent re-render)
  const starterPriceRef = useRef<HTMLSpanElement>(null);
  const proPriceRef = useRef<HTMLSpanElement>(null);
  const scalePriceRef = useRef<HTMLSpanElement>(null);

  const starterPeriodRef = useRef<HTMLSpanElement>(null);
  const proPeriodRef = useRef<HTMLSpanElement>(null);
  const scalePeriodRef = useRef<HTMLSpanElement>(null);

  const starterDetailRef = useRef<HTMLSpanElement>(null);
  const proDetailRef = useRef<HTMLSpanElement>(null);
  const scaleDetailRef = useRef<HTMLSpanElement>(null);

  // Buttons and selectors references
  const monthlyBtnRef = useRef<HTMLButtonElement>(null);
  const annualBtnRef = useRef<HTMLButtonElement>(null);
  const currencySelectRef = useRef<HTMLSelectElement>(null);

  // Keep track of current settings inside refs
  const currentBillingRef = useRef<'monthly' | 'annual'>('monthly');
  const currentCurrencyRef = useRef<'USD' | 'INR' | 'EUR'>('USD');

  const updatePricesAndDOM = () => {
    const billing = currentBillingRef.current;
    const currency = currentCurrencyRef.current;
    const symbol = PRICING_MATRIX.currency[currency].symbol;

    // Compute prices precisely
    const starterPrice = computePrice('starter', billing, currency);
    const proPrice = computePrice('pro', billing, currency);
    const scalePrice = computePrice('scale', billing, currency);

    const periodText = '/mo';

    // Direct innerText mutations (Isolates renders completely)
    if (starterPriceRef.current) starterPriceRef.current.innerText = starterPrice.toLocaleString();
    if (proPriceRef.current) proPriceRef.current.innerText = proPrice.toLocaleString();
    if (scalePriceRef.current) scalePriceRef.current.innerText = scalePrice.toLocaleString();

    if (starterPeriodRef.current) starterPeriodRef.current.innerText = periodText;
    if (proPeriodRef.current) proPeriodRef.current.innerText = periodText;
    if (scalePeriodRef.current) scalePeriodRef.current.innerText = periodText;

    // Billed as [X]/year text updates under Annual
    if (billing === 'annual') {
      const starterAnnual = starterPrice * 12;
      const proAnnual = proPrice * 12;
      const scaleAnnual = scalePrice * 12;

      if (starterDetailRef.current) starterDetailRef.current.innerText = `Billed as ${symbol}${starterAnnual.toLocaleString()}/year`;
      if (proDetailRef.current) proDetailRef.current.innerText = `Billed as ${symbol}${proAnnual.toLocaleString()}/year`;
      if (scaleDetailRef.current) scaleDetailRef.current.innerText = `Billed as ${symbol}${scaleAnnual.toLocaleString()}/year`;
    } else {
      if (starterDetailRef.current) starterDetailRef.current.innerText = 'Billed monthly';
      if (proDetailRef.current) proDetailRef.current.innerText = 'Billed monthly';
      if (scaleDetailRef.current) scaleDetailRef.current.innerText = 'Billed monthly';
    }
  };

  const handleBillingChange = (mode: 'monthly' | 'annual') => {
    if (currentBillingRef.current === mode) return;
    currentBillingRef.current = mode;

    // Modify active/inactive styles of toggle buttons directly
    if (mode === 'monthly') {
      monthlyBtnRef.current?.classList.add('bg-white', 'text-nocturnal-exp', 'shadow-sm');
      monthlyBtnRef.current?.classList.remove('text-secondary');
      
      annualBtnRef.current?.classList.remove('bg-white', 'text-nocturnal-exp', 'shadow-sm');
      annualBtnRef.current?.classList.add('text-secondary');
    } else {
      annualBtnRef.current?.classList.add('bg-white', 'text-nocturnal-exp', 'shadow-sm');
      annualBtnRef.current?.classList.remove('text-secondary');
      
      monthlyBtnRef.current?.classList.remove('bg-white', 'text-nocturnal-exp', 'shadow-sm');
      monthlyBtnRef.current?.classList.add('text-secondary');
    }

    updatePricesAndDOM();
  };

  const handleCurrencyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    currentCurrencyRef.current = e.target.value as 'USD' | 'INR' | 'EUR';
    
    // Update the currency symbol element displayed beside the numbers
    const symbolElements = document.querySelectorAll('.currency-symbol-display');
    const symbol = PRICING_MATRIX.currency[currentCurrencyRef.current].symbol;
    symbolElements.forEach((el) => {
      (el as HTMLElement).innerText = symbol;
    });

    updatePricesAndDOM();
  };

  // Run on mount to initialize values properly
  useEffect(() => {
    updatePricesAndDOM();
  }, []);

  return (
    <section className="py-24 px-4 bg-[#F1F6F4]" id="pricing">
      <div className="max-w-7xl mx-auto">
        {/* SECTION HEADER */}
        <div className="text-center mb-16">
          <span className="text-[11px] font-label-caps tracking-widest text-forsythia bg-nocturnal-exp py-1 px-3 rounded-full inline-block mb-3">
            Simple Billing
          </span>
          <h2 className="font-headline-md text-3xl md:text-4xl text-oceanic-noir mb-4 font-bold tracking-tight">
            Scalable Pricing for Every Stage
          </h2>
          <p className="font-body-md text-secondary max-w-lg mx-auto">
            Start free, scale with your data volume. No surprise overage charges.
          </p>

          {/* Pricing Controls Toggle & Currency */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-6">
            
            {/* Billing Cycle Selector */}
            <div className="flex items-center bg-mystic-mint/60 p-1 rounded-full w-fit relative shadow-inner border border-mystic-mint">
              <button
                ref={monthlyBtnRef}
                onClick={() => handleBillingChange('monthly')}
                className="relative px-6 py-2 rounded-full font-label-caps text-xs font-bold transition-all duration-150 cursor-pointer bg-white text-nocturnal-exp shadow-sm"
              >
                Monthly
              </button>
              <button
                ref={annualBtnRef}
                onClick={() => handleBillingChange('annual')}
                className="relative px-6 py-2 rounded-full font-label-caps text-xs font-bold transition-all duration-150 cursor-pointer text-secondary hover:text-nocturnal-exp"
              >
                Annual (-20%)
              </button>
            </div>

            {/* Currency Selector */}
            <div className="relative">
              <select
                ref={currencySelectRef}
                onChange={handleCurrencyChange}
                className="bg-white border border-mystic-mint hover:border-oceanic-noir rounded-full px-5 py-2 font-label-caps text-xs text-nocturnal-exp font-bold focus:ring-2 focus:ring-oceanic-noir focus:outline-none cursor-pointer transition-all duration-150"
                aria-label="Select currency"
                defaultValue="USD"
              >
                <option value="USD">USD ($)</option>
                <option value="INR">INR (₹)</option>
                <option value="EUR">EUR (€)</option>
              </select>
            </div>

          </div>
        </div>

        {/* PRICING CARDS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch pt-6">
          
          {/* STARTER CARD */}
          <div className="bg-white p-8 rounded-xl border border-mystic-mint flex flex-col justify-between h-full relative transition-all duration-300 hover:shadow-lg">
            <div>
              <span className="font-label-caps text-xs text-secondary tracking-widest block mb-4">
                Starter
              </span>

              <div className="mb-6 flex items-baseline gap-1">
                <span className="text-2xl font-bold font-mono text-oceanic-noir currency-symbol-display">$</span>
                <span ref={starterPriceRef} className="text-5xl font-extrabold font-mono text-oceanic-noir tracking-tight">
                  29
                </span>
                <span ref={starterPeriodRef} className="text-secondary font-body-md ml-1">/mo</span>
              </div>

              <span ref={starterDetailRef} className="block text-xs font-mono text-secondary mb-6 h-4">
                Billed monthly
              </span>

              <p className="font-body-md text-sm text-secondary leading-relaxed mb-8">
                Perfect for small projects and individual developers requiring basic sync schedules.
              </p>

              <div className="border-b border-mystic-mint mb-8" />

              <ul className="space-y-4 mb-10">
                <li className="flex items-start gap-3 text-sm text-oceanic-noir">
                  <span className="text-forsythia font-bold">✔</span>
                  <span>10,000 Operations/mo</span>
                </li>
                <li className="flex items-start gap-3 text-sm text-oceanic-noir">
                  <span className="text-forsythia font-bold">✔</span>
                  <span>5 Shared Projects</span>
                </li>
                <li className="flex items-start gap-3 text-sm text-oceanic-noir">
                  <span className="text-forsythia font-bold">✔</span>
                  <span>Basic Support</span>
                </li>
              </ul>
            </div>

            <button
              onClick={() => onPlanSelect('starter', 'Starter')}
              className="w-full font-bold py-3.5 px-6 rounded-full text-label-caps text-xs transition-all duration-150 border border-nocturnal-exp text-nocturnal-exp hover:bg-nocturnal-exp hover:text-white cursor-pointer"
            >
              Get Started
            </button>
          </div>

          {/* PRO CARD (MOST POPULAR) */}
          <div className="bg-white p-8 rounded-xl border-t-4 border-t-forsythia border-mystic-mint shadow-md scale-105 z-10 md:-translate-y-2 flex flex-col justify-between h-full relative transition-all duration-300 hover:shadow-xl">
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-forsythia text-nocturnal-exp px-4 py-1 rounded-full font-label-caps text-[10px] font-extrabold tracking-wider shadow-sm">
              MOST POPULAR
            </div>

            <div>
              <span className="font-label-caps text-xs text-secondary tracking-widest block mb-4 mt-1">
                Pro
              </span>

              <div className="mb-6 flex items-baseline gap-1">
                <span className="text-2xl font-bold font-mono text-oceanic-noir currency-symbol-display">$</span>
                <span ref={proPriceRef} className="text-5xl font-extrabold font-mono text-oceanic-noir tracking-tight">
                  79
                </span>
                <span ref={proPeriodRef} className="text-secondary font-body-md ml-1">/mo</span>
              </div>

              <span ref={proDetailRef} className="block text-xs font-mono text-secondary mb-6 h-4">
                Billed monthly
              </span>

              <p className="font-body-md text-sm text-secondary leading-relaxed mb-8">
                For growing engineering teams requiring advanced real-time orchestration & predictive rules.
              </p>

              <div className="border-b border-mystic-mint mb-8" />

              <ul className="space-y-4 mb-10">
                <li className="flex items-start gap-3 text-sm text-oceanic-noir">
                  <span className="text-forsythia font-bold">✔</span>
                  <span>100,000 Operations/mo</span>
                </li>
                <li className="flex items-start gap-3 text-sm text-oceanic-noir">
                  <span className="text-forsythia font-bold">✔</span>
                  <span>Unlimited Projects</span>
                </li>
                <li className="flex items-start gap-3 text-sm text-oceanic-noir">
                  <span className="text-forsythia font-bold">✔</span>
                  <span>Priority 24/7 Support</span>
                </li>
                <li className="flex items-start gap-3 text-sm text-oceanic-noir">
                  <span className="text-forsythia font-bold">✔</span>
                  <span>Predictive Scaling Engine</span>
                </li>
              </ul>
            </div>

            <button
              onClick={() => onPlanSelect('pro', 'Pro')}
              className="w-full font-bold py-3.5 px-6 rounded-full text-label-caps text-xs transition-all duration-150 bg-forsythia hover:bg-deep-saffron text-nocturnal-exp shadow-md cursor-pointer"
            >
              Upgrade to Pro
            </button>
          </div>

          {/* SCALE CARD */}
          <div className="bg-white p-8 rounded-xl border border-mystic-mint flex flex-col justify-between h-full relative transition-all duration-300 hover:shadow-lg">
            <div>
              <span className="font-label-caps text-xs text-secondary tracking-widest block mb-4">
                Scale
              </span>

              <div className="mb-6 flex items-baseline gap-1">
                <span className="text-2xl font-bold font-mono text-oceanic-noir currency-symbol-display">$</span>
                <span ref={scalePriceRef} className="text-5xl font-extrabold font-mono text-oceanic-noir tracking-tight">
                  199
                </span>
                <span ref={scalePeriodRef} className="text-secondary font-body-md ml-1">/mo</span>
              </div>

              <span ref={scaleDetailRef} className="block text-xs font-mono text-secondary mb-6 h-4">
                Billed monthly
              </span>

              <p className="font-body-md text-sm text-secondary leading-relaxed mb-8">
                Enterprise-grade performance with custom SLA, dedicated clusters, and compliance security.
              </p>

              <div className="border-b border-mystic-mint mb-8" />

              <ul className="space-y-4 mb-10">
                <li className="flex items-start gap-3 text-sm text-oceanic-noir">
                  <span className="text-forsythia font-bold">✔</span>
                  <span>1M+ Operations/mo</span>
                </li>
                <li className="flex items-start gap-3 text-sm text-oceanic-noir">
                  <span className="text-forsythia font-bold">✔</span>
                  <span>Dedicated Compute Clusters</span>
                </li>
                <li className="flex items-start gap-3 text-sm text-oceanic-noir">
                  <span className="text-forsythia font-bold">✔</span>
                  <span>SSO & Enterprise Governance</span>
                </li>
                <li className="flex items-start gap-3 text-sm text-oceanic-noir">
                  <span className="text-forsythia font-bold">✔</span>
                  <span>Dedicated Success Manager</span>
                </li>
              </ul>
            </div>

            <button
              onClick={() => onPlanSelect('scale', 'Scale')}
              className="w-full font-bold py-3.5 px-6 rounded-full text-label-caps text-xs transition-all duration-150 border border-nocturnal-exp text-nocturnal-exp hover:bg-nocturnal-exp hover:text-white cursor-pointer"
            >
              Contact Sales
            </button>
          </div>

        </div>
      </div>
    </section>
  );
};
