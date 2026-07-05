import { useState, useRef, useEffect } from 'react';

type UseCountUpOptions = {
  suffix?: string;
  startOnView?: boolean;
  threshold?: number;
  locale?: string;
};

export function useCountUp(end: number, duration: number = 2000, options: UseCountUpOptions = {}) {
  const { suffix = '', startOnView = true, threshold = 0.1, locale = 'pt-BR' } = options;
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && (!startOnView || !hasAnimated.current)) {
          if (!startOnView) {
            hasAnimated.current = true;
          }

          const startTime = performance.now();

          const animate = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * end));

            if (progress < 1) {
              requestAnimationFrame(animate);
            }
          };

          requestAnimationFrame(animate);
        }
      },
      { threshold }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [end, duration, startOnView, threshold]);

  const formatter = new Intl.NumberFormat(locale, { notation: 'standard' });
  
  const formatWithSuffix = (value: number) => {
    const formatted = formatter.format(value);
    return suffix ? formatted + suffix : formatted;
  };

  const displayValue = suffix
    ? formatWithSuffix(count)
    : end === 0
      ? '0'
      : end >= 1000
        ? `${(end / 1000).toFixed(end >= 1000000 ? 0 : 1)}k${suffix}`
        : formatWithSuffix(count);

  return { count, ref, displayValue };
}