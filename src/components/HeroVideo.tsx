// src/components/HeroVideo.tsx
// Reusable HeroVideo component for Chapter 01 Hero.
// Features:
// - Poster image shows instantly (zero empty flash)
// - Video fades in over 0.6s once ready (canplay)
// - Fallback to poster on prefers-reduced-motion, saveData, slow-2g, or load error
// - IntersectionObserver pauses video when out of viewport to save battery
// - Subtle entrance scale (1.08 to 1) and scroll parallax via GSAP
// - aria-hidden="true" on decorative video
// - Soft dark-green gradient overlay (~15-20% opacity) ensuring headline contrast at seam

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface HeroVideoProps {
  src: string;
  poster: string;
  className?: string;
  style?: React.CSSProperties;
  alt?: string;
}

export function HeroVideo({
  src,
  poster,
  className = "",
  style,
  alt = "Healthy green breakfast plate preparation",
}: HeroVideoProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const posterRef = useRef<HTMLImageElement>(null);

  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [shouldPlayVideo] = useState(() => {
    if (typeof window === "undefined") return true;
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const nav = navigator as unknown as {
      connection?: { saveData?: boolean; effectiveType?: string };
    };
    const saveData = nav.connection?.saveData === true;
    const isSlow =
      nav.connection?.effectiveType === "slow-2g" ||
      nav.connection?.effectiveType === "2g";
    return !(reducedMotion || saveData || isSlow);
  });

  // 2. IntersectionObserver to pause when scrolled out of view
  useEffect(() => {
    const video = videoRef.current;
    const container = containerRef.current;
    if (!video || !container || !shouldPlayVideo) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            video.play().catch(() => {
              // Autoplay policy fallback
            });
          } else {
            video.pause();
          }
        });
      },
      { threshold: 0.08 }
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, [shouldPlayVideo]);

  // 3. Gentle scroll parallax (no zoom / scale)
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reducedMotion) return;

    const elementsToAnimate = container.querySelectorAll(
      ".hero-video__media"
    );

    // Photos, videos: mask or fade reveal with gentle scale from 1.1 to 1 (about 1s)
    gsap.fromTo(
      elementsToAnimate,
      { scale: 1.1 },
      { scale: 1, duration: 1.0, ease: "power2.out" }
    );

    // Parallax on scroll
    const parallaxAnim = gsap.to(elementsToAnimate, {
      yPercent: 8,
      ease: "none",
      scrollTrigger: {
        trigger: container,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });

    return () => {
      parallaxAnim.scrollTrigger?.kill();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`hero-video-container relative w-full h-full overflow-hidden ${className}`}
      style={style}
    >
      {/* 1. Poster image — displays instantly so hero never flashes empty */}
      <img
        ref={posterRef}
        src={poster}
        alt={alt}
        className="hero-video__media absolute inset-0 w-full h-full object-cover object-center pointer-events-none"
        loading="eager"
        decoding="async"
      />

      {/* 2. Video element — fades in over 0.6s once ready */}
      {shouldPlayVideo && !hasError && (
        <video
          ref={videoRef}
          src={src}
          poster={poster}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden="true"
          onCanPlay={() => setIsLoaded(true)}
          onError={() => {
            setHasError(true);
            setIsLoaded(false);
          }}
          className={`hero-video__media absolute inset-0 w-full h-full object-cover object-center pointer-events-none transition-opacity duration-600 ease-out ${
            isLoaded ? "opacity-100" : "opacity-0"
          }`}
          style={{
            objectFit: "cover",
            objectPosition: "center",
          }}
        />
      )}

      {/* 3. Soft dark-green gradient overlay (15–20% opacity) ensuring white headline is crisp */}
      <div
        className="hero-video__overlay absolute inset-0 pointer-events-none"
        aria-hidden="true"
      />
    </div>
  );
}
