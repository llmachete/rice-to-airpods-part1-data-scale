'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Image from 'next/image';
import SeriesIntro from './SeriesIntro';

/**
 * Landing page for From Rice to AirPods
 * Brand-compliant design with LLMachete identity
 *
 * Structure:
 * 1. Header with branding and series title
 * 2. SeriesIntro - Full series introduction
 * 3. Experience Chooser - Immersive vs. Article
 * 4. Footer
 */
export default function LandingPage() {
  const router = useRouter();
  const [hoveredCard, setHoveredCard] = useState<'immersive' | 'article' | null>(null);

  const handleExperienceChoice = (choice: 'immersive' | 'article') => {
    // Track analytics
    if (typeof window !== 'undefined' && (window as Window & { gtag?: (...args: unknown[]) => void }).gtag) {
      (window as Window & { gtag?: (...args: unknown[]) => void }).gtag!('event', 'experience_choice', {
        'choice_type': choice,
        'page_location': window.location.href
      });
    }

    router.push(`/${choice}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F0E7E0]/30 via-white to-[#F0E7E0]/30 flex flex-col">
      {/* Header */}
      <header className="pt-12 md:pt-20 pb-8 md:pb-12 px-4 text-center">
        {/* LLMachete Branding */}
        <div className="flex items-center justify-center space-x-3 mb-8">
          {/* Icon */}
          <div className="w-12 h-12 md:w-14 md:h-14 rounded-lg bg-[#D47E45] flex items-center justify-center shadow-lg">
            <Image
              src="/llmachete-icon-only.svg"
              alt="LLMachete"
              width={40}
              height={40}
              className="w-8 h-8 md:w-9 md:h-9"
            />
          </div>
          {/* Wordmark */}
          <div className="flex flex-col items-start">
            <Image
              src="/llmachete-wordmark.svg"
              alt="LLMachete"
              width={160}
              height={40}
              className="h-6 md:h-8 w-auto"
            />
            <div className="text-xs md:text-sm text-[#0E5A61] mt-0.5">Clarity Through Data</div>
          </div>
        </div>

        {/* Series Title */}
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#1A2332] mb-3">
          From Rice to AirPods
        </h1>
        <p className="text-lg md:text-xl text-[#0E5A61] font-medium">
          A Five-Part Series on Data, Transformation, and the Skills That Matter
        </p>
      </header>

      {/* Series Introduction */}
      <SeriesIntro />

      {/* Experience Chooser */}
      <main className="flex-1 flex items-center justify-center px-4 pb-20">
        <div className="max-w-5xl w-full">

          {/* Cards */}
          <div className="grid md:grid-cols-2 gap-6 md:gap-8">
            {/* Immersive Card */}
            <div
              className={`
                relative bg-white rounded-xl shadow-lg border-2
                transition-all duration-300 cursor-pointer overflow-hidden
                ${hoveredCard === 'immersive'
                  ? 'border-[#0E5A61] shadow-2xl scale-105'
                  : 'border-[#F0E7E0] hover:border-[#197A83]'
                }
              `}
              onMouseEnter={() => setHoveredCard('immersive')}
              onMouseLeave={() => setHoveredCard(null)}
              onClick={() => handleExperienceChoice('immersive')}
            >
              {/* Accent Bar */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#0E5A61] via-[#197A83] to-[#D47E45]" />

              <div className="p-8">
                {/* Icon */}
                <div className="mb-6 flex justify-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-[#0E5A61] to-[#197A83] rounded-2xl flex items-center justify-center shadow-lg">
                    <span className="text-4xl">📽️</span>
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-2xl font-bold text-[#1A2332] mb-3 text-center">
                  Immersive Experience
                </h3>

                {/* Description */}
                <p className="text-[#1A2332]/80 mb-4 text-center leading-relaxed">
                  Full-screen scrollytelling. Cinematic visualizations. No distractions.
                </p>

                {/* Features */}
                <ul className="space-y-2 mb-6">
                  <li className="flex items-start space-x-2 text-sm text-[#1A2332]/80">
                    <span className="text-[#D47E45] mt-0.5 font-bold">✓</span>
                    <span>Full-screen visuals</span>
                  </li>
                  <li className="flex items-start space-x-2 text-sm text-[#1A2332]/80">
                    <span className="text-[#D47E45] mt-0.5 font-bold">✓</span>
                    <span>Zero navigation chrome</span>
                  </li>
                  <li className="flex items-start space-x-2 text-sm text-[#1A2332]/80">
                    <span className="text-[#D47E45] mt-0.5 font-bold">✓</span>
                    <span>Cinematic scroll experience</span>
                  </li>
                  <li className="flex items-start space-x-2 text-sm text-[#1A2332]/80">
                    <span className="text-[#D47E45] mt-0.5 font-bold">✓</span>
                    <span>12-15 min reading time</span>
                  </li>
                </ul>

                {/* CTA Button */}
                <button
                  className="w-full py-3 px-6 bg-gradient-to-r from-[#0E5A61] to-[#197A83] text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleExperienceChoice('immersive');
                  }}
                >
                  Launch Immersive →
                </button>

                {/* Best For */}
                <p className="text-xs text-[#1A2332]/60 text-center mt-4">
                  Best for desktop, distraction-free reading
                </p>
              </div>
            </div>

            {/* Article Card */}
            <div
              className={`
                relative bg-white rounded-xl shadow-lg border-2
                transition-all duration-300 cursor-pointer overflow-hidden
                ${hoveredCard === 'article'
                  ? 'border-[#D47E45] shadow-2xl scale-105'
                  : 'border-[#F0E7E0] hover:border-[#D47E45]/50'
                }
              `}
              onMouseEnter={() => setHoveredCard('article')}
              onMouseLeave={() => setHoveredCard(null)}
              onClick={() => handleExperienceChoice('article')}
            >
              {/* Accent Bar */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#D47E45] via-[#197A83] to-[#0E5A61]" />

              <div className="p-8">
                {/* Icon */}
                <div className="mb-6 flex justify-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-[#D47E45] to-[#197A83] rounded-2xl flex items-center justify-center shadow-lg">
                    <span className="text-4xl">📄</span>
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-2xl font-bold text-[#1A2332] mb-3 text-center">
                  Guided Reading
                </h3>

                {/* Description */}
                <p className="text-[#1A2332]/80 mb-4 text-center leading-relaxed">
                  Article-style with navigation. Progress tracking. Context awareness.
                </p>

                {/* Features */}
                <ul className="space-y-2 mb-6">
                  <li className="flex items-start space-x-2 text-sm text-[#1A2332]/80">
                    <span className="text-[#D47E45] mt-0.5 font-bold">✓</span>
                    <span>Top navigation with progress bar</span>
                  </li>
                  <li className="flex items-start space-x-2 text-sm text-[#1A2332]/80">
                    <span className="text-[#D47E45] mt-0.5 font-bold">✓</span>
                    <span>Current scale indicator</span>
                  </li>
                  <li className="flex items-start space-x-2 text-sm text-[#1A2332]/80">
                    <span className="text-[#D47E45] mt-0.5 font-bold">✓</span>
                    <span>Interactive elements inline</span>
                  </li>
                  <li className="flex items-start space-x-2 text-sm text-[#1A2332]/80">
                    <span className="text-[#D47E45] mt-0.5 font-bold">✓</span>
                    <span>12-15 min reading time</span>
                  </li>
                </ul>

                {/* CTA Button */}
                <button
                  className="w-full py-3 px-6 bg-gradient-to-r from-[#D47E45] to-[#197A83] text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleExperienceChoice('article');
                  }}
                >
                  Start Reading →
                </button>

                {/* Best For */}
                <p className="text-xs text-[#1A2332]/60 text-center mt-4">
                  Best for mobile, multitasking, easier navigation
                </p>
              </div>
            </div>
          </div>

          {/* Help Text */}
          <div className="mt-12 text-center">
            <p className="text-sm text-[#1A2332]/70 max-w-xl mx-auto leading-relaxed">
              Both tell the same story with the same content.
              <strong className="text-[#1A2332]"> Immersive</strong> is cinematic and distraction-free.
              <strong className="text-[#1A2332]"> Guided</strong> adds navigation for easier browsing.
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-8 text-center text-[#1A2332]/60 text-sm border-t border-[#F0E7E0]">
        <p className="font-medium">From Rice to AirPods: Data Scale</p>
        <p className="mt-2">LLMachete © 2025</p>
      </footer>
    </div>
  );
}
