'use client';

import React, { useRef } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import * as THREE from 'three';

interface EarthProps {
  scrollProgress?: number;
  scaleFactor?: number;
}

export function RealisticEarth({ scrollProgress = 0, scaleFactor = 1.0 }: EarthProps) {
  const earthGroupRef = useRef<THREE.Group>(null);
  const surfaceRef = useRef<THREE.Mesh>(null);

  // Load clean 360 Earth texture generated directly from globe.webp (No black patches)
  const globeTexture = useLoader(THREE.TextureLoader, '/images/earth_globe_texture.jpg');
  globeTexture.colorSpace = THREE.SRGBColorSpace;
  globeTexture.anisotropy = 16;

  useFrame((state, delta) => {
    if (earthGroupRef.current) {
      // Natural 23.5-degree axial tilt, completely still (no rotation)
      earthGroupRef.current.rotation.z = (23.5 * Math.PI) / 180;

      // Optional scroll growth when in scroll stage
      const targetScale = scaleFactor * THREE.MathUtils.lerp(1.0, 1.6, scrollProgress);
      earthGroupRef.current.scale.setScalar(
        THREE.MathUtils.damp(earthGroupRef.current.scale.x, targetScale, 4.0, delta)
      );
    }
  });

  return (
    <group ref={earthGroupRef} position={[0, 0, 0]}>
      {/* Photorealistic Earth Globe from globe.webp (No black patches, no blue layer, still) */}
      <mesh ref={surfaceRef}>
        <sphereGeometry args={[1.25, 64, 64]} />
        <meshStandardMaterial
          map={globeTexture}
          roughness={0.65}
          metalness={0.08}
        />
      </mesh>
    </group>
  );
}
