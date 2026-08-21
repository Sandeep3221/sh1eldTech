'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  ArrowUpRight,
  Code2,
  ShieldCheck,
  Palette,
  Phone,
  Mail,
  Compass,
} from 'lucide-react';
import { Navbar } from './Navbar';

export function HeroSection() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const timer = requestAnimationFrame(() => {
      setIsReady(true);
    });
    return () => cancelAnimationFrame(timer);
  }, []);

  return (
    <div
      className={`relative min-h-screen w-full bg-[#08090C] text-white flex flex-col justify-between ${
        isReady ? 'hero-ready' : ''
      }`}
    >
      {/* Background ambient lighting */}
      <div className="hero-bg-media absolute inset-0 pointer-events-none z-0" aria-hidden="true">
        <div className="absolute top-[-10%] right-[-5%] w-[700px] h-[700px] rounded-full bg-cyan-950/20 blur-[160px]" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[600px] h-[600px] rounded-full bg-slate-900/30 blur-[150px]" />
      </div>

      {/* Navigation */}
      <Navbar />

      {/* Hero Main Content */}
      <main className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 py-6 sm:py-8 lg:py-12 flex-1 flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
          
          {/* LEFT COLUMN */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-8 sm:gap-10">
            
            <div className="flex flex-col items-start pt-1 sm:pt-2">
              <h1 className="font-heading uppercase tracking-[-0.04em] leading-[0.92] text-white mb-5 max-w-full">
                <span className="hero-content-ring-0 block text-5xl sm:text-6xl xl:text-[3.6rem] font-normal text-slate-200">
                  THE
                </span>
                <span className="hero-content-ring-0 block text-5xl sm:text-6xl xl:text-[3.6rem] font-normal text-slate-200">
                  FUTURE OF
                </span>
                <span className="hero-content-ring-1 block text-5xl sm:text-6xl xl:text-[3.6rem] font-semibold text-white">
                  TECHNOLOGY
                </span>
              </h1>

              <div className="w-full flex justify-end mb-8 sm:mb-9">
                <p className="hero-content-ring-2 font-sans text-xs sm:text-[13px] text-slate-400 font-normal leading-relaxed max-w-[280px] sm:max-w-[320px] text-right">
                  Engineered for high-impact digital products and secure solutions,
                  adapting seamlessly to your business.
                </p>
              </div>

              <div className="hero-content-ring-2">
                <Link
                  href="/services"
                  className="group inline-flex items-center gap-4 pl-6 pr-2 py-2 bg-[#A5F3FC] hover:bg-[#86EBF7] text-[#08090C] font-heading font-semibold text-xs tracking-wider uppercase rounded-full shadow-[0_0_25px_rgba(165,243,252,0.25)] hover:shadow-[0_0_35px_rgba(165,243,252,0.45)] transition-all duration-300 ease-out focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
                >
                  <span>EXPLORE SERVICES</span>
                  <span className="w-8 h-8 rounded-full bg-[#08090C] text-white flex items-center justify-center group-hover:scale-105 transition-transform duration-300 ease-out">
                    <ArrowUpRight className="w-4 h-4 text-cyan-300" />
                  </span>
                </Link>
              </div>
            </div>

            {/* Bottom Left Secondary Showcase Card */}
            <div className="pause-on-hover w-full bg-[#ECEEF2] text-[#0F172A] rounded-[28px] p-5 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl border border-white/20 hover:shadow-2xl transition-shadow duration-300">
              <div className="hero-content-ring-3 relative w-28 h-28 sm:w-32 sm:h-32 flex items-center justify-center shrink-0">
                <div className="absolute inset-2 rounded-full border border-dashed border-slate-300/80 pointer-events-none" />
                <div className="absolute inset-5 rounded-full border border-slate-200/60 pointer-events-none" />
                <div className="w-7 h-7 rounded-full bg-[#08090C] text-cyan-400 flex items-center justify-center shadow-md z-10">
                  <span className="font-mono text-[8px] font-bold">S1</span>
                </div>
                <div className="absolute inset-0 animate-orbit">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <div className="animate-orbit-counter w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#4B0444] text-white shadow-lg border border-[#6B1863] flex flex-col items-center justify-center gap-0.5">
                      <Code2 className="w-3.5 h-3.5 text-pink-200" />
                      <span className="text-[7px] font-mono font-bold tracking-tight text-pink-100 uppercase">WEB</span>
                    </div>
                  </div>
                  <div className="absolute bottom-2 left-1">
                    <div className="animate-orbit-counter w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#E0680E] text-white shadow-lg border border-[#F38633] flex flex-col items-center justify-center gap-0.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-amber-100" />
                      <span className="text-[7px] font-mono font-bold tracking-tight text-white uppercase">SEC</span>
                    </div>
                  </div>
                  <div className="absolute bottom-2 right-1">
                    <div className="animate-orbit-counter w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#88A5B8] text-white shadow-lg border border-[#A7C0D0] flex flex-col items-center justify-center gap-0.5">
                      <Palette className="w-3.5 h-3.5 text-slate-900" />
                      <span className="text-[7px] font-mono font-bold tracking-tight text-slate-900 uppercase">DESIGN</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-start sm:items-end text-left sm:text-right">
                <span className="hero-content-ring-2 font-heading font-bold text-xs tracking-wider uppercase leading-snug text-slate-900 mb-3 max-w-[190px]">
                  ENGINEERED TO DELIVER CLARITY, SCALE, AND CONTROL.
                </span>
                <Link
                  href="/about"
                  className="hero-content-ring-2 inline-flex items-center px-4 py-1.5 rounded-full border border-slate-400/50 bg-white/70 hover:bg-white text-[11px] font-mono uppercase tracking-wider text-slate-900 transition-all duration-200 shadow-sm hover:shadow"
                >
                  DISCOVER
                </Link>
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: White Cutout Showcase Box — Globe anchor point */}
          <div className="lg:col-span-7 flex">
            <div
              id="hero-globe-anchor"
              className="w-full bg-[#ECEEF2] rounded-[36px] sm:rounded-[44px] relative overflow-hidden flex items-center justify-center min-h-[480px] sm:min-h-[560px] lg:min-h-[640px] shadow-2xl border border-white/10"
            >
              {/* TOP-RIGHT CURVED CUTOUT & ARROW BUTTON */}
              <div className="notch-top-right flex items-center justify-center z-20">
                <div className="hero-content-ring-0">
                  <Link
                    href="/contact"
                    className="w-12 h-12 rounded-full bg-[#A5F3FC] hover:bg-[#86EBF7] text-[#08090C] flex items-center justify-center shadow-lg transition-transform duration-300 hover:scale-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
                    aria-label="Contact SH1ELD Tech"
                  >
                    <ArrowUpRight className="w-5 h-5" />
                  </Link>
                </div>
              </div>

              {/* BOTTOM-LEFT CURVED CUTOUT & 3 ACTION BUTTONS */}
              <div className="notch-bottom-left flex flex-col items-center justify-center gap-3 z-20">
                <div className="hero-content-ring-3">
                  <a href="tel:+10000000000" className="w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-white flex items-center justify-center shadow-md hover:scale-105 hover:border-cyan-400/50 hover:text-cyan-300 transition-all duration-200" aria-label="Call" title="Call">
                    <Phone className="w-4 h-4" />
                  </a>
                </div>
                <div className="hero-content-ring-3">
                  <a href="mailto:contact@sh1eld.tech" className="w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-white flex items-center justify-center shadow-md hover:scale-105 hover:border-cyan-400/50 hover:text-cyan-300 transition-all duration-200" aria-label="Email" title="Email">
                    <Mail className="w-4 h-4" />
                  </a>
                </div>
                <div className="hero-content-ring-3">
                  <Link href="/services" className="w-11 h-11 rounded-full bg-[#A5F3FC]/20 hover:bg-[#A5F3FC]/30 border border-[#A5F3FC]/40 text-cyan-300 flex items-center justify-center shadow-md hover:scale-105 transition-all duration-200" aria-label="Explore" title="Explore">
                    <Compass className="w-4 h-4" />
                  </Link>
                </div>
              </div>

            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
