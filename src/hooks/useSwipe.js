/**
 * Hook for handling swipe gestures on mobile
 * Enables swipe navigation between form steps
 */

import { useRef, useCallback, useEffect } from "react";

const SWIPE_THRESHOLD = 50; // Minimum distance for a swipe
const SWIPE_TIMEOUT = 300; // Maximum time for a swipe gesture

/**
 * Hook to detect swipe gestures
 * @param {Object} options - Configuration options
 * @param {Function} options.onSwipeLeft - Callback when user swipes left
 * @param {Function} options.onSwipeRight - Callback when user swipes right
 * @param {boolean} options.enabled - Whether swipe is enabled
 * @returns {Object} Ref to attach to the swipeable element
 */
export function useSwipe({ onSwipeLeft, onSwipeRight, enabled = true }) {
  const touchStart = useRef(null);
  const touchStartTime = useRef(null);
  const elementRef = useRef(null);

  const handleTouchStart = useCallback((e) => {
    touchStart.current = {
      x: e.touches[0].clientX,
      y: e.touches[0].clientY,
    };
    touchStartTime.current = Date.now();
  }, []);

  const handleTouchEnd = useCallback(
    (e) => {
      if (!touchStart.current || !touchStartTime.current) return;

      const touchEnd = {
        x: e.changedTouches[0].clientX,
        y: e.changedTouches[0].clientY,
      };

      const deltaX = touchStart.current.x - touchEnd.x;
      const deltaY = touchStart.current.y - touchEnd.y;
      const deltaTime = Date.now() - touchStartTime.current;

      // Reset touch tracking
      touchStart.current = null;
      touchStartTime.current = null;

      // Check if gesture was too slow
      if (deltaTime > SWIPE_TIMEOUT) return;

      // Check if horizontal movement is dominant
      if (Math.abs(deltaX) < Math.abs(deltaY) * 2) return;

      // Check if movement exceeds threshold
      if (Math.abs(deltaX) < SWIPE_THRESHOLD) return;

      // Determine swipe direction
      if (deltaX > 0) {
        // Swiped left (moving forward)
        onSwipeLeft?.();
      } else {
        // Swiped right (moving back)
        onSwipeRight?.();
      }
    },
    [onSwipeLeft, onSwipeRight]
  );

  useEffect(() => {
    const element = elementRef.current;
    if (!element || !enabled) return;

    element.addEventListener("touchstart", handleTouchStart, { passive: true });
    element.addEventListener("touchend", handleTouchEnd, { passive: true });

    return () => {
      element.removeEventListener("touchstart", handleTouchStart);
      element.removeEventListener("touchend", handleTouchEnd);
    };
  }, [handleTouchStart, handleTouchEnd, enabled]);

  return elementRef;
}

/**
 * Hook to detect horizontal scroll intent vs swipe
 * Useful for carousels or scrollable areas within swipeable containers
 */
export function useScrollLock(enabled = true) {
  const scrollLockRef = useRef(false);

  useEffect(() => {
    if (!enabled) return;

    const preventScroll = (e) => {
      if (scrollLockRef.current) {
        e.preventDefault();
      }
    };

    document.addEventListener("touchmove", preventScroll, { passive: false });

    return () => {
      document.removeEventListener("touchmove", preventScroll);
    };
  }, [enabled]);

  return {
    lock: () => {
      scrollLockRef.current = true;
    },
    unlock: () => {
      scrollLockRef.current = false;
    },
  };
}

/**
 * Hook to detect if device supports touch
 */
export function useTouchDevice() {
  const isTouchDevice =
    typeof window !== "undefined" &&
    ("ontouchstart" in window ||
      navigator.maxTouchPoints > 0 ||
      navigator.msMaxTouchPoints > 0);

  return isTouchDevice;
}
