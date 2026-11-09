// src/components/PageCounter.tsx
// Fixed corner page counter ("02 / 05") and bookmark ribbon.

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { scrollToAnchor } from "../hooks/useLenis";

gsap.registerPlugin(ScrollTrigger);

const SECTION_IDS = [
  "hero",
  "about",
  "experience",
  "clinical-expertise",
  "food-safety",
  "from-the-kitchen",
  "education",
  "achievements-training",
  "contact",
];
export function PageCounter() {
  const [showBackToTop, setShowBackToTop] = useState(false);
  const ribbonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const createdTriggers: ScrollTrigger[] = [];

    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const t = ScrollTrigger.create({
        trigger: el,
        start: "top center",
        end: "bottom center",
      });
      createdTriggers.push(t);
    });

    if (ribbonRef.current) {
      const ribbonAnim = gsap.to(ribbonRef.current, {
        scaleY: 1,
        ease: "none",
        scrollTrigger: {
          trigger: document.body,
          start: "top top",
          end: "bottom bottom",
          scrub: true,
        },
      });
      if (ribbonAnim.scrollTrigger) {
        createdTriggers.push(ribbonAnim.scrollTrigger);
      }
    }

    const updateBackToTop = () => setShowBackToTop(window.scrollY > window.innerHeight * 0.75);
    updateBackToTop();
    window.addEventListener("scroll", updateBackToTop, { passive: true });

    return () => {
      createdTriggers.forEach((t) => t.kill());
      window.removeEventListener("scroll", updateBackToTop);
    };
  }, []);

  return (
    <>
      <button
        className={`back-to-top${showBackToTop ? " is-visible" : ""}`}
        type="button"
        aria-label="Back to top"
        onClick={() => scrollToAnchor("#hero")}
        tabIndex={showBackToTop ? 0 : -1}
      >
        <span aria-hidden="true">↑</span> Back to top
      </button>
      <div className="bookmark-ribbon" aria-hidden="true">
        <div ref={ribbonRef} className="bookmark-ribbon__fill h-full" />
      </div>
    </>
  );
}
