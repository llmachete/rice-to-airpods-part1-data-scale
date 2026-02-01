'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import ScrollySection from '@/components/ScrollySection';
import { FootnoteRef } from '@/components/shared/Footnote';

// TopNavBar with auto-hide functionality
const TopNavBarAutoHide = dynamic(
  () => import('@/components/shared/TopNavBarAutoHide'),
  { ssr: false }
);

// Dynamic import for visualizations (client-side only)
const Visual1_RiceGrain = dynamic(
  () => import('@/components/visualizations/Visual1_RiceGrain_2D'),
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
  () => import('@/components/visualizations/Visual6_AirPodsCutaway_2D'),
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
  () => import('@/components/interactive/DataHourglass_2D'),
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

export default function ImmersivePage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [currentVisual, setCurrentVisual] = useState<string | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [pageScrollProgress, setPageScrollProgress] = useState(0);

  // Track overall page scroll for TopNavBar
  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;
      const maxScroll = documentHeight - windowHeight;
      const progress = maxScroll > 0 ? Math.min(scrollTop / maxScroll, 1) : 0;
      setPageScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial calculation
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
      {/* Auto-hide TopNavBar */}
      <TopNavBarAutoHide scrollProgress={pageScrollProgress} />

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
                  of everything happening in the digital revolution transforming every industry right now.<FootnoteRef number={1} />
                </p>
                <p className="text-base md:text-lg text-slate-700 leading-relaxed mb-3 md:mb-4">
                  In digital terms, a single byte stores one character of text—the letter "A", a number "7",
                  or a punctuation mark. It's the fundamental building block: eight binary digits (bits) that
                  can represent 256 different values. Your computer uses bytes to encode everything from this
                  sentence you're reading to the color of a single pixel on your screen.<FootnoteRef number={2} />
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
                  one of the most successful personal computers ever made, had 64 KB of RAM.<FootnoteRef number={3} />
                </p>
                <p className="text-base md:text-lg text-slate-700 leading-relaxed mb-3 md:mb-4">
                  A plain text email without attachments typically runs 2-5 KB. The original Twitter character
                  limit of 140 characters produced tweets around 1 KB in size. Early web pages from the mid-1990s
                  averaged just 10-20 KB—small enough that dozens could fit in the memory of a single Commodore 64.<FootnoteRef number={4} />
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

          {/* Section 1.6: The Backpack */}
          <div className="relative">
            <div
              className="scroll-step min-h-[70vh] md:min-h-screen flex items-center"
              data-visual="visual-2"
            >
              <div className="max-w-lg md:max-w-2xl mx-auto px-4 py-6 md:px-6 md:py-12 bg-white/80 backdrop-blur rounded-lg">
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 md:mb-6">
                  The Backpack
                </h2>
                <p className="text-base md:text-lg text-slate-700 leading-relaxed mb-3 md:mb-4">
                  Scaling up another thousand times: <strong>one million grains of rice</strong> equals
                  a <strong>megabyte (MB)</strong>. That's roughly the volume of a small backpack.
                </p>
                <p className="text-base md:text-lg text-slate-700 leading-relaxed mb-3 md:mb-4">
                  A digital photo from your smartphone camera typically runs 2-5 MB. A three-minute MP3 song
                  at standard quality is about 3 MB. A one-minute video recorded on your phone consumes roughly
                  50-100 MB. This was the scale of digital media in the early 2000s—when iPods held "1,000 songs
                  in your pocket" at about 3-4 GB total capacity.<FootnoteRef number={5} />
                </p>
                <p className="text-base md:text-lg text-slate-700 leading-relaxed">
                  We went from coffee cups to backpacks—from 1,000 grains to 1,000,000 grains. The floppy disk
                  that stored your college term paper (1.44 MB) could hold about 1.4 backpacks worth of rice grains.
                </p>
              </div>
            </div>
          </div>

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
                  shipping container.<FootnoteRef number={6} />
                </p>
                <p className="text-base md:text-lg text-slate-700 leading-relaxed mb-3 md:mb-4">
                  A high-definition movie streams at 3-5 GB. Your smartphone's operating system—iOS or Android—
                  consumes 8-12 GB of storage space. A complete human genome sequence requires about 200 GB when
                  stored in standard formats. This is the scale of everyday personal computing in 2025: most
                  smartphones ship with 128-512 GB of storage, holding hundreds of shipping containers worth
                  of data in your pocket.<FootnoteRef number={7} />
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

          {/* Section 1.8: The Warehouse */}
          <div className="relative">
            <div
              className="scroll-step min-h-[70vh] md:min-h-screen flex items-center"
              data-visual="visual-3"
            >
              <div className="max-w-lg md:max-w-2xl mx-auto px-4 py-6 md:px-6 md:py-12 bg-white/80 backdrop-blur rounded-lg">
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 md:mb-6">
                  The Warehouse
                </h2>
                <p className="text-base md:text-lg text-slate-700 leading-relaxed mb-3 md:mb-4">
                  Another thousand-fold increase: <strong>one trillion grains of rice</strong> equals
                  a <strong>terabyte (TB)</strong>. That's approximately 50,000 cubic meters—the volume
                  of a large warehouse or ten Olympic swimming pools.
                </p>
                <p className="text-base md:text-lg text-slate-700 leading-relaxed mb-3 md:mb-4">
                  A standard laptop hard drive holds 1-2 TB of data. A Netflix power user might stream 1 TB of
                  video content per month. A large hospital generates about 50 TB of medical imaging data annually—
                  X-rays, MRIs, CT scans. Modern security camera systems for a mid-size office building can produce
                  10-20 TB per month of surveillance footage.<FootnoteRef number={8} />
                </p>
                <p className="text-base md:text-lg text-slate-700 leading-relaxed">
                  This is the scale of institutional data management. From individual devices (gigabytes) to
                  organizational storage systems (terabytes). We've moved from shipping containers to warehouses.
                </p>
              </div>
            </div>
          </div>

          {/* Section 1.9: The City Block */}
          <div className="relative">
            <div
              className="scroll-step min-h-[70vh] md:min-h-screen flex items-center"
              data-visual="visual-3"
            >
              <div className="max-w-lg md:max-w-2xl mx-auto px-4 py-6 md:px-6 md:py-12 bg-white/80 backdrop-blur rounded-lg">
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 md:mb-6">
                  The City Block
                </h2>
                <p className="text-base md:text-lg text-slate-700 leading-relaxed mb-3 md:mb-4">
                  Multiply by another thousand: <strong>one quadrillion grains of rice</strong> makes
                  a <strong>petabyte (PB)</strong>. That's roughly 50 million cubic meters—imagine filling
                  every building on a dense city block from floor to ceiling.
                </p>
                <p className="text-base md:text-lg text-slate-700 leading-relaxed mb-3 md:mb-4">
                  Facebook processes over 4 petabytes of data daily—every post, photo, video, and interaction
                  from its 3 billion users. Google's search index is estimated at 100-200 petabytes. The Large
                  Hadron Collider generates about 30 petabytes of experimental data annually. A single autonomous
                  vehicle testing program can accumulate 1-2 petabytes of sensor data per year.<FootnoteRef number={9} />
                </p>
                <p className="text-base md:text-lg text-slate-700 leading-relaxed">
                  This is the scale of major internet platforms and scientific institutions. Petabytes mark the
                  boundary where traditional database systems break down and distributed computing becomes mandatory.
                </p>
              </div>
            </div>
          </div>

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
                  You could literally count the grains in 64 coffee cups.<FootnoteRef number={10} />
                </p>
                <p className="text-base md:text-lg text-slate-700 leading-relaxed mb-3 md:mb-4">
                  In 2025, humanity creates <strong>175 zettabytes</strong> of data annually.
                  That's 175 followed by 21 zeros. That's <strong>175 lakes worth of rice grains—each
                  lake 2 kilometers long, 1 kilometer wide, 25 meters deep—every single year.</strong><FootnoteRef number={11} />
                </p>
                <p className="text-base md:text-lg text-slate-700 leading-relaxed mb-3 md:mb-4">
                  To put zettabyte scale in context: all words ever spoken by humans throughout history would
                  occupy about 5 exabytes (0.005 zettabytes) as text. The entire Internet Archive—the world's
                  largest digital library preserving web pages since 1996—holds approximately 70 petabytes
                  (0.00007 zettabytes). Global cloud storage capacity across Amazon, Google, Microsoft, and all
                  other providers reached approximately 2 zettabytes in 2024.<FootnoteRef number={12} />
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
                  <strong className="text-white"> gigabytes of data per hour</strong>.<FootnoteRef number={13} />
                </p>
                <p className="text-base md:text-lg text-slate-300 leading-relaxed mb-3 md:mb-4">
                  You have shipping containers worth of rice—gigabytes of data—being
                  processed in real-time <em>in your ears</em>, wirelessly, by a device
                  smaller than a walnut.
                </p>
                <p className="text-base md:text-lg text-slate-300 leading-relaxed">
                  Thirty years ago, processing one gigabyte required room-sized computers
                  costing hundreds of thousands of dollars.<FootnoteRef number={14} /> Today, you're doing it while
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
              {/* CTA Block */}
              <div className="cta-block mt-8">
                <h3>This is Part 1 of a series.</h3>
                <p className="text-sm">
                  Part 2 explores how AI is changing what "data literacy" even means—and why the
                  companies winning aren't the ones with the most data.
                </p>
                <div className="mt-4">
                  <a
                    href="https://forms.gle/GxhytVcDT9tMCsWG8"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cta-button text-sm"
                  >
                    Get notified →
                  </a>
                  <span className="cta-alt">
                    or follow on{' '}
                    <a
                      href="https://www.linkedin.com/in/zachkeshner"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      LinkedIn
                    </a>
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Footnotes Section */}
          <div className="scroll-step min-h-screen flex items-center" data-section="footnotes">
            <div className="max-w-lg md:max-w-2xl mx-auto px-4 py-6 md:px-6 md:py-12 bg-white/80 backdrop-blur rounded-lg">
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6">References</h2>
              <div className="text-xs md:text-sm text-slate-600 space-y-3">
                <p id="footnote-1">[^1]: A byte is the fundamental unit of digital information, consisting of 8 bits. It can represent 256 different values (2^8). See: International Electrotechnical Commission (IEC), "IEC 60027-2: Letter symbols to be used in electrical technology," 2019. <a href="#footnote-ref-1" className="text-teal-600 hover:text-teal-700 text-xs ml-2">↩</a></p>

                <p id="footnote-2">[^2]: Character encoding standards like ASCII (American Standard Code for Information Interchange) use one byte per character. See: American National Standards Institute, "ANSI X3.4-1986: Coded Character Set - 7-Bit American Standard Code for Information Interchange," 1986. Extended to 8-bit representations in modern computing. <a href="#footnote-ref-2" className="text-teal-600 hover:text-teal-700 text-xs ml-2">↩</a></p>

                <p id="footnote-3">[^3]: Commodore Business Machines, "Commodore 64 Programmer's Reference Guide," 1982. The Commodore 64 shipped with 64 KB of RAM and sold approximately 17 million units between 1982-1994, making it one of the best-selling personal computers. Historical specifications verified through Computer History Museum archives. <a href="#footnote-ref-3" className="text-teal-600 hover:text-teal-700 text-xs ml-2">↩</a></p>

                <p id="footnote-4">[^4]: Email size estimates: RFC 5322 standards for Internet Message Format. Twitter's 140-character limit (expanded to 280 in 2017) produced tweets averaging 1-2 KB including metadata. Web page sizes from HTTP Archive historical data: average page size in 1995 was 14.1 KB (source: Internet Archive Wayback Machine analysis, "The Evolution of Web Page Size," 2020). <a href="#footnote-ref-4" className="text-teal-600 hover:text-teal-700 text-xs ml-2">↩</a></p>

                <p id="footnote-5">[^5]: Digital media file sizes from technical specifications: JPEG compression standards (ITU-T T.81) for photos; MP3 encoding at 128 kbps standard quality yields approximately 1 MB per minute; smartphone video at 1080p 30fps averages 60-100 MB per minute (H.264 codec). Apple iPod (2001) capacity: 5 GB model held approximately 1,000 songs at 128 kbps MP3 encoding. Floppy disk capacity: 1.44 MB for 3.5-inch high-density format (ISO/IEC 9529 standard). <a href="#footnote-ref-5" className="text-teal-600 hover:text-teal-700 text-xs ml-2">↩</a></p>

                <p id="footnote-6">[^6]: Volume calculation: 1 billion grains of rice at approximately 50 cubic millimeters per grain equals 50 cubic meters. Standard 20-foot shipping container interior dimensions: 5.9m length × 2.35m width × 2.39m height = 33.2 cubic meters minimum (varies by manufacturer). Source: International Organization for Standardization (ISO), "ISO 668:2020 - Series 1 freight containers - Classification, dimensions and ratings." <a href="#footnote-ref-6" className="text-teal-600 hover:text-teal-700 text-xs ml-2">↩</a></p>

                <p id="footnote-7">[^7]: Streaming video bitrates from Netflix technical specifications (2024): HD streams at 3-5 GB per hour, 4K streams at 7-10 GB per hour. Smartphone OS storage: iOS 17 requires 8-12 GB, Android 14 requires 10-15 GB including system files. Human genome storage: raw sequencing data from Illumina platforms generates 200 GB in FASTQ format; compressed formats reduce this to 50-100 GB. Sources: Apple iOS Developer Documentation; Android Compatibility Definition Document; National Human Genome Research Institute. <a href="#footnote-ref-7" className="text-teal-600 hover:text-teal-700 text-xs ml-2">↩</a></p>

                <p id="footnote-8">[^8]: Laptop storage from manufacturer specifications (2024-2025): consumer laptops typically ship with 512 GB to 2 TB SSD storage. Netflix streaming data from company transparency reports. Hospital medical imaging data from Healthcare Information and Management Systems Society (HIMSS) 2023 analytics report: average hospital generates 50-100 TB annually from PACS systems. Security camera data calculated from standard 1080p cameras at 2-4 Mbps bitrate running 24/7. <a href="#footnote-ref-8" className="text-teal-600 hover:text-teal-700 text-xs ml-2">↩</a></p>

                <p id="footnote-9">[^9]: Facebook data processing from company engineering blog posts and F8 conference presentations (2023-2024): platform processes 4+ petabytes daily across 3 billion users. Google search index size estimated from Google research papers and industry analysis (estimated 100-200 PB, unconfirmed by Google). Large Hadron Collider data from CERN public reports: generates approximately 30 PB per year from particle collision experiments. Autonomous vehicle data from Waymo and Tesla published research: sensor arrays (lidar, radar, cameras) generate 1-2 TB per vehicle per day during testing. <a href="#footnote-ref-9" className="text-teal-600 hover:text-teal-700 text-xs ml-2">↩</a></p>

                <p id="footnote-10">[^10]: IBM Personal Computer technical specifications, IBM Corporation, August 1981. Initial configuration: Intel 8088 processor, 16 KB RAM expandable to 64 KB, 5.25-inch floppy disk drive. Launch price: $1,565 base model. Historical documentation verified through Computer History Museum and IBM Archives. <a href="#footnote-ref-10" className="text-teal-600 hover:text-teal-700 text-xs ml-2">↩</a></p>

                <p id="footnote-11">[^11]: Global datasphere projection from IDC (International Data Corporation), "Worldwide Global DataSphere Forecast, 2024-2028," March 2024. Estimate of 175 zettabytes created in 2025, up from 64 ZB in 2020. Lake volume calculation: 2,000m × 1,000m × 25m = 50 million cubic meters = 50 billion liters = 1 zettabyte equivalent in rice grain visualization (1 ZB = 1 billion trillion grains). <a href="#footnote-ref-11" className="text-teal-600 hover:text-teal-700 text-xs ml-2">↩</a></p>

                <p id="footnote-12">[^12]: Human speech data estimate from University of California Berkeley study, "How Much Information? 2003" (updated methodology 2020): approximately 5 exabytes as compressed text assuming 100 billion humans lifetime speaking 8 hours daily. Internet Archive statistics from archive.org public datasets (2024): 70+ petabytes stored including web pages, books, media. Cloud storage capacity from Synergy Research Group, "Enterprise Cloud Market Quarterly Report Q4 2024": global cloud infrastructure capacity approximately 2 ZB across all providers. <a href="#footnote-ref-12" className="text-teal-600 hover:text-teal-700 text-xs ml-2">↩</a></p>

                <p id="footnote-13">[^13]: Apple H2 chip specifications from Apple technical documentation and iFixit teardown analysis (AirPods Pro 2nd generation, 2022). Chip processes audio signal processing, adaptive noise cancellation, spatial audio computations, and machine learning inference for conversation detection. Estimated computational throughput in gigabytes per hour based on audio processing at 48 kHz sample rate, 24-bit depth, with computational overhead for ML models. <a href="#footnote-ref-13" className="text-teal-600 hover:text-teal-700 text-xs ml-2">↩</a></p>

                <p id="footnote-14">[^14]: Historical computing costs from Computer History Museum and inflation-adjusted price analysis: 1990s workstations capable of gigabyte-scale processing (e.g., Sun Microsystems, Silicon Graphics) cost $100,000-$500,000. Room-size requirement refers to physical footprint including cooling systems and power infrastructure. Modern comparison: smartphone System-on-Chip (SoC) performs equivalent computations in 5-10 watt power envelope vs. kilowatts for 1990s systems. <a href="#footnote-ref-14" className="text-teal-600 hover:text-teal-700 text-xs ml-2">↩</a></p>
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
