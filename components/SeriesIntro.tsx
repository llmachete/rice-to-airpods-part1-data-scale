/* eslint-disable react/no-unescaped-entities */
'use client';

import React from 'react';
import BrandTable from './shared/BrandTable';

/**
 * Series Introduction for "From Rice to AirPods"
 *
 * A five-part series on data, transformation, and the skills that matter.
 * This component renders above the experience chooser on the landing page.
 */
export default function SeriesIntro() {
  // Industrial Revolution GPT table data
  const irTableColumns = [
    { key: 'revolution', header: 'Revolution' },
    { key: 'era', header: 'Era' },
    { key: 'gpt', header: 'GPT', highlight: true },
    { key: 'enabled', header: 'What It Enabled' },
  ];

  const irTableData = [
    {
      revolution: '1st',
      era: '1760–1840',
      gpt: 'Steam Engine',
      enabled: 'Mechanized production, railways, factory system',
    },
    {
      revolution: '2nd',
      era: '1870–1914',
      gpt: 'Electricity',
      enabled: 'Mass production, telecommunications, modern corporation',
    },
    {
      revolution: '3rd',
      era: '1950–2000s',
      gpt: 'Computing',
      enabled: 'Automation, digitization, internet economy',
    },
    {
      revolution: '4th',
      era: '2022–present',
      gpt: 'Large Language Models',
      enabled: 'Human-AI collaboration, generative systems, specification-driven work',
    },
  ];

  // Year 0 comparison table
  const year0Columns = [
    { key: 'metric', header: 'Metric' },
    { key: 'wearables', header: 'Wearables (Fitbit, 2009)' },
    { key: 'genai', header: 'Generative AI (ChatGPT, 2022)', highlight: true },
  ];

  const year0Data = [
    {
      metric: 'Year 0 launch',
      wearables: '~5,000 units shipped',
      genai: '1 million users in 5 days',
    },
    {
      metric: 'Year 0 + 2 months',
      wearables: '~25,000 units',
      genai: '100 million users',
    },
    {
      metric: 'Year 1 revenue/market',
      wearables: '~$5 million (2010)',
      genai: '$44–68 billion market (2023)',
    },
    {
      metric: 'Years to $1B+ valuation',
      wearables: '6 years (Fitbit IPO 2015: $4.1B)',
      genai: '<1 year (OpenAI: $10B funding 2023)',
    },
    {
      metric: 'Time to mass adoption',
      wearables: '6 years to Apple Watch launch',
      genai: 'Fastest-adopted technology in history',
    },
  ];

  // Market growth table
  const marketColumns = [
    { key: 'technology', header: 'Technology' },
    { key: 'size2024', header: '2024 Market Size' },
    { key: 'projection2030', header: '2030 Projection' },
    { key: 'cagr', header: 'CAGR (Annual Growth Rate)', highlight: true },
  ];

  const marketData = [
    {
      technology: 'Wearables',
      size2024: '~$80–98 billion',
      projection2030: '~$175–190 billion',
      cagr: '12–17%',
    },
    {
      technology: 'Generative AI',
      size2024: '~$67 billion',
      projection2030: '$100–325 billion+',
      cagr: '30–43%',
    },
    {
      technology: 'LLMs (specifically)',
      size2024: '~$6 billion',
      projection2030: '~$35 billion',
      cagr: '37%',
    },
  ];

  return (
    <section className="w-full max-w-4xl mx-auto px-4 py-12 md:py-16">
      {/* Section: The Reframing */}
      <div className="mb-12 md:mb-16">
        <h2 className="text-2xl md:text-3xl font-bold text-[#0E5A61] mb-6">
          The Reframing
        </h2>
        <div className="prose prose-lg max-w-none text-[#1A2332] space-y-4">
          <p>
            This series exists because we're thinking about AI wrong.
          </p>
          <p>
            Not wrong in the technical sense. The models work. The capabilities are real.
            But the frameworks most people use to evaluate AI—feature checklists, vendor
            comparisons, ROI calculators—miss something fundamental.
          </p>
          <p>
            We've been here before. Four times, actually. And every industrial revolution
            followed the same pattern: a general purpose technology emerged, transformed
            how humans create and exchange value, and reshuffled who wins and who gets
            left behind.
          </p>
          <p>
            The question isn't whether AI will transform your industry. It already is.
            The question is whether you have the analytical frameworks to see the
            transformation clearly—and position yourself on the right side of it.
          </p>
        </div>
      </div>

      {/* Divider */}
      <div className="w-24 h-1 bg-gradient-to-r from-[#D97D42] to-[#197A83] mx-auto mb-12 md:mb-16 rounded-full" />

      {/* Section: The Lens */}
      <div className="mb-12 md:mb-16">
        <h2 className="text-2xl md:text-3xl font-bold text-[#0E5A61] mb-6">
          The Lens
        </h2>
        <div className="prose prose-lg max-w-none text-[#1A2332] space-y-4">
          <p>
            This is economic history, not a product demo.
          </p>
          <p>
            I'm drawing on patterns that span 260 years of industrial transformation—from
            the steam engines of 1760s Britain to the large language models reshaping work
            today. The same analytical frameworks that explain why some textile manufacturers
            thrived while others collapsed can explain why some organizations will capture
            AI's value while others become case studies in missed opportunity.
          </p>
          <p>
            But here's what most tech narratives get wrong: they focus on the visionaries.
            The Carnegies. The Fords. The founders on magazine covers.
          </p>
          <p>
            History tells a different story. Transformations happen through accumulated
            decisions by ordinary people—workers adapting their skills, small businesses
            finding new efficiencies, professionals learning new tools. The industrial
            revolutions weren't won by a handful of Great Men. They were won by the
            millions who figured out how to adapt.
          </p>
          <p className="font-semibold text-[#0E5A61]">
            That's who this series is for.
          </p>
        </div>
      </div>

      {/* Divider */}
      <div className="w-24 h-1 bg-gradient-to-r from-[#D97D42] to-[#197A83] mx-auto mb-12 md:mb-16 rounded-full" />

      {/* Section: The Starting Point */}
      <div className="mb-12 md:mb-16">
        <h2 className="text-2xl md:text-3xl font-bold text-[#0E5A61] mb-6">
          The Starting Point
        </h2>
        <div className="prose prose-lg max-w-none text-[#1A2332] space-y-4">
          <p>
            We begin with rice. Not metaphorically—literally.
          </p>
          <p>
            Rice was arguably humanity's first{' '}
            <strong className="text-[#D97D42]">General Purpose Technology (GPT)</strong>—a
            technology so foundational that it transforms not just one sector but an entire
            economy. GPTs share three defining characteristics: they improve over time, they
            spawn innovation across multiple industries, and they become essential
            infrastructure that other technologies build upon.
            <sup>
              <a href="#ref-1" className="text-[#0E5A61] hover:text-[#D97D42] no-underline">[1]</a>
            </sup>
          </p>
          <p>
            Rice fits every criterion. Cultivation techniques improved over millennia.
            Agricultural surpluses enabled urbanization, trade specialization, military
            expansion, and eventually the craft economies that preceded industrialization.
            Before steam engines could transform manufacturing, rice (and wheat, and other
            staple crops) had already transformed human civilization. Rice was infrastructure.
          </p>
          <p>
            Rice also gives us something else: a way to visualize the invisible.
          </p>
          <p>
            Data is abstract. Bytes, kilobytes, petabytes—these words mean nothing to most
            people evaluating AI investments. But a grain of rice? That's tangible. You can
            hold it. Count it. Scale it up in your mind's eye from a handful to a cup to a
            warehouse to an ocean.
          </p>
          <p className="font-semibold">
            One grain of rice equals one byte of data. Start there, and suddenly zettabytes
            become comprehensible. That's where Article 1 begins.
          </p>
        </div>
      </div>

      {/* Divider */}
      <div className="w-24 h-1 bg-gradient-to-r from-[#D97D42] to-[#197A83] mx-auto mb-12 md:mb-16 rounded-full" />

      {/* Section: The Framework */}
      <div className="mb-12 md:mb-16">
        <h2 className="text-2xl md:text-3xl font-bold text-[#0E5A61] mb-6">
          The Framework
        </h2>
        <div className="prose prose-lg max-w-none text-[#1A2332] space-y-4">
          <p>
            Every industrial revolution had its GPT—a{' '}
            <strong className="text-[#0E5A61]">General Purpose Technology</strong> so
            foundational it transforms not just one sector but an entire economy. Steam
            engines didn't just improve mining; they enabled factories, railways, and
            global trade. Each revolution follows this pattern:
          </p>
        </div>

        {/* IR Table */}
        <BrandTable
          columns={irTableColumns}
          data={irTableData}
          className="my-8"
        />

        <div className="prose prose-lg max-w-none text-[#1A2332] space-y-4">
          <p>
            That last row requires defense.
          </p>
          <p>
            Klaus Schwab popularized the "4th Industrial Revolution" framing in 2016,
            pointing to IoT (<strong className="text-[#0E5A61]">Internet of Things</strong>—sensors
            and smart devices connected to the internet), cyber-physical systems (machines
            that integrate computing with physical processes), and ubiquitous connectivity.
            <sup>
              <a href="#ref-2" className="text-[#0E5A61] hover:text-[#D97D42] no-underline">[2]</a>
            </sup>{' '}
            He wasn't wrong—your Apple Watch and smart thermostat are part of this
            transformation.
          </p>
          <p>
            But hindsight clarifies which technology defines an era. Compare the trajectories:
          </p>
        </div>

        {/* Year 0 Comparison Table */}
        <h3 className="text-lg md:text-xl font-bold text-[#1A2332] mt-10 mb-4">
          Technology Adoption: Year 0 Comparison
        </h3>
        <BrandTable
          columns={year0Columns}
          data={year0Data}
          className="my-6"
        />

        <p className="text-sm text-[#1A2332]/70 mb-8">
          Sources: Fitbit data
          <sup>
            <a href="#ref-3" className="text-[#0E5A61] hover:text-[#D97D42] no-underline">[3]</a>
          </sup>
          <sup>
            <a href="#ref-5" className="text-[#0E5A61] hover:text-[#D97D42] no-underline">[5]</a>
          </sup>
          ; ChatGPT data
          <sup>
            <a href="#ref-4" className="text-[#0E5A61] hover:text-[#D97D42] no-underline">[4]</a>
          </sup>
          ; Market data
          <sup>
            <a href="#ref-6" className="text-[#0E5A61] hover:text-[#D97D42] no-underline">[6]</a>
          </sup>
          <sup>
            <a href="#ref-7" className="text-[#0E5A61] hover:text-[#D97D42] no-underline">[7]</a>
          </sup>
        </p>

        {/* Market Growth Table */}
        <h3 className="text-lg md:text-xl font-bold text-[#1A2332] mt-10 mb-4">
          Market Growth Trajectories
        </h3>
        <BrandTable
          columns={marketColumns}
          data={marketData}
          className="my-6"
        />

        <p className="text-sm text-[#1A2332]/70 mb-2">
          Sources: Wearables
          <sup>
            <a href="#ref-8" className="text-[#0E5A61] hover:text-[#D97D42] no-underline">[8]</a>
          </sup>
          ; Generative AI
          <sup>
            <a href="#ref-9" className="text-[#0E5A61] hover:text-[#D97D42] no-underline">[9]</a>
          </sup>
        </p>
        <p className="text-sm text-[#1A2332]/60 mb-8 italic">
          CAGR (Compound Annual Growth Rate) measures how fast an industry's value grows
          year-over-year—a standard metric for comparing market trajectories.
        </p>

        <div className="prose prose-lg max-w-none text-[#1A2332] space-y-4">
          <p>
            The growth differential tells the story. IoT extended the 3rd revolution's
            logic: more computing, more connectivity, more data collection.{' '}
            <strong className="text-[#0E5A61]">LLMs</strong>—Large Language Models, the AI
            systems powering tools like ChatGPT—represent something different. They don't
            just process information; they generate it, reason about it, and collaborate
            with humans in ways that create a cleaner break from what came before.
          </p>
          <p className="font-semibold text-[#0E5A61]">
            The 4th Industrial Revolution started when AI stopped being a tool you query
            and became a partner you work with.
          </p>
        </div>
      </div>

      {/* Divider */}
      <div className="w-24 h-1 bg-gradient-to-r from-[#D97D42] to-[#197A83] mx-auto mb-12 md:mb-16 rounded-full" />

      {/* Section: The Arc */}
      <div className="mb-12 md:mb-16">
        <h2 className="text-2xl md:text-3xl font-bold text-[#0E5A61] mb-6">
          The Arc
        </h2>
        <div className="prose prose-lg max-w-none text-[#1A2332] mb-8">
          <p>
            <strong>From Rice to AirPods</strong> traces this transformation across five articles:
          </p>
        </div>

        {/* Article Cards */}
        <div className="space-y-4">
          {/* Article 1 */}
          <div className="bg-white border-l-4 border-[#D97D42] rounded-r-lg p-4 md:p-6 shadow-sm">
            <div className="flex items-start gap-4">
              <span className="text-2xl md:text-3xl font-bold text-[#D97D42]">1</span>
              <div>
                <h4 className="text-lg font-bold text-[#1A2332] mb-1">Data Scale</h4>
                <p className="text-[#1A2332]/80 text-sm md:text-base">
                  One grain of rice. One byte. Build intuitive data literacy using physical
                  objects, then scale to the zettabytes flowing through your pocket.
                </p>
                <span className="inline-block mt-2 text-xs font-semibold text-[#D97D42] bg-[#D97D42]/10 px-2 py-1 rounded">
                  START HERE
                </span>
              </div>
            </div>
          </div>

          {/* Article 2 */}
          <div className="bg-white border-l-4 border-[#197A83] rounded-r-lg p-4 md:p-6 shadow-sm">
            <div className="flex items-start gap-4">
              <span className="text-2xl md:text-3xl font-bold text-[#197A83]">2</span>
              <div>
                <h4 className="text-lg font-bold text-[#1A2332] mb-1">Volume, Velocity, Variety</h4>
                <p className="text-[#1A2332]/80 text-sm md:text-base">
                  Doug Laney's "3 Vs of Big Data" wasn't just describing databases. It's the
                  universal language of industrial transformation—a framework that explains
                  all four revolutions.
                </p>
              </div>
            </div>
          </div>

          {/* Article 3 */}
          <div className="bg-white border-l-4 border-[#0E5A61] rounded-r-lg p-4 md:p-6 shadow-sm">
            <div className="flex items-start gap-4">
              <span className="text-2xl md:text-3xl font-bold text-[#0E5A61]">3</span>
              <div>
                <h4 className="text-lg font-bold text-[#1A2332] mb-1">Steam to Electricity (1760–1914)</h4>
                <p className="text-[#1A2332]/80 text-sm md:text-base">
                  How the first two industrial revolutions followed the 3 Vs pattern. The
                  macro-economic history, and what it reveals about transformation dynamics.
                </p>
              </div>
            </div>
          </div>

          {/* Article 4 */}
          <div className="bg-white border-l-4 border-[#0E5A61] rounded-r-lg p-4 md:p-6 shadow-sm">
            <div className="flex items-start gap-4">
              <span className="text-2xl md:text-3xl font-bold text-[#0E5A61]">4</span>
              <div>
                <h4 className="text-lg font-bold text-[#1A2332] mb-1">Computing to AI (1950–Present)</h4>
                <p className="text-[#1A2332]/80 text-sm md:text-base">
                  The same framework applied to the revolutions shaping your career. Why
                  the 4th IR demands different skills than the 3rd.
                </p>
              </div>
            </div>
          </div>

          {/* Article 5 */}
          <div className="bg-white border-l-4 border-[#D97D42] rounded-r-lg p-4 md:p-6 shadow-sm">
            <div className="flex items-start gap-4">
              <span className="text-2xl md:text-3xl font-bold text-[#D97D42]">5</span>
              <div>
                <h4 className="text-lg font-bold text-[#1A2332] mb-1">The Specification Imperative</h4>
                <p className="text-[#1A2332]/80 text-sm md:text-base">
                  Understanding transformation frameworks tells you what's changing. It
                  doesn't tell you how to direct the change. The AI era's most valuable
                  skill isn't coding—it's specification clarity. What you need to know,
                  and how to develop it.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="w-24 h-1 bg-gradient-to-r from-[#D97D42] to-[#197A83] mx-auto mb-12 md:mb-16 rounded-full" />

      {/* Section: The Approach */}
      <div className="mb-12 md:mb-16">
        <h2 className="text-2xl md:text-3xl font-bold text-[#0E5A61] mb-6">
          The Approach
        </h2>
        <div className="prose prose-lg max-w-none text-[#1A2332] space-y-4">
          <p>
            A note on method, in the spirit of full disclosure.
          </p>
          <p>
            I used AI tools to help create this series—for ideation, drafting, research
            synthesis, and building the website you're reading. I make this explicit
            because such disclosures are becoming standard practice, and because it's
            the right thing to do.
          </p>
          <p>
            The Dead Internet Theory—the idea that AI-generated content is displacing
            human creativity online—is real and accelerating. I won't pretend otherwise.
            But I also won't pretend I built this alone.
          </p>
          <p>
            What I will claim: the perspective is mine. The analytical frameworks, the
            historical connections, the arguments about where this is all heading—those
            come from years of working at the intersection of technology and business in
            regulated industries. The AI helped me express and build. The thinking is human.
          </p>
          <p className="font-semibold text-[#0E5A61]">
            This series is for people who understand that adapting to new tools isn't
            weakness—it's how you stay in the game. The industrial revolutions rewarded
            those who learned new skills. This one will be no different.
          </p>
        </div>
      </div>

      {/* Divider */}
      <div className="w-24 h-1 bg-gradient-to-r from-[#D97D42] to-[#197A83] mx-auto mb-12 md:mb-16 rounded-full" />

      {/* Section: Begin */}
      <div className="mb-12 md:mb-16 text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-[#0E5A61] mb-4">
          Begin
        </h2>
        <p className="text-lg md:text-xl text-[#1A2332] mb-2">
          Ready to start?
        </p>
        <p className="text-base md:text-lg text-[#1A2332]/80">
          Article 1 uses a single grain of rice to make data scale intuitive.
          Two ways to experience it:
        </p>
      </div>

      {/* References Section */}
      <div className="mt-16 pt-8 border-t border-[#F0E7E0]">
        <h3 className="text-lg font-bold text-[#1A2332] mb-6">References</h3>
        <ol className="space-y-3 text-sm text-[#1A2332]/80">
          <li id="ref-1" className="pl-6 -indent-6">
            <span className="font-semibold text-[#0E5A61]">[1]</span>{' '}
            Bresnahan, Timothy F. and Trajtenberg, M. "General Purpose Technologies
            'Engines of Growth?'" <em>Journal of Econometrics</em>, Vol. 65, No. 1, 1995,
            pp. 83-108.{' '}
            <a
              href="https://www.sciencedirect.com/science/article/abs/pii/030440769401598T"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#0E5A61] hover:text-[#D97D42] underline"
            >
              DOI: 10.1016/0304-4076(94)01598-T
            </a>
          </li>
          <li id="ref-2" className="pl-6 -indent-6">
            <span className="font-semibold text-[#0E5A61]">[2]</span>{' '}
            Schwab, Klaus. "The Fourth Industrial Revolution: what it means, how to respond."
            <em>World Economic Forum</em>, January 14, 2016.{' '}
            <a
              href="https://www.weforum.org/agenda/2016/01/the-fourth-industrial-revolution-what-it-means-and-how-to-respond/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#0E5A61] hover:text-[#D97D42] underline"
            >
              weforum.org
            </a>
          </li>
          <li id="ref-3" className="pl-6 -indent-6">
            <span className="font-semibold text-[#0E5A61]">[3]</span>{' '}
            Perry, Tekla S. "The First Fitbit: How the Fitness Tracker Was Engineered."
            <em>IEEE Spectrum</em>, November 2020.{' '}
            <a
              href="https://spectrum.ieee.org/fitbit"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#0E5A61] hover:text-[#D97D42] underline"
            >
              spectrum.ieee.org
            </a>
          </li>
          <li id="ref-4" className="pl-6 -indent-6">
            <span className="font-semibold text-[#0E5A61]">[4]</span>{' '}
            "ChatGPT Statistics 2025-2026: Key Insights and Growth Trends."
            <em>SEOProfy</em>, 2025.{' '}
            <a
              href="https://seoprofy.com/blog/chatgpt-statistics/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#0E5A61] hover:text-[#D97D42] underline"
            >
              seoprofy.com
            </a>
          </li>
          <li id="ref-5" className="pl-6 -indent-6">
            <span className="font-semibold text-[#0E5A61]">[5]</span>{' '}
            "Fitbit - statistics & facts." <em>Statista</em>, 2024.{' '}
            <a
              href="https://www.statista.com/topics/2595/fitbit/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#0E5A61] hover:text-[#D97D42] underline"
            >
              statista.com
            </a>
          </li>
          <li id="ref-6" className="pl-6 -indent-6">
            <span className="font-semibold text-[#0E5A61]">[6]</span>{' '}
            "Generative AI Market Size, Share & Growth Report, 2032."
            <em>Fortune Business Insights</em>, 2024.{' '}
            <a
              href="https://www.fortunebusinessinsights.com/generative-ai-market-107837"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#0E5A61] hover:text-[#D97D42] underline"
            >
              fortunebusinessinsights.com
            </a>
          </li>
          <li id="ref-7" className="pl-6 -indent-6">
            <span className="font-semibold text-[#0E5A61]">[7]</span>{' '}
            "51 Generative AI Statistics 2025 (Market Size & Reports)."
            <em>DemandSage</em>, January 2025.{' '}
            <a
              href="https://www.demandsage.com/generative-ai-statistics/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#0E5A61] hover:text-[#D97D42] underline"
            >
              demandsage.com
            </a>
          </li>
          <li id="ref-8" className="pl-6 -indent-6">
            <span className="font-semibold text-[#0E5A61]">[8]</span>{' '}
            "Wearable Technology Market Size, Share & Trends Report 2030."
            <em>Mordor Intelligence</em>, 2024.{' '}
            <a
              href="https://www.mordorintelligence.com/industry-reports/wearable-technology-market"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#0E5A61] hover:text-[#D97D42] underline"
            >
              mordorintelligence.com
            </a>
          </li>
          <li id="ref-9" className="pl-6 -indent-6">
            <span className="font-semibold text-[#0E5A61]">[9]</span>{' '}
            "Generative AI Market Size And Share | Industry Report, 2033."
            <em>Grand View Research</em>, 2024.{' '}
            <a
              href="https://www.grandviewresearch.com/industry-analysis/generative-ai-market-report"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#0E5A61] hover:text-[#D97D42] underline"
            >
              grandviewresearch.com
            </a>
          </li>
        </ol>
      </div>
    </section>
  );
}
