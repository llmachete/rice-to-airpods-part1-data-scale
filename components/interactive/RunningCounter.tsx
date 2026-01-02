'use client';

import { useEffect, useState, useRef } from 'react';

type UnitMode = 'grains' | 'volume' | 'containers' | 'real-world';
type ScopeMode = 'global' | 'device' | 'site' | 'airpods';
type VisualMode = 'minimal' | 'progress';

/**
 * Feature 1: Running Grains Counter
 * Sticky counter showing real-time data creation
 */
export default function RunningCounter() {
  const [bytesCreated, setBytesCreated] = useState(0);
  const [unitMode, setUnitMode] = useState<UnitMode>('grains');
  const [scopeMode, setScopeMode] = useState<ScopeMode>('global');
  const [visualMode, setVisualMode] = useState<VisualMode>('progress');
  const [isExpanded, setIsExpanded] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const startTimeRef = useRef<number>(Date.now());

  // Data creation rates (bytes per second)
  const RATES = {
    global: 5549792745195693, // 175 ZB/year
    device: 2000, // 2 KB/s background smartphone activity
    site: 500000, // 500 KB loaded (one-time)
    airpods: 563556, // 563 KB/s audio processing
  };

  // Update counter every 100ms
  useEffect(() => {
    const interval = setInterval(() => {
      const elapsed = (Date.now() - startTimeRef.current) / 1000; // seconds
      const rate = scopeMode === 'site'
        ? RATES.site // One-time for site
        : RATES[scopeMode];

      const bytes = scopeMode === 'site'
        ? RATES.site // Site is one-time load
        : Math.floor(elapsed * rate);

      setBytesCreated(bytes);
    }, 100);

    return () => clearInterval(interval);
  }, [scopeMode]);

  // Format display based on unit mode
  const formatDisplay = (bytes: number): { value: string; unit: string } => {
    switch (unitMode) {
      case 'grains':
        return {
          value: bytes.toLocaleString(),
          unit: bytes === 1 ? 'grain' : 'grains',
        };
      case 'volume':
        if (bytes < 1024) return { value: bytes.toString(), unit: 'bytes' };
        if (bytes < 1024 * 1024) return { value: (bytes / 1024).toFixed(1), unit: 'KB' };
        if (bytes < 1024 * 1024 * 1024) return { value: (bytes / (1024 * 1024)).toFixed(1), unit: 'MB' };
        return { value: (bytes / (1024 * 1024 * 1024)).toFixed(2), unit: 'GB' };
      case 'containers':
        const cups = Math.floor(bytes / 1000);
        const containers = Math.floor(bytes / 1000000000);
        if (containers > 0) return { value: containers.toString(), unit: containers === 1 ? 'container' : 'containers' };
        return { value: cups.toString(), unit: cups === 1 ? 'coffee cup' : 'coffee cups' };
      case 'real-world':
        const photos = Math.floor(bytes / (8 * 1024 * 1024)); // 8 MB per photo
        if (photos === 0) return { value: '<1', unit: 'photo' };
        return { value: photos.toString(), unit: photos === 1 ? 'photo' : 'photos' };
    }
  };

  const display = formatDisplay(bytesCreated);

  // Calculate progress toward next milestone
  const getProgress = (): { percent: number; milestone: string } => {
    if (bytesCreated < 1000) {
      return { percent: (bytesCreated / 1000) * 100, milestone: 'Coffee Cup (1 KB)' };
    } else if (bytesCreated < 10000) {
      return { percent: ((bytesCreated - 1000) / 9000) * 100, milestone: 'Email (10 KB)' };
    } else if (bytesCreated < 1000000) {
      return { percent: ((bytesCreated - 10000) / 990000) * 100, milestone: 'Photo (1 MB)' };
    } else if (bytesCreated < 4000000) {
      return { percent: ((bytesCreated - 1000000) / 3000000) * 100, milestone: 'Song (4 MB)' };
    } else {
      return { percent: 100, milestone: 'Container (1 GB)' };
    }
  };

  const progress = getProgress();

  // Scope labels
  const scopeLabels: Record<ScopeMode, string> = {
    global: '🌍 Global',
    device: '📱 Your Device',
    site: '💻 This Site',
    airpods: '🎧 AirPods',
  };

  if (isCollapsed) {
    return (
      <div className="fixed bottom-4 right-4 md:top-4 md:bottom-auto z-50">
        <button
          onClick={() => setIsCollapsed(false)}
          className="bg-slate-900 text-white rounded-full p-3 shadow-lg hover:bg-slate-800 transition-colors"
          aria-label="Expand data counter"
        >
          <span className="text-xl">🌾</span>
        </button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 md:top-4 md:bottom-auto z-50">
      <div className="bg-white rounded-lg shadow-xl border border-slate-200 p-4 min-w-[280px] max-w-sm">
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🌾</span>
            <div>
              <h3 className="text-sm font-bold text-slate-900">Data Creation</h3>
              <p className="text-xs text-slate-500">{scopeLabels[scopeMode]}</p>
            </div>
          </div>
          <button
            onClick={() => setIsCollapsed(true)}
            className="text-slate-400 hover:text-slate-600 text-lg leading-none"
            aria-label="Collapse counter"
          >
            ×
          </button>
        </div>

        {/* Main counter */}
        <div className="mb-3">
          <div className="text-xs text-slate-600 mb-1">Since you arrived:</div>
          <div className="flex items-baseline gap-2">
            <div className="text-2xl font-bold text-slate-900 font-mono">
              {display.value}
            </div>
            <div className="text-sm text-slate-600">{display.unit}</div>
          </div>
        </div>

        {/* Progress bar (if visual mode enabled) */}
        {visualMode === 'progress' && (
          <div className="mb-3">
            <div className="bg-slate-200 h-2 rounded-full overflow-hidden">
              <div
                className="bg-blue-500 h-full transition-all duration-300"
                style={{ width: `${Math.min(progress.percent, 100)}%` }}
              />
            </div>
            <div className="text-xs text-slate-500 mt-1 text-center">
              {progress.milestone}
            </div>
          </div>
        )}

        {/* Toggle controls */}
        <div className="space-y-2 mb-3">
          {/* Unit mode */}
          <div className="flex gap-1">
            {(['grains', 'volume', 'containers', 'real-world'] as UnitMode[]).map((mode) => (
              <button
                key={mode}
                onClick={() => setUnitMode(mode)}
                className={`flex-1 px-2 py-1 text-xs rounded transition-colors ${
                  unitMode === mode
                    ? 'bg-blue-500 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
                title={mode === 'grains' ? 'Bytes' : mode === 'volume' ? 'KB/MB/GB' : mode === 'containers' ? 'Cups/Containers' : 'Photos'}
              >
                {mode === 'grains' ? '🌾' : mode === 'volume' ? '📊' : mode === 'containers' ? '☕' : '📷'}
              </button>
            ))}
          </div>

          {/* Scope mode */}
          <div className="flex gap-1">
            {(['global', 'device', 'site', 'airpods'] as ScopeMode[]).map((mode) => (
              <button
                key={mode}
                onClick={() => {
                  setScopeMode(mode);
                  startTimeRef.current = Date.now(); // Reset timer
                  setBytesCreated(0);
                }}
                className={`flex-1 px-2 py-1 text-xs rounded transition-colors ${
                  scopeMode === mode
                    ? 'bg-green-500 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {mode === 'global' ? '🌍' : mode === 'device' ? '📱' : mode === 'site' ? '💻' : '🎧'}
              </button>
            ))}
          </div>
        </div>

        {/* Expand/collapse stats */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full text-xs text-blue-600 hover:text-blue-700 font-medium"
        >
          {isExpanded ? '▼ Hide Stats' : '▶ View Stats'}
        </button>

        {/* Expanded stats panel */}
        {isExpanded && (
          <div className="mt-3 pt-3 border-t border-slate-200 space-y-2">
            <div className="text-xs">
              <div className="font-semibold text-slate-700 mb-1">Milestones:</div>
              <div className="space-y-1 text-slate-600">
                <div className="flex justify-between">
                  <span>✅ Coffee Cup (1 KB)</span>
                  <span className="text-slate-400">
                    {bytesCreated >= 1000 ? 'Done' : 'Pending'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>✅ Email (10 KB)</span>
                  <span className="text-slate-400">
                    {bytesCreated >= 10000 ? 'Done' : 'Pending'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>🔄 Photo (1 MB)</span>
                  <span className="text-slate-400">
                    {bytesCreated >= 1000000 ? 'Done' : 'In progress'}
                  </span>
                </div>
              </div>
            </div>

            <div className="text-xs text-slate-600 italic">
              {scopeMode === 'global' && (
                <p>In the time you've been here, humanity created more data than existed in 1990.</p>
              )}
              {scopeMode === 'airpods' && (
                <p>Your AirPods process shipping containers of data per hour.</p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
