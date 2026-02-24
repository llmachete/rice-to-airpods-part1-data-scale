'use client';

import { useState, useEffect, useRef } from 'react';
import measurements from '@/data/measurements.json';

interface Measurement {
  id: string;
  name: string;
  category: string;
  volumeM3: number;
  unit: string;
  emoji: string;
  description: string;
  source: string;
  sourceUrl: string;
  weight: number;
  animationType: string;
  funFact?: string;
}

// Slowed down for elegant user experience (fills typical container in ~30 seconds)
const BYTES_PER_SECOND = 200000; // Was 5.5 quadrillion (real global rate)
const RICE_GRAIN_VOLUME_M3 = 0.00000005; // 50 mm³
const ROTATION_INTERVAL = 15000; // 15 seconds

export default function HumorousCounter() {
  const [startTime] = useState(Date.now());
  const [currentBytes, setCurrentBytes] = useState(0);
  const [currentMeasurement, setCurrentMeasurement] = useState<Measurement | null>(null);
  const [showMath, setShowMath] = useState(false);
  const [showFormalMath, setShowFormalMath] = useState(false);
  const [fillPercentage, setFillPercentage] = useState(0);
  const [isMinimized, setIsMinimized] = useState(true);
  const [isVisible, setIsVisible] = useState(true);
  const animationFrameRef = useRef<number | undefined>(undefined);

  // Draggable position state
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isDraggable, setIsDraggable] = useState(false);

  // Weighted random selection
  const selectMeasurement = (): Measurement => {
    const totalWeight = measurements.measurements.reduce((sum, m) => sum + m.weight, 0);
    let random = Math.random() * totalWeight;

    for (const measurement of measurements.measurements) {
      random -= measurement.weight;
      if (random <= 0) {
        return measurement as Measurement;
      }
    }

    return measurements.measurements[0] as Measurement;
  };

  // Update counter continuously
  useEffect(() => {
    const updateCounter = () => {
      const elapsed = (Date.now() - startTime) / 1000;
      const bytes = Math.floor(elapsed * BYTES_PER_SECOND);
      setCurrentBytes(bytes);

      // Calculate fill percentage if we have a measurement
      if (currentMeasurement) {
        const riceVolumeM3 = bytes * RICE_GRAIN_VOLUME_M3;
        const ratio = riceVolumeM3 / currentMeasurement.volumeM3;
        const percentage = Math.min(Math.floor(ratio * 100), 100);
        setFillPercentage(percentage);
      }

      animationFrameRef.current = requestAnimationFrame(updateCounter);
    };

    updateCounter();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [startTime, currentMeasurement]);

  // Rotate measurement periodically
  useEffect(() => {
    setCurrentMeasurement(selectMeasurement());

    const interval = setInterval(() => {
      setCurrentMeasurement(selectMeasurement());
      setShowMath(false);
      setShowFormalMath(false);
    }, ROTATION_INTERVAL);

    return () => clearInterval(interval);
  }, []);

  // Hide widget on scroll when minimized (prevents content overlap)
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      // Hide widget when scrolled past 400px, but only if minimized
      if (scrollY > 400 && isMinimized) {
        setIsVisible(false);
      } else if (scrollY <= 400) {
        setIsVisible(true);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMinimized]);

  // Drag handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!isDraggable) return;
    e.preventDefault();
    setIsDragging(true);
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    setDragOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (!isDraggable) return;
    setIsDragging(true);
    const touch = e.touches[0];
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    setDragOffset({
      x: touch.clientX - rect.left,
      y: touch.clientY - rect.top,
    });
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      setPosition({
        x: e.clientX - dragOffset.x,
        y: e.clientY - dragOffset.y,
      });
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isDragging) return;
      e.preventDefault();
      const touch = e.touches[0];
      setPosition({
        x: touch.clientX - dragOffset.x,
        y: touch.clientY - dragOffset.y,
      });
    };

    const handleEnd = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleEnd);
      document.addEventListener('touchmove', handleTouchMove, { passive: false });
      document.addEventListener('touchend', handleEnd);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleEnd);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleEnd);
    };
  }, [isDragging, dragOffset]);

  if (!currentMeasurement) return null;

  const riceVolumeM3 = currentBytes * RICE_GRAIN_VOLUME_M3;
  const ratio = riceVolumeM3 / currentMeasurement.volumeM3;

  // Smart formatting: Always 2 decimals, show < 0.01 for very small numbers
  const formatRatio = (value: number): string => {
    if (value >= 0.01) {
      // Use 2 decimal places for normal numbers
      return value.toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      });
    } else if (value > 0) {
      // Show < 0.01 for very small non-zero numbers
      return '< 0.01';
    } else {
      // Show 0.00 for actual zero
      return '0.00';
    }
  };

  const displayValue = formatRatio(ratio);

  // Format bytes for display
  const formatBytes = (bytes: number): string => {
    if (bytes < 1000) return `${bytes} bytes`;
    if (bytes < 1000000) return `${(bytes / 1000).toFixed(1)} KB`;
    if (bytes < 1000000000) return `${(bytes / 1000000).toFixed(1)} MB`;
    return `${(bytes / 1000000000).toFixed(1)} GB`;
  };

  // Minimized view - compact horizontal bar
  if (isMinimized) {
    const style = isDraggable
      ? { left: `${position.x}px`, top: `${position.y}px`, right: 'auto' }
      : {};

    return (
      <div
        className={`fixed z-50 cursor-pointer transition-all hover:scale-105 ${
          !isVisible ? 'opacity-0 pointer-events-none' : 'opacity-100'
        } ${isDragging ? 'cursor-grabbing' : isDraggable ? 'cursor-grab' : ''} ${
          !isDraggable ? 'top-4 right-4 md:top-6 md:right-6' : ''
        }`}
        style={style}
        onClick={(e) => {
          if (!isDragging) {
            setIsMinimized(false);
            setIsVisible(true); // Show widget when user explicitly expands it
          }
        }}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
      >
        <div className="bg-white border-2 border-slate-200 rounded-full shadow-lg px-4 py-2 md:px-5 md:py-3 flex items-center gap-2 md:gap-3 hover:shadow-xl transition-shadow">
          {isDraggable && (
            <span className="text-slate-400 cursor-grab" title="Drag to reposition">⠿</span>
          )}
          <span className="text-lg md:text-xl">🌾</span>
          <div className="flex items-baseline gap-1 md:gap-2">
            <span className="text-base md:text-lg font-bold text-orange-600 font-mono">{displayValue}</span>
            <span className="text-xs md:text-sm text-slate-600">{currentMeasurement.emoji} {currentMeasurement.unit}</span>
          </div>
          <span className="text-green-600 text-xs font-medium px-2 py-0.5 bg-green-50 rounded-full hidden md:inline">LIVE</span>
        </div>
      </div>
    );
  }

  const widgetStyle = isDraggable
    ? { left: `${position.x}px`, top: `${position.y}px`, right: 'auto' }
    : {};

  return (
    <>
      {/* Main Counter Widget */}
      <div
        className={`fixed w-[calc(100vw-2rem)] md:w-80 max-w-sm bg-white border-2 border-slate-200 rounded-xl shadow-lg p-4 md:p-6 z-50 transition-all hover:shadow-xl ${
          !isVisible ? 'opacity-0 pointer-events-none' : 'opacity-100'
        } ${isDragging ? 'cursor-grabbing shadow-2xl' : ''} ${
          !isDraggable ? 'top-4 right-4 md:top-6 md:right-6' : ''
        }`}
        style={widgetStyle}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-3 md:mb-4">
          <div
            className={`flex items-center gap-2 ${isDraggable ? 'cursor-grab' : ''}`}
            onMouseDown={isDraggable ? handleMouseDown : undefined}
            onTouchStart={isDraggable ? handleTouchStart : undefined}
          >
            {isDraggable && (
              <span className="text-slate-400" title="Drag handle">⠿</span>
            )}
            <h3 className="text-xs md:text-sm font-semibold text-slate-700 uppercase tracking-wide">
              🌾 Global Data Creation
            </h3>
            <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
              LIVE
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setIsDraggable(!isDraggable);
                if (!isDraggable) {
                  // Reset to default position when enabling drag
                  setPosition({ x: 0, y: 0 });
                }
              }}
              className={`text-slate-400 hover:text-slate-600 text-sm leading-none transition-colors ${
                isDraggable ? 'text-teal-600' : ''
              }`}
              aria-label="Toggle drag mode"
              title={isDraggable ? 'Lock position' : 'Enable drag'}
            >
              {isDraggable ? '🔓' : '📌'}
            </button>
            <button
              onClick={() => setIsMinimized(true)}
              className="text-slate-400 hover:text-slate-600 text-xl leading-none transition-colors"
              aria-label="Minimize widget"
            >
              −
            </button>
          </div>
        </div>

        {/* Main Display */}
        <div className="mb-3 md:mb-4">
          <div className="text-xs text-slate-500 mb-1">Since you arrived:</div>
          <div className="text-2xl md:text-3xl font-bold text-orange-600 mb-1 md:mb-2 font-mono">
            {displayValue}
          </div>
          <div className="text-base md:text-lg font-semibold text-slate-800 mb-1 flex items-center gap-2">
            <span>{currentMeasurement.emoji}</span>
            <span>{currentMeasurement.unit}</span>
          </div>
          <div className="text-xs text-slate-500">
            ({formatBytes(currentBytes)} of data)
          </div>
        </div>

        {/* Fill Indicator */}
        <div className="mb-3 md:mb-4">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs text-slate-600 font-medium">Fill Level</span>
            <span className="text-xs text-orange-600 font-mono">{fillPercentage}%</span>
          </div>
          <div className="h-6 md:h-8 bg-slate-100 rounded-lg overflow-hidden relative">
            <div
              className="h-full bg-gradient-to-r from-teal-500 to-teal-600 transition-all duration-1000 ease-out relative"
              style={{ width: `${Math.min(fillPercentage, 100)}%` }}
            >
              <div className="absolute inset-0 bg-white/20 animate-pulse" />
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-xl md:text-2xl opacity-30">
                {currentMeasurement.emoji}
              </span>
            </div>
          </div>
          {fillPercentage > 0 && fillPercentage < 100 && (
            <div className="text-xs text-slate-500 mt-1 text-center">
              {fillPercentage < 50 ? '🏔️ Partially filled' : '🌊 Getting full'}
            </div>
          )}
          {fillPercentage >= 100 && (
            <div className="text-xs text-green-600 font-semibold mt-1 text-center">
              ✅ Full! Moving to next container...
            </div>
          )}
        </div>

        {/* Fun Fact */}
        {currentMeasurement.funFact && (
          <div className="mb-2 md:mb-3 p-2 bg-amber-50 border border-amber-200 rounded text-xs text-slate-700">
            <span className="font-semibold">💡 </span>
            {currentMeasurement.funFact}
          </div>
        )}

        {/* Show the Math Button */}
        <button
          onClick={() => setShowMath(!showMath)}
          className="w-full py-2 px-3 md:px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs md:text-sm font-medium rounded-lg transition-colors flex items-center justify-between"
        >
          <span>Show the math</span>
          <span className={`transform transition-transform ${showMath ? 'rotate-180' : ''}`}>
            ▼
          </span>
        </button>

        {/* Conversational Math */}
        {showMath && (
          <div className="mt-2 md:mt-3 p-3 md:p-4 bg-slate-50 rounded-lg border border-slate-200 text-xs space-y-2">
            <div className="font-semibold text-slate-800 mb-2">Quick Math:</div>

            <div className="space-y-1 text-slate-700">
              <div>• Data created: <span className="font-mono font-semibold">{formatBytes(currentBytes)}</span></div>
              <div>• Rice grains: <span className="font-mono font-semibold">{currentBytes.toLocaleString()}</span></div>
              <div>• Rice volume: <span className="font-mono font-semibold">{riceVolumeM3.toExponential(2)} m³</span></div>
              <div>• {currentMeasurement.name} volume: <span className="font-mono font-semibold">{currentMeasurement.volumeM3.toExponential(2)} m³</span></div>
              <div>• Ratio: <span className="font-mono font-semibold">{displayValue}</span></div>
            </div>

            <div className="pt-2 border-t border-slate-300">
              <div className="text-slate-600 mb-1">
                <strong>Source:</strong> {currentMeasurement.source}
              </div>
              {currentMeasurement.sourceUrl && (
                <a
                  href={currentMeasurement.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-teal-600 hover:text-teal-700 underline text-xs"
                >
                  Verify source ↗
                </a>
              )}
            </div>

            {/* Show Formal Proof Button */}
            <button
              onClick={() => setShowFormalMath(true)}
              className="w-full mt-2 py-1.5 md:py-2 px-3 bg-white hover:bg-slate-100 text-slate-700 text-xs font-medium rounded border border-slate-300 transition-colors"
            >
              Show formal calculation →
            </button>
          </div>
        )}
      </div>

      {/* Formal Math Modal */}
      {showFormalMath && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] flex items-center justify-center p-2 md:p-4"
          onClick={() => setShowFormalMath(false)}
        >
          <div
            className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] md:max-h-[80vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="sticky top-0 bg-white border-b border-slate-200 px-4 md:px-6 py-3 md:py-4 flex items-center justify-between rounded-t-xl">
              <h3 className="text-base md:text-lg font-bold text-slate-900">Formal Calculation</h3>
              <button
                onClick={() => setShowFormalMath(false)}
                className="text-slate-400 hover:text-slate-600 text-2xl leading-none"
              >
                ×
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-4 md:p-6 space-y-3 md:space-y-4">
              {/* Given Values */}
              <div>
                <div className="font-bold text-slate-900 mb-3">Given:</div>
                <div className="space-y-2 font-mono text-sm bg-slate-50 p-4 rounded-lg">
                  <div className="flex justify-between">
                    <span className="text-slate-600">V<sub>rice</sub> =</span>
                    <span className="text-slate-900 font-semibold">{RICE_GRAIN_VOLUME_M3} m³/grain</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">V<sub>{currentMeasurement.id.replace(/-/g, '_')}</sub> =</span>
                    <span className="text-slate-900 font-semibold">{currentMeasurement.volumeM3.toExponential(2)} m³</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">B<sub>data</sub> =</span>
                    <span className="text-slate-900 font-semibold">{currentBytes.toLocaleString()} bytes</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Conversion:</span>
                    <span className="text-slate-900 font-semibold">1 grain = 1 byte</span>
                  </div>
                </div>
              </div>

              {/* Calculate Total Volume */}
              <div>
                <div className="font-bold text-slate-900 mb-3">Step 1: Calculate total rice volume</div>
                <div className="space-y-2 font-mono text-sm bg-slate-50 p-4 rounded-lg">
                  <div>V<sub>total</sub> = B<sub>data</sub> × V<sub>rice</sub></div>
                  <div>V<sub>total</sub> = {currentBytes.toExponential(2)} × {RICE_GRAIN_VOLUME_M3}</div>
                  <div className="text-orange-600 font-bold">V<sub>total</sub> = {riceVolumeM3.toExponential(2)} m³</div>
                </div>
              </div>

              {/* Calculate Ratio */}
              <div>
                <div className="font-bold text-slate-900 mb-3">Step 2: Calculate ratio to {currentMeasurement.name}</div>
                <div className="space-y-2 font-mono text-sm bg-slate-50 p-4 rounded-lg">
                  <div>Ratio = V<sub>total</sub> / V<sub>{currentMeasurement.id.replace(/-/g, '_')}</sub></div>
                  <div>Ratio = {riceVolumeM3.toExponential(2)} / {currentMeasurement.volumeM3.toExponential(2)}</div>
                  <div className="text-green-700 font-bold">Ratio = {ratio.toExponential(6)}</div>
                </div>
              </div>

              {/* Final Result */}
              <div className="bg-gradient-to-r from-teal-50 to-orange-50 border-2 border-teal-200 rounded-lg p-4">
                <div className="text-center">
                  <div className="text-sm text-slate-600 mb-1">Final Result:</div>
                  <div className="text-3xl font-bold text-teal-700">
                    {displayValue} <span className="text-lg font-normal text-slate-700">{currentMeasurement.unit}</span>
                  </div>
                  <div className="text-xs text-slate-500 mt-2">
                    ✓ Calculation verified
                  </div>
                </div>
              </div>

              {/* Source Attribution */}
              <div className="border-t border-slate-200 pt-4 mt-4">
                <div className="text-xs text-slate-600 space-y-1">
                  <div><strong>Measurement Source:</strong> {currentMeasurement.source}</div>
                  {currentMeasurement.sourceUrl && (
                    <div>
                      <a
                        href={currentMeasurement.sourceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-teal-600 hover:text-teal-700 underline"
                      >
                        Verify source documentation ↗
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="sticky bottom-0 bg-slate-50 border-t border-slate-200 px-4 md:px-6 py-3 md:py-4 flex justify-end rounded-b-xl">
              <button
                onClick={() => setShowFormalMath(false)}
                className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white text-sm md:text-base font-medium rounded-lg transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
