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
            <div className="hero-content-ring-3 group flex w-full flex-col justify-between overflow-hidden rounded-panel bg-paper-100 p-6 sm:p-8 shadow-xl transition-all duration-300 hover:shadow-2xl">
              <div className="mb-8 flex flex-wrap gap-2">
                {['Branding', 'UI/UX', 'Web', 'App', 'SEO', 'Growth'].map((tag) => (
                  <span key={tag} className="rounded-full border border-black/10 bg-white/60 px-3 py-1.5 font-mono text-[9.5px] font-medium uppercase tracking-widest text-fg-on-paper-muted">
                    {tag}
                  </span>
                ))}
              </div>
              
              <div className="flex flex-col items-start text-left">
                <span className="mb-5 font-heading text-lg font-bold uppercase leading-tight tracking-wider text-fg-on-paper sm:text-xl">
                  SIX DISCIPLINES.<br />ONE TEAM.<br />NO HANDOFFS.
                </span>
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 rounded-full bg-ink-900 px-5 py-2.5 font-mono text-[10px] font-semibold uppercase tracking-widest text-white transition-all duration-300 group-hover:bg-mint group-hover:text-ink-900"
                >
                  Discover
                  <ArrowUpRight className="h-3.5 w-3.5" />
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
