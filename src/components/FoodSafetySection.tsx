// src/components/FoodSafetySection.tsx
// Chapter 05: Food Quality & Safety — Standards, Compliance, and Laboratory Testing.
// Grounded strictly in multinational beverage (PepsiCo) and industrial edible oil (United Industries) practice.

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FOOD_SAFETY } from "../content";

gsap.registerPlugin(ScrollTrigger);

export function FoodSafetySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const standardsRef = useRef<HTMLDivElement>(null);
  const labRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) return;

    const ctx = gsap.context(() => {
      // Headline line-by-line masked slide-up reveal
      if (headingRef.current) {
        const inners = headingRef.current.querySelectorAll(".line-mask-inner");
        gsap.fromTo(
          inners,
          { yPercent: 110 },
          {
            yPercent: 0,
            duration: 0.9,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: { trigger: headingRef.current, start: "top 88%" },
          }
        );
      }

      // Whole cards fade and rise into place with a small stagger (0.7s)
      if (standardsRef.current) {
        gsap.fromTo(
          standardsRef.current.children,
          { opacity: 0, y: 28 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.08,
            ease: "power3.out",
            scrollTrigger: { trigger: standardsRef.current, start: "top 85%" },
          }
        );
      }
      if (labRef.current) {
        gsap.fromTo(
          labRef.current.children,
          { opacity: 0, y: 28 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.08,
            ease: "power3.out",
            scrollTrigger: { trigger: labRef.current, start: "top 85%" },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="food-safety"
      ref={sectionRef}
      className="section snap-section food-safety-section"
      aria-label="Food Quality and Safety"
    >
      <div className="section-container">
        {/* Header */}
        <div ref={headingRef} className="section-header text-center">
          <p className="text-section-label" style={{ marginBottom: "0.75rem" }}>
            {FOOD_SAFETY.sectionLabel}
          </p>
          <h2 className="text-heading">
            <span className="line-mask">
              <span className="line-mask-inner">
                {FOOD_SAFETY.headlineMain} <em>{FOOD_SAFETY.headlineItalic}</em>
              </span>
            </span>
          </h2>
          <p
            className="text-body"
            style={{ margin: "1rem auto 0" }}
          >
            {FOOD_SAFETY.intro}
          </p>
        </div>

        {/* Part 1: Certified Industry Standards Strip */}
        <div className="food-safety__subhead">
          <span className="food-safety__subhead-pill">International Standards & Compliance</span>
        </div>
        <div ref={standardsRef} className="standards-grid" role="list">
          {FOOD_SAFETY.standards.map((std, i) => (
            <div key={i} className="standard-card" role="listitem">
              <div className="standard-card__code-badge">{std.code}</div>
              <h3 className="standard-card__title">{std.title}</h3>
              <p className="standard-card__desc">{std.description}</p>
            </div>
          ))}
        </div>

        {/* Part 2: Laboratory Analytical Testing & Audit Systems */}
        <div className="food-safety__subhead" style={{ marginTop: "3.5rem" }}>
          <span className="food-safety__subhead-pill">Laboratory Diagnostics & Industrial Auditing</span>
        </div>
        <div ref={labRef} className="lab-testing-grid">
          {FOOD_SAFETY.labTesting.map((cat, idx) => (
            <div key={idx} className="lab-card">
              <h3 className="lab-card__title">{cat.title}</h3>
              <ul className="lab-card__list">
                {cat.items.map((item, itemIdx) => (
                  <li key={itemIdx} className="lab-card__item">
                    <span className="lab-bullet">▪</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
