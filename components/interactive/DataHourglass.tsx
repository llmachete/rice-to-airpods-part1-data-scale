'use client';

import { useRef, useEffect, useState, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

/**
 * Data Hourglass Interactive Visualization
 *
 * A 3D interactive hourglass showing the bottleneck between data creation (volume)
 * and data processing (velocity/throughput).
 *
 * Features:
 * - Three distinct chambers (top: creation, middle: processing, bottom: consumption)
 * - Particle physics simulation (rice grains flowing through bottleneck)
 * - Interactive sliders (volume + throughput)
 * - Real-time transfer time calculations
 * - Four modes: Explorer, Comparison, Timeline, Scenarios
 */

// Types for configuration
type HourglassMode = 'explorer' | 'comparison' | 'timeline' | 'scenarios';

interface DataHourglassProps {
  mode?: HourglassMode;
}

// Particle system configuration
const PARTICLE_COUNT = 2000; // Will scale based on device performance
const PARTICLE_SIZE = 0.02;
const GRAVITY = -0.5;
const FLOW_RATE_BASE = 0.05;

// Hourglass geometry parameters
const TOP_RADIUS = 1.5;
const MIDDLE_RADIUS = 0.3; // Bottleneck
const BOTTOM_RADIUS = 1.5;
const CHAMBER_HEIGHT = 2;
const TOTAL_HEIGHT = CHAMBER_HEIGHT * 3;

/**
 * Particle System Component
 * Manages the rice grain particles flowing through the hourglass
 */
function ParticleSystem({
  volume,
  throughput
}: {
  volume: number;
  throughput: number;
}) {
  const particlesRef = useRef<THREE.Points>(null);
  const velocities = useRef<THREE.Vector3[]>([]);
  const positions = useMemo(() => new Float32Array(PARTICLE_COUNT * 3), []);

  // Initialize particle positions and velocities
  useEffect(() => {
    velocities.current = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const idx = i * 3;
      // Start particles in top chamber
      const radius = Math.random() * TOP_RADIUS;
      const angle = Math.random() * Math.PI * 2;

      positions[idx] = Math.cos(angle) * radius;
      positions[idx + 1] = CHAMBER_HEIGHT * 2 + Math.random() * CHAMBER_HEIGHT;
      positions[idx + 2] = Math.sin(angle) * radius;

      velocities.current.push(new THREE.Vector3(0, -0.01, 0));
    }

    if (particlesRef.current) {
      particlesRef.current.geometry.attributes.position.needsUpdate = true;
    }
  }, [positions]);

  // Animate particles
  useFrame((state, delta) => {
    if (!particlesRef.current) return;

    const positionAttribute = particlesRef.current.geometry.attributes.position;
    const flowRate = FLOW_RATE_BASE * throughput;

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const idx = i * 3;
      const x = positions[idx];
      const y = positions[idx + 1];
      const z = positions[idx + 2];

      const velocity = velocities.current[i];

      // Determine which chamber the particle is in
      const distanceFromCenter = Math.sqrt(x * x + z * z);

      // Top chamber (y > CHAMBER_HEIGHT * 2)
      if (y > CHAMBER_HEIGHT * 2) {
        // Particles fall toward the middle
        velocity.y += GRAVITY * delta * volume;

        // Check if particle should enter middle chamber
        if (distanceFromCenter < MIDDLE_RADIUS && y < CHAMBER_HEIGHT * 2.2) {
          velocity.y *= flowRate; // Throttle by throughput
        }
      }
      // Middle chamber (bottleneck) (CHAMBER_HEIGHT < y < CHAMBER_HEIGHT * 2)
      else if (y > CHAMBER_HEIGHT) {
        // Constrained flow through bottleneck
        if (distanceFromCenter > MIDDLE_RADIUS) {
          // Push particle back toward center
          const pushX = -x * 0.1;
          const pushZ = -z * 0.1;
          velocity.x += pushX;
          velocity.z += pushZ;
        }

        // Slow downward flow based on throughput
        velocity.y = -flowRate * 0.5;
      }
      // Bottom chamber (y < CHAMBER_HEIGHT)
      else {
        // Particles spread out in bottom chamber
        velocity.y += GRAVITY * delta * 0.2;

        // Reset particles that hit the bottom
        if (y < 0) {
          // Respawn at top
          const radius = Math.random() * TOP_RADIUS;
          const angle = Math.random() * Math.PI * 2;

          positions[idx] = Math.cos(angle) * radius;
          positions[idx + 1] = CHAMBER_HEIGHT * 2 + Math.random() * CHAMBER_HEIGHT;
          positions[idx + 2] = Math.sin(angle) * radius;

          velocity.set(0, -0.01, 0);
          continue;
        }
      }

      // Apply velocity
      positions[idx] += velocity.x * delta * 60;
      positions[idx + 1] += velocity.y * delta * 60;
      positions[idx + 2] += velocity.z * delta * 60;

      // Damping
      velocity.multiplyScalar(0.99);
    }

    positionAttribute.needsUpdate = true;
  });

  // Create geometry with position attribute
  const geometry = useMemo(() => {
    const geom = new THREE.BufferGeometry();
    geom.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    return geom;
  }, [positions]);

  return (
    <points ref={particlesRef} geometry={geometry}>
      <pointsMaterial
        size={PARTICLE_SIZE}
        color="#D47E45" // LLMachete warm orange
        sizeAttenuation
        transparent
        opacity={0.8}
      />
    </points>
  );
}

/**
 * Hourglass Geometry Component
 * Renders the glass container structure
 */
function HourglassGeometry() {
  const topChamberRef = useRef<THREE.Mesh>(null);
  const middleChamberRef = useRef<THREE.Mesh>(null);
  const bottomChamberRef = useRef<THREE.Mesh>(null);

  return (
    <group>
      {/* Top Chamber (Creation) */}
      <mesh ref={topChamberRef} position={[0, CHAMBER_HEIGHT * 2.5, 0]}>
        <cylinderGeometry args={[TOP_RADIUS, TOP_RADIUS, CHAMBER_HEIGHT, 32]} />
        <meshStandardMaterial
          color="#0E5A61" // LLMachete deep teal
          transparent
          opacity={0.2}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Middle Chamber (Processing/Bottleneck) */}
      <mesh ref={middleChamberRef} position={[0, CHAMBER_HEIGHT * 1.5, 0]}>
        <cylinderGeometry args={[MIDDLE_RADIUS, MIDDLE_RADIUS, CHAMBER_HEIGHT, 32]} />
        <meshStandardMaterial
          color="#D47E45" // LLMachete warm orange
          transparent
          opacity={0.3}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Bottom Chamber (Consumption) */}
      <mesh ref={bottomChamberRef} position={[0, CHAMBER_HEIGHT * 0.5, 0]}>
        <cylinderGeometry args={[BOTTOM_RADIUS, BOTTOM_RADIUS, CHAMBER_HEIGHT, 32]} />
        <meshStandardMaterial
          color="#0E5A61" // LLMachete deep teal
          transparent
          opacity={0.2}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Wireframe outline for better visibility */}
      <lineSegments position={[0, CHAMBER_HEIGHT * 2.5, 0]}>
        <edgesGeometry args={[new THREE.CylinderGeometry(TOP_RADIUS, TOP_RADIUS, CHAMBER_HEIGHT, 32)]} />
        <lineBasicMaterial color="#0E5A61" opacity={0.4} transparent />
      </lineSegments>

      <lineSegments position={[0, CHAMBER_HEIGHT * 1.5, 0]}>
        <edgesGeometry args={[new THREE.CylinderGeometry(MIDDLE_RADIUS, MIDDLE_RADIUS, CHAMBER_HEIGHT, 32)]} />
        <lineBasicMaterial color="#D47E45" opacity={0.6} transparent />
      </lineSegments>

      <lineSegments position={[0, CHAMBER_HEIGHT * 0.5, 0]}>
        <edgesGeometry args={[new THREE.CylinderGeometry(BOTTOM_RADIUS, BOTTOM_RADIUS, CHAMBER_HEIGHT, 32)]} />
        <lineBasicMaterial color="#0E5A61" opacity={0.4} transparent />
      </lineSegments>
    </group>
  );
}

/**
 * Main Data Hourglass Component
 */
export default function DataHourglass({ mode = 'explorer' }: DataHourglassProps) {
  const [volume, setVolume] = useState(1.0); // 0.1 to 2.0 (multiplier for data creation rate)
  const [throughput, setThroughput] = useState(1.0); // 0.1 to 2.0 (multiplier for processing capacity)
  const [transferTime, setTransferTime] = useState(0);

  // Calculate transfer time based on volume and throughput
  useEffect(() => {
    // Simplified calculation: transfer time = volume / throughput
    // In reality, this would be: (data size in bytes) / (network bandwidth in bytes/sec)
    const time = (volume / throughput) * 100; // Scale to reasonable seconds
    setTransferTime(time);
  }, [volume, throughput]);

  return (
    <div className="w-full h-screen relative">
      {/* 3D Canvas */}
      <div className="absolute inset-0">
        <Canvas
          camera={{ position: [5, 4, 5], fov: 50 }}
          className="bg-gradient-to-b from-slate-50 to-slate-100"
        >
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} />
          <pointLight position={[-10, -10, -10]} intensity={0.5} />

          <HourglassGeometry />
          <ParticleSystem volume={volume} throughput={throughput} />

          <OrbitControls
            enablePan={false}
            enableZoom={true}
            minDistance={3}
            maxDistance={15}
            maxPolarAngle={Math.PI / 1.5}
          />
        </Canvas>
      </div>

      {/* UI Controls Overlay */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 bg-white/90 backdrop-blur rounded-lg shadow-xl p-6 max-w-2xl w-full mx-4">
        <h3 className="text-2xl font-bold text-slate-900 mb-4 text-center">
          Data Hourglass Explorer
        </h3>

        <div className="space-y-6">
          {/* Volume Slider */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-semibold text-slate-700">
                Data Volume (Creation Rate)
              </label>
              <span className="text-sm text-slate-600">
                {(volume * 100).toFixed(0)}%
              </span>
            </div>
            <input
              type="range"
              min="10"
              max="200"
              value={volume * 100}
              onChange={(e) => setVolume(parseInt(e.target.value) / 100)}
              className="w-full h-2 bg-teal-200 rounded-lg appearance-none cursor-pointer accent-teal-600"
            />
            <p className="text-xs text-slate-500 mt-1">
              How fast data is being created (top chamber fills faster)
            </p>
          </div>

          {/* Throughput Slider */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-semibold text-slate-700">
                Processing Throughput (Network Bandwidth)
              </label>
              <span className="text-sm text-slate-600">
                {(throughput * 100).toFixed(0)}%
              </span>
            </div>
            <input
              type="range"
              min="10"
              max="200"
              value={throughput * 100}
              onChange={(e) => setThroughput(parseInt(e.target.value) / 100)}
              className="w-full h-2 bg-orange-200 rounded-lg appearance-none cursor-pointer accent-orange-600"
            />
            <p className="text-xs text-slate-500 mt-1">
              How fast data can be processed (middle bottleneck widens/narrows)
            </p>
          </div>

          {/* Metrics Display */}
          <div className="grid grid-cols-3 gap-4 pt-4 border-t border-slate-200">
            <div className="text-center">
              <div className="text-2xl font-bold text-teal-600">
                {volume.toFixed(1)}x
              </div>
              <div className="text-xs text-slate-600">Creation Rate</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">
                {throughput.toFixed(1)}x
              </div>
              <div className="text-xs text-slate-600">Throughput</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-slate-900">
                {transferTime.toFixed(0)}s
              </div>
              <div className="text-xs text-slate-600">Transfer Time</div>
            </div>
          </div>

          {/* Queue Status */}
          {volume > throughput && (
            <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-lg">
              <p className="text-sm text-amber-800">
                ⚠️ <strong>Queue Building:</strong> Data is being created faster than it can be processed.
                Notice the particles backing up at the bottleneck.
              </p>
            </div>
          )}

          {volume < throughput && (
            <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-sm text-green-800">
                ✓ <strong>Excess Capacity:</strong> Processing throughput exceeds creation rate.
                The system can handle more data.
              </p>
            </div>
          )}
        </div>

        {/* Mode Switcher (Future Enhancement) */}
        {/* <div className="mt-6 flex justify-center gap-2">
          <button className="px-4 py-2 bg-teal-600 text-white rounded">Explorer</button>
          <button className="px-4 py-2 bg-slate-200 text-slate-600 rounded">Comparison</button>
          <button className="px-4 py-2 bg-slate-200 text-slate-600 rounded">Timeline</button>
          <button className="px-4 py-2 bg-slate-200 text-slate-600 rounded">Scenarios</button>
        </div> */}
      </div>

      {/* Chamber Labels */}
      <div className="absolute top-8 right-8 bg-white/90 backdrop-blur rounded-lg shadow-lg p-4 max-w-xs">
        <h4 className="text-sm font-bold text-slate-900 mb-2">Hourglass Chambers</h4>
        <div className="space-y-2 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-teal-600 rounded-full"></div>
            <span className="text-slate-700"><strong>Top:</strong> Data Creation (Volume)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-orange-600 rounded-full"></div>
            <span className="text-slate-700"><strong>Middle:</strong> Processing (Throughput)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-teal-600 rounded-full"></div>
            <span className="text-slate-700"><strong>Bottom:</strong> Consumption (Insights)</span>
          </div>
        </div>
      </div>
    </div>
  );
}
