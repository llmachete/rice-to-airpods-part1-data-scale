'use client';

import { useEffect, useRef, useState, useCallback } from 'react';

interface Visual2Props {
  progress?: number; // 0 to 1, driven by scroll
}

/**
 * Visual 2: Coffee Cup Fill (Kilobyte)
 * Scroll-driven particle system filling a coffee cup from 0 to 1,000 grains (1 KB)
 */
export default function Visual2_CoffeeCupFill({ progress = 0 }: Visual2Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [canvasSize, setCanvasSize] = useState({ width: 400, height: 400 });
  const [fillProgress, setFillProgress] = useState(0);
  const [grainCount, setGrainCount] = useState(0);
  const animationFrameRef = useRef<number | undefined>(undefined);
  const fillProgressRef = useRef(fillProgress);

  // Responsive canvas sizing via ResizeObserver
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width } = entry.contentRect;
        // Keep square aspect ratio, capped at 500px
        const size = Math.min(Math.floor(width), 500);
        if (size > 0) {
          setCanvasSize({ width: size, height: size });
        }
      }
    });

    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  // Update fill progress from scroll
  useEffect(() => {
    setFillProgress(progress);
    fillProgressRef.current = progress;
  }, [progress]);

  // Update grain count based on fill progress
  useEffect(() => {
    setGrainCount(Math.floor(fillProgress * 1000));
  }, [fillProgress]);

  // Stable particle positions via 2D grid + jitter
  const computeParticlePositions = useCallback(
    (
      particleCount: number,
      cupX: number,
      cupY: number,
      cupWidth: number,
      cupHeight: number,
      fillHeight: number
    ) => {
      const positions: { x: number; y: number }[] = [];
      if (particleCount === 0 || fillHeight <= 0) return positions;

      const innerLeft = cupX + 25;
      const innerRight = cupX + cupWidth - 25;
      const innerWidth = innerRight - innerLeft;
      const innerBottom = cupY + cupHeight - 15;
      const innerTop = innerBottom - fillHeight;
      const areaHeight = fillHeight;

      // Compute grid dimensions that fill the area uniformly
      const area = innerWidth * areaHeight;
      const cellSize = Math.sqrt(area / Math.max(particleCount, 1));
      const cols = Math.max(1, Math.floor(innerWidth / cellSize));
      const rows = Math.max(1, Math.ceil(particleCount / cols));
      const spacingX = innerWidth / cols;
      const spacingY = areaHeight / Math.max(rows, 1);

      // Use a seeded-style deterministic jitter (based on index)
      for (let i = 0; i < particleCount; i++) {
        const col = i % cols;
        const row = Math.floor(i / cols);
        // Deterministic pseudo-random jitter from index
        const jitterX = ((i * 7919 + 104729) % 1000) / 1000 - 0.5;
        const jitterY = ((i * 6271 + 88651) % 1000) / 1000 - 0.5;
        const x = innerLeft + (col + 0.5) * spacingX + jitterX * spacingX * 0.6;
        const y = innerTop + (row + 0.5) * spacingY + jitterY * spacingY * 0.6;

        // Clamp within cup bounds
        positions.push({
          x: Math.max(innerLeft, Math.min(innerRight, x)),
          y: Math.max(innerTop, Math.min(innerBottom, y)),
        });
      }

      return positions;
    },
    []
  );

  // Canvas animation for rice grains — runs once, reads fillProgress via ref
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    // Scale cup dimensions relative to canvas size
    const scale = width / 400;
    const cupWidth = 180 * scale;
    const cupHeight = 220 * scale;
    const cupX = (width - cupWidth) / 2;
    const cupY = height - cupHeight - 60 * scale;

    // Pre-compute gradient once
    const gradient = ctx.createLinearGradient(cupX, cupY, cupX, cupY + cupHeight);
    gradient.addColorStop(0, '#FFFFFF');
    gradient.addColorStop(1, '#F0F0F0');

    // Stable particle pool
    const maxParticles = 200;
    const particleSizes: number[] = [];
    const particleOpacities: number[] = [];
    for (let i = 0; i < maxParticles; i++) {
      // Deterministic size/opacity from index
      particleSizes.push(2 * scale + ((i * 3571) % 1000) / 1000 * 2 * scale);
      particleOpacities.push(0.6 + ((i * 8923) % 1000) / 1000 * 0.4);
    }

    const animate = () => {
      const currentFill = fillProgressRef.current;
      const particleCount = Math.floor(currentFill * maxParticles);

      ctx.clearRect(0, 0, width, height);

      // Draw cup body (trapezoid shape)
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(cupX + 20 * scale, cupY);
      ctx.lineTo(cupX + cupWidth - 20 * scale, cupY);
      ctx.lineTo(cupX + cupWidth - 10 * scale, cupY + cupHeight);
      ctx.lineTo(cupX + 10 * scale, cupY + cupHeight);
      ctx.closePath();
      ctx.fillStyle = gradient;
      ctx.fill();
      ctx.strokeStyle = '#D97D42';
      ctx.lineWidth = 3 * scale;
      ctx.stroke();

      // Cup handle
      ctx.beginPath();
      ctx.arc(
        cupX + cupWidth - 5 * scale,
        cupY + cupHeight / 2,
        25 * scale,
        -Math.PI / 2,
        Math.PI / 2,
        false
      );
      ctx.strokeStyle = '#D97D42';
      ctx.lineWidth = 3 * scale;
      ctx.stroke();
      ctx.restore();

      // Draw particles with 2D grid distribution
      const fillHeight = currentFill * (cupHeight - 40 * scale);
      const positions = computeParticlePositions(
        particleCount,
        cupX,
        cupY,
        cupWidth,
        cupHeight,
        fillHeight
      );

      for (let i = 0; i < positions.length; i++) {
        const { x, y } = positions[i];
        const opacity = particleOpacities[i];
        const size = particleSizes[i];

        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(217, 125, 66, ${opacity})`;
        ctx.fill();
        ctx.strokeStyle = `rgba(14, 90, 97, ${opacity * 0.5})`;
        ctx.lineWidth = 0.5 * scale;
        ctx.stroke();
      }

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [canvasSize, computeParticlePositions]);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-8 bg-gradient-to-b from-[#F0E7E0]/30 to-white">
      {/* Title */}
      <div className="mb-6 text-center">
        <h3 className="text-2xl font-bold text-[#1A2332] mb-2">
          The Coffee Cup
        </h3>
        <p className="text-sm text-[#0E5A61]">
          1,000 grains of rice = 1 Kilobyte
        </p>
      </div>

      {/* Canvas container — responsive */}
      <div ref={containerRef} className="relative w-full max-w-[500px]">
        <canvas
          ref={canvasRef}
          width={canvasSize.width}
          height={canvasSize.height}
          className="w-full h-auto border border-[#F0E7E0] rounded-lg bg-white shadow-lg"
        />

        {/* Grain counter overlay */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white/90 backdrop-blur px-6 py-3 rounded-full shadow-lg border border-[#F0E7E0]">
          <div className="text-center">
            <div className="text-3xl font-bold text-[#1A2332]">
              {grainCount.toLocaleString()}
            </div>
            <div className="text-xs text-[#0E5A61] mt-1">
              {grainCount < 1000 ? 'grains' : 'grains (1 KB)'}
            </div>
          </div>
        </div>
      </div>

      {/* Progress indicator */}
      <div className="mt-6 w-64">
        <div className="bg-[#F0E7E0] h-2 rounded-full overflow-hidden">
          <div
            className="bg-[#D97D42] h-full transition-all duration-100"
            style={{ width: `${fillProgress * 100}%` }}
          />
        </div>
        <div className="flex justify-between text-xs text-[#0E5A61] mt-2">
          <span>Empty</span>
          <span>{Math.floor(fillProgress * 100)}%</span>
          <span>1 KB</span>
        </div>
      </div>

      {/* Info text */}
      <div className="mt-6 max-w-md text-center text-sm text-[#0E5A61]">
        <p>
          A kilobyte (1,000 bytes) is roughly the size of a short email or half a page of text.
          In the 1980s, computers had just 64 KB of memory—64 coffee cups worth of rice.
        </p>
      </div>
    </div>
  );
}
