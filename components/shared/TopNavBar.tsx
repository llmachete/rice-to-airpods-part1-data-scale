'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

interface TopNavBarProps {
  scrollProgress?: number;
}

/**
 * LLMachete Brand-Compliant Top Navigation Bar
 * Three sections: Brand | Current Scale | Reading Progress
 *
 * Brand Colors (Official Brand Guideline):
 * - Warm Orange (Copper): #D97D42 (primary accent)
 * - Deep Teal: #0E5A61 (brand primary)
 * - Navy: #1A2332 (text/dark)
 * - Sand Beige: #F0E7E0 (light accent)
 *
 * Fonts (Official Brand Guideline):
 * - TeX Gyre Adventor Bold (headings)
 * - TeX Gyre Adventor Regular (body copy)
 * - Franklin Gothic Book (secondary text)
 */
export default function TopNavBar({ scrollProgress = 0 }: TopNavBarProps) {
  const [currentScale, setCurrentScale] = useState<{
    name: string;
    icon: string;
    color: string;
  }>({
    name: 'Byte',
    icon: '○',
    color: 'text-[#0E5A61]' // Deep teal
  });

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true); // eslint-disable-line react-hooks/set-state-in-effect -- hydration gate
  }, []);

  // Update current scale based on scroll position
  useEffect(() => {
    if (!mounted) return;

    if (scrollProgress < 0.15) {
      setCurrentScale({ // eslint-disable-line react-hooks/set-state-in-effect -- derived from scroll prop
        name: 'Byte',
        icon: '○',
        color: 'text-[#0E5A61]'
      });
    } else if (scrollProgress < 0.25) {
      setCurrentScale({
        name: 'Kilobyte',
        icon: '☕',
        color: 'text-[#D97D42]' // Warm Orange (Copper)
      });
    } else if (scrollProgress < 0.45) {
      setCurrentScale({
        name: 'Gigabyte',
        icon: '📦',
        color: 'text-[#197A83]' // Medium teal
      });
    } else if (scrollProgress < 0.75) {
      setCurrentScale({
        name: 'Zettabyte',
        icon: '🌊',
        color: 'text-[#0E5A61]' // Deep teal
      });
    } else {
      setCurrentScale({
        name: 'In Your Pocket',
        icon: '📱',
        color: 'text-[#D97D42]' // Warm Orange (Copper)
      });
    }
  }, [scrollProgress, mounted]);

  if (!mounted) return null;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-[#F0E7E0] shadow-sm">
      <div className="mx-auto h-16 flex items-stretch">
        {/* Section 1: LLMachete Brand (Left) */}
        <div className="flex items-center px-4 md:px-6 border-r border-[#F0E7E0] min-w-[220px] md:min-w-[280px]">
          <a href="https://stories.llmachete.com" className="flex items-center space-x-3 group">
            {/* Logo - Actual angular blade design */}
            <div className="relative w-10 h-10 md:w-12 md:h-12 flex-shrink-0">
              <div className="w-full h-full rounded-lg bg-[#D97D42] flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow">
                <Image
                  src="/llmachete-icon-only.svg"
                  alt="LLMachete"
                  width={32}
                  height={32}
                  className="w-7 h-7 md:w-8 md:h-8"
                  priority
                />
              </div>
            </div>

            {/* Brand Wordmark (Image) + Subtitle */}
            <div className="flex flex-col items-start">
              <Image
                src="/llmachete-wordmark.svg"
                alt="LLMachete"
                width={200}
                height={40}
                className="h-7 md:h-10 w-auto"
                priority
              />
              <span className="text-[10px] md:text-xs text-[#0E5A61] leading-none font-medium mt-0.5 text-left">
                Data Scale
              </span>
            </div>
          </a>
        </div>

        {/* Section 2: Current Scale Indicator (Center) */}
        <div className="flex-1 flex items-center justify-center px-4 border-r border-[#F0E7E0]">
          <div className="flex items-center space-x-2 md:space-x-3">
            {/* Scale Icon */}
            <span className="text-xl md:text-2xl" role="img" aria-label={currentScale.name}>
              {currentScale.icon}
            </span>

            {/* Scale Name */}
            <div className="flex flex-col">
              <span className="text-[10px] text-[#1A2332]/60 leading-none mb-0.5 hidden md:block font-medium uppercase tracking-wide">
                Current Scale
              </span>
              <span className={`text-sm md:text-base font-semibold ${currentScale.color} leading-none`}>
                {currentScale.name}
              </span>
            </div>
          </div>
        </div>

        {/* Section 3: Reading Progress (Right) */}
        <div className="flex items-center px-4 md:px-6 min-w-[140px] md:min-w-[200px]">
          <div className="flex-1">
            {/* Progress Label */}
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[10px] md:text-xs text-[#1A2332]/60 font-medium uppercase tracking-wide">
                Progress
              </span>
              <span className="text-xs md:text-sm text-[#1A2332] font-bold tabular-nums">
                {Math.round(scrollProgress * 100)}%
              </span>
            </div>

            {/* Progress Bar - Brand gradient */}
            <div className="relative h-2 bg-[#F0E7E0] rounded-full overflow-hidden">
              <div
                className="absolute top-0 left-0 h-full rounded-full transition-all duration-300 ease-out"
                style={{
                  width: `${scrollProgress * 100}%`,
                  background: 'linear-gradient(90deg, #D97D42 0%, #197A83 50%, #0E5A61 100%)',
                  boxShadow: scrollProgress > 0.05 ? '0 0 8px rgba(217, 125, 66, 0.4)' : 'none'
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
