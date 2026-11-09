// src/components/ProjectsSection.tsx
// Chapter 04: Portfolio Projects & Nutritional Product Innovation
// UI Design Style:
// - Outer cards showcase clean, modern web portfolio UI (no raw food photo thumbnails on the cards).
// - Displays rich descriptions, clinical rationale, target groups, nutritional specs, and verified outcomes.
// - Clicking any card opens the detailed case-study drawer where the project visuals and deep formulation specs live.

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PORTFOLIO_PROJECTS, type PortfolioProject } from "../content";

gsap.registerPlugin(ScrollTrigger);

export function ProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [selectedProject, setSelectedProject] = useState<PortfolioProject | null>(() => {
    if (typeof window === "undefined") return null;
    const pId = new URLSearchParams(window.location.search).get("project");
    if (!pId) return null;
    return PORTFOLIO_PROJECTS.projects.find((p) => p.id === pId) || null;
  });
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  // Filter projects by category
  const filteredProjects =
    activeCategory === "all"
      ? PORTFOLIO_PROJECTS.projects
      : PORTFOLIO_PROJECTS.projects.filter(
          (p) => p.category === activeCategory
        );

  // Scroll entrance animation
  useEffect(() => {
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reducedMotion) return;

    const ctx = gsap.context(() => {
      // Headline line-by-line masked slide-up reveal
      if (headerRef.current) {
        const inners = headerRef.current.querySelectorAll(".line-mask-inner");
        gsap.fromTo(
          inners,
          { yPercent: 110 },
          {
            yPercent: 0,
            duration: 0.9,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: headerRef.current,
              start: "top 92%",
              toggleActions: "play none none none",
              once: true,
            },
          }
        );
      }

      // Whole project cards fade and rise with small stagger (no text inside animates)
      if (gridRef.current) {
        const cards = gridRef.current.querySelectorAll(".project-card");
        gsap.from(cards, {
          opacity: 0,
          y: 28,
          duration: 0.7,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 92%",
            toggleActions: "play none none none",
            once: true,
          },
        });
      }

    }, sectionRef);

    return () => ctx.revert();
  }, [activeCategory]);

  // Lock body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = selectedProject ? "hidden" : "";
    if (selectedProject && closeBtnRef.current) {
      closeBtnRef.current.focus();
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedProject]);

  // Close on Escape key
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedProject(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <section
        id="from-the-kitchen"
        ref={sectionRef}
        className="section snap-section projects-section grain"
        aria-label="From the Kitchen, Nutritional Formulations and Food Entrepreneurship"
      >
        <div className="projects__inner">
          {/* Section Header */}
          <div ref={headerRef} className="projects__header">
            <p className="text-section-label" style={{ marginBottom: "0.85rem" }}>
              {PORTFOLIO_PROJECTS.sectionLabel}
            </p>
            <h2 className="text-heading" style={{ maxWidth: 720 }}>
              <span className="line-mask">
                <span className="line-mask-inner">
                  {PORTFOLIO_PROJECTS.headlineMain}{" "}
                  <em>{PORTFOLIO_PROJECTS.headlineItalic}</em>
                </span>
              </span>
            </h2>
            <p className="projects__intro">
              {PORTFOLIO_PROJECTS.body}
            </p>

            {/* Category Filter Tabs */}
            <div
              className="projects__filters"
              role="tablist"
              aria-label="Filter projects by category"
            >
              {PORTFOLIO_PROJECTS.categories.map((cat) => (
                <button
                  key={cat.key}
                  role="tab"
                  aria-selected={activeCategory === cat.key}
                  className={`projects__filter-btn ${
                    activeCategory === cat.key
                      ? "projects__filter-btn--active"
                      : ""
                  }`}
                  onClick={() => setActiveCategory(cat.key)}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Projects Portfolio Grid (UI Design Style - Clean Cards) */}
          <div
            ref={gridRef}
            className="projects__grid"
            role="list"
            aria-label="Nutritional formulations portfolio list"
          >
            {filteredProjects.map((project) => (
              <article
                key={project.id}
                className="project-card project-card--ui-design"
                role="listitem"
                tabIndex={0}
                onClick={() => setSelectedProject(project)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setSelectedProject(project);
                  }
                }}
              >
                {/* Card Top Meta Bar */}
                <div className="project-card__meta-bar">
                  <span className="project-card__category-tag">
                    {project.categoryLabel}
                  </span>
                </div>

                {/* Content Details */}
                <div className="project-card__content">
                  <h3 className="project-card__title">{project.title}</h3>
                  {project.note && (
                    <span className="project-card__note">{project.note}</span>
                  )}
                  <p className="project-card__subtitle">{project.subtitle}</p>
                  <p className="project-card__summary">{project.summary}</p>

                  {/* Clinical Target & Objective Snippet */}
                  <div className="project-card__specs-box">
                    <div className="project-card__spec-row">
                      <span className="project-card__spec-label">Target:</span>
                      <span className="project-card__spec-value">
                        {project.brief.targetGroup}
                      </span>
                    </div>
                    <div className="project-card__spec-row">
                      <span className="project-card__spec-label">Profile:</span>
                      <span className="project-card__spec-value">
                        {project.brief.nutritionalProfile}
                      </span>
                    </div>
                  </div>

                  {/* Attribute Tags */}
                  <div
                    className="project-card__tags"
                    aria-label="Nutritional highlights"
                  >
                    {project.tags.map((tag, tIdx) => (
                      <span key={tIdx} className="project-card__tag">
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Verified Outcome Snippet */}
                  <div className="project-card__outcome-pill">
                    <span className="project-card__outcome-check">✓</span>
                    <span className="project-card__outcome-text">
                      {project.brief.outcomes}
                    </span>
                  </div>

                  {/* Card Action Link */}
                  <div className="project-card__action">
                    <span className="project-card__link">
                      View Case Study &amp; Details →
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Project Brief Drawer / Modal (Content only) */}
      <div
        className={`bento-panel ${selectedProject ? "open" : ""}`}
        role="dialog"
        aria-modal={!!selectedProject}
        aria-label={
          selectedProject ? `Project brief: ${selectedProject.title}` : undefined
        }
        aria-hidden={!selectedProject}
      >
        <div
          className="bento-panel__backdrop"
          onClick={() => setSelectedProject(null)}
          aria-hidden="true"
        />
        <div className="bento-panel__drawer project-drawer">
          <button
            ref={closeBtnRef}
            className="bento-panel__close"
            onClick={() => setSelectedProject(null)}
            aria-label="Close project brief"
          >
            ✕
          </button>

          {selectedProject && (
            <div className="project-drawer__content">
              {/* Header with Category Badge */}
              <div style={{ marginBottom: "1rem" }}>
                <span className="project-card__category-tag">
                  {selectedProject.categoryLabel}
                </span>
                <h3
                  className="bento-panel__title"
                  style={{ marginTop: "0.75rem", marginBottom: "0.35rem" }}
                >
                  {selectedProject.title}
                </h3>
                <p
                  style={{
                    fontSize: "0.95rem",
                    color: "var(--color-olive-dark)",
                    fontWeight: 500,
                  }}
                >
                  {selectedProject.subtitle}
                </p>
              </div>

              {/* Technical Specifications Grid */}
              <div className="project-drawer__grid">
                <div className="project-drawer__item">
                  <h4 className="project-drawer__label">Formulation Objective</h4>
                  <p className="project-drawer__value">
                    {selectedProject.brief.objective}
                  </p>
                </div>

                <div className="project-drawer__item">
                  <h4 className="project-drawer__label">Target Population</h4>
                  <p className="project-drawer__value">
                    {selectedProject.brief.targetGroup}
                  </p>
                </div>

                <div className="project-drawer__item">
                  <h4 className="project-drawer__label">Nutrient Profile</h4>
                  <p className="project-drawer__value">
                    {selectedProject.brief.nutritionalProfile}
                  </p>
                </div>

                <div className="project-drawer__item">
                  <h4 className="project-drawer__label">Methodology &amp; Food Science</h4>
                  <p className="project-drawer__value">
                    {selectedProject.brief.methodology}
                  </p>
                </div>

                <div className="project-drawer__item" style={{ gridColumn: "1 / -1" }}>
                  <h4 className="project-drawer__label">Demonstrated Outcomes</h4>
                  <p className="project-drawer__value" style={{ fontWeight: 500, color: "var(--color-olive-dark)" }}>
                    ✓ {selectedProject.brief.outcomes}
                  </p>
                </div>
              </div>

              {/* Tags */}
              <div style={{ marginTop: "1.5rem", display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                {selectedProject.tags.map((t, idx) => (
                  <span
                    key={idx}
                    style={{
                      fontSize: "0.75rem",
                      background: "var(--color-bg)",
                      color: "var(--color-text)",
                      padding: "0.3rem 0.65rem",
                      borderRadius: "0.4rem",
                      border: "1px solid rgba(91, 107, 63, 0.15)",
                    }}
                  >
                    #{t}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
