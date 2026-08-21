'use client';

import React, { Suspense } from 'react';
import { RealisticEarth } from './RealisticEarth';

interface SceneProps {
  isReady?: boolean;
  scrollProgress?: number;
  scaleFactor?: number;
}

export function Hero3DScene({ isReady = true, scrollProgress = 0, scaleFactor = 1.0 }: SceneProps) {
  return (
    <>
      {/* Studio Lighting */}
      <ambientLight intensity={0.9} />

      {/* Solar Directional Light */}
      <directionalLight
        position={[6, 7, 5]}
        intensity={2.8}
        color="#FFFFFF"
      />

      {/* Soft Fill Light */}
      <directionalLight
        position={[-5, -2, -3]}
        intensity={0.8}
        color="#CBD5E1"
      />

      <Suspense fallback={null}>
        <RealisticEarth
          scrollProgress={scrollProgress}
          scaleFactor={scaleFactor}
        />
      </Suspense>
    </>
  );
}
