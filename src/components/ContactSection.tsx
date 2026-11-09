// src/components/ContactSection.tsx
// Chapter 05: Contact — large closing headline, contact buttons, footer.
// NO booking, NO prices, NO appointment wording.
// Optional testimonials controlled by showTestimonials flag in content.ts.

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CONTACT_SECTION, CONTACT } from "../content";

gsap.registerPlugin(ScrollTrigger);

function EmailIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
    </svg>
  );
}

function LocationIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  );
}

const currentYear = new Date().getFullYear();

export function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);

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
      if (buttonsRef.current && buttonsRef.current.children.length > 0) {
        gsap.fromTo(
          buttonsRef.current.children,
          { opacity: 0, y: 18 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.08,
            ease: "power2.out",
            scrollTrigger: { trigger: buttonsRef.current, start: "top 90%" },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const mailtoHref = `mailto:${CONTACT.email}?subject=Portfolio%20Enquiry`;

  return (
    <>
      <section
        id="contact"
        ref={sectionRef}
        className="section snap-section contact-section"
        aria-label="Contact Aleeza Naeem"
      >
        {/* Section label */}
        <p className="text-section-label" style={{ marginBottom: "1.5rem" }}>
          {CONTACT_SECTION.sectionLabel}
        </p>

        {/* Headline */}
        <div ref={headingRef} style={{ maxWidth: 760, margin: "0 auto" }}>
          <h2 className="text-display">
            <span className="line-mask">
              <span className="line-mask-inner">
                {CONTACT_SECTION.headlinePart1}{" "}
                <em>{CONTACT_SECTION.headlineItalic}</em>
              </span>
            </span>
          </h2>
          <p className="contact__subline">
            {CONTACT_SECTION.subline}
          </p>
        </div>

        <p className="contact__location">
          <LocationIcon />
          <span>{CONTACT.location}</span>
        </p>

        {/* Contact buttons */}
        <div
          ref={buttonsRef}
          className="contact__buttons"
          aria-label="Contact options"
        >
          <a
            href={mailtoHref}
            className="contact-btn contact-btn--email"
            aria-label="Send email to Aleeza Naeem"
          >
            <EmailIcon />
            {CONTACT.email}
          </a>

          <a
            href={CONTACT.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="contact-btn contact-btn--linkedin"
            aria-label="Connect with Aleeza on LinkedIn"
          >
            <LinkedInIcon />
            LinkedIn
          </a>

          <a
            href={CONTACT.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="contact-btn contact-btn--instagram"
            aria-label={`Follow Aleeza on Instagram ${CONTACT.instagramHandle}`}
          >
            <InstagramIcon />
            {CONTACT.instagramHandle}
          </a>
        </div>

        {/* Testimonials (hidden by default) */}
        {CONTACT_SECTION.showTestimonials && (
          <div style={{ marginTop: "3rem", textAlign: "center", color: "rgba(255,255,255,0.7)", fontSize: "0.85rem" }}>
            {/* Real permissioned testimonials will render here */}
          </div>
        )}
      </section>

      {/* Footer */}
      <footer className="footer" role="contentinfo">
        <p>
          {CONTACT_SECTION.note}
        </p>
        <p style={{ marginTop: "0.5rem" }}>
          © {currentYear} Aleeza Naeem · Lahore, Pakistan
        </p>
      </footer>
    </>
  );
}
