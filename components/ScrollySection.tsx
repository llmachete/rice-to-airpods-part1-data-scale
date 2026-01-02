'use client';

import { useEffect, useRef, ReactNode } from 'react';
import scrollama from 'scrollama';

interface ScrollySectionProps {
  children: ReactNode;
  onStepEnter?: (response: { element: HTMLElement; index: number; direction: 'up' | 'down' }) => void;
  onStepExit?: (response: { element: HTMLElement; index: number; direction: 'up' | 'down' }) => void;
  onStepProgress?: (response: { element: HTMLElement; index: number; progress: number }) => void;
  offset?: number;
  debug?: boolean;
}

export default function ScrollySection({
  children,
  onStepEnter,
  onStepExit,
  onStepProgress,
  offset = 0.5,
  debug = false,
}: ScrollySectionProps) {
  const scrollerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scroller = scrollama();

    scroller
      .setup({
        step: '.scroll-step',
        offset: offset as any,
        debug: debug,
        progress: !!onStepProgress,
      })
      .onStepEnter((response) => {
        if (onStepEnter) {
          onStepEnter(response as any);
        }
      })
      .onStepExit((response) => {
        if (onStepExit) {
          onStepExit(response as any);
        }
      });

    if (onStepProgress) {
      scroller.onStepProgress((response) => {
        onStepProgress(response as any);
      });
    }

    // Cleanup
    return () => {
      scroller.destroy();
    };
  }, [onStepEnter, onStepExit, onStepProgress, offset, debug]);

  return (
    <div ref={scrollerRef} className="scroller">
      {children}
    </div>
  );
}
