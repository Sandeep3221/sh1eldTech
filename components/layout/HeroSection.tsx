'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowUpRight, Code2, ShieldCheck, Palette, Phone, Mail, Compass } from 'lucide-react';
import { company } from '@/data/company';

/**
 * Hero — the Earth's launch pad.
 *
 * PROTECTED CONTRACT, do not change without reading ScrollGlobe.tsx:
 *   • #hero-globe-anchor is the box the globe is measured against. Its width,
 *     height and position determine the Earth's starting size and centre.
 *   • .notch-top-right / .notch-bottom-left cut the corners the globe nestles
 *     between; their geometry is defined in globals.css.
 *   • .hero-ready gates the entrance ripple; .hero-content-ring-0..3 are the
 *     stagger buckets. .hero-bg-media is the background's entrance.
 *
 * The header is fixed and lives in app/layout.tsx, so this section pads itself
 * by --header-h. Total height stays exactly one viewport, which is what keeps
 * the anchor box where the Earth expects it.
 */
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
      className={`relative flex min-h-screen w-full flex-col justify-between bg-ink-900 pt-[var(--header-h)] text-white ${
        isReady ? 'hero-ready' : ''
      }`}
    >
      {/*
        One light source, not a field of blobs. It sits top-right, where the
        globe begins, so the glow reads as spill from the Earth rather than
        decoration for its own sake.
      */}
      <div className="hero-bg-media pointer-events-none absolute inset-0 z-0" aria-hidden="true">
        <div className="absolute right-[-10%] top-[-15%] h-[820px] w-[820px] rounded-full bg-cyan-950/25 blur-[170px]" />
      </div>

      <div className="u-container relative z-10 flex flex-1 flex-col justify-center py-8 lg:py-12">
        <div className="grid grid-cols-1 items-stretch gap-8 lg:grid-cols-12 lg:gap-10">
          {/* LEFT COLUMN */}
          <div className="flex flex-col justify-between gap-8 sm:gap-10 lg:col-span-5">
            <div className="flex flex-col items-start pt-1 sm:pt-2">
              <h1 className="mb-5 max-w-full font-heading uppercase leading-[0.92] tracking-[-0.04em] text-white">
                <span className="hero-content-ring-0 block text-[2.125rem] font-normal text-slate-300 sm:text-5xl xl:text-[3.6rem]">
                  SECURITY
                </span>
                <span className="hero-content-ring-0 block text-[2.125rem] font-normal text-slate-300 sm:text-5xl xl:text-[3.6rem]">
                  IS NOT A
                </span>
                <span className="hero-content-ring-1 block text-[2.125rem] font-semibold text-white sm:text-5xl xl:text-[3.6rem]">
                  FEATURE.
                </span>
              </h1>

              <div className="mb-8 flex w-full justify-end sm:mb-9">
                <p className="hero-content-ring-2 max-w-[300px] text-right font-sans text-xs font-normal leading-relaxed text-slate-400 sm:max-w-[340px] sm:text-[13px]">
                  We engineer products and then test them the way an attacker
                  would. Same team, same standard — from Gangtok, Sikkim.
                </p>
              </div>

              <div className="hero-content-ring-2">
                <Link
                  href="/services"
                  className="group inline-flex items-center gap-4 rounded-full bg-[#A5F3FC] py-2 pl-6 pr-2 font-heading text-xs font-semibold uppercase tracking-wider text-[#08090C] shadow-[0_0_25px_rgba(165,243,252,0.25)] transition-all duration-300 ease-out hover:bg-[#86EBF7] hover:shadow-[0_0_35px_rgba(165,243,252,0.45)] focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
                >
                  <span>EXPLORE SERVICES</span>
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#08090C] text-white transition-transform duration-300 ease-out group-hover:scale-105">
                    <ArrowUpRight className="h-4 w-4 text-cyan-300" />
                  </span>
                </Link>
              </div>
            </div>

            {/* Bottom-left secondary showcase card */}
            <div className="pause-on-hover flex w-full flex-col items-center justify-between gap-6 rounded-panel border border-white/20 bg-paper-200 p-5 text-fg-on-paper shadow-xl transition-shadow duration-300 hover:shadow-2xl sm:flex-row sm:p-6">
              <div className="hero-content-ring-3 relative flex h-28 w-28 shrink-0 items-center justify-center sm:h-32 sm:w-32">
                <div className="pointer-events-none absolute inset-2 rounded-full border border-dashed border-slate-300/80" />
                <div className="pointer-events-none absolute inset-5 rounded-full border border-slate-200/60" />
                <div className="z-10 flex h-7 w-7 items-center justify-center rounded-full bg-[#08090C] text-cyan-400 shadow-md">
                  <span className="font-mono text-[8px] font-bold">S1</span>
                </div>
                <div className="absolute inset-0 animate-orbit">
                  <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2">
                    <div className="animate-orbit-counter flex h-9 w-9 flex-col items-center justify-center gap-0.5 rounded-full border border-[#6B1863] bg-[#4B0444] text-white shadow-lg sm:h-10 sm:w-10">
                      <Code2 className="h-3.5 w-3.5 text-pink-200" />
                      <span className="font-mono text-[7px] font-bold uppercase tracking-tight text-pink-100">
                        WEB
                      </span>
                    </div>
                  </div>
                  <div className="absolute bottom-2 left-1">
                    <div className="animate-orbit-counter flex h-9 w-9 flex-col items-center justify-center gap-0.5 rounded-full border border-[#F38633] bg-[#E0680E] text-white shadow-lg sm:h-10 sm:w-10">
                      <ShieldCheck className="h-3.5 w-3.5 text-amber-100" />
                      <span className="font-mono text-[7px] font-bold uppercase tracking-tight text-white">
                        SEC
                      </span>
                    </div>
                  </div>
                  <div className="absolute bottom-2 right-1">
                    <div className="animate-orbit-counter flex h-9 w-9 flex-col items-center justify-center gap-0.5 rounded-full border border-[#A7C0D0] bg-[#88A5B8] text-white shadow-lg sm:h-10 sm:w-10">
                      <Palette className="h-3.5 w-3.5 text-slate-900" />
                      <span className="font-mono text-[7px] font-bold uppercase tracking-tight text-slate-900">
                        DESIGN
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-start text-left sm:items-end sm:text-right">
                <span className="hero-content-ring-2 mb-3 max-w-[200px] font-heading text-xs font-bold uppercase leading-snug tracking-wider text-slate-900">
                  SEVEN DISCIPLINES. ONE TEAM. NO HANDOFFS.
                </span>
                <Link
                  href="/about"
                  className="hero-content-ring-2 inline-flex min-h-11 items-center rounded-full border border-slate-400/50 bg-white/70 px-4 font-mono text-[11px] uppercase tracking-wider text-slate-900 shadow-sm transition-all duration-200 hover:bg-white hover:shadow"
                >
                  DISCOVER
                </Link>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN — globe anchor. Geometry is a protected contract. */}
          <div className="flex lg:col-span-7">
            <div
              id="hero-globe-anchor"
              className="relative flex min-h-[480px] w-full items-center justify-center overflow-hidden rounded-[36px] border border-white/10 bg-paper-200 shadow-2xl sm:min-h-[560px] sm:rounded-[44px] lg:min-h-[640px]"
            >
              {/* TOP-RIGHT CUTOUT */}
              <div className="notch-top-right z-20 flex items-center justify-center">
                <div className="hero-content-ring-0">
                  <Link
                    href="/contact"
                    className="flex h-12 w-12 items-center justify-center rounded-full bg-[#A5F3FC] text-[#08090C] shadow-lg transition-transform duration-300 hover:scale-110 hover:bg-[#86EBF7] focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
                    aria-label="Contact SH1ELD Tech"
                  >
                    <ArrowUpRight className="h-5 w-5" />
                  </Link>
                </div>
              </div>

              {/* BOTTOM-LEFT CUTOUT */}
              <div className="notch-bottom-left z-20 flex flex-col items-center justify-center gap-3">
                <div className="hero-content-ring-3">
                  <a
                    href={`tel:${company.phoneHref}`}
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white shadow-md transition-all duration-200 hover:scale-105 hover:border-cyan-400/50 hover:bg-white/20 hover:text-cyan-300"
                    aria-label={`Call ${company.name}`}
                    title={company.phone}
                  >
                    <Phone className="h-4 w-4" />
                  </a>
                </div>
                <div className="hero-content-ring-3">
                  <a
                    href={`mailto:${company.email}`}
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white shadow-md transition-all duration-200 hover:scale-105 hover:border-cyan-400/50 hover:bg-white/20 hover:text-cyan-300"
                    aria-label={`Email ${company.name}`}
                    title={company.email}
                  >
                    <Mail className="h-4 w-4" />
                  </a>
                </div>
                <div className="hero-content-ring-3">
                  <Link
                    href="/work"
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-[#A5F3FC]/40 bg-[#A5F3FC]/20 text-cyan-300 shadow-md transition-all duration-200 hover:scale-105 hover:bg-[#A5F3FC]/30"
                    aria-label="Selected work"
                    title="Selected work"
                  >
                    <Compass className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
