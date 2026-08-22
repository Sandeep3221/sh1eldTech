'use client';

import React, { useEffect, useRef, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';

import { useParallax } from '@/lib/motion';

const services = [
  { title: 'Branding', image: '/images/branding.webp' },
  { title: 'UI/UX Design', image: '/images/ui-ux.webp' },
  { title: 'Web Development', image: '/images/web-development.webp' },
  { title: 'App Development', image: '/images/app-development.webp' },
  { title: 'SEO', image: '/images/seo.webp' },
  { title: 'Digital Marketing', image: '/images/digital-marketing.webp' },
];

function ParallaxImageCard({ service, index }: { service: typeof services[0], index: number }) {
  // Give each column a slightly different parallax speed for a staggered "floating" feel
  const amount = index % 3 === 1 ? 0.08 : index % 3 === 2 ? -0.05 : 0.04;
  const ref = useParallax<HTMLDivElement>({ amount });

  return (
    <div 
      ref={ref}
      className="break-inside-avoid relative rounded-[20px] sm:rounded-[28px] overflow-hidden group border border-white/5 bg-[#0A0D14] shadow-2xl cursor-pointer transition-shadow hover:shadow-[0_20px_60px_rgba(162,255,77,0.1)]"
    >
      <div className="relative w-full aspect-[4/5] sm:aspect-[3/4] overflow-hidden">
        {/* Scale 110% by default so there's room to pan up/down */}
        <img 
          src={service.image}
          alt={service.title}
          className="absolute inset-0 w-full h-full object-cover scale-[1.15] transition-transform duration-[1.5s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.22]"
          loading="lazy"
        />
        
        {/* Subtle tint that fades on hover */}
        <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors duration-700 ease-out pointer-events-none" />
        
        {/* Glassmorphism Badge Bottom Left */}
        <div className="absolute bottom-4 left-4 md:bottom-6 md:left-6 overflow-hidden rounded-full z-10">
          <div className="backdrop-blur-xl bg-black/40 border border-white/10 text-white px-4 py-2 sm:px-5 sm:py-2.5 rounded-full flex items-center gap-2 sm:gap-3 transform transition-all duration-500 ease-out group-hover:bg-black/70 group-hover:border-white/25 group-hover:shadow-[0_8px_30px_rgba(162,255,77,0.2)]">
            <span className="text-sm sm:text-[15px] font-heading font-bold tracking-wide">
              {service.title}
            </span>
            
            {/* Sliding Arrow Animation */}
            <div className="w-0 opacity-0 -translate-x-4 group-hover:w-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] flex items-center">
              <ArrowUpRight className="w-4 h-4 text-[#a2ff4d]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function WhatWeDoSection() {
  return (
    <section className="relative w-full bg-[#08090C] py-24 md:py-32 overflow-hidden">
      <div className="w-full max-w-[1400px] mx-auto px-5 sm:px-10 lg:px-12">
        
        {/* Centered Text Content */}
        <div className="mb-20 md:mb-28 flex flex-col items-center text-center max-w-2xl mx-auto">
          <h2 className="text-4xl md:text-5xl lg:text-7xl font-heading font-extrabold text-white mb-6 leading-[0.95] tracking-tighter">
            What We Do
          </h2>
          
          <p className="text-sm md:text-base text-gray-400 font-sans leading-relaxed max-w-lg">
            We craft digital experiences that launch, grow, and stand out. 
            Bold design meets smart technology to build your future.
          </p>
        </div>

        {/* Parallax Masonry Layout */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-5 sm:gap-8 space-y-5 sm:space-y-8 pb-10">
          {services.map((service, i) => (
            <ParallaxImageCard key={i} service={service} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
