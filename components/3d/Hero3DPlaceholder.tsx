'use client';

import React from 'react';

export function Hero3DPlaceholder() {
  return (
    <div className="w-full h-full min-h-[460px] lg:min-h-[580px] flex items-center justify-center relative bg-gradient-to-br from-[#E2E4E9] to-[#D1D5DB]">
      <div className="relative w-48 h-48 rounded-full border border-slate-400/30 flex items-center justify-center">
        <div className="w-32 h-32 rounded-full border border-dashed border-slate-500/40 animate-[spin_30s_linear_infinite]" />
        <div className="w-16 h-16 rounded-full bg-slate-400/20 backdrop-blur-sm" />
      </div>
    </div>
  );
}
