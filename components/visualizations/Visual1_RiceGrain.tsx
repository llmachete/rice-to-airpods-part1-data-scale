'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

/**
 * 3D Rice Grain Component
 * A simple ellipsoid representing a single grain of rice
 */
function RiceGrain() {
  const meshRef = useRef<THREE.Mesh>(null);

  // Auto-rotate the rice grain
  useFrame((state, delta) => {
    if (meshRef.current) {
      // Slow rotation on Y-axis (5-second loop)
      meshRef.current.rotation.y += delta * 0.3;
      // Subtle wobble for organic feel
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  // Create rice grain geometry (elongated sphere)
  const geometry = useMemo(() => {
    const geo = new THREE.SphereGeometry(1, 32, 32);
    // Scale to rice grain proportions (length:width ≈ 3:1)
    geo.scale(0.3, 1, 0.5);
    return geo;
  }, []);

  return (
    <mesh ref={meshRef} geometry={geometry} castShadow receiveShadow>
      {/* Realistic rice material */}
      <meshStandardMaterial
        color="#F5F5DC" // Beige/cream color
        roughness={0.7}
        metalness={0.1}
      />
    </mesh>
  );
}

/**
 * Visual 1: Single Rice Grain
 * 3D visualization with auto-rotation and optional user interaction
 */
export default function Visual1_RiceGrain() {
  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [3, 2, 3], fov: 50 }}
        shadows
        className="bg-gradient-to-b from-slate-50 to-white"
      >
        {/* Lighting */}
        <ambientLight intensity={0.5} />
        <directionalLight
          position={[5, 5, 5]}
          intensity={1}
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />
        <spotLight
          position={[-5, 5, 2]}
          intensity={0.3}
          angle={0.3}
          penumbra={1}
        />

        {/* Rice Grain */}
        <RiceGrain />

        {/* Optional: Ground plane for shadow */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.5, 0]} receiveShadow>
          <planeGeometry args={[10, 10]} />
          <shadowMaterial opacity={0.2} />
        </mesh>

        {/* Camera Controls (optional drag rotation) */}
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate={false}
          minPolarAngle={Math.PI / 3}
          maxPolarAngle={Math.PI / 2}
        />
      </Canvas>

      {/* Overlay Text */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center">
        <p className="text-sm text-slate-600 bg-white/80 backdrop-blur px-4 py-2 rounded-full">
          1 grain = 1 byte of data
        </p>
      </div>
    </div>
  );
}
