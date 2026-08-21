'use client';

import React from 'react';

export function VideoSection() {
  return (
    <section className="relative w-full min-h-screen flex items-center justify-center">
      {/* Container sized exactly like the Stats section above it */}
      <div className="relative w-[95vw] max-w-[1200px] h-[80vh] max-h-[850px] rounded-[32px] sm:rounded-[40px] overflow-hidden shadow-2xl shadow-cyan-900/20 border border-white/5">
        <video 
          src="/images/MotionVideo.mp4" 
          autoPlay 
          loop 
          muted 
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>
    </section>
  );
}
