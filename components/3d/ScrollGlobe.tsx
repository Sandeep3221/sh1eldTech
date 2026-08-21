'use client';

import React, { useRef, useEffect, useState } from 'react';
import Image from 'next/image';

export function ScrollGlobe() {
  const [scrollY, setScrollY] = useState(0);
  const [heroBox, setHeroBox] = useState<DOMRect | null>(null);
  const [statsCenterY, setStatsCenterY] = useState<number | null>(null);
  const [heroDocY, setHeroDocY] = useState<number | null>(null);
  const [heroDocX, setHeroDocX] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const measureBoxes = () => {
      const hero = document.getElementById('hero-globe-anchor');
      if (hero) {
        const rect = hero.getBoundingClientRect();
        setHeroBox(rect);
        setHeroDocY(rect.top + window.scrollY + rect.height / 2);
        setHeroDocX(rect.left + rect.width / 2);
      }

      const stats = document.getElementById('globe-destination');
      if (stats) {
        const rect = stats.getBoundingClientRect();
        setStatsCenterY(rect.top + window.scrollY + rect.height / 2);
      }
    };

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    measureBoxes();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', measureBoxes);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', measureBoxes);
    };
  }, []);

  if (!mounted || !heroBox || !statsCenterY || !heroDocY || !heroDocX) {
    return null;
  }

  const vw = document.documentElement.clientWidth || window.innerWidth;
  const vh = window.innerHeight;
  const isMobile = vw < 768;

  if (isMobile) {
    // ===== MOBILE: "Sticky" style — globe follows the scroll =====
    // 
    // Phase A: Hero box center is below viewport center → globe sits at hero center (scrolls with page)
    // Phase B: Hero box scrolled past center → globe STICKS at viewport center (follows scroll)
    // Phase C: Stats center reached → globe locks at stats center (scrolls with page again)

    const viewportCenter = scrollY + vh / 2;
    let globeDocY: number;

    // Y position: start slightly lower than center to sit between the two cutouts diagonally
    const heroStartY = heroDocY - heroBox.height * 0.07;

    if (viewportCenter < heroStartY) {
      globeDocY = heroStartY;
    } else if (viewportCenter < statsCenterY) {
      globeDocY = viewportCenter;
    } else {
      globeDocY = statsCenterY;
    }

    // Calculate progress (0 = at hero, 1 = at stats) for size & X interpolation
    const totalDistance = statsCenterY - heroStartY;
    const currentDistance = globeDocY - heroStartY;
    const progress = Math.min(1, Math.max(0, currentDistance / totalDistance));

    // Start size: large enough to nearly touch both cutouts
    const startSize = Math.min(heroBox.width, heroBox.height) * 0.85;
    const endSize = Math.min(vw, vh) * 0.55;
    const currentSize = startSize + (endSize - startSize) * progress;

    // X position: start slightly right of center (between the bottom-left notch and top-right notch)
    // The bottom-left notch is ~80px wide, top-right is ~76px wide
    // Offset the globe towards center-right to nestle between them
    const heroStartX = heroDocX + heroBox.width * 0.05;
    const endX = vw / 2;
    const currentX = heroStartX + (endX - heroStartX) * progress;



    return (
      <div
        className="z-30 pointer-events-none"
        style={{
          position: 'absolute',
          left: `${currentX}px`,
          top: `${globeDocY}px`,
          width: `${currentSize}px`,
          height: `${currentSize}px`,
          transform: 'translate(-50%, -50%)',
        }}
      >
        <div className="w-full h-full rounded-full overflow-hidden shadow-[0_0_80px_rgba(56,189,248,0.12)]">
          <div className="w-full h-full relative animate-globe-spin" style={{ transform: 'scale(1.12)' }}>
            <Image
              src="/images/globe.webp"
              alt="Earth"
              fill
              className="object-cover"
              priority
              sizes="80vw"
            />
          </div>
        </div>
      </div>
    );
  }

  // ===== DESKTOP: Original proven logic (UNTOUCHED) =====
  const startX = heroBox.left + heroBox.width / 2;
  const startY = heroBox.top + heroBox.height / 2;
  const startSize = Math.min(heroBox.width, heroBox.height) * 0.7;

  const endX = vw / 2;
  const endY = vh * 0.5;
  const endSize = Math.min(vw, vh) * 0.75;

  const p1 = Math.min(1, Math.max(0, scrollY / (vh * 0.85)));
  const eased = 1 - Math.pow(1 - p1, 3);
  
  const currentX = startX + (endX - startX) * eased;
  const currentSize = startSize + (endSize - startSize) * eased;

  const switchScrollY = statsCenterY - endY;
  const isNativeScrolling = scrollY >= switchScrollY;

  const position = isNativeScrolling ? 'absolute' : 'fixed';
  const fixedY = startY + (endY - startY) * eased;
  const currentY = isNativeScrolling ? statsCenterY : fixedY;

  return (
    <div
      className="z-30 pointer-events-none"
      style={{
        position,
        left: `${currentX}px`,
        top: `${currentY}px`,
        width: `${currentSize}px`,
        height: `${currentSize}px`,
        transform: 'translate(-50%, -50%)',
        willChange: 'left, top, width, height',
      }}
    >
      <div className="w-full h-full rounded-full overflow-hidden shadow-[0_0_80px_rgba(56,189,248,0.12)]">
        <div className="w-full h-full relative animate-globe-spin" style={{ transform: 'scale(1.12)' }}>
          <Image
            src="/images/globe.webp"
            alt="Earth"
            fill
            className="object-cover"
            priority
            sizes="60vw"
          />
        </div>
      </div>
    </div>
  );
}
