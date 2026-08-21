'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Code2, Briefcase, MapPin, Shield } from 'lucide-react';

// Smooth rolling number animation hook
function RollingNumber({ target, isVisible, decimals = 0 }: { target: number, isVisible: boolean, decimals?: number }) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!isVisible) {
      setCurrent(0);
      return;
    }
    let startTimestamp: number | null = null;
    const duration = 2500;
    
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      
      const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setCurrent(easeProgress * target);
      
      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        setCurrent(target);
      }
    };
    
    window.requestAnimationFrame(step);
  }, [isVisible, target]);

  return <>{decimals > 0 ? current.toFixed(decimals) : Math.floor(current)}</>;
}

export function StatsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [windowSize, setWindowSize] = useState({ w: 1000, h: 800 });

  useEffect(() => {
    const update = () => setWindowSize({ w: document.documentElement.clientWidth || window.innerWidth, h: window.innerHeight });
    window.addEventListener('resize', update);
    update();
    return () => window.removeEventListener('resize', update);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.4 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const R_GLOBE = Math.min(windowSize.w, windowSize.h) * 0.375;
  const R_MASK = R_GLOBE + 16; 

  return (
    <section
      ref={sectionRef}
      id="globe-destination"
      className="relative z-10 w-full min-h-screen flex items-center justify-center"
    >
      <div 
        className="relative w-[95vw] max-w-[1200px] h-[80vh] max-h-[850px] z-20 grid grid-cols-2 grid-rows-2 gap-4 sm:gap-6 lg:gap-8 pointer-events-auto"
        style={{
          WebkitMaskImage: `radial-gradient(circle at center, transparent ${R_MASK}px, black ${R_MASK + 2}px)`,
          maskImage: `radial-gradient(circle at center, transparent ${R_MASK}px, black ${R_MASK + 2}px)`,
        }}
      >
        
        {/* Top Left Box - Outer rounded, inner sharp */}
        <div
          className={`relative bg-white/90 backdrop-blur-3xl rounded-tl-[32px] sm:rounded-tl-[40px] transition-all duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)]
            ${isVisible ? 'translate-x-0 translate-y-0 opacity-100 scale-100' : 'translate-x-[15%] translate-y-[15%] opacity-0 scale-95'}`}
        >
          <div className="absolute top-6 left-6 sm:top-8 sm:left-8 flex flex-col items-start w-[calc(100%-2rem)] max-w-[260px]">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#08090C] flex items-center justify-center mb-3 sm:mb-4 shadow-inner">
              <Code2 className="w-5 h-5 sm:w-6 sm:h-6 text-cyan-300" />
            </div>
            <h3 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-extrabold text-[#08090C] mb-1 tracking-tight flex items-center truncate w-full">
              <RollingNumber target={14893} isVisible={isVisible} />+
            </h3>
            <p className="text-[10px] sm:text-[12px] font-sans font-bold text-slate-700 uppercase tracking-widest leading-relaxed">
              Lines of Code<br />Written
            </p>
          </div>
        </div>

        {/* Top Right Box - Outer rounded, inner sharp */}
        <div
          className={`relative bg-white/90 backdrop-blur-3xl rounded-tr-[32px] sm:rounded-tr-[40px] transition-all duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] delay-[100ms]
            ${isVisible ? 'translate-x-0 translate-y-0 opacity-100 scale-100' : '-translate-x-[15%] translate-y-[15%] opacity-0 scale-95'}`}
        >
          <div className="absolute top-6 right-6 sm:top-8 sm:right-8 flex flex-col items-end text-right w-[calc(100%-2rem)] max-w-[260px]">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#08090C] flex items-center justify-center mb-3 sm:mb-4 shadow-inner">
              <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-pink-300" />
            </div>
            <h3 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-extrabold text-[#08090C] mb-1 tracking-tight flex items-center truncate w-full justify-end">
              Sikkim
            </h3>
            <p className="text-[10px] sm:text-[12px] font-sans font-bold text-slate-700 uppercase tracking-widest leading-relaxed">
              Gangtok, India<br />HQ Location
            </p>
          </div>
        </div>

        {/* Bottom Left Box - Outer rounded, inner sharp */}
        <div
          className={`relative bg-white/90 backdrop-blur-3xl rounded-bl-[32px] sm:rounded-bl-[40px] transition-all duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] delay-[200ms]
            ${isVisible ? 'translate-x-0 translate-y-0 opacity-100 scale-100' : 'translate-x-[15%] -translate-y-[15%] opacity-0 scale-95'}`}
        >
          <div className="absolute bottom-6 left-6 sm:bottom-8 sm:left-8 flex flex-col items-start w-[calc(100%-2rem)] max-w-[260px]">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#08090C] flex items-center justify-center mb-3 sm:mb-4 shadow-inner">
              <Briefcase className="w-5 h-5 sm:w-6 sm:h-6 text-amber-300" />
            </div>
            <h3 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-extrabold text-[#08090C] mb-1 tracking-tight flex items-center truncate w-full">
              <RollingNumber target={10} isVisible={isVisible} />+
            </h3>
            <p className="text-[10px] sm:text-[12px] font-sans font-bold text-slate-700 uppercase tracking-widest leading-relaxed">
              Projects<br />Delivered
            </p>
          </div>
        </div>

        {/* Bottom Right Box - Outer rounded, inner sharp */}
        <div
          className={`relative bg-white/90 backdrop-blur-3xl rounded-br-[32px] sm:rounded-br-[40px] transition-all duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] delay-[300ms]
            ${isVisible ? 'translate-x-0 translate-y-0 opacity-100 scale-100' : '-translate-x-[15%] -translate-y-[15%] opacity-0 scale-95'}`}
        >
          <div className="absolute bottom-6 right-6 sm:bottom-8 sm:right-8 flex flex-col items-end text-right w-[calc(100%-2rem)] max-w-[260px]">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#08090C] flex items-center justify-center mb-3 sm:mb-4 shadow-inner">
              <Shield className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-300" />
            </div>
            <h3 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-extrabold text-[#08090C] mb-1 tracking-tight flex items-center truncate w-full justify-end">
              <RollingNumber target={99.9} isVisible={isVisible} decimals={1} />%
            </h3>
            <p className="text-[10px] sm:text-[12px] font-sans font-bold text-slate-700 uppercase tracking-widest leading-relaxed">
              Secure System<br />Reliability
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
