'use client';

import { useEffect, useState } from 'react';

/**
 * Visual 6: AirPods Pro Cross-Section (2D Illustrated)
 * Apple-style technical diagram with animated data streams
 * Pure CSS/SVG - no 3D dependencies
 */
export default function Visual6_AirPodsCutaway() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  return (
    <div className="w-full h-full bg-gradient-to-b from-slate-900 to-slate-800 relative overflow-hidden">
      {/* Content container */}
      <div className="absolute inset-0 flex items-center justify-center">
        {/* Main illustration container */}
        <div className="relative w-full max-w-2xl px-8">
          {/* SVG Illustration */}
          <svg
            viewBox="0 0 400 600"
            className="w-full h-auto"
            style={{ filter: 'drop-shadow(0 10px 40px rgba(0,0,0,0.3))' }}
          >
            <defs>
              {/* Gradient for AirPod body */}
              <linearGradient id="airpodGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
                <stop offset="100%" stopColor="#E5E5E5" stopOpacity="0.9" />
              </linearGradient>

              {/* H2 Chip glow */}
              <radialGradient id="chipGlow">
                <stop offset="0%" stopColor="#197A83" stopOpacity="0.8" />
                <stop offset="70%" stopColor="#197A83" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#197A83" stopOpacity="0" />
              </radialGradient>

              {/* Data stream gradient */}
              <linearGradient id="streamGradient" x1="0%" y1="100%" x2="0%" y2="0%">
                <stop offset="0%" stopColor="#D47E45" stopOpacity="0.2" />
                <stop offset="50%" stopColor="#D47E45" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#D47E45" stopOpacity="0.2" />
              </linearGradient>
            </defs>

            {/* AirPod Stem (main body) */}
            <rect
              x="160"
              y="200"
              width="80"
              height="280"
              rx="40"
              fill="url(#airpodGradient)"
              stroke="#D1D5DB"
              strokeWidth="1"
              opacity="0.85"
            />

            {/* Earbud (top sphere, cut away to show interior) */}
            <path
              d="M 160 200 Q 160 100, 200 80 Q 240 100, 240 200 Z"
              fill="url(#airpodGradient)"
              stroke="#D1D5DB"
              strokeWidth="1"
              opacity="0.7"
            />

            {/* Interior cavity (cutaway view) */}
            <ellipse
              cx="200"
              cy="140"
              rx="30"
              ry="50"
              fill="#1F2937"
              opacity="0.3"
            />

            {/* H2 Chip (center, glowing) */}
            <g className={mounted ? "animate-chip-pulse" : ""}>
              {/* Glow effect */}
              <circle cx="200" cy="300" r="35" fill="url(#chipGlow)" opacity="0.6" />

              {/* Chip itself */}
              <rect
                x="180"
                y="280"
                width="40"
                height="40"
                rx="4"
                fill="#197A83"
                stroke="#0E5A61"
                strokeWidth="2"
              />

              {/* Chip details */}
              <line x1="185" y1="300" x2="215" y2="300" stroke="#F0F9FF" strokeWidth="1" opacity="0.5" />
              <line x1="200" y1="285" x2="200" y2="315" stroke="#F0F9FF" strokeWidth="1" opacity="0.5" />
            </g>

            {/* Speaker (top) */}
            <g>
              <rect x="190" y="80" width="20" height="8" rx="2" fill="#374151" />
              <circle cx="193" cy="84" r="1.5" fill="#6B7280" />
              <circle cx="197" cy="84" r="1.5" fill="#6B7280" />
              <circle cx="201" cy="84" r="1.5" fill="#6B7280" />
              <circle cx="205" cy="84" r="1.5" fill="#6B7280" />
            </g>

            {/* Microphone (bottom) */}
            <circle cx="200" cy="470" r="6" fill="#374151" />
            <circle cx="200" cy="470" r="3" fill="#6B7280" />

            {/* Data stream paths (animated) */}
            {mounted && (
              <>
                {/* Stream 1: Microphone → H2 */}
                <path
                  d="M 200 465 L 200 320"
                  stroke="url(#streamGradient)"
                  strokeWidth="8"
                  fill="none"
                  strokeLinecap="round"
                  className="animate-stream-flow-1"
                  opacity="0.6"
                />

                {/* Stream 2: H2 → Speaker */}
                <path
                  d="M 200 280 L 200 95"
                  stroke="url(#streamGradient)"
                  strokeWidth="8"
                  fill="none"
                  strokeLinecap="round"
                  className="animate-stream-flow-2"
                  opacity="0.6"
                />

                {/* Particle effects (small circles flowing) */}
                {[...Array(5)].map((_, i) => (
                  <circle
                    key={`particle-${i}`}
                    cx="200"
                    cy="0"
                    r="3"
                    fill="#D47E45"
                    className={`animate-particle-${i + 1}`}
                  />
                ))}
              </>
            )}

            {/* Component labels */}
            <g className="text-slate-400" fontSize="11" fontFamily="system-ui">
              {/* Speaker label */}
              <text x="230" y="85" fill="#94A3B8">Speaker</text>
              <line x1="220" y1="84" x2="228" y2="84" stroke="#475569" strokeWidth="1" />

              {/* H2 Chip label */}
              <text x="250" y="305" fill="#94A3B8" fontWeight="600">H2 Chip</text>
              <line x1="220" y1="300" x2="248" y2="300" stroke="#475569" strokeWidth="1" />

              {/* Microphone label */}
              <text x="230" y="475" fill="#94A3B8">Microphone</text>
              <line x1="210" y1="470" x2="228" y2="470" stroke="#475569" strokeWidth="1" />
            </g>
          </svg>
        </div>
      </div>

      {/* Info overlay (top left) */}
      <div className="absolute top-8 left-8 right-8 pointer-events-none">
        <div className="max-w-md bg-slate-800/90 backdrop-blur-md rounded-xl p-6 border border-slate-700/50 shadow-2xl">
          <h3 className="text-2xl md:text-3xl font-semibold text-white mb-3">
            AirPods Pro • H2 Chip
          </h3>
          <p className="text-slate-300 text-sm md:text-base leading-relaxed mb-4">
            The H2 chip processes <strong className="text-white font-semibold">gigabytes of audio data per hour</strong>
            —the equivalent of shipping containers full of rice grains flowing through a device smaller than a walnut.
          </p>
          <div className="space-y-2 text-xs md:text-sm">
            <div className="flex items-center gap-3 text-slate-400">
              <div className="w-2 h-2 bg-[#D47E45] rounded-full animate-pulse" />
              <span>Real-time audio processing</span>
            </div>
            <div className="flex items-center gap-3 text-slate-400">
              <div className="w-2 h-2 bg-[#D47E45] rounded-full animate-pulse animation-delay-200" />
              <span>Adaptive noise cancellation</span>
            </div>
            <div className="flex items-center gap-3 text-slate-400">
              <div className="w-2 h-2 bg-[#D47E45] rounded-full animate-pulse animation-delay-400" />
              <span>Spatial audio with head tracking</span>
            </div>
          </div>
        </div>
      </div>

      {/* Processing metric (bottom right) */}
      <div className="absolute bottom-8 right-8 pointer-events-none hidden md:block">
        <div className="bg-slate-800/90 backdrop-blur-md rounded-xl px-6 py-4 border border-slate-700/50 shadow-2xl">
          <div className="text-xs text-slate-400 mb-1">Processing Power:</div>
          <div className="text-3xl font-bold text-white">GB/hour</div>
          <div className="text-xs text-slate-500 mt-1">Container-scale data</div>
        </div>
      </div>

      {/* Legend (bottom center) */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 pointer-events-none">
        <div className="bg-slate-800/90 backdrop-blur-md rounded-full px-6 py-3 border border-slate-700/50 shadow-2xl">
          <div className="flex items-center gap-3 text-slate-300 text-xs md:text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#D47E45]" />
              <span>Data streams</span>
            </div>
            <div className="w-px h-4 bg-slate-600" />
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-sm bg-[#197A83]" />
              <span>H2 chip</span>
            </div>
          </div>
        </div>
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes chip-pulse {
          0%, 100% { opacity: 0.9; }
          50% { opacity: 1; }
        }

        @keyframes stream-flow {
          0% { stroke-dasharray: 0 200; }
          50% { stroke-dasharray: 100 100; }
          100% { stroke-dasharray: 200 0; }
        }

        @keyframes particle-flow {
          0% { cy: 465; opacity: 0; }
          10% { opacity: 0.8; }
          90% { opacity: 0.8; }
          100% { cy: 95; opacity: 0; }
        }

        .animate-chip-pulse {
          animation: chip-pulse 2s ease-in-out infinite;
        }

        .animate-stream-flow-1 {
          stroke-dasharray: 200;
          animation: stream-flow 3s ease-in-out infinite;
        }

        .animate-stream-flow-2 {
          stroke-dasharray: 200;
          animation: stream-flow 3s ease-in-out infinite 1.5s;
        }

        .animate-particle-1 {
          animation: particle-flow 2.5s ease-in-out infinite;
        }

        .animate-particle-2 {
          animation: particle-flow 2.5s ease-in-out infinite 0.5s;
        }

        .animate-particle-3 {
          animation: particle-flow 2.5s ease-in-out infinite 1s;
        }

        .animate-particle-4 {
          animation: particle-flow 2.5s ease-in-out infinite 1.5s;
        }

        .animate-particle-5 {
          animation: particle-flow 2.5s ease-in-out infinite 2s;
        }

        .animation-delay-200 {
          animation-delay: 200ms;
        }

        .animation-delay-400 {
          animation-delay: 400ms;
        }
      `}</style>
    </div>
  );
}
