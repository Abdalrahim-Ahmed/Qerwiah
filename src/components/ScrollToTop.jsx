import { useEffect, useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * ScrollToTop ensures that navigating to any route immediately and reliably
 * resets the window and document scroll position to (0, 0).
 *
 * It prevents the browser from preserving stale scroll positions or landing
 * at arbitrary intermediate sections caused by smooth-scrolling animations.
 */
export const ScrollToTop = () => {
  const location = useLocation();

  useEffect(() => {
    // Disable native asynchronous browser scroll restoration on route changes
    if (typeof window !== 'undefined' && 'scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
  }, []);

  useLayoutEffect(() => {
    const resetScroll = () => {
      window.scrollTo(0, 0);
      if (document.documentElement) document.documentElement.scrollTop = 0;
      if (document.body) document.body.scrollTop = 0;
    };

    // 1. Immediate synchronous reset before paint
    resetScroll();

    // 2. Double-RAF check to handle any dynamic layout shifts as route components mount
    const raf1 = requestAnimationFrame(() => {
      resetScroll();
      requestAnimationFrame(resetScroll);
    });

    return () => {
      cancelAnimationFrame(raf1);
    };
  }, [location.pathname, location.search, location.key]);

  return null;
};
