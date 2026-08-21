'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowUpRight, Menu, X } from 'lucide-react';

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 pt-6 sm:pt-8 pb-4 relative z-50">
      <div className="flex items-center justify-between">
        {/* Brand (Ring 0) */}
        <div className="hero-content-ring-0">
          <Link
            href="/"
            className="group flex items-center gap-3 text-slate-100 hover:text-white transition-opacity focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 rounded-sm"
          >
            <span className="font-heading text-lg sm:text-xl font-bold tracking-tight text-white group-hover:text-cyan-300 transition-colors duration-300">
              SH1ELD TECH
            </span>
          </Link>
        </div>

        {/* Center Nav Links (Ring 1) */}
        <nav className="hidden md:flex items-center gap-10" aria-label="Primary Navigation">
          <Link
            href="/about"
            className="hero-content-ring-1 text-sm font-sans text-slate-400 hover:text-white transition-colors duration-200 focus:outline-none focus-visible:ring-1 focus-visible:ring-cyan-400"
          >
            About
          </Link>
          <Link
            href="/services"
            className="hero-content-ring-1 text-sm font-sans text-slate-400 hover:text-white transition-colors duration-200 focus:outline-none focus-visible:ring-1 focus-visible:ring-cyan-400"
          >
            Services
          </Link>
          <Link
            href="/work"
            className="hero-content-ring-1 text-sm font-sans text-slate-400 hover:text-white transition-colors duration-200 focus:outline-none focus-visible:ring-1 focus-visible:ring-cyan-400"
          >
            Our Work
          </Link>
        </nav>

        {/* Right CTA Pill (Ring 1) - Updated with hex #6F7F5F */}
        <div className="hidden md:flex items-center gap-4">
          <Link
            href="/contact"
            className="hero-content-ring-1 group inline-flex items-center gap-2 px-5 py-2.5 text-xs font-sans font-medium tracking-wide bg-[#6F7F5F] hover:bg-[#5E6D4F] text-white border border-[#8A9C78]/40 hover:border-[#8A9C78]/80 rounded-full transition-all duration-300 shadow-[0_0_15px_rgba(111,127,95,0.3)] hover:shadow-[0_0_22px_rgba(111,127,95,0.5)] focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
          >
            <span>Let&apos;s Talk</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-white/90 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300 ease-out" />
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-300 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-4 p-6 bg-[#0E1016] border border-white/10 rounded-2xl flex flex-col gap-4 shadow-2xl">
          <Link
            href="/about"
            onClick={() => setMobileMenuOpen(false)}
            className="text-base font-sans text-slate-200 hover:text-cyan-300"
          >
            About
          </Link>
          <Link
            href="/services"
            onClick={() => setMobileMenuOpen(false)}
            className="text-base font-sans text-slate-200 hover:text-cyan-300"
          >
            Services
          </Link>
          <Link
            href="/work"
            onClick={() => setMobileMenuOpen(false)}
            className="text-base font-sans text-slate-200 hover:text-cyan-300"
          >
            Our Work
          </Link>
          <Link
            href="/contact"
            onClick={() => setMobileMenuOpen(false)}
            className="mt-2 inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-medium bg-[#6F7F5F] hover:bg-[#5E6D4F] text-white rounded-full transition-colors"
          >
            <span>Let&apos;s Talk</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      )}
    </header>
  );
}
