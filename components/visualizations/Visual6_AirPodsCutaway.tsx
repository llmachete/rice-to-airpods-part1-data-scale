'use client';

import { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

/**
 * Particle representing data stream (rice grain)
 */
interface Particle {
  position: THREE.Vector3;
  speed: number;
  offset: number;
}

/**
 * AirPods Model Component
 */
function AirPodsModel() {
  const meshRef = useRef<THREE.Group>(null);
  const particlesRef = useRef<THREE.Points>(null);
  const [particles] = useState<Particle[]>(() => {
    // Create particle stream (200 particles)
    const p: Particle[] = [];
    for (let i = 0; i < 200; i++) {
      p.push({
        position: new THREE.Vector3(),
        speed: 0.01 + Math.random() * 0.02,
        offset: Math.random() * Math.PI * 2,
      });
    }
    return p;
  });

  // Auto-rotate animation
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.2; // Slow rotation
    }

    // Animate particle streams
    if (particlesRef.current) {
      const positions = particlesRef.current.geometry.attributes.position;
      particles.forEach((particle, i) => {
        // Flow path: microphone → H2 chip → speaker
        // Using sine wave for flow effect
        const t = (state.clock.elapsedTime * particle.speed + particle.offset) % 1;
        const x = Math.sin(t * Math.PI * 2) * 0.3;
        const y = (t - 0.5) * 3; // Vertical flow from -1.5 to 1.5
        const z = Math.cos(t * Math.PI) * 0.2;

        positions.setXYZ(i, x, y, z);
      });
      positions.needsUpdate = true;
    }
  });

  // Particle geometry (rice grain sprites)
  const particleGeometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particles.length * 3);
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    return geometry;
  }, [particles.length]);

  return (
    <group ref={meshRef}>
      {/* AirPod Stem (cylinder) */}
      <mesh position={[0, -0.8, 0]} castShadow>
        <cylinderGeometry args={[0.15, 0.2, 2, 16]} />
        <meshStandardMaterial
          color="#F5F5F5"
          roughness={0.3}
          metalness={0.7}
          transparent
          opacity={0.9}
        />
      </mesh>

      {/* AirPod Earbud (sphere with cutaway) */}
      <mesh position={[0, 0.5, 0]} castShadow>
        <sphereGeometry args={[0.5, 32, 32, 0, Math.PI]} />
        <meshStandardMaterial
          color="#F5F5F5"
          roughness={0.3}
          metalness={0.7}
          side={THREE.DoubleSide}
          transparent
          opacity={0.6}
        />
      </mesh>

      {/* H2 Chip (glowing cube in center) */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[0.3, 0.3, 0.3]} />
        <meshStandardMaterial
          color="#0ea5e9"
          emissive="#0ea5e9"
          emissiveIntensity={0.8}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>

      {/* Pulsing glow around chip */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[0.4, 16, 16]} />
        <meshBasicMaterial
          color="#0ea5e9"
          transparent
          opacity={0.2}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Speaker grill (top) */}
      <mesh position={[0, 1.2, 0]}>
        <cylinderGeometry args={[0.15, 0.15, 0.1, 16]} />
        <meshStandardMaterial
          color="#333333"
          roughness={0.7}
          metalness={0.3}
        />
      </mesh>

      {/* Microphone (bottom) */}
      <mesh position={[0, -1.8, 0]}>
        <cylinderGeometry args={[0.08, 0.08, 0.1, 16]} />
        <meshStandardMaterial
          color="#333333"
          roughness={0.7}
          metalness={0.3}
        />
      </mesh>

      {/* Data stream particles (rice grains) */}
      <points ref={particlesRef} geometry={particleGeometry}>
        <pointsMaterial
          size={0.05}
          color="#F5F5DC"
          transparent
          opacity={0.8}
          sizeAttenuation
        />
      </points>
    </group>
  );
}

/**
 * Visual 6: AirPods Cutaway with Data Streams
 */
export default function Visual6_AirPodsCutaway() {
  return (
    <div className="w-full h-full bg-gradient-to-b from-slate-900 to-slate-800">
      {/* 3D Canvas */}
      <Canvas
        camera={{ position: [3, 1, 3], fov: 50 }}
        shadows
        className="w-full h-full"
      >
        {/* Lighting */}
        <ambientLight intensity={0.3} />
        <directionalLight position={[5, 5, 5]} intensity={0.8} castShadow />
        <spotLight position={[-5, 5, 2]} intensity={0.4} />
        <pointLight position={[0, 0, 3]} intensity={0.6} color="#0ea5e9" />

        {/* AirPods Model */}
        <AirPodsModel />

        {/* Controls */}
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate={false}
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={Math.PI / 1.5}
        />
      </Canvas>

      {/* Info Overlay */}
      <div className="absolute top-8 left-8 right-8 pointer-events-none">
        <div className="max-w-md bg-slate-800/80 backdrop-blur rounded-lg p-6 border border-slate-700">
          <h3 className="text-2xl font-bold text-white mb-3">
            AirPods Pro • H2 Chip
          </h3>
          <p className="text-slate-300 text-sm leading-relaxed mb-4">
            The H2 chip processes <strong className="text-white">gigabytes of audio data per hour</strong>
            —the equivalent of shipping containers full of rice grains flowing through
            a device smaller than a walnut.
          </p>
          <div className="space-y-2 text-xs text-slate-400">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
              <span>Real-time audio processing</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
              <span>Adaptive noise cancellation</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
              <span>Spatial audio with head tracking</span>
            </div>
          </div>
        </div>
      </div>

      {/* Data Stream Legend */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 pointer-events-none">
        <div className="bg-slate-800/80 backdrop-blur rounded-full px-6 py-3 border border-slate-700">
          <div className="flex items-center gap-3 text-slate-300 text-sm">
            <div className="w-3 h-3 rounded-full bg-[#F5F5DC]" />
            <span>Data streams (rice grain particles)</span>
          </div>
        </div>
      </div>

      {/* Scale Reference */}
      <div className="absolute bottom-8 right-8 pointer-events-none">
        <div className="bg-slate-800/80 backdrop-blur rounded-lg px-4 py-3 border border-slate-700">
          <div className="text-xs text-slate-400 mb-1">Processing Power:</div>
          <div className="text-lg font-bold text-white">
            GB/hour
          </div>
          <div className="text-xs text-slate-500 mt-1">
            Shipping container-scale
          </div>
        </div>
      </div>
    </div>
  );
}
