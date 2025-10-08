import { useState, useEffect } from 'react';

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const media = window.matchMedia(query);

    setMatches(media.matches);

    const listener = (e: MediaQueryListEvent) => setMatches(e.matches);
    media.addEventListener('change', listener);

    return () => media.removeEventListener('change', listener);
  }, [query]);

  // Evitar hydration mismatch
  if (!mounted) return false;

  return matches;
}

export function useIsDesktop() {
  return useMediaQuery('(min-width: 1024px)');
}

export function useIsMobile() {
  return useMediaQuery('(max-width: 768px)');
}
