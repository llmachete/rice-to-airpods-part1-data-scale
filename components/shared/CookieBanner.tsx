'use client';

import { useState, useEffect } from 'react';

export default function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const loadGoogleAnalytics = () => {
    if (typeof window !== 'undefined') {
      const w = window as typeof window & { gtag?: (...args: unknown[]) => void };
      w.gtag?.('consent', 'update', { analytics_storage: 'granted' });
    }
  };

  useEffect(() => {
    setIsLoaded(true); // eslint-disable-line react-hooks/set-state-in-effect -- hydration gate
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
      setShowBanner(true);
    } else if (consent === 'accepted') {
      loadGoogleAnalytics();
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookieConsent', 'accepted');
    loadGoogleAnalytics();
    setShowBanner(false);
  };

  const handleDecline = () => {
    localStorage.setItem('cookieConsent', 'declined');
    setShowBanner(false);
  };

  if (!isLoaded || !showBanner) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-slate-900 text-white p-4 shadow-2xl z-[9999] border-t-2 border-orange-500">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex-1">
          <p className="text-sm leading-relaxed">
            <span className="font-semibold">🍪 We use cookies</span> to analyze site traffic and improve your experience.
            <br className="hidden sm:block" />
            By accepting, you agree to our use of analytics cookies.{' '}
            <a
              href="https://policies.google.com/technologies/cookies"
              target="_blank"
              rel="noopener noreferrer"
              className="underline text-orange-400 hover:text-orange-300"
            >
              Learn more
            </a>
          </p>
        </div>
        <div className="flex gap-3 flex-shrink-0">
          <button
            onClick={handleDecline}
            className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white text-sm font-medium rounded transition-colors"
          >
            Decline
          </button>
          <button
            onClick={handleAccept}
            className="px-4 py-2 bg-orange-600 hover:bg-orange-500 text-white text-sm font-semibold rounded transition-colors"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
