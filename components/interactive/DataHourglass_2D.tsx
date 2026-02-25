'use client';

import { useState } from 'react';

/**
 * Data Hourglass Interactive Visualization (2D Illustrated)
 * Clean technical diagram showing data creation vs processing bottleneck
 * Pure CSS/SVG - no 3D dependencies
 */

type HourglassMode = 'explorer' | 'comparison' | 'timeline' | 'scenarios';

interface DataHourglassProps {
  mode?: HourglassMode;
}

export default function DataHourglass({ mode: _mode = 'explorer' }: DataHourglassProps) {
  const [topFillLevel, setTopFillLevel] = useState(75); // Data creation volume (high)
  const [bottomFillLevel, setBottomFillLevel] = useState(25); // Processing/consumption (lower)

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-slate-50 to-white py-12 md:py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            The Data Bottleneck
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            We create data faster than we can process it. The hourglass shows the fundamental
            tension between volume (creation) and velocity (throughput).
          </p>
        </div>

        {/* Main hourglass visualization */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left: Hourglass illustration */}
          <div className="relative">
            <svg
              viewBox="0 0 300 500"
              className="w-full max-w-sm mx-auto"
              style={{ filter: 'drop-shadow(0 4px 20px rgba(0,0,0,0.08))' }}
            >
              <defs>
                {/* Top chamber fill gradient (data creation) */}
                <linearGradient id="topFill" x1="0%" y1="100%" x2="0%" y2="0%">
                  <stop offset="0%" stopColor="#0EA5E9" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#0EA5E9" stopOpacity="0.4" />
                </linearGradient>

                {/* Bottom chamber fill gradient (processing) */}
                <linearGradient id="bottomFill" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#10B981" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#10B981" stopOpacity="0.4" />
                </linearGradient>

                {/* Particle gradient */}
                <radialGradient id="particleGradient">
                  <stop offset="0%" stopColor="#F5F5DC" stopOpacity="1" />
                  <stop offset="100%" stopColor="#F5F5DC" stopOpacity="0.4" />
                </radialGradient>
              </defs>

              {/* Hourglass outline */}
              <g stroke="#CBD5E1" strokeWidth="2" fill="none">
                {/* Top chamber */}
                <path d="M 50 20 L 250 20 L 250 180 L 150 240 L 50 180 Z" />

                {/* Bottom chamber */}
                <path d="M 50 260 L 150 260 L 250 320 L 250 480 L 50 480 Z" />
              </g>

              {/* Top chamber fill (data creation volume) */}
              <clipPath id="topClip">
                <path d="M 50 20 L 250 20 L 250 180 L 150 240 L 50 180 Z" />
              </clipPath>
              <rect
                x="50"
                y={20 + (180 - (180 * topFillLevel / 100))}
                width="200"
                height={180 * topFillLevel / 100}
                fill="url(#topFill)"
                clipPath="url(#topClip)"
                className="transition-all duration-1000"
              />

              {/* Bottom chamber fill (processing/consumption) */}
              <clipPath id="bottomClip">
                <path d="M 50 260 L 150 260 L 250 320 L 250 480 L 50 480 Z" />
              </clipPath>
              <rect
                x="50"
                y={480 - (220 * bottomFillLevel / 100)}
                width="200"
                height={220 * bottomFillLevel / 100}
                fill="url(#bottomFill)"
                clipPath="url(#bottomClip)"
                className="transition-all duration-1000"
              />

              {/* Bottleneck (middle narrowing) */}
              <rect
                x="140"
                y="235"
                width="20"
                height="30"
                fill="#F59E0B"
                opacity="0.6"
                className="animate-bottleneck-pulse"
              />

              {/* Flowing particles through bottleneck */}
              {[...Array(8)].map((_, i) => (
                <circle
                  key={i}
                  cx="150"
                  cy="0"
                  r="3"
                  fill="url(#particleGradient)"
                  className={`animate-particle-flow-${i}`}
                />
              ))}

              {/* Labels */}
              <g fontSize="12" fontFamily="system-ui" fill="#64748B">
                <text x="150" y="10" textAnchor="middle" fontWeight="600">Data Creation</text>
                <text x="150" y="495" textAnchor="middle" fontWeight="600">Processing</text>
              </g>
            </svg>

            {/* Bottleneck indicator */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <div className="bg-amber-500/20 backdrop-blur-sm border border-amber-500/40 rounded-full px-3 py-1 text-xs font-medium text-amber-700 whitespace-nowrap">
                Throughput Bottleneck
              </div>
            </div>
          </div>

          {/* Right: Legend and explanation */}
          <div className="space-y-6">
            {/* Top Chamber */}
            <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="w-4 h-4 rounded bg-cyan-500 mt-1" />
                <div className="flex-1">
                  <h3 className="font-semibold text-slate-900 mb-2">
                    Top: Data Creation (Volume)
                  </h3>
                  <p className="text-sm text-slate-600 mb-3">
                    Humanity creates 175 zettabytes of data annually—lakes full of rice grains.
                    This chamber fills faster than we can empty it.
                  </p>
                  <div className="flex items-center gap-3">
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={topFillLevel}
                      onChange={(e) => setTopFillLevel(Number(e.target.value))}
                      className="flex-1 h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-cyan-500"
                    />
                    <span className="text-sm font-mono text-slate-700 w-12">{topFillLevel}%</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottleneck */}
            <div className="bg-amber-50 rounded-xl p-6 border border-amber-200 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="w-4 h-4 rounded bg-amber-500 mt-1" />
                <div>
                  <h3 className="font-semibold text-amber-900 mb-2">
                    Middle: Processing Bottleneck
                  </h3>
                  <p className="text-sm text-amber-800">
                    The narrow middle represents processing capacity—our ability to analyze,
                    extract insights, and make decisions from all that data. This is the constraint.
                  </p>
                </div>
              </div>
            </div>

            {/* Bottom Chamber */}
            <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="w-4 h-4 rounded bg-emerald-500 mt-1" />
                <div className="flex-1">
                  <h3 className="font-semibold text-slate-900 mb-2">
                    Bottom: Consumption (Insights)
                  </h3>
                  <p className="text-sm text-slate-600 mb-3">
                    What actually gets processed, analyzed, and turned into actionable insights.
                    Much smaller than what we create.
                  </p>
                  <div className="flex items-center gap-3">
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={bottomFillLevel}
                      onChange={(e) => setBottomFillLevel(Number(e.target.value))}
                      className="flex-1 h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-emerald-500"
                    />
                    <span className="text-sm font-mono text-slate-700 w-12">{bottomFillLevel}%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Insight callout */}
        <div className="mt-12 max-w-2xl mx-auto bg-slate-900 text-white rounded-xl p-8 text-center">
          <p className="text-lg leading-relaxed">
            <strong className="text-[#D97D42]">The paradox:</strong> We&apos;re drowning in data but starving
            for insights. The bottleneck isn&apos;t storage—it&apos;s our ability to process and act on what we collect.
          </p>
        </div>
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes bottleneck-pulse {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 0.8; }
        }

        @keyframes particle-flow {
          0% { cy: 200; opacity: 0; }
          20% { opacity: 1; }
          80% { opacity: 1; }
          100% { cy: 280; opacity: 0; }
        }

        .animate-bottleneck-pulse {
          animation: bottleneck-pulse 2s ease-in-out infinite;
        }

        .animate-particle-flow-0 { animation: particle-flow 3s ease-in-out infinite 0s; }
        .animate-particle-flow-1 { animation: particle-flow 3s ease-in-out infinite 0.4s; }
        .animate-particle-flow-2 { animation: particle-flow 3s ease-in-out infinite 0.8s; }
        .animate-particle-flow-3 { animation: particle-flow 3s ease-in-out infinite 1.2s; }
        .animate-particle-flow-4 { animation: particle-flow 3s ease-in-out infinite 1.6s; }
        .animate-particle-flow-5 { animation: particle-flow 3s ease-in-out infinite 2s; }
        .animate-particle-flow-6 { animation: particle-flow 3s ease-in-out infinite 2.4s; }
        .animate-particle-flow-7 { animation: particle-flow 3s ease-in-out infinite 2.8s; }
      `}</style>
    </div>
  );
}
