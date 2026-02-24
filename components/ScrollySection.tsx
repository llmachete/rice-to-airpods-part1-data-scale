'use client';

import { useEffect, useRef, ReactNode } from 'react';
import scrollama from 'scrollama';

interface ScrollamaResponse {
  element: HTMLElement;
  index: number;
  direction: 'up' | 'down';
}

interface ScrollamaProgressResponse extends ScrollamaResponse {
  progress: number;
}

interface ScrollySectionProps {
  children: ReactNode;
  onStepEnter?: (response: ScrollamaResponse) => void;
  onStepExit?: (response: ScrollamaResponse) => void;
  onStepProgress?: (response: ScrollamaProgressResponse) => void;
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
        offset: offset as 0 | 0.1 | 0.2 | 0.3 | 0.4 | 0.5 | 0.6 | 0.7 | 0.8 | 0.9 | 1,
        debug: debug,
        progress: !!onStepProgress,
      })
      .onStepEnter((response: unknown) => {
        if (onStepEnter) {
          onStepEnter(response as ScrollamaResponse);
        }
      })
      .onStepExit((response: unknown) => {
        if (onStepExit) {
          onStepExit(response as ScrollamaResponse);
        }
      });

    if (onStepProgress) {
      scroller.onStepProgress((response: unknown) => {
        onStepProgress(response as ScrollamaProgressResponse);
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
