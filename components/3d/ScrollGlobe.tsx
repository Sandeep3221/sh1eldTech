'use client';

import React, { useRef, useEffect, useState } from 'react';
import Image from 'next/image';

export function ScrollGlobe() {
  const [scrollY, setScrollY] = useState(0);
  const [heroBox, setHeroBox] = useState<DOMRect | null>(null);
  const [statsCenterY, setStatsCenterY] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const measureBoxes = () => {
      const hero = document.getElementById('hero-globe-anchor');
      if (hero) setHeroBox(hero.getBoundingClientRect());

      const stats = document.getElementById('globe-destination');
      if (stats) {
        const rect = stats.getBoundingClientRect();
        // Calculate the absolute document Y position for the exact center of the stats hole
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

  if (!mounted || !heroBox || !statsCenterY) {
    return null;
  }

  // Use clientWidth to exclude Windows scrollbar width, ensuring perfect horizontal flex centering
  const vw = document.documentElement.clientWidth || window.innerWidth;
  const vh = window.innerHeight;

  // Starting position: center of the hero white box
  const startX = heroBox.left + heroBox.width / 2;
  const startY = heroBox.top + heroBox.height / 2;
  const startSize = Math.min(heroBox.width, heroBox.height) * 0.7;

  // End position: center of viewport (globe stays fixed here)
  const endX = vw / 2;
  const endY = vh * 0.5;
  const endSize = Math.min(vw, vh) * 0.75;

  // Phase 1: Hero to Stats (0 to 0.85vh)
  const p1 = Math.min(1, Math.max(0, scrollY / (vh * 0.85)));
  const eased = 1 - Math.pow(1 - p1, 3);
  
  const currentX = startX + (endX - startX) * eased;
  const currentSize = startSize + (endSize - startSize) * eased;

  // SEAMLESS DOM HANDOFF:
  // JS scroll listeners always lag the native DOM by 1 frame, causing the globe to "bounce" out of the mask.
  // To fix this, we calculate exactly when the fixed globe aligns with the actual physical DOM element.
  // At that exact pixel, we switch it to `absolute` positioning. 
  // From then on, native browser rendering takes over and it stays pixel-perfectly glued inside the hole!
  const switchScrollY = statsCenterY - endY;
  const isNativeScrolling = scrollY >= switchScrollY;

  const position = isNativeScrolling ? 'absolute' : 'fixed';
  
  // If fixed, we interpolate it down from the hero. 
  // If absolute, we lock its Y strictly to the physical document center of the StatsSection!
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
        {/* Scale image 1.12x to push the black fringe outside the clip circle, rotate infinitely */}
        <div className="w-full h-full relative animate-globe-spin" style={{ transform: 'scale(1.12)' }}>
          <Image
            src="/images/globe.webp"
            alt="Earth"
            fill
            className="object-cover"
            priority
            sizes="(max-width: 768px) 80vw, 60vw"
          />
        </div>
      </div>
    </div>
  );
}
