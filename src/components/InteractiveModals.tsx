import React, { useState, useEffect } from 'react';
import { 
  CloseIcon, 
  CheckIcon, 
  CopyIcon, 
  TerminalIcon, 
  ZapIcon, 
  CheckCircleIcon, 
  ShieldCheckIcon, 
  CpuIcon 
} from './Icons';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  type: 'signup' | 'sales' | 'demo';
  initialPlan?: string;
}

export const InteractiveModal: React.FC<ModalProps> = ({ isOpen, onClose, title, type, initialPlan }) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [org, setOrg] = useState('');
  const [volume, setVolume] = useState('50'); // GB
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);
  const [generatedToken, setGeneratedToken] = useState('');
  const [provisionProgress, setProvisionProgress] = useState(0);

  // Demo Specific state
  const [demoState, setDemoState] = useState<'idle' | 'running' | 'completed'>('idle');
  const [demoLogs, setDemoLogs] = useState<string[]>([]);
  const [demoProgress, setDemoProgress] = useState(0);

  useEffect(() => {
    if (!isOpen) {
      // Reset state on close
      setEmail('');
      setName('');
      setOrg('');
      setVolume('50');
      setIsSubmitted(false);
      setCopied(false);
      setGeneratedToken('');
      setProvisionProgress(0);
      setDemoState('idle');
      setDemoLogs([]);
      setDemoProgress(0);
    }
  }, [isOpen]);

  // Generate simulated token
  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitted(true);
    let prog = 0;
    const interval = setInterval(() => {
      prog += 10;
      setProvisionProgress(prog);
      if (prog >= 100) {
        clearInterval(interval);
        const randHex = Array.from({ length: 32 }, () => Math.floor(Math.random() * 16).toString(16)).join('');
        setGeneratedToken(`nf_live_${randHex.substring(0, 24)}`);
      }
    }, 150);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedToken);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSales = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  // Run a real-time interactive orchestration pipeline simulation
  const startDemoPipeline = () => {
    setDemoState('running');
    setDemoLogs([]);
    setDemoProgress(0);

    const logSequence = [
      { text: '⚡ Initializing NexaFlow Orchestrator v2.0...', delay: 200, progress: 5 },
      { text: '🔌 Connecting to secure cluster ingress on port 443...', delay: 500, progress: 15 },
      { text: '🔍 Scanning database credentials & security headers...', delay: 900, progress: 30 },
      { text: '✨ Connection established with PostgreSQL (source) - Latency: 0.62ms', delay: 1400, progress: 45 },
      { text: '🚀 Target stream connected to BigQuery analytics cluster...', delay: 2000, progress: 60 },
      { text: '🛡️ Enforcing Enterprise PII Masking: Hashed email, tax_id fields successfully.', delay: 2600, progress: 80 },
      { text: '📈 Stream initialized. Active rate: 12,400 events/sec. SLA Met.', delay: 3200, progress: 100 }
    ];

    logSequence.forEach((item) => {
      setTimeout(() => {
        setDemoLogs(prev => [...prev, item.text]);
        setDemoProgress(item.progress);
        if (item.progress === 100) {
          setDemoState('completed');
        }
      }, item.delay);
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-oceanic-noir/60 backdrop-blur-sm transition-opacity"
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-lg bg-white rounded-xl shadow-2xl overflow-hidden border border-secondary-container z-10 flex flex-col max-h-[90vh] transition-all transform scale-100">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-secondary-container bg-arctic-powder">
          <div className="flex items-center gap-2">
            <TerminalIcon className="text-primary w-5 h-5" />
            <h3 className="font-headline-sm text-lg text-oceanic-noir font-bold leading-none">{title}</h3>
          </div>
          <button
            onClick={onClose}
            className="text-secondary hover:text-oceanic-noir transition-colors p-1 hover:bg-mystic-mint rounded cursor-pointer"
            aria-label="Close modal"
          >
            <CloseIcon className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto flex-1">
          {type === 'signup' && (
            <div>
              {!isSubmitted ? (
                <form onSubmit={handleSignup} className="space-y-4">
                  <div>
                    <label className="block text-xs font-label-caps text-secondary mb-1">Your Name</label>
                    <input
                      type="text"
                      required
                      placeholder="Alice Developer"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-arctic-powder border border-mystic-mint rounded p-3 font-sans text-base text-on-surface focus:outline-none focus:border-oceanic-noir"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-label-caps text-secondary mb-1">Work Email</label>
                    <input
                      type="email"
                      required
                      placeholder="alice@enterprise.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-arctic-powder border border-mystic-mint rounded p-3 font-sans text-base text-on-surface focus:outline-none focus:border-oceanic-noir"
                    />
                  </div>
                  {initialPlan && (
                    <div className="bg-mystic-mint/40 rounded p-3 border border-mystic-mint text-xs flex justify-between items-center">
                      <span className="text-secondary font-label-caps">Selected Tier</span>
                      <span className="font-bold text-oceanic-noir uppercase">{initialPlan}</span>
                    </div>
                  )}

                  {/* Feature 3: Live Input Sync Preview */}
                  <div 
                    id="live-sync-preview" 
                    className="p-3 bg-secondary-container/40 rounded border border-secondary-container text-xs text-secondary italic font-mono leading-relaxed"
                  >
                    Provisioning workspace for {name ? name : '[Name]'} ({email ? email : '[Email]'}) with active credentials...
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-forsythia hover:bg-deep-saffron text-oceanic-noir font-bold py-3 px-6 rounded-full text-label-caps transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <ZapIcon className="w-4 h-4" /> Provision Workspace Free
                  </button>
                </form>
              ) : (
                <div className="space-y-4">
                  <div className="text-center py-4">
                    <CheckCircleIcon className="w-12 h-12 text-primary mx-auto mb-2" />
                    <h4 className="font-headline-sm text-lg text-oceanic-noir font-bold">Workspace Ready, {name}!</h4>
                    <p className="text-sm text-secondary mt-1">NexaFlow token successfully allocated for {email}</p>
                  </div>

                  {/* Token Provisioning Progress */}
                  {provisionProgress < 100 ? (
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs font-mono text-secondary">
                        <span>Generating secure keys...</span>
                        <span>{provisionProgress}%</span>
                      </div>
                      <div className="w-full bg-arctic-powder rounded-full h-2 overflow-hidden">
                        <div
                          className="bg-primary h-full transition-all duration-150"
                          style={{ width: `${provisionProgress}%` }}
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <div>
                        <span className="block text-xs font-label-caps text-secondary mb-1">Your Active API Token</span>
                        <div className="flex gap-2">
                          <code className="flex-1 bg-oceanic-noir text-white p-3 rounded font-mono text-xs overflow-x-auto select-all block whitespace-nowrap">
                            {generatedToken}
                          </code>
                          <button
                            onClick={handleCopy}
                            className="bg-arctic-powder hover:bg-mystic-mint border border-mystic-mint rounded p-3 flex items-center justify-center transition-all cursor-pointer"
                            title="Copy to clipboard"
                          >
                            {copied ? <CheckIcon className="w-4 h-4 text-green-600" /> : <CopyIcon className="w-4 h-4 text-secondary" />}
                          </button>
                        </div>
                      </div>

                      <div className="p-4 bg-arctic-powder rounded border border-mystic-mint space-y-2">
                        <h5 className="font-label-caps text-xs text-oceanic-noir flex items-center gap-1.5 font-bold">
                          <TerminalIcon className="w-3.5 h-3.5" /> Quick Start Command
                        </h5>
                        <code className="block bg-oceanic-noir/10 p-2.5 rounded font-mono text-[11px] text-on-surface whitespace-pre-wrap overflow-x-auto">
                          curl -sSL https://get.nexaflow.dev | sh && nexaflow init --token={generatedToken}
                        </code>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {type === 'sales' && (
            <div>
              {!isSubmitted ? (
                <form onSubmit={handleSales} className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-label-caps text-secondary mb-1">Name</label>
                      <input
                        type="text"
                        required
                        placeholder="Alex Smith"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full bg-arctic-powder border border-mystic-mint rounded p-3 font-sans text-base text-on-surface focus:outline-none focus:border-oceanic-noir"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-label-caps text-secondary mb-1">Company</label>
                      <input
                        type="text"
                        required
                        placeholder="Acme Corp"
                        value={org}
                        onChange={(e) => setOrg(e.target.value)}
                        className="w-full bg-arctic-powder border border-mystic-mint rounded p-3 font-sans text-base text-on-surface focus:outline-none focus:border-oceanic-noir"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-label-caps text-secondary mb-1">Email</label>
                    <input
                      type="email"
                      required
                      placeholder="alex@acme.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-arctic-powder border border-mystic-mint rounded p-3 font-sans text-base text-on-surface focus:outline-none focus:border-oceanic-noir"
                    />
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <label className="block text-xs font-label-caps text-secondary">Estimated Ingestion volume</label>
                      <span className="font-mono text-xs text-primary font-bold">{volume} TB / mo</span>
                    </div>
                    <input
                      type="range"
                      min="10"
                      max="1000"
                      step="10"
                      value={volume}
                      onChange={(e) => setVolume(e.target.value)}
                      className="w-full h-2 bg-secondary-container rounded-lg appearance-none cursor-pointer accent-primary"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-forsythia hover:bg-deep-saffron text-oceanic-noir font-bold py-3 px-6 rounded-full text-label-caps transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <ShieldCheckIcon className="w-4 h-4" /> Request Custom SLA Proposal
                  </button>
                </form>
              ) : (
                <div className="space-y-4 text-center py-6">
                  <div className="w-16 h-16 bg-mystic-mint text-primary rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckIcon className="w-8 h-8" />
                  </div>
                  <h4 className="font-headline-sm text-xl text-oceanic-noir font-bold">Request Logged Successfully</h4>
                  <p className="text-sm text-secondary">
                    Thank you <strong>{name}</strong>. An enterprise solution architect will review your estimated pipeline metrics (<strong>{volume} TB/mo</strong>) and reach out to <strong>{email}</strong> within 1 hour with a customized pricing & compliance schedule.
                  </p>
                  <div className="pt-4 border-t border-secondary-container text-xs text-secondary italic font-mono">
                    Reference Ticket: SLA-{Math.floor(100000 + Math.random() * 900000)}
                  </div>
                </div>
              )}
            </div>
          )}

          {type === 'demo' && (
            <div className="space-y-4">
              <p className="text-sm text-secondary">
                Run our interactive orchestration simulator to visualize NexaFlow's lightning-fast synchronization, automatic PII masking, and multi-threaded scaling.
              </p>

              <div className="bg-oceanic-noir rounded-lg p-4 font-mono text-xs text-white min-h-[220px] max-h-[280px] overflow-y-auto flex flex-col justify-between">
                <div className="space-y-1.5">
                  {demoLogs.length === 0 ? (
                    <div className="text-secondary italic text-center py-12">
                      Press "Run Simulation Pipeline" to stream live logs
                    </div>
                  ) : (
                    demoLogs.map((log, index) => (
                      <div
                        key={index}
                        className="text-emerald-400 font-mono text-[11px] leading-relaxed"
                      >
                        {log}
                      </div>
                    ))
                  )}
                </div>
                {demoState === 'running' && (
                  <div className="pt-4 border-t border-white/10 mt-4">
                    <div className="flex justify-between items-center text-[10px] text-secondary mb-1">
                      <span>Syncing streams...</span>
                      <span>{demoProgress}%</span>
                    </div>
                    <div className="w-full bg-white/10 rounded-full h-1.5 overflow-hidden">
                      <div
                        className="bg-forsythia h-full transition-all duration-300"
                        style={{ width: `${demoProgress}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>

              <div className="flex gap-3 justify-end">
                <button
                  onClick={startDemoPipeline}
                  disabled={demoState === 'running'}
                  className="bg-forsythia hover:bg-deep-saffron text-oceanic-noir font-bold py-3 px-6 rounded-full text-label-caps transition-all disabled:opacity-55 disabled:cursor-not-allowed flex items-center gap-1.5 cursor-pointer"
                >
                  <CpuIcon className="w-4 h-4" /> {demoState === 'running' ? 'Running Cluster...' : 'Run Simulation Pipeline'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
