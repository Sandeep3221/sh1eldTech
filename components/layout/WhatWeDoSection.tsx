'use client';

import React, { useEffect, useRef, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';

const services = [
  { title: 'Branding', image: '/images/branding.webp' },
  { title: 'UI/UX Design', image: '/images/ui-ux.webp' },
  { title: 'Web Development', image: '/images/web-development.webp' },
  { title: 'App Development', image: '/images/app-development.webp' },
  { title: 'SEO', image: '/images/seo.webp' },
  { title: 'Digital Marketing', image: '/images/digital-marketing.webp' },
];

export function WhatWeDoSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Trigger the fold animation once the section enters the viewport
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 } // Triggers when 10% of the grid is visible
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full bg-[#08090C] py-24 md:py-32 overflow-hidden">
      <div className="w-full max-w-[1400px] mx-auto px-5 sm:px-10 lg:px-12">
        
        {/* Centered, Shortened Text Content */}
        <div className="mb-16 md:mb-20 flex flex-col items-center text-center max-w-2xl mx-auto">
          <h2 className="text-4xl md:text-5xl lg:text-7xl font-heading font-extrabold text-white mb-6 leading-[0.95] tracking-tighter">
            What We Do
          </h2>
          
          <p className="text-sm md:text-base text-gray-400 font-sans leading-relaxed max-w-lg">
            We craft digital experiences that launch, grow, and stand out. 
            Bold design meets smart technology to build your future.
          </p>
        </div>

        {/* Premium Masonry Layout with 3D Perspective */}
        <div 
          className="columns-1 sm:columns-2 lg:columns-3 gap-5 sm:gap-8 space-y-5 sm:space-y-8" 
          style={{ perspective: '1500px' }}
        >
          {services.map((service, i) => (
            <div 
              key={i} 
              className="break-inside-avoid relative rounded-[20px] sm:rounded-[28px] overflow-hidden group border border-white/5 bg-[#0A0D14] shadow-2xl cursor-pointer transition-all duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
              style={{
                // Staggered delay for the "one by one" effect
                transitionDelay: `${i * 150}ms`,
                // Fold hinge originates at the top
                transformOrigin: 'top center',
                // Start folded back and faded out, transition to flat and fully visible
                transform: isVisible ? 'rotateX(0deg) translateY(0)' : 'rotateX(-45deg) translateY(60px)',
                opacity: isVisible ? 1 : 0,
              }}
            >
              {/* Image with slow premium zoom */}
              <img 
                src={service.image}
                alt={service.title}
                className="w-full h-auto object-cover transition-transform duration-[1.5s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                loading="lazy"
              />
              
              {/* Subtle tint that fades on hover */}
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors duration-700 ease-out pointer-events-none" />
              
              {/* Glassmorphism Badge Bottom Left */}
              <div className="absolute bottom-4 left-4 md:bottom-6 md:left-6 overflow-hidden rounded-full">
                <div className="backdrop-blur-xl bg-black/30 border border-white/10 text-white px-4 py-2 sm:px-5 sm:py-2.5 rounded-full flex items-center gap-2 sm:gap-3 transform transition-all duration-500 ease-out group-hover:bg-black/60 group-hover:border-white/20 group-hover:shadow-[0_8px_30px_rgba(162,255,77,0.1)]">
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
          ))}
        </div>

      </div>
    </section>
  );
}
