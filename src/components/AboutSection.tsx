// src/components/AboutSection.tsx
// Chapter 02: About me — centred headline, facts strip, three polaroid photos, interests.

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ABOUT } from "../content";

gsap.registerPlugin(ScrollTrigger);

const POLAROIDS = [
  {
    file: "polaroid-plate.webp",
    alt: "A plated healthy meal",
    rotate: -6,
    translateY: -20,
  },
  {
    file: "polaroid-drink.webp",
    alt: "A nourishing drink",
    rotate: 0,
    translateY: 20,
  },
  {
    file: "polaroid-produce.webp",
    alt: "Fresh seasonal produce and herbs",
    rotate: 6,
    translateY: -10,
  },
];

export function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const polaroidRefs = useRef<(HTMLDivElement | null)[]>([]);
  const headlineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) return;

    const ctx = gsap.context(() => {
      // Headline line-by-line masked slide-up reveal
      if (headlineRef.current) {
        const inners = headlineRef.current.querySelectorAll(".line-mask-inner");
        gsap.fromTo(
          inners,
          { yPercent: 110 },
          {
            yPercent: 0,
            duration: 0.9,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: { trigger: headlineRef.current, start: "top 88%" },
          }
        );
      }

      // Paragraphs and facts list appear instantly with container (Rule 2: no separate text animation)

      // Polaroids: whole object drop + image scale from 1.1 to 1 (1s) + parallax on scroll
      polaroidRefs.current.forEach((el, i) => {
        if (!el) return;
        const p = POLAROIDS[i];
        
        // Whole card entrance
        gsap.fromTo(
          el,
          { opacity: 0, y: 50, rotation: 0 },
          {
            opacity: 1, y: p.translateY, rotation: p.rotate,
            duration: 0.9, delay: i * 0.12, ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 95%" },
          }
        );

        // Photo mask / fade reveal with gentle scale from 1.1 to 1 (about 1s)
        const img = el.querySelector(".polaroid__img img");
        if (img) {
          gsap.fromTo(
            img,
            { scale: 1.1, opacity: 0.8 },
            {
              scale: 1,
              opacity: 1,
              duration: 1.0,
              ease: "power2.out",
              scrollTrigger: { trigger: el, start: "top 95%" },
            }
          );
        }

        // Parallax on photos
        gsap.to(el, {
          y: p.translateY + (i === 1 ? 16 : -16),
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });

        // Desktop hover: slight lift and shadow
        const straighten = () =>
          gsap.to(el, {
            rotation: 0, y: p.translateY - 18, scale: 1.03,
            boxShadow: "0 24px 56px rgba(30,38,26,0.22)",
            duration: 0.35, ease: "power2.out", overwrite: "auto",
          });
        const reset = () =>
          gsap.to(el, {
            rotation: p.rotate, y: p.translateY, scale: 1,
            boxShadow: "0 4px 24px rgba(30,38,26,0.12)",
            duration: 0.4, ease: "power2.out", overwrite: "auto",
          });
        el.addEventListener("mouseenter", straighten);
        el.addEventListener("mouseleave", reset);
        el.addEventListener("focus", straighten);
        el.addEventListener("blur", reset);

      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="section snap-section about grain"
      aria-label="About Aleeza Naeem"
    >
      <div className="about__inner">
        <p className="text-section-label" style={{ marginBottom: "1.5rem" }}>
          {ABOUT.sectionLabel}
        </p>

        <div ref={headlineRef} className="about__headline">
          <h2 className="text-heading">
            <span className="line-mask">
              <span className="line-mask-inner">
                {ABOUT.headlineMain} <em>{ABOUT.headlineItalic1}</em>
              </span>
            </span>
            <span className="line-mask">
              <span className="line-mask-inner">
                {ABOUT.headlineMid} <em>{ABOUT.headlineItalic2}</em> {ABOUT.headlineEnd}
              </span>
            </span>
          </h2>
        </div>

        <p className="about__body text-body">
          {ABOUT.body}
        </p>

        <div className="about__facts">
          {ABOUT.facts.map((f, i) => (
            <div key={i} className="about__fact">
              <span className="about__fact-value">{f.value}</span>
              <span className="about__fact-label">{f.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Polaroids */}
      <div className="about__polaroids" role="list" aria-label="Photo gallery">
        {POLAROIDS.map((p, i) => (
          <div
            key={p.file}
            ref={(el) => { polaroidRefs.current[i] = el; }}
            className="polaroid"
            role="listitem"
            tabIndex={0}
            aria-label={p.alt}
            style={{
              width: "clamp(140px, 20vw, 220px)",
              transform: `rotate(${p.rotate}deg) translateY(${p.translateY}px)`,
            }}
          >
            <div className="polaroid__img">
              <img
                src={`/assets/${p.file}`}
                alt={p.alt}
                loading="lazy"
                decoding="async"
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Interests */}
      <div className="about__inner" style={{ marginTop: "2.5rem" }}>
        <div className="about__interests">
          <strong>{ABOUT.interestsLabel}</strong>
          {ABOUT.interests.map((item, i) => (
            <span key={i}>
              {item}
              {i < ABOUT.interests.length - 1 && (
                <span style={{ color: "var(--color-accent)", margin: "0 0.4rem" }}>·</span>
              )}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
