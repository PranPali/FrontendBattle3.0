import React, { useState, useEffect, useRef } from 'react';

export const InteractiveBento: React.FC = () => {
  // Common Accordion Index
  const [activeAccordionIndex, setActiveAccordionIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Store the last hovered bento node index in a ref for context locking
  const activeDesktopIndexRef = useRef<number | null>(null);

  // Bento Feature 1: Universal Sync states
  const [syncSource, setSyncSource] = useState('postgres');
  const [syncDest, setSyncDest] = useState('snowflake');
  const [isSyncRunning, setIsSyncRunning] = useState(false);
  const [syncMessages, setSyncMessages] = useState<string[]>([]);

  // Bento Feature 2: Predictive Scaling states
  const [isPeakTriggered, setIsPeakTriggered] = useState(false);
  const [activeWorkers, setActiveWorkers] = useState(4);
  const [cpuLoad, setCpuLoad] = useState(32);

  // Bento Feature 3: Deep Observability states
  const [selectedNode, setSelectedNode] = useState<string | null>('worker-02');
  const [networkLatency, setNetworkLatency] = useState(0.8);

  // Bento Feature 4: Enterprise Governance states
  const [isPIIMaskingEnabled, setIsPIIMaskingEnabled] = useState(true);

  // Trigger simulated peak loads
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPeakTriggered) {
      setActiveWorkers(12);
      setCpuLoad(78);
      timer = setTimeout(() => {
        setIsPeakTriggered(false);
        setActiveWorkers(4);
        setCpuLoad(32);
      }, 5000);
    }
    return () => clearTimeout(timer);
  }, [isPeakTriggered]);

  // Context lock Resize Observer implementation
  useEffect(() => {
    const observer = new ResizeObserver((entries) => {
      if (!entries || entries.length === 0) return;
      const width = entries[0].contentRect.width;
      if (width < 768 && activeDesktopIndexRef.current !== null) {
        const targetIndex = activeDesktopIndexRef.current;
        setActiveAccordionIndex(targetIndex);
        
        // Smooth scroll that accordion item into view seamlessly
        setTimeout(() => {
          const element = document.getElementById(`accordion-item-${targetIndex}`);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
          }
        }, 80);
      }
    });
    
    observer.observe(document.body);
    return () => {
      observer.disconnect();
    };
  }, []);

  const handleBentoHover = (index: number | null) => {
    activeDesktopIndexRef.current = index;
    setHoveredIndex(index);
  };

  const handleRunSync = () => {
    if (isSyncRunning) return;
    setIsSyncRunning(true);
    setSyncMessages([]);
    
    const logs = [
      `Initializing ${syncSource} extraction stream...`,
      'Authenticating secure handshake...',
      `Buffer loaded successfully (54.2 MB/s)`,
      `Piping stream to ${syncDest}...`,
      'Optimizing transactional indices...',
      '🚀 Pipeline connected. Data flow is live.'
    ];

    logs.forEach((log, index) => {
      setTimeout(() => {
        setSyncMessages(prev => [...prev, log]);
        if (index === logs.length - 1) {
          setIsSyncRunning(false);
        }
      }, (index + 1) * 350);
    });
  };

  return (
    <div className="max-w-7xl mx-auto">
      {/* SECTION HEADER */}
      <div className="mb-16">
        <span className="text-[11px] font-label-caps tracking-widest text-forsythia bg-nocturnal-exp py-1 px-3 rounded-full inline-block mb-3">
          Architecture Core
        </span>
        <h2 className="font-headline-md text-3xl md:text-4xl text-oceanic-noir mb-4 font-bold tracking-tight">
          Architected for Speed
        </h2>
        <p className="font-body-md text-base md:text-lg text-secondary">
          The tools you need to master your data stream with real-time feedback loops.
        </p>
      </div>

      {/* DESKTOP BENTO GRID (Visible on screens md and larger) */}
      <div className="hidden md:grid grid-cols-12 gap-6" id="feature-bento">
        
        {/* Feature 1: Universal Sync (Spans 8 columns) */}
        <div 
          className={`col-span-8 bg-mystic-mint/45 p-10 rounded-xl flex flex-col justify-between border transition-all duration-300 shadow-sm relative overflow-hidden group min-h-[460px] ${
            hoveredIndex === 0 ? 'bento-node--active border-forsythia bg-mystic-mint/60 -translate-y-1' : 'border-secondary-container'
          }`}
          data-index="0"
          onMouseEnter={() => handleBentoHover(0)}
          onMouseLeave={() => handleBentoHover(null)}
        >
          <div className="max-w-xl">
            <div className="flex items-center gap-3 mb-6">
              <span className="p-2.5 bg-white/70 rounded-lg text-oceanic-noir">
                {/* Sync / Refresh Icon */}
                <svg className="w-6 h-6 animate-spin-slow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67"/>
                </svg>
              </span>
              <h3 className="font-headline-sm text-2xl text-oceanic-noir font-bold">Universal Sync Engine</h3>
            </div>
            <p className="font-body-md text-on-secondary-container text-secondary mb-6 leading-relaxed">
              Seamlessly connect over 200+ data sources with sub-millisecond latency. Our proprietary sync algorithm ensures strict transactional consistency across globally distributed storage clusters.
            </p>

            {/* Configurator */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-[10px] font-label-caps text-secondary mb-1.5">Source Connector</label>
                <div className="flex gap-1.5">
                  {['postgres', 'mongodb', 'salesforce'].map((src) => (
                    <button
                      key={src}
                      onClick={() => setSyncSource(src)}
                      className={`flex-1 text-xs py-1.5 px-2.5 rounded font-label-caps border transition-all ${
                        syncSource === src 
                        ? 'bg-oceanic-noir text-white border-oceanic-noir' 
                        : 'bg-white/50 hover:bg-white text-secondary border-mystic-mint'
                      }`}
                    >
                      {src === 'postgres' ? 'PG' : src === 'mongodb' ? 'Mongo' : 'SF'}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-label-caps text-secondary mb-1.5">Destination Warehouse</label>
                <div className="flex gap-1.5">
                  {['snowflake', 'bigquery', 'clickhouse'].map((dst) => (
                    <button
                      key={dst}
                      onClick={() => setSyncDest(dst)}
                      className={`flex-1 text-xs py-1.5 px-2.5 rounded font-label-caps border transition-all ${
                        syncDest === dst 
                        ? 'bg-oceanic-noir text-white border-oceanic-noir' 
                        : 'bg-white/50 hover:bg-white text-secondary border-mystic-mint'
                      }`}
                    >
                      {dst === 'snowflake' ? 'Snow' : dst === 'bigquery' ? 'BQ' : 'Click'}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Code Console */}
          <div className="bg-oceanic-noir text-white rounded-lg p-5 font-mono text-xs border border-white/10 shadow-inner flex flex-col justify-between min-h-[160px]">
            <div>
              <div className="flex justify-between items-center text-[10px] text-white/40 mb-3 border-b border-white/5 pb-2">
                <span>TERMINAL REPL</span>
                <span className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  Active Stream
                </span>
              </div>
              <div className="text-emerald-400 select-all font-code-snippet">
                <span className="text-white/50">$</span> nexaflow sync --source={syncSource} --dest={syncDest} --real-time
              </div>
            </div>

            <div className="mt-3 min-h-[48px] text-[11px] text-white/75 font-mono">
              {syncMessages.length === 0 ? (
                <div className="text-white/40 italic">Select options and click "Run Ingest Stream" below to test payload.</div>
              ) : (
                <div className="space-y-0.5">
                  {syncMessages.slice(-2).map((msg, i) => (
                    <div key={i} className="flex gap-1.5 items-center">
                      <span className="text-emerald-500">✔</span>
                      <span>{msg}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="flex justify-end mt-4 pt-2 border-t border-white/5">
              <button
                onClick={handleRunSync}
                disabled={isSyncRunning}
                className="bg-forsythia hover:bg-deep-saffron text-oceanic-noir px-4 py-1.5 rounded font-label-caps text-[11px] font-bold flex items-center gap-1.5 disabled:opacity-40 transition-all cursor-pointer"
              >
                {isSyncRunning ? 'Syncing...' : 'Run Ingest Stream'}
              </button>
            </div>
          </div>
        </div>

        {/* Feature 2: Predictive Scaling (Spans 4 columns) */}
        <div 
          className={`col-span-4 bg-white p-8 rounded-xl border transition-all duration-300 shadow-sm flex flex-col justify-between group min-h-[460px] ${
            hoveredIndex === 1 ? 'bento-node--active border-forsythia bg-mystic-mint/10 -translate-y-1' : 'border-secondary-container'
          }`}
          data-index="1"
          onMouseEnter={() => handleBentoHover(1)}
          onMouseLeave={() => handleBentoHover(null)}
        >
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="p-2 bg-forsythia/20 rounded text-oceanic-noir">
                {/* Trending Arrow icon */}
                <svg className="w-6 h-6 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/>
                  <polyline points="17 6 23 6 23 12"/>
                </svg>
              </span>
              <h3 className="font-headline-sm text-lg text-oceanic-noir font-bold">Predictive Scaling</h3>
            </div>
            <p className="font-body-md text-sm text-secondary leading-relaxed mb-6">
              AI-driven auto-scaling that anticipates stream spikes before they happen, slashing waste up to 40% in infrastructure costs.
            </p>

            {/* Real-time stats */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              <div className="p-3 bg-arctic-powder rounded border border-mystic-mint/50">
                <span className="block text-[10px] font-label-caps text-secondary mb-1">Active Clusters</span>
                <span className="font-mono text-lg font-bold text-oceanic-noir">{activeWorkers} Nodes</span>
              </div>
              <div className="p-3 bg-arctic-powder rounded border border-mystic-mint/50">
                <span className="block text-[10px] font-label-caps text-secondary mb-1">Compute Load</span>
                <span className="font-mono text-lg font-bold text-oceanic-noir">{cpuLoad}%</span>
              </div>
            </div>
          </div>

          {/* Inline SVG Live Scaling Graph */}
          <div className="h-28 bg-arctic-powder rounded-lg border border-mystic-mint/40 relative overflow-hidden flex flex-col justify-end p-2 group-hover:border-primary/20 transition-all">
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 40" preserveAspectRatio="none">
              <line x1="0" y1="10" x2="100" y2="10" stroke="#000" strokeOpacity="0.03" strokeWidth="0.5" />
              <line x1="0" y1="20" x2="100" y2="20" stroke="#000" strokeOpacity="0.03" strokeWidth="0.5" />
              <line x1="0" y1="30" x2="100" y2="30" stroke="#000" strokeOpacity="0.03" strokeWidth="0.5" />

              <path
                d={isPeakTriggered 
                  ? "M 0 35 Q 20 38 40 10 T 80 8 T 100 32" 
                  : "M 0 32 Q 25 30 50 33 T 100 32"
                }
                fill="none"
                stroke="#114C5A"
                strokeWidth="1.5"
                className="transition-all duration-1000"
              />

              <path
                d={isPeakTriggered 
                  ? "M 0 30 Q 20 33 40 6 T 80 5 T 100 28" 
                  : "M 0 28 Q 25 26 50 28 T 100 27"
                }
                fill="none"
                stroke="#FFC801"
                strokeWidth="1.5"
                strokeDasharray="2,2"
                className="transition-all duration-1000"
              />
            </svg>

            <div className="relative flex justify-between items-center text-[10px] font-mono text-secondary z-10 bg-white/80 p-1.5 rounded shadow-sm border border-mystic-mint/30">
              <span className="flex items-center gap-1">
                <span className={`w-1.5 h-1.5 rounded-full ${isPeakTriggered ? 'bg-amber-500 animate-ping' : 'bg-emerald-500'}`}></span>
                {isPeakTriggered ? 'Anticipating Load...' : 'Steady Flow'}
              </span>
              <span>SLA Target: 99.99%</span>
            </div>
          </div>

          <button
            onClick={() => setIsPeakTriggered(true)}
            className="mt-4 w-full bg-arctic-powder border border-mystic-mint hover:border-oceanic-noir hover:bg-white text-oceanic-noir py-2 px-4 rounded text-xs font-label-caps transition-all text-center cursor-pointer"
          >
            Simulate Load Spike (Workload Peak)
          </button>
        </div>

        {/* Feature 3: Deep Observability (Spans 4 columns) */}
        <div 
          className={`col-span-4 bg-white p-8 rounded-xl border transition-all duration-300 shadow-sm flex flex-col justify-between group min-h-[460px] ${
            hoveredIndex === 2 ? 'bento-node--active border-forsythia bg-mystic-mint/10 -translate-y-1' : 'border-secondary-container'
          }`}
          data-index="2"
          onMouseEnter={() => handleBentoHover(2)}
          onMouseLeave={() => handleBentoHover(null)}
        >
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="p-2 bg-nocturnal-exp/10 rounded text-oceanic-noir">
                {/* Pie Chart icon */}
                <svg className="w-6 h-6 text-nocturnal-exp" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21.21 15.89A10 10 0 1 1 8 2.83"/>
                  <path d="M22 12A10 10 0 0 0 12 2v10z"/>
                </svg>
              </span>
              <h3 className="font-headline-sm text-lg text-oceanic-noir font-bold">Deep Observability</h3>
            </div>
            <p className="font-body-md text-sm text-secondary leading-relaxed mb-6">
              Full lineage tracing across globally distributed micro-nodes with automated threshold alerts.
            </p>

            {/* Interactive Node Map */}
            <div className="p-4 bg-arctic-powder rounded-lg border border-mystic-mint/40 space-y-4">
              <div className="text-[10px] font-label-caps text-secondary mb-2 flex justify-between">
                <span>CLUSTER MAP</span>
                <span className="text-primary font-bold">Click node to inspect</span>
              </div>
              
              <div className="flex items-center justify-between gap-2 relative">
                <div className="absolute top-1/2 left-4 right-4 h-0.5 bg-mystic-mint z-0"></div>

                {/* DB Node */}
                <button
                  onClick={() => { setSelectedNode('postgres-db'); setNetworkLatency(0.42); }}
                  className={`w-10 h-10 rounded-full flex items-center justify-center z-10 transition-all ${
                    selectedNode === 'postgres-db' 
                      ? 'bg-oceanic-noir text-white scale-110 ring-2 ring-forsythia' 
                      : 'bg-white hover:bg-mystic-mint border border-mystic-mint text-secondary'
                  }`}
                  title="Source DB Node"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <ellipse cx="12" cy="5" rx="9" ry="3"></ellipse>
                    <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path>
                    <path d="M3 12c0 1.66 4 3 9 3s9-1.34 9-3"></path>
                  </svg>
                </button>

                {/* Ingestion Worker Node */}
                <button
                  onClick={() => { setSelectedNode('worker-02'); setNetworkLatency(0.81); }}
                  className={`w-10 h-10 rounded-full flex items-center justify-center z-10 transition-all ${
                    selectedNode === 'worker-02' 
                      ? 'bg-oceanic-noir text-white scale-110 ring-2 ring-forsythia' 
                      : 'bg-white hover:bg-mystic-mint border border-mystic-mint text-secondary'
                  }`}
                  title="Worker Node"
                >
                  {/* Isometric 3D Cube */}
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
                    <polyline points="3.27 6.96 12 12.01 20.73 6.96"/>
                    <line x1="12" y1="22.08" x2="12" y2="12"/>
                  </svg>
                </button>

                {/* Analytics Warehouse */}
                <button
                  onClick={() => { setSelectedNode('warehouse-sf'); setNetworkLatency(1.12); }}
                  className={`w-10 h-10 rounded-full flex items-center justify-center z-10 transition-all ${
                    selectedNode === 'warehouse-sf' 
                      ? 'bg-oceanic-noir text-white scale-110 ring-2 ring-forsythia' 
                      : 'bg-white hover:bg-mystic-mint border border-mystic-mint text-secondary'
                  }`}
                  title="Warehouse Node"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="8" rx="2" ry="2"/>
                    <rect x="2" y="14" width="20" height="8" rx="2" ry="2"/>
                    <line x1="6" y1="6" x2="6" y2="6"/>
                    <line x1="6" y1="18" x2="6" y2="18"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Live Node Telemetry readout */}
          <div className="p-3 bg-oceanic-noir rounded border border-white/5 font-mono text-[11px] text-white space-y-1.5">
            <div className="flex justify-between border-b border-white/5 pb-1">
              <span className="text-white/40">Node Selected:</span>
              <span className="text-forsythia">{selectedNode || 'N/A'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-white/40">Status:</span>
              <span className="text-emerald-400">ACTIVE</span>
            </div>
            <div className="flex justify-between">
              <span className="text-white/40">Latency RTT:</span>
              <span className="text-white font-bold">{networkLatency} ms</span>
            </div>
          </div>
        </div>

        {/* Feature 4: Enterprise Governance (Spans 8 columns) */}
        <div 
          className={`col-span-8 bg-oceanic-noir text-white p-10 rounded-xl flex items-center justify-between border transition-all duration-300 shadow-lg relative overflow-hidden group min-h-[460px] ${
            hoveredIndex === 3 ? 'bento-node--active border-forsythia bg-oceanic-noir/90 -translate-y-1' : 'border-white/10'
          }`}
          data-index="3"
          onMouseEnter={() => handleBentoHover(3)}
          onMouseLeave={() => handleBentoHover(null)}
        >
          <div className="max-w-md flex-1 z-10 flex flex-col justify-between h-full">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <span className="p-2.5 bg-white/10 rounded-lg text-forsythia">
                  {/* Gear / Cog icon */}
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="3"/>
                    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
                  </svg>
                </span>
                <h3 className="font-headline-sm text-2xl mb-1">Enterprise Governance</h3>
              </div>
              <p className="text-secondary-fixed opacity-75 font-body-md text-sm leading-relaxed mb-6">
                SOC2, GDPR, and HIPAA compliant. Automated zero-trust credential rotation and sensitive data masking are built directly into the kernel level.
              </p>
            </div>

            {/* Compliance Selector Demo */}
            <div className="bg-white/5 rounded-lg p-5 border border-white/10 space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-xs font-label-caps text-white/60">PII Redaction Engine</span>
                <span className="text-[11px] font-mono text-forsythia">
                  {isPIIMaskingEnabled ? '🛡️ FULL MASKING ACTIVE' : '⚠ PLAIN TEXT WARNING'}
                </span>
              </div>

              {/* Masking toggle */}
              <div className="flex items-center justify-between gap-4">
                <span className="text-xs text-white/80">Automated SSN & Email Hashing</span>
                <button
                  onClick={() => setIsPIIMaskingEnabled(!isPIIMaskingEnabled)}
                  className={`w-12 h-6 rounded-full p-0.5 transition-colors cursor-pointer ${
                    isPIIMaskingEnabled ? 'bg-forsythia' : 'bg-white/20'
                  }`}
                  aria-label="Toggle PII Masking"
                >
                  <div
                    className={`w-5 h-5 bg-oceanic-noir rounded-full transition-transform ${
                      isPIIMaskingEnabled ? 'translate-x-6' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>

              {/* Data Preview */}
              <div className="p-3 bg-black/40 rounded font-mono text-[11px] space-y-1 border border-white/5 text-slate-300">
                <div>
                  <span className="text-white/40 font-bold">ROW #104:</span>{' '}
                  {isPIIMaskingEnabled ? (
                    <span>alice_smith → <span className="text-amber-300">sha256_8c92a...</span></span>
                  ) : (
                    <span className="text-rose-300">alice_smith → alice@acme.com</span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Graphic Design accent */}
          <div className="flex-1 flex justify-center items-center h-full max-w-[220px] ml-6 hidden lg:flex">
            <div className="relative w-44 h-44 border border-white/10 rounded-full flex items-center justify-center">
              <div className="absolute w-36 h-36 border border-white/5 rounded-full animate-spin-slow"></div>
              <div className="absolute w-24 h-24 bg-white/5 rounded-full flex flex-col justify-center items-center p-3 text-center border border-white/10">
                {/* Shield Icon */}
                <svg className="w-8 h-8 text-forsythia mb-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                </svg>
                <span className="text-[9px] font-label-caps tracking-widest leading-none">SOC2 TYPE II</span>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* MOBILE ACCORDION (Visible on screens smaller than md) */}
      <div className="md:hidden space-y-4" id="feature-accordion">
        {/* Universal Sync (Index 0) */}
        <div 
          id="accordion-item-0" 
          className={`accordion-item border rounded-lg transition-all duration-300 ${
            activeAccordionIndex === 0 ? 'bg-mystic-mint/40 border-forsythia' : 'bg-white border-secondary-container'
          }`}
        >
          <button 
            className="w-full flex items-center justify-between p-6 text-left focus:outline-none cursor-pointer"
            onClick={() => setActiveAccordionIndex(0)}
          >
            <div className="flex items-center gap-3">
              <span className="text-nocturnal-exp">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67"/>
                </svg>
              </span>
              <span className="font-headline-sm text-lg text-oceanic-noir font-bold">Universal Sync</span>
            </div>
            <span className="text-nocturnal-exp">
              {activeAccordionIndex === 0 ? (
                /* Chevron Up */
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="18 15 12 9 6 15"/>
                </svg>
              ) : (
                /* Chevron Down */
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="6 9 12 15 18 9"/>
                </svg>
              )}
            </span>
          </button>
          <div 
            className="accordion-panel transition-accordion overflow-hidden"
            style={{ maxHeight: activeAccordionIndex === 0 ? '500px' : '0px', opacity: activeAccordionIndex === 0 ? 1 : 0 }}
          >
            <div className="px-6 pb-6 pt-1">
              <p className="font-body-md text-sm text-on-secondary-container leading-relaxed mb-4">
                Connect over 200+ data sources with sub-millisecond latency. Proprietary ingestion algorithms ensure real-time global consistency without system overhead.
              </p>
              <code className="block bg-oceanic-noir text-emerald-400 p-3 rounded font-mono text-[11px] overflow-x-auto">
                nexaflow sync --source=postgres --dest=snowflake
              </code>
            </div>
          </div>
        </div>

        {/* Predictive Scaling (Index 1) */}
        <div 
          id="accordion-item-1" 
          className={`accordion-item border rounded-lg transition-all duration-300 ${
            activeAccordionIndex === 1 ? 'bg-mystic-mint/40 border-forsythia' : 'bg-white border-secondary-container'
          }`}
        >
          <button 
            className="w-full flex items-center justify-between p-6 text-left focus:outline-none cursor-pointer"
            onClick={() => setActiveAccordionIndex(1)}
          >
            <div className="flex items-center gap-3">
              <span className="text-nocturnal-exp">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/>
                  <polyline points="17 6 23 6 23 12"/>
                </svg>
              </span>
              <span className="font-headline-sm text-lg text-oceanic-noir font-bold">Predictive Scaling</span>
            </div>
            <span className="text-nocturnal-exp">
              {activeAccordionIndex === 1 ? (
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="18 15 12 9 6 15"/>
                </svg>
              ) : (
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="6 9 12 15 18 9"/>
                </svg>
              )}
            </span>
          </button>
          <div 
            className="accordion-panel transition-accordion overflow-hidden"
            style={{ maxHeight: activeAccordionIndex === 1 ? '500px' : '0px', opacity: activeAccordionIndex === 1 ? 1 : 0 }}
          >
            <div className="px-6 pb-6 pt-1">
              <p className="font-body-md text-sm text-on-secondary-container leading-relaxed">
                AI-driven auto-scaling that anticipates processing spikes based on historical workload metrics, reducing overhead waste by 40%.
              </p>
            </div>
          </div>
        </div>

        {/* Deep Observability (Index 2) */}
        <div 
          id="accordion-item-2" 
          className={`accordion-item border rounded-lg transition-all duration-300 ${
            activeAccordionIndex === 2 ? 'bg-mystic-mint/40 border-forsythia' : 'bg-white border-secondary-container'
          }`}
        >
          <button 
            className="w-full flex items-center justify-between p-6 text-left focus:outline-none cursor-pointer"
            onClick={() => setActiveAccordionIndex(2)}
          >
            <div className="flex items-center gap-3">
              <span className="text-nocturnal-exp">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8"/>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"/>
                </svg>
              </span>
              <span className="font-headline-sm text-lg text-oceanic-noir font-bold">Deep Observability</span>
            </div>
            <span className="text-nocturnal-exp">
              {activeAccordionIndex === 2 ? (
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="18 15 12 9 6 15"/>
                </svg>
              ) : (
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="6 9 12 15 18 9"/>
                </svg>
              )}
            </span>
          </button>
          <div 
            className="accordion-panel transition-accordion overflow-hidden"
            style={{ maxHeight: activeAccordionIndex === 2 ? '500px' : '0px', opacity: activeAccordionIndex === 2 ? 1 : 0 }}
          >
            <div className="px-6 pb-6 pt-1">
              <p className="font-body-md text-sm text-on-secondary-container leading-relaxed">
                End-to-end lineage tracking with real-time telemetry dashboards and automatic SLA notification alerts.
              </p>
            </div>
          </div>
        </div>

        {/* Enterprise Governance (Index 3) */}
        <div 
          id="accordion-item-3" 
          className={`accordion-item border rounded-lg transition-all duration-300 ${
            activeAccordionIndex === 3 ? 'bg-mystic-mint/40 border-forsythia' : 'bg-white border-secondary-container'
          }`}
        >
          <button 
            className="w-full flex items-center justify-between p-6 text-left focus:outline-none cursor-pointer"
            onClick={() => setActiveAccordionIndex(3)}
          >
            <div className="flex items-center gap-3">
              <span className="text-nocturnal-exp">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                </svg>
              </span>
              <span className="font-headline-sm text-lg text-oceanic-noir font-bold">Enterprise Governance</span>
            </div>
            <span className="text-nocturnal-exp">
              {activeAccordionIndex === 3 ? (
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="18 15 12 9 6 15"/>
                </svg>
              ) : (
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="6 9 12 15 18 9"/>
                </svg>
              )}
            </span>
          </button>
          <div 
            className="accordion-panel transition-accordion overflow-hidden"
            style={{ maxHeight: activeAccordionIndex === 3 ? '500px' : '0px', opacity: activeAccordionIndex === 3 ? 1 : 0 }}
          >
            <div className="px-6 pb-6 pt-1">
              <p className="font-body-md text-sm text-on-secondary-container leading-relaxed">
                SOC2 Type II, HIPAA, and GDPR compliant environment featuring fine-grained RBAC access policies and integrated PII token masking.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
