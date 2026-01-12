'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

interface TopNavBarProps {
  /**
   * Current scroll progress (0-1)
   */
  scrollProgress?: number;
}

/**
 * Three-section top navigation bar for Rice to AirPods article
 *
 * Section 1 (Left): LLMachete Wordmark + Logo
 * Section 2 (Center): Data Scale Indicator (shows current scale context as you scroll)
 * Section 3 (Right): Reading Progress Bar (fills as you progress through article)
 */
export default function TopNavBar({ scrollProgress = 0 }: TopNavBarProps) {
  const [currentScale, setCurrentScale] = useState<{
    name: string;
    icon: string;
    color: string;
  }>({
    name: 'Byte',
    icon: '○',
    color: 'text-blue-500'
  });

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Update current scale based on scroll position
  useEffect(() => {
    if (!mounted) return;

    // Determine which section user is currently viewing based on scroll progress
    if (scrollProgress < 0.15) {
      setCurrentScale({
        name: 'Byte',
        icon: '○',
        color: 'text-blue-500'
      });
    } else if (scrollProgress < 0.25) {
      setCurrentScale({
        name: 'Kilobyte',
        icon: '☕',
        color: 'text-amber-600'
      });
    } else if (scrollProgress < 0.45) {
      setCurrentScale({
        name: 'Gigabyte',
        icon: '📦',
        color: 'text-slate-700'
      });
    } else if (scrollProgress < 0.75) {
      setCurrentScale({
        name: 'Zettabyte',
        icon: '🌊',
        color: 'text-blue-600'
      });
    } else {
      setCurrentScale({
        name: 'In Your Pocket',
        icon: '📱',
        color: 'text-purple-600'
      });
    }
  }, [scrollProgress, mounted]);

  if (!mounted) return null;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm">
      <div className="mx-auto h-16 flex items-stretch">
        {/* Section 1: LLMachete Wordmark + Logo (Left) */}
        <div className="flex items-center px-4 md:px-6 border-r border-slate-200 min-w-[200px] md:min-w-[240px]">
          <div className="flex items-center space-x-2">
            {/* Logo (machete icon) */}
            <div className="flex items-center justify-center w-8 h-8 md:w-10 md:h-10 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 shadow-md">
              <span className="text-white text-xl md:text-2xl font-bold transform -rotate-45">
                🔪
              </span>
            </div>

            {/* Wordmark */}
            <div className="flex flex-col">
              <span className="text-base md:text-lg font-bold text-slate-900 leading-none tracking-tight">
                LLMachete
              </span>
              <span className="text-[10px] md:text-xs text-slate-500 leading-none">
                Rice to AirPods
              </span>
            </div>
          </div>
        </div>

        {/* Section 2: Data Scale Indicator (Center) */}
        <div className="flex-1 flex items-center justify-center px-4 border-r border-slate-200">
          <div className="flex items-center space-x-2 md:space-x-3">
            {/* Scale Icon */}
            <span className="text-xl md:text-2xl" role="img" aria-label={currentScale.name}>
              {currentScale.icon}
            </span>

            {/* Scale Name */}
            <div className="flex flex-col">
              <span className="text-xs text-slate-500 leading-none mb-0.5 hidden md:block">
                Current Scale:
              </span>
              <span className={`text-sm md:text-base font-semibold ${currentScale.color} leading-none`}>
                {currentScale.name}
              </span>
            </div>
          </div>
        </div>

        {/* Section 3: Reading Progress Bar (Right) */}
        <div className="flex items-center px-4 md:px-6 min-w-[140px] md:min-w-[180px]">
          <div className="flex-1">
            {/* Progress Label */}
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] md:text-xs text-slate-500 font-medium">
                Progress
              </span>
              <span className="text-[10px] md:text-xs text-slate-600 font-semibold">
                {Math.round(scrollProgress * 100)}%
              </span>
            </div>

            {/* Progress Bar */}
            <div className="relative h-2 bg-slate-200 rounded-full overflow-hidden">
              <div
                className="absolute top-0 left-0 h-full bg-gradient-to-r from-emerald-500 via-teal-500 to-blue-500 rounded-full transition-all duration-300 ease-out"
                style={{
                  width: `${scrollProgress * 100}%`,
                  boxShadow: scrollProgress > 0.05 ? '0 0 8px rgba(16, 185, 129, 0.4)' : 'none'
                }}
                role="progressbar"
                aria-valuenow={Math.round(scrollProgress * 100)}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label="Reading progress"
              />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
