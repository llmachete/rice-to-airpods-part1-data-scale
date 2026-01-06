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

const BYTES_PER_SECOND_GLOBAL = 5549792745195693;
const RICE_GRAIN_VOLUME_M3 = 0.00000005; // 50 mm³
const ROTATION_INTERVAL = 15000; // 15 seconds

export default function HumorousCounter() {
  const [startTime] = useState(Date.now());
  const [currentBytes, setCurrentBytes] = useState(0);
  const [currentMeasurement, setCurrentMeasurement] = useState<Measurement | null>(null);
  const [showMath, setShowMath] = useState(false);
  const [showFormalMath, setShowFormalMath] = useState(false);
  const [fillPercentage, setFillPercentage] = useState(0);
  const animationFrameRef = useRef<number | undefined>(undefined);

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
      const bytes = Math.floor(elapsed * BYTES_PER_SECOND_GLOBAL);
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

  if (!currentMeasurement) return null;

  const riceVolumeM3 = currentBytes * RICE_GRAIN_VOLUME_M3;
  const ratio = riceVolumeM3 / currentMeasurement.volumeM3;
  const displayValue = ratio < 0.000001
    ? ratio.toExponential(2)
    : ratio.toFixed(12).replace(/\.?0+$/, '');

  // Format bytes for display
  const formatBytes = (bytes: number): string => {
    if (bytes < 1000) return `${bytes} bytes`;
    if (bytes < 1000000) return `${(bytes / 1000).toFixed(1)} KB`;
    if (bytes < 1000000000) return `${(bytes / 1000000).toFixed(1)} MB`;
    return `${(bytes / 1000000000).toFixed(1)} GB`;
  };

  return (
    <div className="fixed top-24 right-6 w-80 bg-white border-2 border-slate-200 rounded-xl shadow-lg p-6 z-50 transition-all hover:shadow-xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-slate-700 uppercase tracking-wide">
          🌾 Global Data Creation
        </h3>
        <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
          LIVE
        </span>
      </div>

      {/* Main Display */}
      <div className="mb-4">
        <div className="text-xs text-slate-500 mb-1">Since you arrived:</div>
        <div className="text-3xl font-bold text-orange-600 mb-2 font-mono">
          {displayValue}
        </div>
        <div className="text-lg font-semibold text-slate-800 mb-1 flex items-center gap-2">
          <span>{currentMeasurement.emoji}</span>
          <span>{currentMeasurement.unit}</span>
        </div>
        <div className="text-xs text-slate-500">
          ({formatBytes(currentBytes)} of data)
        </div>
      </div>

      {/* Fill Indicator */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-1">
          <span className="text-xs text-slate-600 font-medium">Fill Level</span>
          <span className="text-xs text-orange-600 font-mono">{fillPercentage}%</span>
        </div>
        <div className="h-8 bg-slate-100 rounded-lg overflow-hidden relative">
          <div
            className="h-full bg-gradient-to-r from-teal-500 to-teal-600 transition-all duration-1000 ease-out relative"
            style={{ width: `${Math.min(fillPercentage, 100)}%` }}
          >
            <div className="absolute inset-0 bg-white/20 animate-pulse" />
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-2xl opacity-30">
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
        <div className="mb-3 p-2 bg-amber-50 border border-amber-200 rounded text-xs text-slate-700">
          <span className="font-semibold">💡 </span>
          {currentMeasurement.funFact}
        </div>
      )}

      {/* Show the Math Button */}
      <button
        onClick={() => setShowMath(!showMath)}
        className="w-full py-2 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-medium rounded-lg transition-colors flex items-center justify-between"
      >
        <span>Show the math</span>
        <span className={`transform transition-transform ${showMath ? 'rotate-180' : ''}`}>
          ▼
        </span>
      </button>

      {/* Conversational Math */}
      {showMath && (
        <div className="mt-3 p-4 bg-slate-50 rounded-lg border border-slate-200 text-xs space-y-2">
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
                className="text-teal-600 hover:text-teal-700 underline"
              >
                Verify source ↗
              </a>
            )}
          </div>

          {/* Show Formal Proof Button */}
          <button
            onClick={() => setShowFormalMath(!showFormalMath)}
            className="w-full mt-2 py-2 px-3 bg-white hover:bg-slate-100 text-slate-700 text-xs font-medium rounded border border-slate-300 transition-colors flex items-center justify-between"
          >
            <span>Show formal calculation</span>
            <span className={`transform transition-transform ${showFormalMath ? 'rotate-180' : ''}`}>
              ▼
            </span>
          </button>

          {/* Formal Math */}
          {showFormalMath && (
            <div className="mt-2 p-3 bg-white rounded border border-slate-300 text-xs font-mono space-y-2">
              <div className="font-bold text-slate-800 mb-2 font-sans">Formal Calculation:</div>

              <div className="space-y-1 text-slate-700">
                <div className="font-sans font-semibold text-slate-800 mt-2">Given:</div>
                <div>V_rice = {RICE_GRAIN_VOLUME_M3} m³/grain</div>
                <div>V_{currentMeasurement.id.replace(/-/g, '_')} = {currentMeasurement.volumeM3.toExponential(2)} m³</div>
                <div>B_data = {currentBytes.toLocaleString()} bytes</div>
                <div>1 grain = 1 byte</div>

                <div className="font-sans font-semibold text-slate-800 mt-2">Calculate total volume:</div>
                <div>V_total = B_data × V_rice</div>
                <div>V_total = {currentBytes.toExponential(2)} × {RICE_GRAIN_VOLUME_M3}</div>
                <div>V_total = {riceVolumeM3.toExponential(2)} m³</div>

                <div className="font-sans font-semibold text-slate-800 mt-2">Calculate ratio:</div>
                <div>Ratio = V_total / V_{currentMeasurement.id.replace(/-/g, '_')}</div>
                <div>Ratio = {riceVolumeM3.toExponential(2)} / {currentMeasurement.volumeM3.toExponential(2)}</div>
                <div>Ratio = {ratio.toExponential(6)}</div>
                <div className="text-green-700">Ratio ≈ {displayValue} ✓</div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
