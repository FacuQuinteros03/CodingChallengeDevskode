import { useEffect } from 'react';

export function useScrollLock(lock: boolean) {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const originalStyle = window.getComputedStyle(document.body).overflow;

    if (lock) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = originalStyle;
    }

    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, [lock]);
}
