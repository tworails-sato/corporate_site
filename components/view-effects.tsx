"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export function ViewEffects() {
  const pathname = usePathname();

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const reveals = document.querySelectorAll<HTMLElement>("[data-reveal]");
    const counts = document.querySelectorAll<HTMLElement>("[data-count]");

    if (reduced || !("IntersectionObserver" in window)) {
      reveals.forEach((item) => item.classList.add("in"));
      counts.forEach((item) => { item.textContent = item.dataset.count || "0"; });
      return;
    }

    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.18 });

    const countObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const element = entry.target as HTMLElement;
        const end = Number(element.dataset.count || 0);
        const start = performance.now();
        const step = (time: number) => {
          const progress = Math.min((time - start) / 900, 1);
          element.textContent = String(Math.round(end * (1 - Math.pow(1 - progress, 3))));
          if (progress < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
        countObserver.unobserve(element);
      });
    }, { threshold: 0.6 });

    reveals.forEach((item) => revealObserver.observe(item));
    counts.forEach((item) => countObserver.observe(item));
    return () => {
      revealObserver.disconnect();
      countObserver.disconnect();
    };
  }, [pathname]);

  return null;
}
