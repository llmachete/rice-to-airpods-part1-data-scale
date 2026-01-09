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

const Visual2_CoffeeCupFill = dynamic(
  () => import('@/components/visualizations/Visual2_CoffeeCupFill'),
  { ssr: false, loading: () => <div className="text-slate-400">Loading visualization...</div> }
);

const Visual6_AirPodsCutaway = dynamic(
  () => import('@/components/visualizations/Visual6_AirPodsCutaway'),
  { ssr: false, loading: () => <div className="text-slate-400">Loading visualization...</div> }
);

const Visual3_ContainerZoom = dynamic(
  () => import('@/components/visualizations/Visual3_ContainerZoom'),
  { ssr: false, loading: () => <div className="text-slate-400">Loading visualization...</div> }
);

const HumorousCounter = dynamic(
  () => import('@/components/interactive/HumorousCounter'),
  { ssr: false }
);

const NapsterTimeMachine = dynamic(
  () => import('@/components/interactive/NapsterTimeMachine'),
  { ssr: false }
);

const SentenceCounter = dynamic(
  () => import('@/components/interactive/SentenceCounter'),
  { ssr: false }
);

const DataHourglass = dynamic(
  () => import('@/components/interactive/DataHourglass'),
  { ssr: false, loading: () => <div className="text-slate-400">Loading hourglass visualization...</div> }
);

const ScrollProgress = dynamic(
  () => import('@/components/shared/ScrollProgress'),
  { ssr: false }
);

const ReflectionZone = dynamic(
  () => import('@/components/shared/ReflectionZone'),
  { ssr: false }
);

const LetThatSinkIn = dynamic(
  () => import('@/components/shared/ReflectionZone').then(mod => ({ default: mod.LetThatSinkIn })),
  { ssr: false }
);

const MajorBreak = dynamic(
  () => import('@/components/shared/ReflectionZone').then(mod => ({ default: mod.MajorBreak })),
  { ssr: false }
);

export default function Home() {
  const [currentStep, setCurrentStep] = useState(0);
  const [currentVisual, setCurrentVisual] = useState<string | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  const handleStepEnter = (response: { index: number; element: HTMLElement }) => {
    setCurrentStep(response.index);
    const visualId = response.element.getAttribute('data-visual');
    if (visualId) {
      setCurrentVisual(visualId);
    }
  };

  const handleStepProgress = (response: { index: number; progress: number }) => {
    setScrollProgress(response.progress);
  };

  return (
    <main className="relative bg-slate-50">
      {/* Header */}
      <header className="min-h-screen flex flex-col justify-center items-center px-4 md:px-6 text-center bg-gradient-to-b from-slate-50 to-white" data-section="intro">
        <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-slate-900 mb-4 md:mb-6">
          From Rice to AirPods
        </h1>
        <p className="text-lg md:text-xl lg:text-2xl text-slate-600 max-w-3xl mb-3 md:mb-4">
          Part 1: The Scale of Data in 2025
        </p>
        <p className="text-base md:text-lg text-slate-500 max-w-xl md:max-w-2xl mb-3 md:mb-4 px-4">
          Understanding the transformation from kilobytes to zettabytes through a single grain of rice
        </p>
        <p className="text-sm md:text-base text-slate-400 max-w-sm md:max-w-xl px-4">
          We've gone from coffee cups to oceans in 40 years. This is the journey humanity made—and why it changes everything.
        </p>
        <div className="mt-8 md:mt-12 text-slate-400 animate-bounce text-sm md:text-base">
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
            {currentVisual === 'visual-2' && (
              <div className="w-full h-full relative">
                <Visual2_CoffeeCupFill progress={scrollProgress} />
              </div>
            )}
            {currentVisual === 'visual-3' && (
              <div className="w-full h-full relative">
                <Visual3_ContainerZoom progress={scrollProgress} />
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
            {currentVisual === 'visual-6' && (
              <div className="w-full h-full relative">
                <Visual6_AirPodsCutaway />
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
        <ScrollySection
          onStepEnter={handleStepEnter}
          onStepProgress={handleStepProgress}
          offset={0.5}
        >
          {/* Section 1: Hold This in Your Hand */}
          <div className="relative">
            <div
              className="scroll-step min-h-[70vh] md:min-h-screen flex items-center"
              data-visual="visual-1"
              data-section="grain"
            >
              <div className="max-w-lg md:max-w-2xl mx-auto px-4 py-6 md:px-6 md:py-12 bg-white/80 backdrop-blur rounded-lg">
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 md:mb-6">
                  Hold This in Your Hand
                </h2>
                <p className="text-base md:text-lg text-slate-700 leading-relaxed mb-3 md:mb-4">
                  Right now, wherever you are reading this, I want you to imagine holding a single grain
                  of rice in your hand. Go ahead—picture it resting on your palm.
                </p>
                <p className="text-base md:text-lg text-slate-700 leading-relaxed mb-3 md:mb-4">
                  It's tiny, nearly weightless, almost insignificant. You could lose it between the cracks
                  of your desk or blow it away with a breath.
                </p>
                <p className="text-base md:text-lg text-slate-700 leading-relaxed mb-3 md:mb-4">
                  That single grain represents <strong>one byte of data</strong>—the atomic unit
                  of everything happening in the digital revolution transforming every industry right now.
                </p>
                <p className="text-base md:text-lg text-slate-700 leading-relaxed">
                  Now here's the question that changes everything: <strong>How many grains of rice do you
                  think humanity creates in data every single day in 2025?</strong>
                </p>
              </div>
            </div>

            <div
              className="scroll-step min-h-[70vh] md:min-h-screen flex items-center"
              data-visual="visual-1"
            >
              <div className="max-w-lg md:max-w-2xl mx-auto px-4 py-6 md:px-6 md:py-12 bg-white/80 backdrop-blur rounded-lg">
                <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4 md:mb-6">
                  Why Physical Analogies Matter
                </h3>
                <p className="text-base md:text-lg text-slate-700 leading-relaxed mb-3 md:mb-4">
                  Data is abstract. You can't hold it, touch it, or see it pile up in a warehouse.
                  When someone tells you "our system processes 50 terabytes per day," what does that
                  actually <em>mean</em>?
                </p>
                <p className="text-base md:text-lg text-slate-700 leading-relaxed mb-3 md:mb-4">
                  This abstraction creates a dangerous knowledge gap. Executives make million-dollar
                  technology investments without truly understanding the scale of what they're managing.
                </p>
                <p className="text-base md:text-lg text-slate-700 leading-relaxed">
                  <strong>We need something you can picture, touch, and scale in your mind's eye.</strong>
                  {' '}Enter the grain of rice.
                </p>
              </div>
            </div>
          </div>

          {/* Section 1.5: Coffee Cup Fill */}
          <div className="relative">
            <div
              className="scroll-step min-h-[70vh] md:min-h-screen flex items-center"
              data-visual="visual-2"
              data-section="cup"
            >
              <div className="max-w-lg md:max-w-2xl mx-auto px-4 py-6 md:px-6 md:py-12 bg-white/80 backdrop-blur rounded-lg">
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 md:mb-6">
                  The Coffee Cup
                </h2>
                <p className="text-base md:text-lg text-slate-700 leading-relaxed mb-3 md:mb-4">
                  Now imagine scooping up about 1,000 grains of rice into a standard coffee cup.
                  That's a <strong>kilobyte (KB)</strong>.
                </p>
                <p className="text-base md:text-lg text-slate-700 leading-relaxed mb-3 md:mb-4">
                  This was the scale of computing in the early 1980s. The Commodore 64,
                  one of the most successful personal computers ever made, had 64 KB of RAM.
                </p>
                <p className="text-base md:text-lg text-slate-700 leading-relaxed">
                  Scroll to fill the cup and watch as we go from a single grain to
                  1,000 grains—the building blocks of the personal computing revolution.
                </p>
              </div>
            </div>
          </div>

          {/* Interactive Feature: Sentence Counter */}
          <div className="scroll-step min-h-[70vh] md:min-h-screen flex items-center">
            <div className="max-w-3xl mx-auto px-6">
              <SentenceCounter />
              <div className="mt-8 text-center text-slate-600 max-w-2xl mx-auto">
                <p className="text-lg leading-relaxed">
                  Did you feel that? That number climbing while you read? That's the velocity
                  of the data revolution. And it never stops.
                </p>
              </div>
            </div>
          </div>

          {/* Reflection Zone: Let that sink in */}
          <LetThatSinkIn>
            From a coffee cup you could hold in your kitchen... to a shipping container requiring forklifts to move.
            <br />
            <br />
            <strong>And we made that leap in about 20 years.</strong>
          </LetThatSinkIn>

          {/* Section 1.75: Shipping Container Zoom */}
          <div className="relative">
            <div
              className="scroll-step min-h-[70vh] md:min-h-screen flex items-center"
              data-visual="visual-3"
              data-section="container"
            >
              <div className="max-w-lg md:max-w-2xl mx-auto px-4 py-6 md:px-6 md:py-12 bg-white/80 backdrop-blur rounded-lg">
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 md:mb-6">
                  The Shipping Container
                </h2>
                <p className="text-base md:text-lg text-slate-700 leading-relaxed mb-3 md:mb-4">
                  Now we make a massive leap. Take <strong>one billion grains of rice</strong>—
                  that's a <strong>gigabyte (GB)</strong>.
                </p>
                <p className="text-base md:text-lg text-slate-700 leading-relaxed mb-3 md:mb-4">
                  Volume: Approximately 50 cubic meters—the size of a standard 20-foot
                  shipping container.
                </p>
                <p className="text-base md:text-lg text-slate-700 leading-relaxed">
                  Scroll to watch as coffee cups multiply and transform into an industrial
                  container. We moved from your kitchen counter to a shipping yard.
                  <strong> And we made that leap in about 20 years.</strong>
                </p>
              </div>
            </div>
          </div>

          {/* Major Break */}
          <MajorBreak />

          {/* Reflection Zone: Interactive Question */}
          <ReflectionZone
            title="Before You Continue"
            content="You just watched a coffee cup transform into a shipping container. That's a 1,000,000× increase in volume."
            question="How many shipping containers do you think fit in your smartphone's storage?"
            options={[
              {
                label: "10-50 containers",
                feedback: "Not quite. Your phone holds much more than that!"
              },
              {
                label: "50-100 containers",
                feedback: "Getting warmer, but think bigger!"
              },
              {
                label: "100-500 containers",
                feedback: "Close! The actual number is even higher."
              },
              {
                label: "500+ containers (many gigabytes)",
                isCorrect: true,
                feedback: "Exactly! A 128 GB iPhone contains the equivalent of 128 shipping containers worth of rice grains. And we carry this in our pockets every day."
              }
            ]}
          />

          {/* Section 2: Data as New Resource */}
          <div className="relative">
            <div
              className="scroll-step min-h-[70vh] md:min-h-screen flex items-center"
              data-visual="visual-7"
              data-section="hourglass"
            >
              <div className="max-w-lg md:max-w-2xl mx-auto px-4 py-6 md:px-6 md:py-12 bg-white/80 backdrop-blur rounded-lg">
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 md:mb-6">
                  Data as a New Kind of Resource
                </h2>
                <p className="text-base md:text-lg text-slate-700 leading-relaxed mb-3 md:mb-4">
                  For most of human history, resources were tangible: oil, gold,
                  timber, steel. Physical things you could touch, measure, transport.
                </p>
                <p className="text-base md:text-lg text-slate-700 leading-relaxed">
                  Data breaks all the old rules. It's (sort of) tangible.
                  Not finite. Not rivalrous. Yet it requires massive physical
                  infrastructure—data centers, fiber optics, satellites.
                </p>
              </div>
            </div>

            {/* Data Hourglass Interactive Visualization */}
            <div className="scroll-step">
              <DataHourglass mode="explorer" />
            </div>
          </div>

          {/* Major Break */}
          <MajorBreak />

          {/* Section 3: Historical Timeline */}
          <div className="relative">
            <div
              className="scroll-step min-h-[70vh] md:min-h-screen flex items-center"
              data-visual="visual-5"
              data-section="ocean"
            >
              <div className="max-w-lg md:max-w-2xl mx-auto px-4 py-6 md:px-6 md:py-12 bg-white/80 backdrop-blur rounded-lg">
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 md:mb-6">
                  The Scale Shift Nobody Prepared Us For
                </h2>
                <p className="text-base md:text-lg text-slate-700 leading-relaxed mb-3 md:mb-4">
                  In 1981, the IBM PC launched with 64 KB of RAM. Sixty-four thousand bytes.
                  You could literally count the grains in 64 coffee cups.
                </p>
                <p className="text-base md:text-lg text-slate-700 leading-relaxed mb-3 md:mb-4">
                  In 2025, humanity creates <strong>175 zettabytes</strong> of data annually.
                  That's 175 followed by 21 zeros. That's <strong>175 lakes worth of rice grains—each
                  lake 2 kilometers long, 1 kilometer wide, 25 meters deep—every single year.</strong>
                </p>
                <p className="text-base md:text-lg text-slate-700 leading-relaxed mb-3 md:mb-4">
                  The gap between those two numbers—from countable to incomprehensible—happened in just 44 years.
                </p>
                <p className="text-base md:text-lg text-slate-700 leading-relaxed">
                  <strong>This isn't linear growth. This isn't even exponential growth in the traditional sense.
                  This is a scale discontinuity</strong>—a fundamental break in how we must think about data as a resource.
                </p>
              </div>
            </div>

            <div
              className="scroll-step min-h-[70vh] md:min-h-screen flex items-center"
              data-visual="visual-5"
            >
              <div className="max-w-lg md:max-w-2xl mx-auto px-4 py-6 md:px-6 md:py-12 bg-white/80 backdrop-blur rounded-lg">
                <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4 md:mb-6">
                  Exponential Growth
                </h3>
                <p className="text-base md:text-lg text-slate-700 leading-relaxed">
                  This timeline shows the exponential acceleration from kilobytes
                  in the 1980s to zettabytes today. Not linear. Not gradual.
                  Exponential. And most of that growth happened in the last decade.
                </p>
              </div>
            </div>
          </div>

          {/* Reflection Zone */}
          <LetThatSinkIn>
            The gap between 64 KB and 175 zettabytes—from countable to incomprehensible—happened in just 44 years.
            <br />
            <br />
            <strong>This is a scale discontinuity</strong> that happens once every 50-100 years.
          </LetThatSinkIn>

          {/* Major Break */}
          <MajorBreak />

          {/* Section 4: AirPods Cutaway */}
          <div className="relative">
            <div
              className="scroll-step min-h-[70vh] md:min-h-screen flex items-center"
              data-visual="visual-6"
              data-section="airpods"
            >
              <div className="max-w-lg md:max-w-2xl mx-auto px-4 py-6 md:px-6 md:py-12 bg-slate-800/80 backdrop-blur rounded-lg border border-slate-700">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 md:mb-6">
                  Making It Personal: What's In Your Ears Right Now?
                </h2>
                <p className="text-base md:text-lg text-slate-300 leading-relaxed mb-3 md:mb-4">
                  Consider Apple AirPods Pro—those tiny wireless earbuds that millions
                  of professionals wear daily. Inside each bud is the H2 chip, processing
                  <strong className="text-white"> gigabytes of data per hour</strong>.
                </p>
                <p className="text-base md:text-lg text-slate-300 leading-relaxed mb-3 md:mb-4">
                  You have shipping containers worth of rice—gigabytes of data—being
                  processed in real-time <em>in your ears</em>, wirelessly, by a device
                  smaller than a walnut.
                </p>
                <p className="text-base md:text-lg text-slate-300 leading-relaxed">
                  Thirty years ago, processing one gigabyte required room-sized computers
                  costing hundreds of thousands of dollars. Today, you're doing it while
                  jogging.
                </p>
              </div>
            </div>
          </div>

          {/* Major Break */}
          <MajorBreak />

          {/* Interactive Feature: Napster Time Machine */}
          <div className="scroll-step min-h-[70vh] md:min-h-screen flex items-center py-12 md:py-20">
            <div className="w-full px-6">
              <div className="max-w-4xl mx-auto mb-8">
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3 md:mb-4 text-center">
                  Feeling the Velocity
                </h2>
                <p className="text-lg text-slate-700 leading-relaxed text-center max-w-2xl mx-auto">
                  Remember downloading music? Let's travel back in time and feel the difference.
                  Experience how data velocity transformed from 1999 Napster to today's 5G networks.
                </p>
              </div>
              <NapsterTimeMachine />
            </div>
          </div>

          {/* Closing Section */}
          <div className="scroll-step min-h-screen flex items-center" data-section="conclusion">
            <div className="max-w-lg md:max-w-2xl mx-auto px-4 py-6 md:px-6 md:py-12 bg-white/80 backdrop-blur rounded-lg">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 md:mb-6">
                The Pacific Ocean in Your Pocket
              </h2>
              <p className="text-lg text-slate-700 leading-relaxed mb-4">
                That single grain of rice we started with? Your smartphone processes
                the equivalent of shipping containers full of rice every hour. The AirPods
                in your ears handle gigabytes of data per hour—wirelessly, in a device smaller than a walnut.
              </p>
              <p className="text-lg text-slate-700 leading-relaxed mb-4">
                We went from coffee cups (kilobytes) to shipping containers (gigabytes) to ocean-scale
                lakes (zettabytes) in just 40 years. From your kitchen counter to an industrial shipping
                yard to the Pacific Ocean.
              </p>
              <p className="text-lg text-slate-700 leading-relaxed mb-4">
                <strong>The technology that would have filled a building in 1990 now fits in your pocket,
                your ears, your watch.</strong>
              </p>
              <p className="text-lg text-slate-700 leading-relaxed">
                This is the scale shift that defines our era. The companies winning aren't the ones with
                the most data—they're the ones who understand what to do with oceans when everyone else
                is still thinking in cups.
              </p>
              <div className="mt-8 p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                <p className="text-sm text-slate-700 italic">
                  <strong>Coming next:</strong> Part 2 explores the three dimensions of data that matter
                  more than size (Volume, Velocity, Variety), and Part 3 reveals how specification quality
                  became the new competitive moat in the AI era.
                </p>
              </div>
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

      {/* Humorous Counter (sticky, always visible) */}
      <HumorousCounter />

      {/* Scroll Progress Indicators */}
      <ScrollProgress />
    </main>
  );
}
