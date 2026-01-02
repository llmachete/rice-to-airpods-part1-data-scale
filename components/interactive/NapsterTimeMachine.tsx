'use client';

import { useState, useEffect, useRef } from 'react';

interface FilePreset {
  id: string;
  name: string;
  sizeMB: number;
  icon: string;
}

interface EraPreset {
  id: string;
  name: string;
  year: string;
  speedMBps: number;
  icon: string;
  color: string;
  description: string;
}

const FILE_PRESETS: FilePreset[] = [
  { id: 'song', name: 'Beyoncé - Single Ladies.mp3', sizeMB: 4, icon: '🎵' },
  { id: 'photo', name: 'vacation_2025.jpg', sizeMB: 8, icon: '📷' },
  { id: 'album', name: 'Random Access Memories - Daft Punk', sizeMB: 40, icon: '💿' },
  { id: 'movie', name: 'The Matrix (DivX).avi', sizeMB: 700, icon: '🎬' },
  { id: '4k-movie', name: 'The Matrix (4K UHD).mkv', sizeMB: 25000, icon: '🎞️' },
];

const ERA_PRESETS: EraPreset[] = [
  {
    id: 'napster-1999',
    name: '1999 Napster',
    year: '1999',
    speedMBps: 0.007, // 56 kbps
    icon: '📞',
    color: '#FF6B6B',
    description: '56k dial-up modem. Download a song while making a sandwich.',
  },
  {
    id: 'broadband-2003',
    name: '2003 Broadband',
    year: '2003',
    speedMBps: 0.125, // 1 Mbps
    icon: '🏠',
    color: '#4ECDC4',
    description: 'Early cable/DSL. Always-on internet revolution.',
  },
  {
    id: 'wifi-2008',
    name: '2008 WiFi',
    year: '2008',
    speedMBps: 1.25, // 10 Mbps
    icon: '📡',
    color: '#45B7D1',
    description: '802.11n WiFi. Cut the ethernet cord.',
  },
  {
    id: 'lte-2012',
    name: '2012 4G LTE',
    year: '2012',
    speedMBps: 6.25, // 50 Mbps
    icon: '📱',
    color: '#96CEB4',
    description: 'Mobile data fast enough to replace WiFi.',
  },
  {
    id: '5g-2025',
    name: '2025 5G',
    year: '2025',
    speedMBps: 125, // 1 Gbps
    icon: '🛰️',
    color: '#FFEAA7',
    description: 'Gigabit speeds. Instant everything.',
  },
];

/**
 * Feature 3: Napster Download Time Machine
 * Interactive download speed simulator across eras
 */
export default function NapsterTimeMachine() {
  const [selectedFile, setSelectedFile] = useState<FilePreset>(FILE_PRESETS[0]);
  const [selectedEra, setSelectedEra] = useState<EraPreset>(ERA_PRESETS[4]); // Default to 2025
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [showComparison, setShowComparison] = useState(false);
  const [comparisonProgress, setComparisonProgress] = useState<Record<string, number>>({});
  const downloadTimerRef = useRef<NodeJS.Timeout | undefined>(undefined);

  // Calculate download time
  const calculateDownloadTime = (fileSizeMB: number, speedMBps: number): string => {
    const seconds = fileSizeMB / speedMBps;

    if (seconds < 1) return `${(seconds * 1000).toFixed(0)} ms`;
    if (seconds < 60) return `${seconds.toFixed(2)} seconds`;
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    if (seconds < 3600) return `${mins}m ${secs}s`;
    const hours = Math.floor(seconds / 3600);
    const remainingMins = Math.floor((seconds % 3600) / 60);
    return `${hours}h ${remainingMins}m`;
  };

  // Start download animation
  const startDownload = () => {
    setIsDownloading(true);
    setDownloadProgress(0);

    const downloadTimeSeconds = selectedFile.sizeMB / selectedEra.speedMBps;
    const updateInterval = 100; // Update every 100ms
    const progressPerUpdate = (updateInterval / 1000) / downloadTimeSeconds;

    const timer = setInterval(() => {
      setDownloadProgress((prev) => {
        const next = prev + progressPerUpdate;
        if (next >= 1) {
          clearInterval(timer);
          setIsDownloading(false);
          return 1;
        }
        return next;
      });
    }, updateInterval);

    downloadTimerRef.current = timer;
  };

  // Start comparison race
  const startComparison = () => {
    setShowComparison(true);
    const progress: Record<string, number> = {};
    ERA_PRESETS.forEach((era) => {
      progress[era.id] = 0;
    });
    setComparisonProgress(progress);

    const updateInterval = 100;

    const timer = setInterval(() => {
      setComparisonProgress((prev) => {
        const next = { ...prev };
        let allDone = true;

        ERA_PRESETS.forEach((era) => {
          if (next[era.id] < 1) {
            const downloadTimeSeconds = selectedFile.sizeMB / era.speedMBps;
            const progressPerUpdate = (updateInterval / 1000) / downloadTimeSeconds;
            next[era.id] = Math.min(next[era.id] + progressPerUpdate, 1);
            if (next[era.id] < 1) allDone = false;
          }
        });

        if (allDone) {
          clearInterval(timer);
        }

        return next;
      });
    }, updateInterval);

    downloadTimerRef.current = timer;
  };

  // Cleanup timers
  useEffect(() => {
    return () => {
      if (downloadTimerRef.current) {
        clearInterval(downloadTimerRef.current);
      }
    };
  }, []);

  const downloadTime = calculateDownloadTime(selectedFile.sizeMB, selectedEra.speedMBps);
  const grainCount = selectedFile.sizeMB * 1024 * 1024; // bytes
  const coffeeCups = Math.floor(grainCount / 1000);

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-gradient-to-br from-slate-50 to-blue-50 rounded-2xl shadow-xl border border-slate-200">
      {/* Header */}
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold text-slate-900 mb-2">
          🎵 Download Time Machine
        </h2>
        <p className="text-slate-600">
          Experience how data velocity transformed from 1999 to 2025
        </p>
      </div>

      {!showComparison ? (
        <>
          {/* File Selector */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Select File:
            </label>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
              {FILE_PRESETS.map((file) => (
                <button
                  key={file.id}
                  onClick={() => {
                    setSelectedFile(file);
                    setDownloadProgress(0);
                  }}
                  className={`p-3 rounded-lg border-2 transition-all ${
                    selectedFile.id === file.id
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-slate-200 bg-white hover:border-blue-300'
                  }`}
                >
                  <div className="text-2xl mb-1">{file.icon}</div>
                  <div className="text-xs font-medium text-slate-700 truncate">
                    {file.id.replace('-', ' ')}
                  </div>
                  <div className="text-xs text-slate-500">{file.sizeMB} MB</div>
                </button>
              ))}
            </div>
          </div>

          {/* Era Selector */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              📡 Select Era:
            </label>
            <div className="space-y-2">
              {ERA_PRESETS.map((era) => (
                <button
                  key={era.id}
                  onClick={() => {
                    setSelectedEra(era);
                    setDownloadProgress(0);
                  }}
                  className={`w-full p-3 rounded-lg border-2 text-left transition-all ${
                    selectedEra.id === era.id
                      ? 'border-green-500 bg-green-50'
                      : 'border-slate-200 bg-white hover:border-green-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{era.icon}</span>
                    <div className="flex-1">
                      <div className="font-semibold text-slate-900">{era.name}</div>
                      <div className="text-xs text-slate-600">{era.description}</div>
                    </div>
                    {selectedEra.id === era.id && (
                      <span className="text-green-600 font-bold">●</span>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Download Display */}
          <div className="bg-white rounded-lg p-6 border border-slate-200 mb-4">
            <div className="mb-4">
              <div className="text-sm text-slate-600 mb-1">Downloading:</div>
              <div className="font-bold text-lg text-slate-900">{selectedFile.name}</div>
              <div className="text-sm text-slate-500">{selectedFile.sizeMB} MB</div>
            </div>

            {/* Progress Bar */}
            <div className="mb-4">
              <div className="bg-slate-200 h-6 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-blue-500 to-blue-600 transition-all duration-100 flex items-center justify-center text-white text-xs font-bold"
                  style={{ width: `${downloadProgress * 100}%` }}
                >
                  {downloadProgress > 0.1 && `${Math.floor(downloadProgress * 100)}%`}
                </div>
              </div>
            </div>

            {/* Download Stats */}
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <div className="text-slate-600">Estimated Time:</div>
                <div className="font-bold text-lg text-slate-900">{downloadTime}</div>
              </div>
              <div>
                <div className="text-slate-600">Data (rice grains):</div>
                <div className="font-bold text-lg text-slate-900">
                  {grainCount.toLocaleString()} grains
                </div>
                <div className="text-xs text-slate-500">({coffeeCups} coffee cups)</div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button
              onClick={startDownload}
              disabled={isDownloading}
              className={`flex-1 py-3 rounded-lg font-semibold transition-all ${
                isDownloading
                  ? 'bg-slate-300 text-slate-500 cursor-not-allowed'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              {isDownloading ? '⏳ Downloading...' : '▶ Start Download'}
            </button>
            <button
              onClick={startComparison}
              className="flex-1 py-3 rounded-lg font-semibold bg-green-600 text-white hover:bg-green-700 transition-all"
            >
              🏁 Compare All Eras
            </button>
          </div>

          {/* Historical Context */}
          <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <div className="text-sm text-slate-700">
              <strong>{selectedEra.year}:</strong> {selectedEra.description}
            </div>
            {selectedEra.id === 'napster-1999' && (
              <div className="text-xs text-slate-600 mt-2">
                💡 Fun fact: In 1999, users would queue downloads overnight and pray Mom didn't pick up the phone.
              </div>
            )}
            {selectedEra.id === '5g-2025' && (
              <div className="text-xs text-slate-600 mt-2">
                ⚡ This file downloads {Math.round(ERA_PRESETS[0].speedMBps / selectedEra.speedMBps * 17857)}x faster than 1999 Napster!
              </div>
            )}
          </div>
        </>
      ) : (
        <>
          {/* Comparison Race Mode */}
          <div className="mb-4">
            <h3 className="text-xl font-bold text-slate-900 mb-2">
              🏁 Downloading: {selectedFile.name} ({selectedFile.sizeMB} MB)
            </h3>
            <p className="text-sm text-slate-600">Watch how different eras compare:</p>
          </div>

          <div className="space-y-3 mb-4">
            {ERA_PRESETS.map((era) => {
              const progress = comparisonProgress[era.id] || 0;
              const time = calculateDownloadTime(selectedFile.sizeMB, era.speedMBps);
              return (
                <div key={era.id} className="bg-white rounded-lg p-3 border border-slate-200">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xl">{era.icon}</span>
                    <div className="flex-1">
                      <div className="font-semibold text-sm">{era.name}</div>
                    </div>
                    <div className="text-xs text-slate-500">{time}</div>
                  </div>
                  <div className="bg-slate-200 h-4 rounded-full overflow-hidden">
                    <div
                      className="h-full transition-all duration-100"
                      style={{
                        width: `${progress * 100}%`,
                        backgroundColor: era.color,
                      }}
                    />
                  </div>
                  <div className="text-xs text-slate-600 mt-1 text-right">
                    {progress >= 1 ? '✅ Done' : `${Math.floor(progress * 100)}%`}
                  </div>
                </div>
              );
            })}
          </div>

          <button
            onClick={() => {
              setShowComparison(false);
              setDownloadProgress(0);
            }}
            className="w-full py-3 rounded-lg font-semibold bg-slate-600 text-white hover:bg-slate-700 transition-all"
          >
            ← Back to Single Era
          </button>
        </>
      )}
    </div>
  );
}
