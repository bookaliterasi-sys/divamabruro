"use client";
/** Satu IntersectionObserver untuk seluruh reveal [data-fx] — nol scroll listener. */
import { useEffect } from "react";

export default function ScrollFx() {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>("[data-fx]"));
    if (!("IntersectionObserver" in window) || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      els.forEach((e) => e.classList.add("in"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        }
      },
      { rootMargin: "0px 0px -6% 0px", threshold: 0.06 }
    );
    els.forEach((e) => io.observe(e));
    return () => io.disconnect();
  }, []);
  return null;
}
