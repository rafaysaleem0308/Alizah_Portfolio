// src/components/EducationSection.tsx
// Chapter 07: Education & Academic Foundation — BS (Hons) 3.63 CGPA, FSc 85%, Matric 93%.

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { EDUCATION } from "../content";

gsap.registerPlugin(ScrollTrigger);

export function EducationSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

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

      // Whole cards fade and rise with small stagger (no text inside animates)
      if (listRef.current) {
        gsap.fromTo(
          listRef.current.children,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.08,
            ease: "power3.out",
            scrollTrigger: { trigger: listRef.current, start: "top 85%" },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="education"
      ref={sectionRef}
      className="section snap-section education-section"
      aria-label="Academic Education"
    >
      <div className="section-container">
        {/* Header */}
        <div ref={headingRef} className="section-header text-center">
          <p className="text-section-label" style={{ marginBottom: "0.75rem" }}>
            {EDUCATION.sectionLabel}
          </p>
          <h2 className="text-heading">
            <span className="line-mask">
              <span className="line-mask-inner">
                {EDUCATION.headlineMain} <em>{EDUCATION.headlineItalic}</em>
              </span>
            </span>
          </h2>
        </div>

        {/* Academic Milestones Track */}
        <div ref={listRef} className="education-timeline" role="list">
          {EDUCATION.degrees.map((item, idx) => (
            <div key={idx} className="education-card" role="listitem">
              <div className="education-card__top">
                <span className="education-card__period">{item.period}</span>
                <span className="education-card__badge">{item.badge}</span>
              </div>

              <div className="education-card__main">
                <h3 className="education-card__degree">{item.degree}</h3>
                <p className="education-card__institution">{item.institution}</p>
                <p className="education-card__desc">{item.description}</p>
              </div>

              <div className="education-card__score-box">
                <span className="score-label">Graduation Standing</span>
                <span className="score-value">{item.grade}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
