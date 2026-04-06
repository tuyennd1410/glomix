import { useEffect, useRef, useState } from 'react';
import type React from 'react';

interface UseIntersectionObserverOptions {
  threshold?: number;
  once?: boolean;
}

export function useIntersectionObserver(
  options: UseIntersectionObserverOptions = {}
): { ref: React.RefObject<Element>; isIntersecting: boolean } {
  const { threshold = 0, once = false } = options;
  const ref = useRef<Element>(null);
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsIntersecting(true);
          if (once) {
            observer.disconnect();
          }
        } else if (!once) {
          setIsIntersecting(false);
        }
      },
      { threshold }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [threshold, once]);

  return { ref, isIntersecting };
}
