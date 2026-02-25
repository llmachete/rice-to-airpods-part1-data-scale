'use client';

import { useEffect, useState } from 'react';

/**
 * Visual 7: Resource Comparison
 * Split-screen comparison of traditional vs data resources
 */
export default function Visual7_ResourceComparison() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger animation when component mounts
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="w-full h-full flex flex-col md:flex-row p-8 gap-8">
      {/* Traditional Resources */}
      <div
        className={`flex-1 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
        }`}
      >
        <div className="bg-[#F0E7E0] rounded-lg p-8 h-full">
          <h3 className="text-2xl font-bold text-[#1A2332] mb-6 text-center">
            Traditional Resources
          </h3>

          <div className="space-y-6">
            <ResourceItem
              emoji="🛢️"
              name="Oil"
              delay={0.1}
              isVisible={isVisible}
            />
            <ResourceItem
              emoji="🪙"
              name="Gold"
              delay={0.2}
              isVisible={isVisible}
            />
            <ResourceItem
              emoji="🌲"
              name="Timber"
              delay={0.3}
              isVisible={isVisible}
            />
            <ResourceItem
              emoji="⚙️"
              name="Steel"
              delay={0.4}
              isVisible={isVisible}
            />
          </div>

          <div className="mt-8 space-y-2 text-sm text-slate-600">
            <PropertyRow label="Tangible" value="✓" isTraditional />
            <PropertyRow label="Finite" value="✓" isTraditional />
            <PropertyRow label="Rivalrous" value="✓" isTraditional />
            <PropertyRow label="Physical Infrastructure" value="✓" isTraditional />
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="hidden md:flex items-center">
        <div className="w-px h-full bg-gradient-to-b from-transparent via-[#197A83] to-transparent" />
      </div>

      {/* Data Resources */}
      <div
        className={`flex-1 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
        }`}
      >
        <div className="bg-[#0E5A61]/5 rounded-lg p-8 h-full">
          <h3 className="text-2xl font-bold text-[#0E5A61] mb-6 text-center">
            Data Resources
          </h3>

          <div className="space-y-6">
            <ResourceItem
              emoji="🖥️"
              name="Server Racks"
              delay={0.1}
              isVisible={isVisible}
            />
            <ResourceItem
              emoji="📡"
              name="Fiber Optics"
              delay={0.2}
              isVisible={isVisible}
            />
            <ResourceItem
              emoji="🏢"
              name="Data Centers"
              delay={0.3}
              isVisible={isVisible}
            />
            <ResourceItem
              emoji="☁️"
              name="Cloud Storage"
              delay={0.4}
              isVisible={isVisible}
            />
          </div>

          <div className="mt-8 space-y-2 text-sm text-[#0E5A61]">
            <PropertyRow label="Tangible" value="~" isTraditional={false} />
            <PropertyRow label="Finite" value="✗" isTraditional={false} />
            <PropertyRow label="Rivalrous" value="~" isTraditional={false} />
            <PropertyRow label="Physical Infrastructure" value="✓" isTraditional={false} />
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Individual Resource Item Component
 */
function ResourceItem({
  emoji,
  name,
  delay,
  isVisible,
}: {
  emoji: string;
  name: string;
  delay: number;
  isVisible: boolean;
}) {
  return (
    <div
      className={`flex items-center gap-4 p-4 bg-white rounded-lg shadow-sm transition-all duration-500`}
      style={{
        transitionDelay: isVisible ? `${delay}s` : '0s',
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(10px)',
      }}
    >
      <span className="text-4xl">{emoji}</span>
      <span className="text-lg font-semibold text-[#1A2332]">{name}</span>
    </div>
  );
}

/**
 * Property Row Component for Comparison Table
 */
function PropertyRow({
  label,
  value,
  isTraditional,
}: {
  label: string;
  value: string;
  isTraditional: boolean;
}) {
  return (
    <div className="flex justify-between items-center py-2 border-b border-slate-200/50">
      <span className="font-medium">{label}:</span>
      <span className={`font-bold ${
        value === '✓'
          ? isTraditional ? 'text-[#1A2332]' : 'text-[#0E5A61]'
          : value === '✗'
          ? 'text-red-500'
          : 'text-[#D97D42]'
      }`}>
        {value}
      </span>
    </div>
  );
}
