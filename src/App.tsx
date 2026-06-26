import { useState } from 'react';
import { HubIcon } from './components/HubIcon';
import { InteractiveBento } from './components/InteractiveBento';
import { PricingEngine } from './components/PricingEngine';
import { InteractiveModal } from './components/InteractiveModals';
import { trustedLogos } from './data';
import { MessageIcon, ShieldIcon, LinkExternalIcon, PlayIcon } from './components/Icons';

export default function App() {
  // Modal configurations
  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    title: string;
    type: 'signup' | 'sales' | 'demo';
    initialPlan?: string;
  }>({
    isOpen: false,
    title: '',
    type: 'signup'
  });

  const openModal = (type: 'signup' | 'sales' | 'demo', title: string, initialPlan?: string) => {
    setModalState({
      isOpen: true,
      title,
      type,
      initialPlan
    });
  };

  const closeModal = () => {
    setModalState(prev => ({ ...prev, isOpen: false }));
  };

  return (
    <div className="bg-arctic-powder text-nocturnal-exp font-sans overflow-x-hidden min-h-screen flex flex-col scroll-smooth">
      
      {/* HEADER / NAVIGATION */}
      <header className="fixed top-0 w-full z-40 bg-white/80 backdrop-blur-md border-b border-mystic-mint h-16">
        <nav className="flex justify-between items-center max-w-7xl mx-auto px-6 md:px-10 h-full">
          {/* Logo brand */}
          <div className="flex items-center gap-2.5">
            <HubIcon className="text-forsythia w-6 h-6" />
            <span className="font-headline-sm text-xl font-extrabold text-oceanic-noir tracking-tight">NexaFlow</span>
          </div>

          {/* Nav links */}
          <div className="hidden md:flex items-center gap-8">
            <a 
              href="#features" 
              className="text-secondary hover:text-oceanic-noir transition-colors font-label-caps text-xs tracking-wider"
            >
              Features
            </a>
            <a 
              href="#pricing" 
              className="text-secondary hover:text-oceanic-noir transition-colors font-label-caps text-xs tracking-wider"
            >
              Pricing
            </a>
            <a 
              href="#docs" 
              onClick={(e) => {
                e.preventDefault();
                openModal('demo', 'NexaFlow API Documentation');
              }}
              className="text-secondary hover:text-oceanic-noir transition-colors font-label-caps text-xs tracking-wider"
            >
              Documentation
            </a>
          </div>

          {/* Action button */}
          <button 
            onClick={() => openModal('signup', 'Initialize Your Free Workspace')}
            className="bg-forsythia hover:bg-deep-saffron text-nocturnal-exp font-bold py-2 px-5 rounded-full transition-all duration-150 active:scale-95 font-label-caps text-xs tracking-wider cursor-pointer shadow-sm"
          >
            Get Started
          </button>
        </nav>
      </header>

      {/* MAIN LAYOUT */}
      <main className="mt-16 flex-1">
        
        {/* HERO SECTION */}
        <section className="relative min-h-[660px] flex items-center justify-center py-20 px-6 overflow-hidden bg-gradient-to-b from-white to-[#F1F6F4]">
          {/* Background vector aesthetics */}
          <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none">
            <svg width="100%" height="100%" aria-hidden="true">
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#000" strokeWidth="1" />
              </pattern>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
          </div>

          <div className="relative z-10 max-w-4xl text-center flex flex-col items-center animate-entry">
            {/* Soft badge */}
            <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-mystic-mint/60 border border-mystic-mint text-nocturnal-exp font-label-caps text-xs font-semibold mb-8 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-deep-saffron animate-pulse" />
              v2.0 Orchestration Engine Now Live
            </div>

            {/* Display Header */}
            <h1 className="font-display-lg-mobile md:font-display-lg text-4xl md:text-6xl mb-8 text-oceanic-noir tracking-tight font-extrabold leading-[1.1] max-w-3xl">
              Precision Automation for the <span className="text-deep-saffron italic">Modern Enterprise.</span>
            </h1>

            {/* Sub-headline text */}
            <p className="font-body-lg text-base md:text-lg text-secondary mb-10 max-w-2xl mx-auto leading-relaxed">
              Orchestrate complex data workflows with AI-driven intelligence. Built for developers who demand high-performance execution, zero-latency feedback, and ironclad enterprise security standards.
            </p>

            {/* Action CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
              <button 
                onClick={() => openModal('signup', 'Initialize Workspace & Generate API Tokens')}
                className="w-full sm:w-auto bg-forsythia hover:bg-deep-saffron text-nocturnal-exp font-bold py-4 px-10 rounded-full font-label-caps text-xs tracking-widest shadow-lg transition-all active:scale-95 cursor-pointer"
              >
                Start Building Free
              </button>
              <button 
                onClick={() => openModal('demo', 'Live Cluster Sync Simulation')}
                className="w-full sm:w-auto border border-nocturnal-exp text-nocturnal-exp font-bold py-4 px-10 rounded-full font-label-caps text-xs tracking-widest hover:bg-nocturnal-exp hover:text-white transition-all active:scale-95 cursor-pointer flex items-center justify-center gap-2"
              >
                {/* Inline Play Icon */}
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polygon points="5 3 19 12 5 21 5 3" />
                </svg>
                View Demo
              </button>
            </div>
          </div>
        </section>

        {/* FEATURES (BENTO / ACCORDION) SECTION */}
        <section className="py-24 px-6 md:px-10 bg-white border-y border-mystic-mint" id="features">
          <InteractiveBento />
        </section>

        {/* SOCIAL PROOF / TRUSTED BY BRANDS SECTION */}
        <section className="py-20 bg-arctic-powder">
          <div className="max-w-7xl mx-auto px-6 md:px-10 text-center">
            <p className="font-label-caps text-xs text-secondary font-bold uppercase tracking-widest mb-10">
              Trusted by Engineering Teams At
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 items-center justify-items-center">
              {trustedLogos.map((logo, idx) => (
                <div 
                  key={idx} 
                  className="h-8 flex items-center justify-center filter grayscale contrast-125 opacity-40 hover:grayscale-0 hover:opacity-90 hover:contrast-100 transition-all duration-300"
                >
                  <img 
                    src={logo.url} 
                    alt={logo.name} 
                    referrerPolicy="no-referrer"
                    className="max-h-8 object-contain"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PRICING ENGINE SECTION */}
        <PricingEngine 
          onPlanSelect={(planId, planName) => {
            if (planId === 'scale') {
              openModal('sales', 'NexaFlow Enterprise: Custom Solution Request', planName);
            } else {
              openModal('signup', `Provision Workspace - ${planName} Plan`, planName);
            }
          }} 
        />

        {/* FINAL CALL TO ACTION */}
        <section className="py-24 px-6 md:px-10 bg-oceanic-noir text-white text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none" aria-hidden="true">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-forsythia rounded-full filter blur-[100px]" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-deep-saffron rounded-full filter blur-[100px]" />
          </div>

          <div className="relative z-10 max-w-3xl mx-auto">
            <h2 className="font-display-lg-mobile md:font-display-lg text-3xl md:text-5xl mb-6 font-bold tracking-tight text-white leading-tight">
              Ready to automate your future?
            </h2>
            <p className="text-secondary-fixed opacity-75 font-body-lg text-base md:text-lg mb-10 max-w-xl mx-auto leading-relaxed">
              Join 10,000+ developers building the next generation of highly automated, zero-latency data orchestration applications.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
              <button 
                onClick={() => openModal('signup', 'Initialize Your Free Workspace')}
                className="w-full sm:w-auto bg-forsythia text-nocturnal-exp hover:bg-deep-saffron font-bold py-4 px-10 rounded-full font-label-caps text-xs tracking-wider transition-all active:scale-95 cursor-pointer shadow-lg"
              >
                Build For Free
              </button>
              <button 
                onClick={() => openModal('sales', 'Schedule Architecture Brainstorm Session')}
                className="w-full sm:w-auto text-white border-b border-dashed border-forsythia hover:text-forsythia font-bold py-3.5 px-6 font-label-caps text-xs tracking-wider transition-all cursor-pointer flex items-center justify-center gap-1.5"
              >
                <MessageIcon className="w-4 h-4" />
                Talk to an Architect
              </button>
            </div>
          </div>
        </section>

      </main>

      {/* FOOTER SECTION */}
      <footer className="bg-oceanic-noir border-t border-white/5 text-slate-300">
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-16 grid grid-cols-1 md:grid-cols-4 gap-12">
          
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <HubIcon className="text-forsythia w-6 h-6" />
              <span className="font-headline-sm text-lg font-bold text-white tracking-tight">NexaFlow</span>
            </div>
            <p className="text-xs text-slate-400 max-w-xs leading-relaxed">
              High-performance AI data automation platform. Precision orchestration engine for the modern enterprise.
            </p>
          </div>

          <div>
            <h4 className="text-white font-label-caps text-xs tracking-wider mb-5">Product</h4>
            <ul className="space-y-3.5 text-xs text-slate-400">
              <li>
                <a href="#features" className="hover:text-forsythia transition-colors">
                  Features
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  onClick={(e) => { e.preventDefault(); openModal('demo', 'NexaFlow Enterprise Security Standards'); }}
                  className="hover:text-forsythia transition-colors flex items-center gap-1"
                >
                  <ShieldIcon className="w-3 h-3 text-forsythia" />
                  Security & SLA
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  onClick={(e) => { e.preventDefault(); openModal('demo', 'NexaFlow Multi-Node Cluster Configuration'); }}
                  className="hover:text-forsythia transition-colors"
                >
                  Cluster Nodes
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-label-caps text-xs tracking-wider mb-5">Company</h4>
            <ul className="space-y-3.5 text-xs text-slate-400">
              <li>
                <a 
                  href="#" 
                  onClick={(e) => { e.preventDefault(); openModal('sales', 'Apply to NexaFlow Engineering Team'); }}
                  className="hover:text-forsythia transition-colors"
                >
                  Careers
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  onClick={(e) => { e.preventDefault(); openModal('sales', 'Partner Program Integration'); }}
                  className="hover:text-forsythia transition-colors"
                >
                  Partners
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  onClick={(e) => { e.preventDefault(); openModal('sales', 'Contact Corporate Headquarters'); }}
                  className="hover:text-forsythia transition-colors"
                >
                  Contact HQ
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-label-caps text-xs tracking-wider mb-5">Enterprise Connect</h4>
            <ul className="space-y-3.5 text-xs text-slate-400">
              <li>
                <a 
                  href="#" 
                  onClick={(e) => { e.preventDefault(); openModal('demo', 'NexaFlow API Schema Documentation'); }}
                  className="hover:text-forsythia transition-colors flex items-center gap-1"
                >
                  API Spec 
                  <LinkExternalIcon className="w-3 h-3 text-forsythia" />
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  onClick={(e) => { e.preventDefault(); openModal('sales', 'Request Custom Governance Agreement'); }}
                  className="hover:text-forsythia transition-colors"
                >
                  Custom Terms
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  onClick={(e) => { e.preventDefault(); openModal('demo', 'Platform Compliance Statement'); }}
                  className="hover:text-forsythia transition-colors"
                >
                  SLA Status
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Sub-footer copyright */}
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-8 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-[11px] text-slate-500 text-center sm:text-left">
            © {new Date().getFullYear()} NexaFlow. All rights reserved. Precision automation for the modern enterprise.
          </p>
          <div className="flex gap-6 text-[11px] text-slate-500">
            <a 
              href="#" 
              onClick={(e) => { e.preventDefault(); openModal('demo', 'Privacy Statement'); }}
              className="hover:text-white transition-colors"
            >
              Privacy Policy
            </a>
            <a 
              href="#" 
              onClick={(e) => { e.preventDefault(); openModal('demo', 'Service Agreements'); }}
              className="hover:text-white transition-colors"
            >
              Terms of Service
            </a>
          </div>
        </div>
      </footer>

      {/* INTERACTIVE STATE DIALOG */}
      <InteractiveModal 
        isOpen={modalState.isOpen}
        onClose={closeModal}
        title={modalState.title}
        type={modalState.type}
        initialPlan={modalState.initialPlan}
      />

    </div>
  );
}
