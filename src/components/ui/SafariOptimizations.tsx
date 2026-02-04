'use client';

import { useEffect } from 'react';

/**
 * Safari/iPad Optimizations Component
 *
 * This component applies various fixes and optimizations for Safari and iPad:
 * 1. Fix 100vh issue on iOS Safari
 * 2. Prevent overscroll/bounce effect on body
 * 3. Optimize touch interactions
 * 4. Fix sticky positioning issues
 */
export function SafariOptimizations() {
  useEffect(() => {
    // Fix 100vh issue on iOS Safari
    const setVH = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };

    setVH();
    window.addEventListener('resize', setVH);
    window.addEventListener('orientationchange', setVH);

    // Detect iOS Safari
    const isIOS =
      /iPad|iPhone|iPod/.test(navigator.userAgent) ||
      (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);

    if (isIOS) {
      // Add iOS-specific class to html element
      document.documentElement.classList.add('ios');

      // Prevent elastic scroll on body but allow on scrollable elements
      document.body.style.overscrollBehavior = 'none';
    }

    return () => {
      window.removeEventListener('resize', setVH);
      window.removeEventListener('orientationchange', setVH);
    };
  }, []);

  return null;
}

/**
 * CSS helper classes for Safari compatibility
 * Use these in your components:
 *
 * - `min-h-screen-safe`: Use instead of min-h-screen for full viewport height
 * - `h-screen-safe`: Use instead of h-screen for full viewport height
 * - `touch-manipulation`: Better touch response on iOS
 * - `webkit-overflow-scrolling-touch`: Smooth scrolling on iOS
 */

// Usage example:
// <div className="min-h-screen-safe">...</div>
//
// Add this CSS to globals.css:
// .min-h-screen-safe {
//   min-height: 100vh;
//   min-height: calc(var(--vh, 1vh) * 100);
// }
// .h-screen-safe {
//   height: 100vh;
//   height: calc(var(--vh, 1vh) * 100);
// }

export default SafariOptimizations;
