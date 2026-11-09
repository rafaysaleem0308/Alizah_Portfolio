// src/components/ExperienceSection.tsx
// Chapter 03: Professional Experience — All Six Placements in a Bento Grid.
// Click/tap a tile → expanding drawer panel with full CV details and learnings.
// Keyboard accessible: Tab, Enter/Space to open, Esc to close.

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { EXPERIENCE_PLACEMENTS, type ExperiencePlacement } from "../content";

gsap.registerPlugin(ScrollTrigger);

interface PlacementCardProps {
  placement: ExperiencePlacement;
  index: number;
  onClick: (item: ExperiencePlacement | null) => void;
}

function PlacementTile({ placement, index, onClick }: PlacementCardProps) {
  const isClinical = placement.category === "Clinical";
  const isPrimary = index === 0 || index === 4; // Visual rhythm in bento layout

  return (
    <div
      className={`bento-tile ${isPrimary ? "bento-tile--olive" : "bento-tile--light"} bento-tile--placement`}
      role="button"
      tabIndex={0}
      aria-label={`${placement.role} at ${placement.organization}. Click to inspect details`}
      onClick={() => onClick(placement)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick(placement);
        }
      }}
    >
      <div className="placement-tile__meta">
        <span className={`placement-badge ${isClinical ? "placement-badge--clinical" : "placement-badge--qa"}`}>
          {placement.category}
        </span>
        <span className="placement-period">{placement.period}</span>
      </div>

      <div className="placement-tile__content">
        <h3 className="placement-role">{placement.role}</h3>
        <p className="placement-org">
          {placement.organization} <span className="placement-loc">· {placement.location}</span>
        </p>
        <p className="placement-desc">{placement.summary}</p>
      </div>

      <div className="placement-tile__footer">
        <span className="placement-link">
          Inspect rotation details <span>→</span>
        </span>
      </div>
    </div>
  );
}

export function ExperienceSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const bentoRef = useRef<HTMLDivElement>(null);
  const [displayedPlacement, setDisplayedPlacement] = useState<ExperiencePlacement | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const openDrawer = (p: ExperiencePlacement | null) => {
    if (!p) {
      closeDrawer();
      return;
    }
    setDisplayedPlacement(p);
    setIsDrawerOpen(true);
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
    setTimeout(() => {
      setDisplayedPlacement(null);
    }, 400);
  };

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

      // Bento placement tiles animate in as whole cards (no text animation inside)
      if (bentoRef.current) {
        const tiles = bentoRef.current.querySelectorAll(".bento-tile");
        gsap.fromTo(
          tiles,
          { opacity: 0, y: 32 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.08,
            ease: "power3.out",
            scrollTrigger: { trigger: bentoRef.current, start: "top 85%" },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Trap scroll when drawer is open
  useEffect(() => {
    document.body.style.overflow = isDrawerOpen ? "hidden" : "";
    if (isDrawerOpen && closeButtonRef.current) {
      closeButtonRef.current.focus({ preventScroll: true });
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isDrawerOpen]);

  // Escape key closes drawer
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeDrawer();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <section
        id="experience"
        ref={sectionRef}
        className="section snap-section experience"
        aria-label="Professional Experience"
      >
        <div className="experience__inner">
          {/* Header */}
          <div ref={headingRef} className="experience__header">
            <p className="text-section-label" style={{ marginBottom: "0.75rem" }}>
              Chapter 03 · Professional Experience
            </p>
            <h2 className="text-heading">
              <span className="line-mask">
                <span className="line-mask-inner">From hospital wards</span>
              </span>
              <span className="line-mask">
                <span className="line-mask-inner">to the <em>factory floor.</em></span>
              </span>
            </h2>
            <p className="text-body" style={{ margin: "1rem auto 0" }}>
              Six comprehensive rotations across government tertiary hospitals, private pediatric clinics, and multinational food processing plants.
            </p>
          </div>

          {/* Bento Grid: 6 Placements */}
          <div ref={bentoRef} className="bento-grid-placements" role="list">
            {EXPERIENCE_PLACEMENTS.map((placement, i) => (
              <PlacementTile
                key={placement.id}
                placement={placement}
                index={i}
                onClick={openDrawer}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Detail Slide-out Drawer with smooth open & close */}
      {displayedPlacement && (
        <div
          className={`drawer-overlay ${isDrawerOpen ? "drawer-overlay--open" : ""}`}
          onClick={closeDrawer}
          role="dialog"
          aria-modal={isDrawerOpen}
          aria-labelledby="drawer-title"
        >
          <div
            className="drawer"
            onClick={(e) => e.stopPropagation()}
            tabIndex={-1}
          >
            <div className="drawer__top">
              <div className="drawer__badge-row">
                <span className={`placement-badge ${displayedPlacement.category === "Clinical" ? "placement-badge--clinical" : "placement-badge--qa"}`}>
                  {displayedPlacement.category} Rotation
                </span>
                <span className="drawer__period">{displayedPlacement.period}</span>
              </div>
              <button
                ref={closeButtonRef}
                className="drawer__close"
                onClick={closeDrawer}
                aria-label="Close details"
              >
                ✕
              </button>
            </div>

            <div className="drawer__body">
              <h3 id="drawer-title" className="drawer__title">
                {displayedPlacement.role}
              </h3>
              <p className="drawer__org">
                {displayedPlacement.organization} · <span>{displayedPlacement.location}</span>
              </p>

              <div className="drawer__section">
                <h4 className="drawer__section-heading">Clinical & Operational Scope</h4>
                <p className="drawer__summary">{displayedPlacement.summary}</p>
              </div>

              <div className="drawer__section">
                <h4 className="drawer__section-heading">Key Learnings & Protocols Executed</h4>
                <ul className="drawer__list">
                  {displayedPlacement.highlights.map((highlight, idx) => (
                    <li key={idx} className="drawer__list-item">
                      <span className="drawer__bullet">✓</span>
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="drawer__footer">
              <button
                className="btn-primary"
                onClick={closeDrawer}
                style={{ width: "100%", justifyContent: "center" }}
              >
                Done Inspecting
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
