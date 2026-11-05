import React from 'react';

export function App() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-6 text-center">
      <div className="rounded-2xl border border-cyan-500/20 bg-slate-900/80 p-8 shadow-2xl backdrop-blur-xl max-w-xl">
        <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-950/40 px-3 py-1 text-xs font-semibold text-cyan-400">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-75"></span>
            <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-500"></span>
          </span>
          Phase 1 Active • Sovereign Firewall
        </div>
        <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
          Aegis<span className="text-cyan-400">UPI</span>
        </h1>
        <p className="mt-2 text-sm text-slate-400">
          Zero-Latency Sovereign Fraud & Deepfake Firewall with Client-Side Edge AI and Pre-Authorization Circuit Breaker.
        </p>
      </div>
    </div>
  );
}

