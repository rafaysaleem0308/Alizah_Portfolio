// src/components/ClinicalSection.tsx
// Chapter 04: Clinical Expertise — 5 Pillars (Assess, Document, Plan, Support, Interpret)
// Grounded strictly in Nutrition Care Process (NCP) and clinical hospital protocols.

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CLINICAL_EXPERTISE } from "../content";

gsap.registerPlugin(ScrollTrigger);

export function ClinicalSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

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

      // Whole cards fade and rise into place with small stagger (no text inside animates)
      if (cardsRef.current) {
        const cards = cardsRef.current.querySelectorAll(".clinical-pillar-card");
        gsap.fromTo(
          cards,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.08,
            ease: "power3.out",
            scrollTrigger: { trigger: cardsRef.current, start: "top 85%" },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="clinical-expertise"
      ref={sectionRef}
      className="section snap-section clinical-section"
      aria-label="Clinical Expertise"
    >
      <div className="section-container">
        {/* Header */}
        <div ref={headingRef} className="section-header text-center">
          <p className="text-section-label" style={{ marginBottom: "0.75rem" }}>
            {CLINICAL_EXPERTISE.sectionLabel}
          </p>
          <h2 className="text-heading">
            <span className="line-mask">
              <span className="line-mask-inner">
                {CLINICAL_EXPERTISE.headlineMain} <em>{CLINICAL_EXPERTISE.headlineItalic}</em>
              </span>
            </span>
          </h2>
          <p
            className="text-body"
            style={{ margin: "1rem auto 0" }}
          >
            {CLINICAL_EXPERTISE.intro}
          </p>
        </div>

        {/* 5 Clinical Pillars */}
        <div ref={cardsRef} className="clinical-pillars-grid" role="list">
          {CLINICAL_EXPERTISE.pillars.map((item, idx) => (
            <div key={idx} className="clinical-pillar-card" role="listitem">
              <div className="clinical-pillar-card__header">
                <span className="clinical-pillar-number">{item.pillar}</span>
                <h3 className="clinical-pillar-title">{item.tagline}</h3>
              </div>

              <div className="clinical-pillar-card__body">
                <ul className="clinical-skills-list">
                  {item.skills.map((skill, sIdx) => (
                    <li key={sIdx} className="clinical-skill-item">
                      <span className="clinical-check-icon">✓</span>
                      <span>{skill}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="clinical-pillar-card__footer">
                <span className="clinical-focus-label">Pathology & Ward Focus:</span>
                <p className="clinical-focus-text">{item.clinicalFocus}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
