'use client';

import { useEffect, useState, useRef, useCallback } from 'react';

interface Visual3Props {
  progress?: number; // 0 to 1, driven by scroll
}

// Design coordinates (all drawing logic uses these)
const BASE_W = 800;
const BASE_H = 600;

/**
 * Visual 3: Shipping Container Zoom (Gigabyte)
 * Dramatic zoom-out transition from coffee cups to shipping container
 */
export default function Visual3_ContainerZoom({ progress = 0 }: Visual3Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [animationProgress, setAnimationProgress] = useState(0);

  useEffect(() => {
    setAnimationProgress(progress);
  }, [progress]);

  // Resize canvas to match container, respecting devicePixelRatio
  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const resize = () => {
      const rect = container.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
    };

    const ro = new ResizeObserver(resize);
    ro.observe(container);
    resize(); // initial sizing

    return () => ro.disconnect();
  }, []);

  // Helper function to draw coffee cup
  const drawCoffeeCup = useCallback(
    (
      ctx: CanvasRenderingContext2D,
      x: number,
      y: number,
      size: number,
      opacity: number = 1
    ) => {
      const cupWidth = size;
      const cupHeight = size * 1.2;

      ctx.save();
      ctx.translate(x, y);

      ctx.beginPath();
      ctx.moveTo(-cupWidth / 2 + 5, -cupHeight / 2);
      ctx.lineTo(cupWidth / 2 - 5, -cupHeight / 2);
      ctx.lineTo(cupWidth / 2, cupHeight / 2);
      ctx.lineTo(-cupWidth / 2, cupHeight / 2);
      ctx.closePath();

      ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
      ctx.fill();
      // Brand: copper cup stroke
      ctx.strokeStyle = `rgba(212, 126, 69, ${opacity})`;
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(cupWidth / 2, 0, size / 4, -Math.PI / 2, Math.PI / 2, false);
      ctx.stroke();

      ctx.restore();
    },
    []
  );

  // Canvas animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Scale factor: map design coordinates to actual canvas pixels
    const sx = canvas.width / BASE_W;
    const sy = canvas.height / BASE_H;

    const draw = () => {
      ctx.save();
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.scale(sx, sy);

      // All coordinates below are in design space (800x600)
      const width = BASE_W;
      const height = BASE_H;

      if (animationProgress < 0.25) {
        // Stage 1: Single coffee cup
        const scale = 1 - animationProgress * 2;
        drawCoffeeCup(ctx, width / 2, height / 2, 80 * scale);
      } else if (animationProgress < 0.5) {
        // Stage 2: Cups multiply into grid
        const gridProgress = (animationProgress - 0.25) * 4;
        const gridSize = Math.floor(1 + gridProgress * 9);
        const cupSize = 40 / gridSize;

        for (let row = 0; row < gridSize; row++) {
          for (let col = 0; col < gridSize; col++) {
            const x = width / 2 + (col - gridSize / 2) * cupSize * 2.5;
            const y = height / 2 + (row - gridSize / 2) * cupSize * 2.5;
            drawCoffeeCup(ctx, x, y, cupSize, 0.5 + gridProgress * 0.5);
          }
        }
      } else if (animationProgress < 0.75) {
        // Stage 3: Zoom out, form container shape
        const zoomProgress = (animationProgress - 0.5) * 4;
        const containerWidth = 300 + zoomProgress * 100;
        const containerHeight = 200 + zoomProgress * 50;

        const dotsX = 30;
        const dotsY = 20;
        const dotSize = 2;

        for (let row = 0; row < dotsY; row++) {
          for (let col = 0; col < dotsX; col++) {
            const x = width / 2 - containerWidth / 2 + (col / dotsX) * containerWidth;
            const y = height / 2 - containerHeight / 2 + (row / dotsY) * containerHeight;

            if (row === 0 || row === dotsY - 1 || col === 0 || col === dotsX - 1) {
              ctx.beginPath();
              ctx.arc(x, y, dotSize, 0, Math.PI * 2);
              // Brand: deep teal dot silhouette
              ctx.fillStyle = `rgba(14, 90, 97, ${0.3 + zoomProgress * 0.7})`;
              ctx.fill();
            }
          }
        }
      } else {
        // Stage 4: Container outline with labels
        const containerWidth = 400;
        const containerHeight = 250;
        const containerX = width / 2 - containerWidth / 2;
        const containerY = height / 2 - containerHeight / 2;
        const labelOpacity = (animationProgress - 0.75) * 4;

        // Brand: copper container outline
        ctx.strokeStyle = '#D47E45';
        ctx.lineWidth = 3;

        // Front face
        ctx.strokeRect(containerX, containerY, containerWidth, containerHeight);

        // Top face (isometric)
        ctx.beginPath();
        ctx.moveTo(containerX, containerY);
        ctx.lineTo(containerX + 50, containerY - 30);
        ctx.lineTo(containerX + containerWidth + 50, containerY - 30);
        ctx.lineTo(containerX + containerWidth, containerY);
        ctx.closePath();
        ctx.stroke();

        // Right face
        ctx.beginPath();
        ctx.moveTo(containerX + containerWidth, containerY);
        ctx.lineTo(containerX + containerWidth + 50, containerY - 30);
        ctx.lineTo(containerX + containerWidth + 50, containerY + containerHeight - 30);
        ctx.lineTo(containerX + containerWidth, containerY + containerHeight);
        ctx.closePath();
        ctx.stroke();

        // Brand: copper→teal fill gradient
        const gradient = ctx.createLinearGradient(containerX, containerY, containerX, containerY + containerHeight);
        gradient.addColorStop(0, 'rgba(212, 126, 69, 0.15)');
        gradient.addColorStop(1, 'rgba(14, 90, 97, 0.15)');
        ctx.fillStyle = gradient;
        ctx.fillRect(containerX, containerY, containerWidth, containerHeight);

        // Brand: copper texture lines
        ctx.strokeStyle = `rgba(212, 126, 69, ${0.2 * labelOpacity})`;
        ctx.lineWidth = 1;
        for (let i = 0; i < 20; i++) {
          const x = containerX + (i / 20) * containerWidth;
          ctx.beginPath();
          ctx.moveTo(x, containerY);
          ctx.lineTo(x, containerY + containerHeight);
          ctx.stroke();
        }

        // Human figure for scale (stick figure)
        if (labelOpacity > 0) {
          const humanX = containerX - 80;
          const humanY = containerY + containerHeight;
          const humanHeight = 60;

          // Brand: deep teal human figure
          ctx.strokeStyle = `rgba(14, 90, 97, ${labelOpacity})`;
          ctx.lineWidth = 2;

          // Head
          ctx.beginPath();
          ctx.arc(humanX, humanY - humanHeight + 10, 8, 0, Math.PI * 2);
          ctx.stroke();

          // Body
          ctx.beginPath();
          ctx.moveTo(humanX, humanY - humanHeight + 18);
          ctx.lineTo(humanX, humanY - 20);
          ctx.stroke();

          // Arms
          ctx.beginPath();
          ctx.moveTo(humanX - 15, humanY - 35);
          ctx.lineTo(humanX, humanY - 40);
          ctx.lineTo(humanX + 15, humanY - 35);
          ctx.stroke();

          // Legs
          ctx.beginPath();
          ctx.moveTo(humanX, humanY - 20);
          ctx.lineTo(humanX - 10, humanY);
          ctx.moveTo(humanX, humanY - 20);
          ctx.lineTo(humanX + 10, humanY);
          ctx.stroke();
        }
      }

      ctx.restore();
    };

    draw();
  }, [animationProgress, drawCoffeeCup]);

  // Calculate stage text based on progress
  const getStageText = () => {
    if (animationProgress < 0.25) {
      return { title: "One Coffee Cup", subtitle: "1,000 bytes (1 KB)" };
    } else if (animationProgress < 0.5) {
      const count = Math.floor(1 + (animationProgress - 0.25) * 4 * 99);
      return { title: `${count} Coffee Cups...`, subtitle: `${count} KB` };
    } else if (animationProgress < 0.75) {
      return { title: "Forming Container...", subtitle: "Scale transition" };
    } else {
      return { title: "Shipping Container", subtitle: "1 Gigabyte (1,000 MB = 1 million KB)" };
    }
  };

  const stageText = getStageText();

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-8 bg-gradient-to-b from-white to-slate-50">
      {/* Title */}
      <div className="mb-6 text-center">
        <h3 className="text-2xl font-bold text-[#1A2332] mb-2 transition-all duration-300">
          {stageText.title}
        </h3>
        <p className="text-sm text-[#0E5A61] transition-all duration-300">
          {stageText.subtitle}
        </p>
      </div>

      {/* Canvas container */}
      <div ref={containerRef} className="relative flex-1 w-full max-w-4xl">
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full border border-[#F0E7E0] rounded-lg bg-white shadow-lg"
        />

        {/* Dimension labels (visible in final stage) */}
        {animationProgress > 0.75 && (
          <div
            className="absolute top-4 right-4 bg-white/90 backdrop-blur rounded-lg px-4 py-3 border border-[#F0E7E0] transition-opacity duration-500"
            style={{ opacity: (animationProgress - 0.75) * 4 }}
          >
            <div className="text-xs text-[#0E5A61] mb-1">20-Foot Container</div>
            <div className="text-sm font-bold text-[#1A2332]">
              6.1m × 2.4m × 2.6m
            </div>
            <div className="text-xs text-[#0E5A61] mt-1">
              ~33 cubic meters
            </div>
          </div>
        )}
      </div>

      {/* Progress indicator */}
      <div className="mt-6 w-64">
        <div className="bg-[#F0E7E0] h-2 rounded-full overflow-hidden">
          <div
            className="bg-[#D47E45] h-full transition-all duration-100"
            style={{ width: `${animationProgress * 100}%` }}
          />
        </div>
        <div className="flex justify-between text-xs text-[#0E5A61] mt-2">
          <span>1 KB</span>
          <span>{Math.floor(animationProgress * 100)}%</span>
          <span>1 GB</span>
        </div>
      </div>

      {/* Info text */}
      <div className="mt-6 max-w-md text-center text-sm text-[#1A2332]">
        <p>
          A gigabyte is 1,000 megabytes or 1 million kilobytes. It&apos;s the scale where
          computing became consumer-friendly in the 2000s—movies, music libraries,
          and entire databases fitting in your pocket.
        </p>
      </div>
    </div>
  );
}
