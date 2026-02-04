'use client';

import { useState, useEffect } from 'react';

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }

    const listener = (e: MediaQueryListEvent) => {
      setMatches(e.matches);
    };

    // Use addEventListener for modern browsers
    media.addEventListener('change', listener);
    return () => media.removeEventListener('change', listener);
  }, [matches, query]);

  return matches;
}

// Predefined media queries
export function useIsMobile(): boolean {
  return useMediaQuery('(max-width: 767px)');
}

export function useIsTablet(): boolean {
  return useMediaQuery('(min-width: 768px) and (max-width: 1023px)');
}

export function useIsDesktop(): boolean {
  return useMediaQuery('(min-width: 1024px)');
}

// Detect iPad specifically (useful for Safari optimizations)
export function useIsIPad(): boolean {
  const [isIPad, setIsIPad] = useState(false);

  useEffect(() => {
    const checkIPad = () => {
      // Check for iPad in user agent or platform
      const isIPadOS =
        navigator.platform === 'iPad' ||
        (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);

      setIsIPad(isIPadOS);
    };

    checkIPad();
  }, []);

  return isIPad;
}

// Detect Safari browser
export function useIsSafari(): boolean {
  const [isSafari, setIsSafari] = useState(false);

  useEffect(() => {
    const checkSafari = () => {
      const ua = navigator.userAgent;
      const isSafariBrowser =
        ua.includes('Safari') &&
        !ua.includes('Chrome') &&
        !ua.includes('Chromium');

      setIsSafari(isSafariBrowser);
    };

    checkSafari();
  }, []);

  return isSafari;
}

// Detect reduced motion preference
export function usePrefersReducedMotion(): boolean {
  return useMediaQuery('(prefers-reduced-motion: reduce)');
}
