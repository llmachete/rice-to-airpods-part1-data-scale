'use client';

import { useState, useEffect, useRef } from 'react';

type DataType = 'gb' | 'photos' | 'songs' | 'movies';

/**
 * Feature 2: Sentence Counter
 * Inline counter that updates while user reads a sentence
 */
export default function SentenceCounter() {
  const [isVisible, setIsVisible] = useState(false);
  const [gbCreated, setGbCreated] = useState(0);
  const [dataType, setDataType] = useState<DataType>('gb');
  const startTimeRef = useRef<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // 175 ZB/year = ~200,000 GB/second
  const GB_PER_SECOND = 200000;

  // Setup intersection observer to detect when sentence is visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
          startTimeRef.current = Date.now();
        }
      },
      { threshold: 0.5 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [isVisible]);

  // Update counter every 100ms when visible
  useEffect(() => {
    if (!isVisible || !startTimeRef.current) return;

    const interval = setInterval(() => {
      const elapsed = (Date.now() - startTimeRef.current!) / 1000; // seconds
      const gb = Math.floor(elapsed * GB_PER_SECOND);
      setGbCreated(gb);
    }, 100);

    return () => clearInterval(interval);
  }, [isVisible]);

  // Format display based on data type
  const formatDisplay = (): { value: string; unit: string } => {
    switch (dataType) {
      case 'gb':
        if (gbCreated < 1000) return { value: gbCreated.toLocaleString(), unit: 'GB' };
        if (gbCreated < 1000000) return { value: (gbCreated / 1000).toFixed(1), unit: 'TB' };
        return { value: (gbCreated / 1000000).toFixed(2), unit: 'PB' };
      case 'photos':
        const photos = Math.floor(gbCreated * 125); // ~8 MB per photo
        return { value: photos.toLocaleString(), unit: photos === 1 ? 'photo' : 'photos' };
      case 'songs':
        const albums = Math.floor(gbCreated * 25); // ~4 MB per song, ~10 songs per album
        return { value: albums.toLocaleString(), unit: albums === 1 ? 'album' : 'albums' };
      case 'movies':
        const movies = Math.floor(gbCreated / 0.7); // 700 MB per movie
        return { value: movies.toLocaleString(), unit: movies === 1 ? 'movie' : 'movies' };
    }
  };

  const display = formatDisplay();

  // Color that intensifies as number grows
  const getColor = (): string => {
    if (gbCreated < 100000) return 'text-blue-600';
    if (gbCreated < 500000) return 'text-orange-600';
    return 'text-red-600';
  };

  return (
    <div ref={containerRef} className="my-8 p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border-2 border-blue-200">
      <p className="text-xl leading-relaxed text-slate-800 text-center mb-4">
        <strong>Read this sentence slowly.</strong> By the time you finish reading these twenty-four words,
        humanity will have created approximately{' '}
        <span className={`inline-flex items-baseline gap-2 font-mono font-bold text-3xl ${getColor()} transition-colors duration-300`}>
          <span className="inline-block min-w-[120px] text-right">
            {display.value}
          </span>
          <span className="text-lg font-semibold">
            {display.unit}
          </span>
        </span>
        {' '}of new data.
      </p>

      {/* Toggle buttons */}
      {isVisible && (
        <div className="flex justify-center gap-2 flex-wrap">
          <button
            onClick={() => setDataType('gb')}
            className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
              dataType === 'gb'
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-white text-slate-600 hover:bg-blue-100'
            }`}
          >
            📊 Gigabytes
          </button>
          <button
            onClick={() => setDataType('photos')}
            className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
              dataType === 'photos'
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-white text-slate-600 hover:bg-blue-100'
            }`}
          >
            📷 Photos
          </button>
          <button
            onClick={() => setDataType('songs')}
            className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
              dataType === 'songs'
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-white text-slate-600 hover:bg-blue-100'
            }`}
          >
            🎵 Albums
          </button>
          <button
            onClick={() => setDataType('movies')}
            className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
              dataType === 'movies'
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-white text-slate-600 hover:bg-blue-100'
            }`}
          >
            🎬 Movies
          </button>
        </div>
      )}

      {/* Additional context */}
      {isVisible && gbCreated > 100000 && (
        <div className="mt-4 text-center text-sm text-slate-600 italic animate-fade-in">
          That&apos;s more data than existed on all hard drives on Earth in 1990.
        </div>
      )}
    </div>
  );
}
