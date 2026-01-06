'use client';

import { useState } from 'react';

interface MathSection {
  label: string;
  content: string | React.ReactNode;
}

interface ExpandableMathProps {
  footnoteNumber?: number;
  claim: string;
  conversationalMath: MathSection[];
  formalMath?: MathSection[];
  source: string;
  sourceUrl?: string;
  confidence?: 'HIGH' | 'MEDIUM' | 'ESTIMATED';
  defaultExpanded?: boolean;
}

export default function ExpandableMath({
  footnoteNumber,
  claim,
  conversationalMath,
  formalMath,
  source,
  sourceUrl,
  confidence = 'HIGH',
  defaultExpanded = false,
}: ExpandableMathProps) {
  const [showConversational, setShowConversational] = useState(defaultExpanded);
  const [showFormal, setShowFormal] = useState(false);

  const confidenceColors = {
    HIGH: 'bg-green-100 text-green-800 border-green-300',
    MEDIUM: 'bg-yellow-100 text-yellow-800 border-yellow-300',
    ESTIMATED: 'bg-orange-100 text-orange-800 border-orange-300',
  };

  const confidenceIcons = {
    HIGH: '✓',
    MEDIUM: '⚠',
    ESTIMATED: '≈',
  };

  return (
    <div className="my-6 border-l-4 border-teal-600 bg-slate-50 rounded-r-lg">
      {/* Header / Claim */}
      <button
        onClick={() => setShowConversational(!showConversational)}
        className="w-full p-4 text-left hover:bg-slate-100 transition-colors flex items-start justify-between gap-4"
      >
        <div className="flex-1">
          {footnoteNumber && (
            <sup className="text-teal-600 font-bold mr-1">[{footnoteNumber}]</sup>
          )}
          <span className="text-sm font-medium text-slate-700">{claim}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className={`px-2 py-1 text-xs font-semibold rounded border ${confidenceColors[confidence]}`}>
            {confidenceIcons[confidence]} {confidence}
          </span>
          <span className={`transform transition-transform text-teal-600 ${showConversational ? 'rotate-180' : ''}`}>
            ▼
          </span>
        </div>
      </button>

      {/* Conversational Math */}
      {showConversational && (
        <div className="px-4 pb-4 space-y-3">
          <div className="p-4 bg-white rounded-lg border border-slate-200">
            <h4 className="text-sm font-bold text-slate-800 mb-3">Quick Check:</h4>
            <div className="space-y-2 text-sm text-slate-700">
              {conversationalMath.map((section, index) => (
                <div key={index}>
                  {section.label && (
                    <div className="font-semibold text-slate-800 mt-2 mb-1">{section.label}</div>
                  )}
                  <div>{section.content}</div>
                </div>
              ))}
            </div>

            {/* Source */}
            <div className="mt-4 pt-3 border-t border-slate-200 text-xs">
              <div className="text-slate-600 mb-1">
                <strong>Source:</strong> {source}
              </div>
              {sourceUrl && (
                <a
                  href={sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-teal-600 hover:text-teal-700 underline inline-flex items-center gap-1"
                >
                  Verify source
                  <span>↗</span>
                </a>
              )}
            </div>
          </div>

          {/* Show Formal Button */}
          {formalMath && formalMath.length > 0 && (
            <>
              <button
                onClick={() => setShowFormal(!showFormal)}
                className="w-full py-2 px-4 bg-white hover:bg-slate-100 text-slate-700 text-sm font-medium rounded-lg border border-slate-300 transition-colors flex items-center justify-between"
              >
                <span>Show formal calculation</span>
                <span className={`transform transition-transform ${showFormal ? 'rotate-180' : ''}`}>
                  ▼
                </span>
              </button>

              {/* Formal Math */}
              {showFormal && (
                <div className="p-4 bg-white rounded-lg border border-slate-300 font-mono text-xs space-y-2">
                  <div className="font-bold text-slate-800 mb-3 font-sans text-sm">
                    Formal Calculation:
                  </div>
                  {formalMath.map((section, index) => (
                    <div key={index} className="space-y-1">
                      {section.label && (
                        <div className="font-sans font-semibold text-slate-800 mt-3 mb-1">
                          {section.label}
                        </div>
                      )}
                      <div className="text-slate-700">{section.content}</div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}
