// src/components/AchievementsSection.tsx
// Chapter 08: Achievements & Specialized Training — Star Intern, PM Youth, PEEF, Nestlé NxL & 10 Seminars.

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ACHIEVEMENTS_TRAINING } from "../content";

gsap.registerPlugin(ScrollTrigger);

export function AchievementsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const honorsRef = useRef<HTMLDivElement>(null);
  const trainingsRef = useRef<HTMLDivElement>(null);

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

      // Whole cards fade and rise into place with small stagger
      if (honorsRef.current) {
        gsap.fromTo(
          honorsRef.current.children,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.08,
            ease: "power3.out",
            scrollTrigger: { trigger: honorsRef.current, start: "top 85%" },
          }
        );
      }
      if (trainingsRef.current) {
        gsap.fromTo(
          trainingsRef.current.children,
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.65,
            stagger: 0.05,
            ease: "power3.out",
            scrollTrigger: { trigger: trainingsRef.current, start: "top 88%" },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="achievements-training"
      ref={sectionRef}
      className="section snap-section achievements-section"
      aria-label="Achievements and Professional Training"
    >
      <div className="section-container">
        {/* Header */}
        <div ref={headingRef} className="section-header text-center">
          <p className="text-section-label" style={{ marginBottom: "0.75rem" }}>
            {ACHIEVEMENTS_TRAINING.sectionLabel}
          </p>
          <h2 className="text-heading">
            <span className="line-mask">
              <span className="line-mask-inner">
                {ACHIEVEMENTS_TRAINING.headlineMain} <em>{ACHIEVEMENTS_TRAINING.headlineItalic}</em>
              </span>
            </span>
          </h2>
          <p
            className="text-body"
            style={{ margin: "1rem auto 0" }}
          >
            National awards, competitive academic scholarships, and intensive corporate certifications in auditing, food governance, and clinical practices.
          </p>
        </div>

        {/* Premier Honors Grid */}
        <div className="food-safety__subhead" style={{ marginTop: "2.5rem" }}>
          <span className="food-safety__subhead-pill">Distinguished Awards & Scholarships</span>
        </div>
        <div ref={honorsRef} className="honors-grid" role="list">
          {ACHIEVEMENTS_TRAINING.majorHonors.map((honor) => (
            <div key={honor.id} className="honor-card" role="listitem">
              <div className="honor-card__header">
                <span className="honor-badge">{honor.badge}</span>
                <span className="honor-star">★</span>
              </div>
              <h3 className="honor-card__title">{honor.title}</h3>
              <p className="honor-card__org">{honor.organization}</p>
              <p className="honor-card__program">{honor.program}</p>
              <p className="honor-card__desc">{honor.description}</p>
            </div>
          ))}
        </div>

        {/* Professional Seminars & Certifications */}
        <div className="food-safety__subhead" style={{ marginTop: "3.5rem" }}>
          <span className="food-safety__subhead-pill">Accredited Seminars & Technical Modules</span>
        </div>
        <div ref={trainingsRef} className="trainings-grid">
          {ACHIEVEMENTS_TRAINING.trainings.map((t, idx) => (
            <div key={idx} className="training-item-card">
              <span className="training-index">{String(idx + 1).padStart(2, "0")}</span>
              <div className="training-item-content">
                <h4 className="training-title">{t.title}</h4>
                <p className="training-scope">{t.scope}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
