'use client';

import { useEffect, useRef, ReactNode } from 'react';
import { gsap } from 'gsap';

const FadeIn = ({ children }: { children: ReactNode }) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    gsap.set(element, { opacity: 0, y: 50 });

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          gsap.to(element, {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power3.out',
          });
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return <div ref={ref}>{children}</div>;
};

export default FadeIn;
