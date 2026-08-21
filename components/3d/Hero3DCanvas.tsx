'use client';

import React, { useEffect, useState, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import * as THREE from 'three';
import { Hero3DScene } from './Hero3DScene';
import { Hero3DPlaceholder } from './Hero3DPlaceholder';

interface Hero3DCanvasProps {
  isReady?: boolean;
  scrollProgress?: number;
  scaleFactor?: number;
  className?: string;
}

export default function Hero3DCanvas({
  isReady = true,
  scrollProgress = 0,
  scaleFactor = 1.0,
  className = '',
}: Hero3DCanvasProps) {
  const [reducedMotion, setReducedMotion] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);

    const handleMotionChange = (e: MediaQueryListEvent) => {
      setReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handleMotionChange);

    return () => {
      mediaQuery.removeEventListener('change', handleMotionChange);
    };
  }, []);

  if (!mounted || reducedMotion) {
    return <Hero3DPlaceholder />;
  }

  return (
    <div
      className={`relative w-full h-full min-h-[440px] select-none ${className}`}
      aria-label="3D Earth Globe"
      role="img"
    >
      <Canvas
        camera={{ position: [0, 0, 4.2], fov: 42 }}
        dpr={[1, 2]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.1,
          outputColorSpace: THREE.SRGBColorSpace,
        }}
      >
        <Suspense fallback={null}>
          <Hero3DScene
            isReady={isReady}
            scrollProgress={scrollProgress}
            scaleFactor={scaleFactor}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
