'use client';

import { useState, useEffect, useCallback } from 'react';

interface ScrollPosition {
  x: number;
  y: number;
  direction: 'up' | 'down' | null;
  isAtTop: boolean;
  isAtBottom: boolean;
}

export function useScrollPosition(): ScrollPosition {
  const [scrollPosition, setScrollPosition] = useState<ScrollPosition>({
    x: 0,
    y: 0,
    direction: null,
    isAtTop: true,
    isAtBottom: false,
  });

  const handleScroll = useCallback(() => {
    const newY = window.scrollY;
    const newX = window.scrollX;
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;

    setScrollPosition((prev) => ({
      x: newX,
      y: newY,
      direction: newY > prev.y ? 'down' : newY < prev.y ? 'up' : prev.direction,
      isAtTop: newY <= 0,
      isAtBottom: newY >= maxScroll - 10, // 10px threshold
    }));
  }, []);

  useEffect(() => {
    // Initial position
    handleScroll();

    // Use passive listener for better scroll performance
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return scrollPosition;
}

// Hook for scroll progress (0 to 1)
export function useScrollProgress(): number {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const currentProgress = maxScroll > 0 ? window.scrollY / maxScroll : 0;
      setProgress(Math.min(1, Math.max(0, currentProgress)));
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return progress;
}

// Lock body scroll (useful for modals)
export function useLockBodyScroll(lock: boolean): void {
  useEffect(() => {
    if (!lock) return;

    const originalStyle = window.getComputedStyle(document.body).overflow;
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

    // Prevent layout shift from scrollbar removal
    document.body.style.overflow = 'hidden';
    document.body.style.paddingRight = `${scrollbarWidth}px`;

    return () => {
      document.body.style.overflow = originalStyle;
      document.body.style.paddingRight = '';
    };
  }, [lock]);
}
