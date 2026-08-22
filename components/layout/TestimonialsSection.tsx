'use client';

import React from 'react';
import { Marquee } from '@/components/ui/Marquee';

const clients = [
  '/images/cli1.jpg',
  '/images/cli2.jpg',
  '/images/cli3.jpg',
  '/images/cli4.png',
  '/images/cli5.jpg',
  '/images/cli6.jpg',
];

const recognitions = [
  '/images/rec1.jpg',
  '/images/rec2.jpg',
  '/images/rec3.jpg',
  '/images/rec4.jpeg',
  '/images/rec5.png',
  '/images/rec6.png',
];

const LogoRow = ({ images, reverse = false, duration = 40 }: { images: string[], reverse?: boolean, duration?: number }) => (
  <Marquee reverse={reverse} duration={duration} className="py-2">
    {images.map((src, index) => (
      <div key={index} className="w-[120px] sm:w-[140px] h-[60px] sm:h-[80px] mx-6 sm:mx-10 flex items-center justify-center group shrink-0">
        <img 
          src={src} 
          alt={`Partner Logo ${index + 1}`} 
          className="max-w-full max-h-full object-contain rounded-[12px] sm:rounded-[16px] opacity-85 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500 ease-out"
          loading="lazy"
        />
      </div>
    ))}
  </Marquee>
);

export function TestimonialsSection() {
  return (
    <section className="relative w-full bg-[#08090C] py-20 md:py-28 overflow-hidden border-t border-white/5">
      <div className="w-full max-w-[1400px] mx-auto px-5 sm:px-10 lg:px-12 flex flex-col items-center">
        
        {/* Shortened, crisp, smaller Headline */}
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-white mb-16 text-center leading-tight tracking-tight max-w-2xl mx-auto opacity-90">
          Execution that matters. <br className="hidden sm:block"/>Trusted by the best.
        </h2>

        {/* Rows Container */}
        <div className="w-full flex flex-col gap-6 lg:gap-8 overflow-hidden">
          <LogoRow images={clients} duration={45} />
          <LogoRow images={recognitions} reverse={true} duration={50} />
        </div>
        
      </div>
    </section>
  );
}
