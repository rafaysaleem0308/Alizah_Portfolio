// src/components/HeroSection.tsx
// Chapter 01: Split-screen hero.
// Left: HeroVideo (full-bleed background video, no zoom/scale, instant poster, gradient scrim).
// Right: Olive panel with nav and one-line subtitle. Clean and uncluttered.
// Big headline overlapping the seam. Circular frosted CTA.

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { HERO, NAV_LINKS } from "../content";
import { scrollToAnchor } from "../hooks/useLenis";
import { HeroVideo } from "./HeroVideo";

export function HeroSection() {
  const [menuOpen, setMenuOpen] = useState(false);

  const heroRef = useRef<HTMLElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const ctaWrapRef = useRef<HTMLDivElement>(null);
  const circleBtnRef = useRef<HTMLAnchorElement>(null);
  const lastScrollY = useRef(0);

  // Animate headline and CTA on mount (desktop only)
  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion || isMobile) return;

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
            delay: 0.15,
          }
        );
      }

      // CTA circle button reveal
      if (ctaWrapRef.current) {
        gsap.from(ctaWrapRef.current, {
          opacity: 0,
          scale: 0.9,
          duration: 0.6,
          ease: "back.out(1.3)",
          delay: 0.3,
        });
      }
    }, heroRef);

    return () => ctx.revert();
  }, []);

  // Desktop magnetic effect on circular button
  useEffect(() => {
    const btn = circleBtnRef.current;
    if (!btn) return;
    const isMobile = window.innerWidth < 768;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (isMobile || reducedMotion) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - (rect.left + rect.width / 2);
      const y = e.clientY - (rect.top + rect.height / 2);
      gsap.to(btn, { x: x * 0.28, y: y * 0.28, duration: 0.3, ease: "power2.out", overwrite: "auto" });
    };
    const handleMouseLeave = () => {
      gsap.to(btn, { x: 0, y: 0, duration: 0.6, ease: "elastic.out(1, 0.4)", overwrite: "auto" });
    };
    btn.addEventListener("mousemove", handleMouseMove);
    btn.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      btn.removeEventListener("mousemove", handleMouseMove);
      btn.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  // Nav: hide on scroll down, show on scroll up
  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      if (!navRef.current) return;
      if (y > lastScrollY.current + 10 && y > 80) {
        navRef.current.classList.add("hero__nav--hidden");
        navRef.current.classList.remove("hero__nav--visible");
      } else if (y < lastScrollY.current - 5) {
        navRef.current.classList.remove("hero__nav--hidden");
        navRef.current.classList.add("hero__nav--visible");
      }
      lastScrollY.current = y;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    anchor: string
  ) => {
    e.preventDefault();
    setMenuOpen(false);
    scrollToAnchor(anchor);
  };

  return (
    <>
      {/* Mobile Menu Button (Hamburger) */}
      <button
        className="mobile-menu-btn"
        aria-label={menuOpen ? "Close menu" : "Open menu"}
        aria-expanded={menuOpen}
        onClick={() => setMenuOpen((v) => !v)}
      >
        <span
          style={{
            transform: menuOpen ? "rotate(45deg) translate(4px, 4px)" : "none",
          }}
        />
        <span style={{ opacity: menuOpen ? 0 : 1 }} />
        <span
          style={{
            transform: menuOpen ? "rotate(-45deg) translate(4px, -4px)" : "none",
          }}
        />
      </button>

      {/* Mobile Menu Overlay */}
      <nav
        className={`mobile-menu ${menuOpen ? "open" : ""}`}
        aria-label="Mobile navigation"
        role="dialog"
        aria-modal={menuOpen}
      >
        {NAV_LINKS.map((link) => (
          <a
            key={link.anchor}
            href={link.anchor}
            onClick={(e) => handleNavClick(e, link.anchor)}
          >
            {link.label}
          </a>
        ))}
      </nav>

      {/* Chapter 01 Hero */}
      <section
        id="hero"
        ref={heroRef}
        className="hero snap-section"
        aria-label="Aleeza Naeem, Clinical Nutritionist & Dietitian"
      >
        {/* Left half: full-bleed background video (no zoom/scale) with instant poster & gradient scrim */}
        <div className="hero__photo-panel">
          <HeroVideo
            src="/assets/hero-video.mp4"
            poster="/assets/hero-poster.jpg"
            alt="Healthy green breakfast plate preparation"
          />
        </div>

        {/* Right half: olive green panel with nav and subtitle */}
        <div className="hero__green-panel">
          {/* Top nav */}
          <nav
            ref={navRef}
            className="hero__nav hero__nav--visible"
            aria-label="Main navigation"
          >
            {NAV_LINKS.map((link) => (
              <a
                key={link.anchor}
                href={link.anchor}
                onClick={(e) => handleNavClick(e, link.anchor)}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* One-line subtitle at bottom */}
          <p className="hero__portrait-label">{HERO.subtitleLine}</p>
        </div>

        {/* Big headline overlapping the seam */}
        <div
          ref={headlineRef}
          className="hero__headline"
          aria-label={`${HERO.headlineLine1} ${HERO.headlineLine2} ${HERO.headlineItalic}`}
        >
          <h1 className="hero__title">
            <span className="hero__title-line line-mask">
              <span className="line-mask-inner">{HERO.headlineLine1}</span>
            </span>
            <span className="hero__title-line line-mask">
              <span className="line-mask-inner">
                {HERO.headlineLine2} <em>{HERO.headlineItalic}</em>
              </span>
            </span>
          </h1>
        </div>

        {/* Circular frosted CTA overlapping the seam */}
        <div ref={ctaWrapRef} className="hero__cta-wrap">
          <a
            ref={circleBtnRef}
            href={HERO.ctaScrollTarget}
            onClick={(e) => handleNavClick(e, HERO.ctaScrollTarget)}
            className="hero__cta-circle"
            aria-label="View portfolio, scroll to About section"
          >
            <span>{HERO.ctaScrollLabel}</span>
            <em>{HERO.ctaScrollItalic}</em>
          </a>

        </div>
      </section>
    </>
  );
}
