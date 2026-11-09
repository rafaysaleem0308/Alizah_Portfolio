// src/hooks/useLenis.ts
// Initialises Lenis smooth scrolling safely synced with GSAP ScrollTrigger.

import { useEffect, useRef } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

declare global {
  interface Window {
    __lenis?: Lenis;
  }
}

export function scrollToAnchor(target: string, immediate = false) {
  if (window.__lenis) {
    window.__lenis.scrollTo(target, { duration: immediate ? 0 : 1.1, offset: -20, immediate });
  } else {
    const el = document.querySelector(target);
    el?.scrollIntoView({ behavior: immediate ? "auto" : "smooth" });
  }
}

export function useLenis() {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    try {
      const isMobile = window.innerWidth < 768;
      const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      // On mobile or reduced motion, native scroll is best
      if (isMobile || reducedMotion) {
        return;
      }

      const lenis = new Lenis({
        lerp: 0.09,
        smoothWheel: true,
      });

      lenisRef.current = lenis;
      window.__lenis = lenis;
      lenis.on("scroll", ScrollTrigger.update);

      const ticker = (time: number) => {
        lenis.raf(time * 1000);
      };
      gsap.ticker.add(ticker);
      gsap.ticker.lagSmoothing(0);

      // Scroll to hash on initial load immediately if present
      if (window.location.hash) {
        scrollToAnchor(window.location.hash, true);
        setTimeout(() => {
          scrollToAnchor(window.location.hash, true);
          ScrollTrigger.refresh();
        }, 50);
      }

      return () => {
        gsap.ticker.remove(ticker);
        window.__lenis = undefined;
        lenis.destroy();
      };
    } catch (err) {
      console.warn("Smooth scroll initialization bypassed:", err);
    }
  }, []);

  return lenisRef;
}
