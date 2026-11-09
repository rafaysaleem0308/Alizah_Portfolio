// src/components/Preloader.tsx
// Animated preloader: SVG leaf draws itself, then olive cover slides up.

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

interface PreloaderProps {
  onComplete: () => void;
}

export function Preloader({ onComplete }: PreloaderProps) {
  const loaderRef = useRef<HTMLDivElement>(null);
  const coverRef = useRef<HTMLDivElement>(null);
  const leafRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const hasNoPreloadParam = new URLSearchParams(window.location.search).has("nopreload");
    if (reducedMotion || hasNoPreloadParam) {
      onComplete();
      return;
    }

    const tl = gsap.timeline({
      onComplete: () => {
        onComplete();
      },
    });

    // Phase 1: Leaf SVG draws itself (1.6s)
    if (leafRef.current) {
      tl.to(
        leafRef.current,
        {
          strokeDashoffset: 0,
          duration: 1.6,
          ease: "power2.inOut",
        },
        0
      );
    }

    // Phase 2: Fade out the leaf text, then slide the olive cover up like a book opening (0.9s)
    tl.to(
      loaderRef.current,
      {
        opacity: 0,
        duration: 0.3,
        ease: "power2.out",
      },
      "+=0.3"
    ).to(
      coverRef.current,
      {
        yPercent: -100,
        duration: 0.9,
        ease: "power3.inOut",
      },
      "-=0.1"
    );
  }, [onComplete]);

  return (
    <>
      <div
        id="preloader"
        ref={loaderRef}
        aria-hidden="true"
        role="presentation"
      >
        {/* SVG leaf drawing */}
        <svg
          className="leaf-draw"
          width="72"
          height="72"
          viewBox="0 0 72 72"
          fill="none"
          aria-hidden="true"
        >
          <path
            ref={leafRef}
            d="M36 8 C20 8 8 20 8 36 C8 48 18 58 30 62 C30 50 36 38 50 30 C44 44 38 56 36 64 C52 60 64 48 64 36 C64 20 52 8 36 8 Z"
            stroke="rgba(255,255,255,0.75)"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            strokeDasharray="400"
            strokeDashoffset="400"
          />
        </svg>
        <span
          style={{
            color: "rgba(255,255,255,0.65)",
            fontSize: "0.72rem",
            letterSpacing: "0.14em",
            fontWeight: 400,
            textTransform: "uppercase",
          }}
        >
          Aleeza Naeem
        </span>
      </div>
      {/* Olive cover that slides up after the leaf draws */}
      <div
        id="preloader-cover"
        ref={coverRef}
        aria-hidden="true"
        role="presentation"
      />
    </>
  );
}
