'use client';

import { useState, useEffect } from 'react';

interface Section {
  id: string;
  title: string;
  element?: HTMLElement;
}

const sections: Section[] = [
  { id: 'intro', title: 'Introduction' },
  { id: 'grain', title: 'The Rice Grain' },
  { id: 'cup', title: 'Coffee Cup' },
  { id: 'container', title: 'Shipping Container' },
  { id: 'hourglass', title: 'Data Hourglass' },
  { id: 'ocean', title: 'Pacific Ocean' },
  { id: 'airpods', title: 'AirPods' },
  { id: 'conclusion', title: 'Conclusion' },
];

export default function ScrollProgress() {
  const [activeSection, setActiveSection] = useState<string>('intro');
  const [completedSections, setCompletedSections] = useState<Set<string>>(new Set(['intro']));
  const [sectionElements, setSectionElements] = useState<Map<string, HTMLElement>>(new Map());

  useEffect(() => {
    // Find all section elements
    const elements = new Map<string, HTMLElement>();
    sections.forEach(section => {
      const element = document.querySelector(`[data-section="${section.id}"]`) as HTMLElement;
      if (element) {
        elements.set(section.id, element);
      }
    });
    setSectionElements(elements);

    // Set up intersection observer
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const sectionId = entry.target.getAttribute('data-section');
            if (sectionId) {
              setActiveSection(sectionId);
              setCompletedSections(prev => new Set([...prev, sectionId]));
            }
          }
        });
      },
      {
        threshold: 0.3,
        rootMargin: '-20% 0px -20% 0px',
      }
    );

    elements.forEach(element => {
      observer.observe(element);
    });

    return () => {
      elements.forEach(element => {
        observer.unobserve(element);
      });
    };
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = sectionElements.get(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const getDotStatus = (sectionId: string): 'completed' | 'active' | 'upcoming' => {
    if (sectionId === activeSection) return 'active';
    if (completedSections.has(sectionId)) return 'completed';
    return 'upcoming';
  };

  const dotStyles = {
    completed: 'bg-teal-600 border-teal-600 scale-100',
    active: 'bg-orange-600 border-orange-600 scale-150',
    upcoming: 'bg-transparent border-slate-300 scale-100',
  };

  // Calculate overall progress percentage
  const progressPercentage = Math.round((completedSections.size / sections.length) * 100);

  return (
    <>
      {/* Desktop: Vertical dots on right */}
      <nav
        className="hidden md:flex fixed right-6 top-1/2 -translate-y-1/2 z-40 flex-col gap-4"
        aria-label="Article progress"
      >
        {sections.map((section) => {
          const status = getDotStatus(section.id);
          return (
            <button
              key={section.id}
              onClick={() => scrollToSection(section.id)}
              className="group relative"
              aria-label={`Go to ${section.title}`}
              aria-current={status === 'active' ? 'true' : 'false'}
            >
              {/* Dot */}
              <div
                className={`w-3 h-3 rounded-full border-2 transition-all duration-300 ${dotStyles[status]} hover:scale-150 hover:border-orange-600`}
              />

              {/* Tooltip */}
              <div className="absolute right-full mr-4 top-1/2 -translate-y-1/2 px-3 py-2 bg-slate-800 text-white text-xs font-medium rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                {section.title}
                <div className="absolute left-full top-1/2 -translate-y-1/2 border-4 border-transparent border-l-slate-800" />
              </div>
            </button>
          );
        })}
      </nav>

      {/* Mobile: Horizontal dots at bottom */}
      <nav
        className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-40 flex gap-3 bg-white px-6 py-3 rounded-full shadow-lg border border-slate-200"
        aria-label="Article progress"
      >
        {sections.map((section) => {
          const status = getDotStatus(section.id);
          return (
            <button
              key={section.id}
              onClick={() => scrollToSection(section.id)}
              className="relative"
              aria-label={`Go to ${section.title}`}
              aria-current={status === 'active' ? 'true' : 'false'}
            >
              <div
                className={`w-4 h-4 rounded-full border-2 transition-all duration-300 ${dotStyles[status]}`}
              />
            </button>
          );
        })}
      </nav>

      {/* Floating section label (top right) */}
      <div className="hidden md:block fixed top-6 right-6 z-30">
        <div className="px-4 py-2 bg-white/90 backdrop-blur rounded-lg shadow-sm border border-slate-200">
          <div className="text-xs text-slate-500 font-medium">Current Section</div>
          <div className="text-sm font-semibold text-slate-800">
            {sections.find(s => s.id === activeSection)?.title || 'Introduction'}
          </div>
        </div>
      </div>

      {/* Progress percentage (footer area) */}
      <div className="hidden md:block fixed bottom-6 left-6 z-30">
        <div className="px-4 py-2 bg-white/90 backdrop-blur rounded-lg shadow-sm border border-slate-200">
          <div className="text-xs text-slate-500">
            Section {sections.findIndex(s => s.id === activeSection) + 1} of {sections.length} •{' '}
            {progressPercentage}% complete
          </div>
        </div>
      </div>
    </>
  );
}
