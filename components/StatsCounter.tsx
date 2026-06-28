'use client';

import { useEffect, useRef, useState } from 'react';

interface StatsCounterProps {
  target: number;
  suffix?: string;
  label: string;
}

export default function StatsCounter({ target, suffix = '', label }: StatsCounterProps) {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          let current = 0;
          const increment = target / 50;
          const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
              setCount(target);
              clearInterval(timer);
            } else {
              setCount(Math.floor(current));
            }
          }, 40);
        }
      },
      { threshold: 0.5 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [target, hasAnimated]);

  return (
    <div ref={elementRef} className="stat-card">
      <h3 className="stat-number">{count}{suffix}</h3>
      <p className="stat-label">{label}</p>
    </div>
  );
}