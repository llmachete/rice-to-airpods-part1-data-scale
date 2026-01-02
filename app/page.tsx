'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import ScrollySection from '@/components/ScrollySection';

// Dynamic import for 3D components (client-side only)
const Visual1_RiceGrain = dynamic(
  () => import('@/components/visualizations/Visual1_RiceGrain'),
  { ssr: false, loading: () => <div className="text-slate-400">Loading visualization...</div> }
);

const Visual7_ResourceComparison = dynamic(
  () => import('@/components/visualizations/Visual7_ResourceComparison'),
  { ssr: false, loading: () => <div className="text-slate-400">Loading visualization...</div> }
);

const Visual5_Timeline = dynamic(
  () => import('@/components/visualizations/Visual5_Timeline'),
  { ssr: false, loading: () => <div className="text-slate-400">Loading visualization...</div> }
);

export default function Home() {
  const [currentStep, setCurrentStep] = useState(0);
  const [currentVisual, setCurrentVisual] = useState<string | null>(null);

  const handleStepEnter = (response: { index: number; element: HTMLElement }) => {
    setCurrentStep(response.index);
    const visualId = response.element.getAttribute('data-visual');
    if (visualId) {
      setCurrentVisual(visualId);
    }
  };

  return (
    <main className="relative bg-slate-50">
      {/* Header */}
      <header className="min-h-screen flex flex-col justify-center items-center px-6 text-center bg-gradient-to-b from-slate-50 to-white">
        <h1 className="text-5xl md:text-7xl font-bold text-slate-900 mb-6">
          From Rice to AirPods
        </h1>
        <p className="text-xl md:text-2xl text-slate-600 max-w-3xl mb-4">
          Part 1: Data Scale
        </p>
        <p className="text-lg text-slate-500 max-w-2xl">
          Understanding the transformation from kilobytes to zettabytes through a single grain of rice
        </p>
        <div className="mt-12 text-slate-400 animate-bounce">
          ↓ Scroll to explore ↓
        </div>
      </header>

      {/* Scrollytelling Container */}
      <div className="relative">
        {/* Sticky Visualization Panel */}
        <div className="sticky top-0 h-screen flex items-center justify-center bg-white">
          <div className="w-full h-full flex items-center justify-center">
            {currentVisual === 'visual-1' && (
              <div className="w-full h-full relative">
                <Visual1_RiceGrain />
              </div>
            )}
            {currentVisual === 'visual-7' && (
              <div className="w-full h-full relative">
                <Visual7_ResourceComparison />
              </div>
            )}
            {currentVisual === 'visual-5' && (
              <div className="w-full h-full relative">
                <Visual5_Timeline />
              </div>
            )}
            {!currentVisual && (
              <div className="text-center text-slate-400">
                <p>Scroll to begin the journey</p>
              </div>
            )}
          </div>
        </div>

        {/* Scrolling Content */}
        <ScrollySection onStepEnter={handleStepEnter} offset={0.5}>
          {/* Section 1: Hold This in Your Hand */}
          <div className="relative">
            <div
              className="scroll-step min-h-screen flex items-center"
              data-visual="visual-1"
            >
              <div className="max-w-2xl mx-auto px-6 py-12 bg-white/80 backdrop-blur rounded-lg">
                <h2 className="text-4xl font-bold text-slate-900 mb-6">
                  Hold This in Your Hand
                </h2>
                <p className="text-lg text-slate-700 leading-relaxed mb-4">
                  Hold out your hand. I'm going to give you a single grain of rice.
                </p>
                <p className="text-lg text-slate-700 leading-relaxed mb-4">
                  This grain represents <strong>one byte of data</strong>—the atomic unit
                  of our digital revolution. It's tiny. Insignificant on its own.
                  Easy to hold, easy to count.
                </p>
                <p className="text-lg text-slate-700 leading-relaxed">
                  But what happens when that single grain becomes a cup?
                  A container? An ocean?
                </p>
              </div>
            </div>

            <div
              className="scroll-step min-h-screen flex items-center"
              data-visual="visual-1"
            >
              <div className="max-w-2xl mx-auto px-6 py-12 bg-white/80 backdrop-blur rounded-lg">
                <h3 className="text-3xl font-bold text-slate-900 mb-6">
                  Rice as First GPT
                </h3>
                <p className="text-lg text-slate-700 leading-relaxed mb-4">
                  Ten thousand years ago, rice cultivation was humanity's first
                  General Purpose Technology. It spread from China, enabled civilization,
                  created population density, built cities.
                </p>
                <p className="text-lg text-slate-700 leading-relaxed">
                  Ten thousand years later: ChatGPT. Same acronym. Same pattern
                  of fundamental transformation. Coincidence? Perhaps. But the
                  pattern is unmistakable.
                </p>
              </div>
            </div>
          </div>

          {/* Section 2: Data as New Resource */}
          <div className="relative">
            <div
              className="scroll-step min-h-screen flex items-center"
              data-visual="visual-7"
            >
              <div className="max-w-2xl mx-auto px-6 py-12 bg-white/80 backdrop-blur rounded-lg">
                <h2 className="text-4xl font-bold text-slate-900 mb-6">
                  Data as a New Kind of Resource
                </h2>
                <p className="text-lg text-slate-700 leading-relaxed mb-4">
                  For most of human history, resources were tangible: oil, gold,
                  timber, steel. Physical things you could touch, measure, transport.
                </p>
                <p className="text-lg text-slate-700 leading-relaxed">
                  Data breaks all the old rules. It's (sort of) tangible.
                  Not finite. Not rivalrous. Yet it requires massive physical
                  infrastructure—data centers, fiber optics, satellites.
                </p>
              </div>
            </div>
          </div>

          {/* Section 3: Historical Timeline */}
          <div className="relative">
            <div
              className="scroll-step min-h-screen flex items-center"
              data-visual="visual-5"
            >
              <div className="max-w-2xl mx-auto px-6 py-12 bg-white/80 backdrop-blur rounded-lg">
                <h2 className="text-4xl font-bold text-slate-900 mb-6">
                  The Scale Shift Nobody Prepared Us For
                </h2>
                <p className="text-lg text-slate-700 leading-relaxed mb-4">
                  In 1981, the IBM PC launched with 64 KB of RAM. Sixty-four thousand
                  bytes. You could count the grains.
                </p>
                <p className="text-lg text-slate-700 leading-relaxed mb-4">
                  In 2025, humanity creates <strong>175 zettabytes</strong> of data
                  annually. That's 175 followed by 21 zeros.
                </p>
                <p className="text-lg text-slate-700 leading-relaxed">
                  The gap between those two numbers—from countable to incomprehensible—
                  happened in just 44 years.
                </p>
              </div>
            </div>

            <div
              className="scroll-step min-h-screen flex items-center"
              data-visual="visual-5"
            >
              <div className="max-w-2xl mx-auto px-6 py-12 bg-white/80 backdrop-blur rounded-lg">
                <h3 className="text-3xl font-bold text-slate-900 mb-6">
                  Exponential Growth
                </h3>
                <p className="text-lg text-slate-700 leading-relaxed">
                  This timeline shows the exponential acceleration from kilobytes
                  in the 1980s to zettabytes today. Not linear. Not gradual.
                  Exponential. And most of that growth happened in the last decade.
                </p>
              </div>
            </div>
          </div>

          {/* Closing Section */}
          <div className="scroll-step min-h-screen flex items-center">
            <div className="max-w-2xl mx-auto px-6 py-12 bg-white/80 backdrop-blur rounded-lg">
              <h2 className="text-4xl font-bold text-slate-900 mb-6">
                The Pacific Ocean in Your Pocket
              </h2>
              <p className="text-lg text-slate-700 leading-relaxed mb-4">
                That single grain of rice we started with? Your smartphone processes
                the equivalent of shipping containers full of rice every hour.
              </p>
              <p className="text-lg text-slate-700 leading-relaxed">
                From one grain to an ocean. That's the journey we just took.
                And it's the journey humanity has made in less than half a century.
              </p>
            </div>
          </div>
        </ScrollySection>
      </div>

      {/* Footer */}
      <footer className="min-h-[50vh] flex items-center justify-center bg-slate-900 text-white">
        <div className="text-center px-6">
          <p className="text-xl mb-4">Part of the "From Rice to AirPods" series</p>
          <p className="text-slate-400">Built with Next.js • Three.js • D3.js • Scrollama</p>
          <p className="text-slate-500 mt-4">LLMachete © 2025</p>
        </div>
      </footer>
    </main>
  );
}
