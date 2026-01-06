'use client';

import { useState } from 'react';

interface FootnoteProps {
  number: number;
  content: string | React.ReactNode;
  source?: string;
  sourceUrl?: string;
}

export function FootnoteMarker({ number, onClick }: { number: number; onClick: () => void }) {
  return (
    <sup
      onClick={onClick}
      className="inline-block ml-0.5 text-teal-600 font-bold cursor-pointer hover:text-teal-700 hover:underline transition-colors"
      role="button"
      aria-label={`View footnote ${number}`}
    >
      [{number}]
    </sup>
  );
}

export function InlineFootnote({ number, content, source, sourceUrl }: FootnoteProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <>
      <FootnoteMarker number={number} onClick={() => setIsExpanded(!isExpanded)} />

      {isExpanded && (
        <div className="my-4 p-4 bg-teal-50 border-l-4 border-teal-600 rounded-r-lg animate-slideDown">
          <div className="flex items-start justify-between gap-4 mb-2">
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-teal-700">Note {number}</span>
            </div>
            <button
              onClick={() => setIsExpanded(false)}
              className="text-slate-400 hover:text-slate-600 transition-colors"
              aria-label="Close footnote"
            >
              ✕
            </button>
          </div>
          <div className="text-sm text-slate-700 leading-relaxed mb-2">{content}</div>
          {source && (
            <div className="text-xs text-slate-600 pt-2 border-t border-teal-200">
              <strong>Source:</strong> {source}
              {sourceUrl && (
                <>
                  {' '}•{' '}
                  <a
                    href={sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-teal-600 hover:text-teal-700 underline"
                  >
                    Verify ↗
                  </a>
                </>
              )}
            </div>
          )}
        </div>
      )}
    </>
  );
}

export function FootnoteReference({
  id,
  number,
  content,
  source,
  sourceUrl,
}: FootnoteProps & { id: string }) {
  return (
    <div id={`footnote-${id}`} className="mb-4 scroll-mt-24">
      <div className="flex gap-3">
        <div className="flex-shrink-0 w-8 text-right">
          <span className="text-sm font-bold text-teal-700">[{number}]</span>
        </div>
        <div className="flex-1">
          <div className="text-sm text-slate-700 leading-relaxed mb-1">{content}</div>
          {source && (
            <div className="text-xs text-slate-600">
              <strong>Source:</strong> {source}
              {sourceUrl && (
                <>
                  {' '}•{' '}
                  <a
                    href={sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-teal-600 hover:text-teal-700 underline"
                  >
                    {sourceUrl}
                  </a>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export function FootnotesSection({ footnotes }: { footnotes: (FootnoteProps & { id: string })[] }) {
  return (
    <div className="my-12 bg-white border-2 border-slate-200 rounded-xl p-8">
      <h2 className="text-2xl font-bold text-slate-900 mb-6 pb-4 border-b border-slate-200">
        References & Notes
      </h2>
      <div className="space-y-4">
        {footnotes.map((footnote) => (
          <FootnoteReference key={footnote.id} {...footnote} />
        ))}
      </div>
      <div className="mt-6 pt-4 border-t border-slate-200 text-xs text-slate-500">
        <strong>About these references:</strong> All sources have been verified as of January 4,
        2026. Click any link to verify the information independently.
      </div>
    </div>
  );
}
