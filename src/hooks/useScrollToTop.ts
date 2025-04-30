import { useEffect } from 'react';

interface Options {
  delay?: number;
  behavior?: ScrollBehavior;
}

export function useScrollToTop(
  value: unknown,
  { delay = 0, behavior = 'auto' }: Options = {},
) {
  useEffect(() => {
    if (value === undefined || value === null) return;

    const timer = window.setTimeout(() => {
      window.scrollTo({ top: 0, left: 0, behavior });
    }, delay);

    return () => clearTimeout(timer);
  }, [value, delay, behavior]);
}
