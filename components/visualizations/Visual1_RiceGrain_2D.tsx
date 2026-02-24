'use client';

/**
 * Visual 1: Single Rice Grain (2D Illustrated)
 * Apple-style technical illustration with subtle micro-animations
 * Pure CSS/SVG - no 3D dependencies
 */
export default function Visual1_RiceGrain() {
  return (
    <div className="w-full h-full relative bg-gradient-to-b from-slate-50 to-white flex items-center justify-center overflow-hidden">
      {/* Ambient background elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(212,126,69,0.02),transparent_50%)]" />

      {/* Main rice grain illustration */}
      <div className="relative">
        {/* Shadow (positioned behind grain) */}
        <div className="absolute top-[60%] left-1/2 -translate-x-1/2 w-48 h-8 bg-slate-900/5 rounded-full blur-xl animate-shadow-pulse" />

        {/* SVG Rice Grain */}
        <svg
          viewBox="0 0 200 400"
          className="w-32 md:w-48 lg:w-56 h-auto animate-grain-float"
          style={{
            filter: 'drop-shadow(0 10px 30px rgba(0,0,0,0.08))',
          }}
        >
          {/* Gradient definitions */}
          <defs>
            {/* Main grain gradient */}
            <linearGradient id="grainGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFFEF7" />
              <stop offset="50%" stopColor="#F5F5DC" />
              <stop offset="100%" stopColor="#E8E4D0" />
            </linearGradient>

            {/* Highlight gradient */}
            <radialGradient id="highlightGradient" cx="30%" cy="30%">
              <stop offset="0%" stopColor="rgba(255,255,255,0.9)" />
              <stop offset="50%" stopColor="rgba(255,255,255,0.4)" />
              <stop offset="100%" stopColor="rgba(255,255,255,0)" />
            </radialGradient>

            {/* Shimmer animation */}
            <linearGradient id="shimmer" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(255,255,255,0)" />
              <stop offset="50%" stopColor="rgba(255,255,255,0.6)" />
              <stop offset="100%" stopColor="rgba(255,255,255,0)" />
              <animate
                attributeName="x1"
                values="-100%;200%"
                dur="3s"
                repeatCount="indefinite"
              />
              <animate
                attributeName="x2"
                values="0%;300%"
                dur="3s"
                repeatCount="indefinite"
              />
            </linearGradient>
          </defs>

          {/* Rice grain shape (elongated ellipse) */}
          <ellipse
            cx="100"
            cy="200"
            rx="60"
            ry="180"
            fill="url(#grainGradient)"
            stroke="#D47E45"
            strokeWidth="2"
            strokeOpacity={0.4}
          />

          {/* Subtle texture lines */}
          <path
            d="M 60 120 Q 100 140, 140 120"
            stroke="#E8E4D0"
            strokeWidth="1"
            fill="none"
            opacity="0.4"
          />
          <path
            d="M 55 280 Q 100 260, 145 280"
            stroke="#E8E4D0"
            strokeWidth="1"
            fill="none"
            opacity="0.4"
          />

          {/* Highlight overlay */}
          <ellipse
            cx="100"
            cy="200"
            rx="60"
            ry="180"
            fill="url(#highlightGradient)"
            opacity="0.6"
          />

          {/* Animated shimmer */}
          <ellipse
            cx="100"
            cy="200"
            rx="60"
            ry="180"
            fill="url(#shimmer)"
            opacity="0.3"
          />
        </svg>
      </div>

      {/* Callout label */}
      <div className="absolute bottom-12 md:bottom-16 left-1/2 transform -translate-x-1/2">
        <div className="bg-white/90 backdrop-blur-sm border border-[#F0E7E0] rounded-full px-6 py-3 shadow-lg">
          <div className="flex items-center gap-3">
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-light text-[#1A2332]">1</span>
              <span className="text-sm text-[#0E5A61]">grain</span>
            </div>
            <div className="w-px h-6 bg-[#F0E7E0]" />
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-light text-[#1A2332]">1</span>
              <span className="text-sm text-[#0E5A61]">byte</span>
            </div>
          </div>
        </div>
      </div>

      {/* Technical annotation line (optional) */}
      <div className="absolute top-1/3 right-8 md:right-16 hidden md:block">
        <div className="flex items-center gap-3 text-[#0E5A61] text-sm">
          <div className="h-px w-16 bg-[#F0E7E0]" />
          <div className="text-xs">
            <div className="font-medium text-[#1A2332]">Grain of rice</div>
            <div className="text-[#197A83]">~7mm × 2mm</div>
          </div>
        </div>
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes grain-float {
          0%, 100% {
            transform: translateY(0) rotate(-2deg);
          }
          50% {
            transform: translateY(-12px) rotate(2deg);
          }
        }

        @keyframes shadow-pulse {
          0%, 100% {
            opacity: 0.05;
            transform: translateX(-50%) scale(1);
          }
          50% {
            opacity: 0.08;
            transform: translateX(-50%) scale(1.1);
          }
        }

        @keyframes grain-scale {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.02);
          }
        }

        .animate-grain-float {
          animation: grain-float 6s ease-in-out infinite,
                     grain-scale 4s ease-in-out infinite;
        }

        .animate-shadow-pulse {
          animation: shadow-pulse 6s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
