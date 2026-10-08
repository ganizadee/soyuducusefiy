"use client";

import { useEffect, useRef } from "react";

/** Görünəndə 0-dan hədəf rəqəmə qədər sayır */
export function Counter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // Server tam rəqəmi göstərir; blok hələ ekrandan aşağıdadırsa, sıfırdan sayırıq
    if (el.getBoundingClientRect().top < window.innerHeight) return;
    const render = (n: number) => {
      el.textContent = `${n}${suffix}`;
    };
    let raf = 0;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      observer.disconnect();
      const start = performance.now();
      const step = (now: number) => {
        const t = Math.min(1, (now - start) / 1400);
        render(Math.round(value * (1 - Math.pow(1 - t, 3))));
        if (t < 1) raf = requestAnimationFrame(step);
      };
      raf = requestAnimationFrame(step);
    });
    render(0);
    observer.observe(el);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(raf);
      render(value);
    };
  }, [value, suffix]);

  return (
    <span ref={ref}>{`${value}${suffix}`}</span>
  );
}
