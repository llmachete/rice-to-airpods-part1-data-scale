'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

/**
 * Landing page for From Rice to AirPods
 * Allows users to choose between two reading experiences:
 * - Immersive: Full-screen scrollytelling (no navigation chrome)
 * - Article: Guided reading with top navigation bar
 */
export default function LandingPage() {
  const router = useRouter();
  const [hoveredCard, setHoveredCard] = useState<'immersive' | 'article' | null>(null);

  const handleExperienceChoice = (choice: 'immersive' | 'article') => {
    // Track analytics
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'experience_choice', {
        'choice_type': choice,
        'page_location': window.location.href
      });
    }

    // Navigate to chosen experience
    router.push(`/${choice}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50 flex flex-col">
      {/* Header */}
      <header className="pt-12 md:pt-20 pb-8 md:pb-12 px-4 text-center">
        {/* LLMachete Branding */}
        <div className="flex items-center justify-center space-x-2 mb-6">
          <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 shadow-md">
            <span className="text-white text-2xl font-bold transform -rotate-45">🔪</span>
          </div>
          <span className="text-lg font-bold text-slate-900">LLMachete</span>
        </div>

        {/* Title */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-4">
          From Rice to AirPods
        </h1>
        <p className="text-xl md:text-2xl text-slate-600 mb-4">
          Part 1: The Scale of Data in 2025
        </p>
        <p className="text-base md:text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed">
          Understanding humanity's transformation from kilobytes to zettabytes through
          the metaphor of a single grain of rice
        </p>
      </header>

      {/* Experience Chooser */}
      <main className="flex-1 flex items-center justify-center px-4 pb-20">
        <div className="max-w-5xl w-full">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 text-center mb-3">
            Choose Your Journey
          </h2>
          <p className="text-base md:text-lg text-slate-600 text-center mb-12 max-w-2xl mx-auto">
            Two ways to experience the same story. Pick what suits your reading style.
          </p>

          {/* Cards */}
          <div className="grid md:grid-cols-2 gap-6 md:gap-8">
            {/* Immersive Card */}
            <div
              className={`
                relative bg-white rounded-2xl shadow-lg border-2
                transition-all duration-300 cursor-pointer
                ${hoveredCard === 'immersive'
                  ? 'border-blue-500 shadow-2xl scale-105'
                  : 'border-slate-200 hover:border-blue-300'
                }
              `}
              onMouseEnter={() => setHoveredCard('immersive')}
              onMouseLeave={() => setHoveredCard(null)}
              onClick={() => handleExperienceChoice('immersive')}
            >
              <div className="p-8">
                {/* Icon */}
                <div className="mb-6 flex justify-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
                    <span className="text-4xl">📽️</span>
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-2xl font-bold text-slate-900 mb-3 text-center">
                  Immersive Experience
                </h3>

                {/* Description */}
                <p className="text-slate-600 mb-4 text-center leading-relaxed">
                  Pure storytelling. Full-screen scrollytelling with cinematic visualizations
                  and no distractions.
                </p>

                {/* Features */}
                <ul className="space-y-2 mb-6">
                  <li className="flex items-start space-x-2 text-sm text-slate-700">
                    <span className="text-green-500 mt-0.5">✓</span>
                    <span>Full-screen visuals</span>
                  </li>
                  <li className="flex items-start space-x-2 text-sm text-slate-700">
                    <span className="text-green-500 mt-0.5">✓</span>
                    <span>Minimal chrome, maximum focus</span>
                  </li>
                  <li className="flex items-start space-x-2 text-sm text-slate-700">
                    <span className="text-green-500 mt-0.5">✓</span>
                    <span>Cinematic scroll experience</span>
                  </li>
                  <li className="flex items-start space-x-2 text-sm text-slate-700">
                    <span className="text-green-500 mt-0.5">✓</span>
                    <span>12-15 min reading time</span>
                  </li>
                </ul>

                {/* CTA Button */}
                <button
                  className="w-full py-3 px-6 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleExperienceChoice('immersive');
                  }}
                >
                  Launch Immersive →
                </button>

                {/* Best For */}
                <p className="text-xs text-slate-500 text-center mt-4">
                  Best for: Desktop, distraction-free reading
                </p>
              </div>
            </div>

            {/* Article Card */}
            <div
              className={`
                relative bg-white rounded-2xl shadow-lg border-2
                transition-all duration-300 cursor-pointer
                ${hoveredCard === 'article'
                  ? 'border-emerald-500 shadow-2xl scale-105'
                  : 'border-slate-200 hover:border-emerald-300'
                }
              `}
              onMouseEnter={() => setHoveredCard('article')}
              onMouseLeave={() => setHoveredCard(null)}
              onClick={() => handleExperienceChoice('article')}
            >
              <div className="p-8">
                {/* Icon */}
                <div className="mb-6 flex justify-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center shadow-lg">
                    <span className="text-4xl">📄</span>
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-2xl font-bold text-slate-900 mb-3 text-center">
                  Guided Reading
                </h3>

                {/* Description */}
                <p className="text-slate-600 mb-4 text-center leading-relaxed">
                  Article-style with navigation aids. Progress tracking and context awareness
                  as you read.
                </p>

                {/* Features */}
                <ul className="space-y-2 mb-6">
                  <li className="flex items-start space-x-2 text-sm text-slate-700">
                    <span className="text-green-500 mt-0.5">✓</span>
                    <span>Top navigation bar with progress</span>
                  </li>
                  <li className="flex items-start space-x-2 text-sm text-slate-700">
                    <span className="text-green-500 mt-0.5">✓</span>
                    <span>Current scale indicator</span>
                  </li>
                  <li className="flex items-start space-x-2 text-sm text-slate-700">
                    <span className="text-green-500 mt-0.5">✓</span>
                    <span>All same visualizations</span>
                  </li>
                  <li className="flex items-start space-x-2 text-sm text-slate-700">
                    <span className="text-green-500 mt-0.5">✓</span>
                    <span>12-15 min reading time</span>
                  </li>
                </ul>

                {/* CTA Button */}
                <button
                  className="w-full py-3 px-6 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleExperienceChoice('article');
                  }}
                >
                  Start Reading →
                </button>

                {/* Best For */}
                <p className="text-xs text-slate-500 text-center mt-4">
                  Best for: Mobile, multitasking, easier navigation
                </p>
              </div>
            </div>
          </div>

          {/* Help Text */}
          <div className="mt-12 text-center">
            <p className="text-sm text-slate-500 max-w-xl mx-auto">
              Not sure which to choose? Both tell the same story with the same visualizations.
              <strong className="text-slate-700"> Immersive</strong> is cinematic and distraction-free.
              <strong className="text-slate-700"> Guided</strong> adds navigation aids for easier browsing.
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-8 text-center text-slate-500 text-sm border-t border-slate-200">
        <p>Part of the "From Rice to AirPods" series</p>
        <p className="mt-2">LLMachete © 2025</p>
      </footer>
    </div>
  );
}
