// src/App.tsx
// Root component: Aleeza Naeem's personal portfolio.
// One page, 9 chapters in book-style scrolling. No backend, no booking, no consultation.

import { useEffect, useState } from "react";
import "./App.css";
import { useLenis } from "./hooks/useLenis";
import { Preloader } from "./components/Preloader";
import { PageCounter } from "./components/PageCounter";
import { HeroSection } from "./components/HeroSection";
import { AboutSection } from "./components/AboutSection";
import { ExperienceSection } from "./components/ExperienceSection";
import { ClinicalSection } from "./components/ClinicalSection";
import { FoodSafetySection } from "./components/FoodSafetySection";
import { ProjectsSection } from "./components/ProjectsSection";
import { EducationSection } from "./components/EducationSection";
import { AchievementsSection } from "./components/AchievementsSection";
import { ContactSection } from "./components/ContactSection";

export default function App() {
  const [preloaderDone, setPreloaderDone] = useState(() => {
    if (typeof window === "undefined") return false;
    return new URLSearchParams(window.location.search).has("nopreload");
  });

  useLenis();

  // Support direct hash scrolling
  useEffect(() => {
    if (typeof window === "undefined") return;
    const hash = window.location.hash;
    if (hash) {
      const el = document.querySelector(hash);
      if (el) {
        el.scrollIntoView({ behavior: "instant" as ScrollBehavior });
      }
    }
  }, []);

  return (
    <>
      {/* Skip link for accessibility */}
      <a href="#hero" className="skip-link">
        Skip to main content
      </a>

      {/* Preloader: leaf SVG draw + olive cover slide-up */}
      {!preloaderDone && (
        <Preloader onComplete={() => setPreloaderDone(true)} />
      )}

      {/* Main portfolio content */}
      <main
        id="main-content"
        className="snap-container"
        aria-label="Aleeza Naeem portfolio"
      >
        {/* Chapter 01: Hero */}
        <HeroSection />

        {/* Chapter 02: About me */}
        <AboutSection />

        {/* Chapter 03: Professional Experience (6 Placements Bento Grid) */}
        <ExperienceSection />

        {/* Chapter 04: Clinical Expertise (5 NCP Pillars) */}
        <ClinicalSection />

        {/* Chapter 05: Food Quality & Safety (Standards, Lab Testing & Audits) */}
        <FoodSafetySection />

        {/* Chapter 06: From the Kitchen (Formulations, Melas & R&D) */}
        <ProjectsSection />

        {/* Chapter 07: Education (BS Hons 3.63 CGPA, FSc, Matric) */}
        <EducationSection />

        {/* Chapter 08: Achievements & Training (Star Intern, PM Youth, PEEF, NxL, Seminars) */}
        <AchievementsSection />

        {/* Chapter 09: Contact & Dossier Terminal */}
        <ContactSection />
      </main>

      {/* Fixed UI: page counter ("01 / 09") + bookmark ribbon */}
      {preloaderDone && <PageCounter />}
    </>
  );
}
