'use client';

import { useState } from 'react';

interface ReflectionZoneProps {
  title: string;
  content: string | React.ReactNode;
  question?: string;
  options?: Array<{ label: string; isCorrect?: boolean; feedback?: string }>;
  children?: React.ReactNode;
}

export default function ReflectionZone({
  title,
  content,
  question,
  options,
  children,
}: ReflectionZoneProps) {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);

  const handleOptionSelect = (index: number) => {
    setSelectedOption(index);
    setShowFeedback(true);
  };

  return (
    <div className="min-h-[60vh] flex items-center justify-center py-16 px-6 bg-gradient-to-b from-slate-50/0 via-slate-50/30 to-slate-50/0">
      <div className="max-w-3xl mx-auto">
        {/* Main content card */}
        <div className="bg-white/90 backdrop-blur rounded-2xl shadow-lg border-2 border-slate-200 p-8 md:p-12">
          <h3 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6 text-center">
            {title}
          </h3>

          <div className="text-lg text-slate-700 leading-relaxed mb-8 text-center">
            {content}
          </div>

          {/* Optional interactive question */}
          {question && options && (
            <div className="mt-8 p-6 bg-teal-50 border-2 border-teal-200 rounded-xl">
              <p className="text-lg font-semibold text-slate-900 mb-4">{question}</p>

              <div className="space-y-3">
                {options.map((option, index) => {
                  const isSelected = selectedOption === index;
                  const isCorrect = option.isCorrect;
                  const showResult = isSelected && showFeedback;

                  let buttonClasses =
                    'w-full px-6 py-4 text-left rounded-lg border-2 transition-all hover:scale-[1.02]';

                  if (!showResult) {
                    buttonClasses +=
                      ' border-slate-300 bg-white hover:border-teal-500 hover:bg-teal-50';
                  } else if (isCorrect) {
                    buttonClasses += ' border-green-500 bg-green-50';
                  } else {
                    buttonClasses += ' border-orange-500 bg-orange-50';
                  }

                  return (
                    <div key={index}>
                      <button
                        onClick={() => handleOptionSelect(index)}
                        disabled={showFeedback}
                        className={buttonClasses}
                      >
                        <span className="font-medium text-slate-800">{option.label}</span>
                        {showResult && (
                          <span className="ml-3 text-lg">
                            {isCorrect ? '✓' : '✗'}
                          </span>
                        )}
                      </button>

                      {/* Feedback */}
                      {isSelected && showFeedback && option.feedback && (
                        <div
                          className={`mt-2 p-4 rounded-lg ${
                            isCorrect ? 'bg-green-100 border border-green-300' : 'bg-orange-100 border border-orange-300'
                          }`}
                        >
                          <p className="text-sm text-slate-700">{option.feedback}</p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {showFeedback && (
                <button
                  onClick={() => {
                    setSelectedOption(null);
                    setShowFeedback(false);
                  }}
                  className="mt-4 px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 text-sm font-medium rounded-lg transition-colors"
                >
                  Try Again
                </button>
              )}
            </div>
          )}

          {/* Optional custom children */}
          {children && <div className="mt-8">{children}</div>}
        </div>

        {/* Scroll hint */}
        <div className="mt-12 text-center">
          <div className="inline-block px-6 py-3 bg-white/80 backdrop-blur rounded-full shadow-sm border border-slate-200 text-slate-500 text-sm animate-bounce">
            ↓ Continue when ready ↓
          </div>
        </div>
      </div>
    </div>
  );
}

// Pre-built reflection zones for common use cases

export function LetThatSinkIn({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-[60vh] flex items-center justify-center py-16 px-6 bg-gradient-to-b from-slate-50/0 via-amber-50/20 to-slate-50/0">
      <div className="max-w-2xl mx-auto text-center">
        <div className="mb-8">
          <div className="inline-block p-4 bg-amber-100 rounded-full mb-4">
            <span className="text-4xl">💡</span>
          </div>
        </div>
        <div className="text-2xl md:text-3xl font-bold text-slate-900 leading-relaxed">
          {children}
        </div>
        <div className="mt-12 text-slate-500 text-sm">
          <div className="inline-block px-6 py-3 bg-white/80 backdrop-blur rounded-full shadow-sm border border-slate-200 animate-bounce">
            ↓ Continue ↓
          </div>
        </div>
      </div>
    </div>
  );
}

export function MajorBreak() {
  return <div className="h-screen" />;
}
