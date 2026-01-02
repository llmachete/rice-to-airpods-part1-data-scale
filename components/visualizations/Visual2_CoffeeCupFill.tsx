'use client';

import { useEffect, useRef, useState } from 'react';

interface Visual2Props {
  progress?: number; // 0 to 1, driven by scroll
}

/**
 * Visual 2: Coffee Cup Fill (Kilobyte)
 * Scroll-driven particle system filling a coffee cup from 0 to 1,000 grains (1 KB)
 */
export default function Visual2_CoffeeCupFill({ progress = 0 }: Visual2Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [fillProgress, setFillProgress] = useState(0);
  const [grainCount, setGrainCount] = useState(0);
  const animationFrameRef = useRef<number | undefined>(undefined);

  // Update fill progress from scroll
  useEffect(() => {
    setFillProgress(progress);
  }, [progress]);

  // Update grain count based on fill progress
  useEffect(() => {
    setGrainCount(Math.floor(fillProgress * 1000));
  }, [fillProgress]);

  // Canvas animation for rice grains
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    // Coffee cup dimensions (centered)
    const cupWidth = 180;
    const cupHeight = 220;
    const cupX = (width - cupWidth) / 2;
    const cupY = height - cupHeight - 60;

    // Rice grain particles
    const particles: { x: number; y: number; size: number; opacity: number }[] = [];
    const maxParticles = 200; // Visual representation (not actual 1000 for performance)

    // Generate particles based on fill progress
    const particleCount = Math.floor(fillProgress * maxParticles);

    for (let i = 0; i < particleCount; i++) {
      // Random position within cup boundaries
      const randomX = cupX + 20 + Math.random() * (cupWidth - 40);

      // Fill from bottom up based on progress
      const fillHeight = fillProgress * (cupHeight - 40);
      const randomY = cupY + cupHeight - 20 - Math.random() * fillHeight;

      particles.push({
        x: randomX,
        y: randomY,
        size: 2 + Math.random() * 2,
        opacity: 0.6 + Math.random() * 0.4,
      });
    }

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw coffee cup (SVG-style with gradient)
      ctx.save();

      // Cup body (trapezoid shape)
      ctx.beginPath();
      ctx.moveTo(cupX + 20, cupY); // Top left
      ctx.lineTo(cupX + cupWidth - 20, cupY); // Top right
      ctx.lineTo(cupX + cupWidth - 10, cupY + cupHeight); // Bottom right
      ctx.lineTo(cupX + 10, cupY + cupHeight); // Bottom left
      ctx.closePath();

      // Cup gradient
      const gradient = ctx.createLinearGradient(cupX, cupY, cupX, cupY + cupHeight);
      gradient.addColorStop(0, '#FFFFFF');
      gradient.addColorStop(1, '#F0F0F0');
      ctx.fillStyle = gradient;
      ctx.fill();

      // Cup outline
      ctx.strokeStyle = '#888888';
      ctx.lineWidth = 3;
      ctx.stroke();

      // Cup handle
      ctx.beginPath();
      ctx.arc(cupX + cupWidth - 5, cupY + cupHeight / 2, 25, -Math.PI / 2, Math.PI / 2, false);
      ctx.strokeStyle = '#888888';
      ctx.lineWidth = 3;
      ctx.stroke();

      ctx.restore();

      // Draw rice grain particles
      particles.forEach((particle) => {
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(245, 245, 220, ${particle.opacity})`; // Beige rice color
        ctx.fill();

        // Subtle outline for depth
        ctx.strokeStyle = `rgba(220, 220, 200, ${particle.opacity * 0.5})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [fillProgress]);

  // This component will be controlled by scroll progress from parent
  // No auto-animation needed

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-8 bg-gradient-to-b from-slate-50 to-white">
      {/* Title */}
      <div className="mb-6 text-center">
        <h3 className="text-2xl font-bold text-slate-900 mb-2">
          The Coffee Cup
        </h3>
        <p className="text-sm text-slate-600">
          1,000 grains of rice = 1 Kilobyte
        </p>
      </div>

      {/* Canvas container */}
      <div className="relative">
        <canvas
          ref={canvasRef}
          width={400}
          height={400}
          className="border border-slate-200 rounded-lg bg-white shadow-lg"
        />

        {/* Grain counter overlay */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white/90 backdrop-blur px-6 py-3 rounded-full shadow-lg border border-slate-200">
          <div className="text-center">
            <div className="text-3xl font-bold text-slate-900">
              {grainCount.toLocaleString()}
            </div>
            <div className="text-xs text-slate-600 mt-1">
              {grainCount < 1000 ? 'grains' : 'grains (1 KB)'}
            </div>
          </div>
        </div>
      </div>

      {/* Progress indicator */}
      <div className="mt-6 w-64">
        <div className="bg-slate-200 h-2 rounded-full overflow-hidden">
          <div
            className="bg-blue-500 h-full transition-all duration-100"
            style={{ width: `${fillProgress * 100}%` }}
          />
        </div>
        <div className="flex justify-between text-xs text-slate-500 mt-2">
          <span>Empty</span>
          <span>{Math.floor(fillProgress * 100)}%</span>
          <span>1 KB</span>
        </div>
      </div>

      {/* Info text */}
      <div className="mt-6 max-w-md text-center text-sm text-slate-600">
        <p>
          A kilobyte (1,000 bytes) is roughly the size of a short email or half a page of text.
          In the 1980s, computers had just 64 KB of memory—64 coffee cups worth of rice.
        </p>
      </div>
    </div>
  );
}
