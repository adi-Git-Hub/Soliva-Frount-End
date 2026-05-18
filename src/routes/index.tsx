import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/Hero";
import { ProblemSection } from "@/components/ProblemSection";
import { UrbanStorytelling } from "@/components/UrbanStorytelling";
import { CollectionSection } from "@/components/CollectionSection";
import { CompareSection } from "@/components/CompareSection";
import { VideoSection } from "@/components/VideoSection";
import { FinalCTA } from "@/components/FinalCTA";
import { LoadingPage } from "@/components/LoadingPage";
import { Header } from "@/components/layout/Header";
import { useEffect, useState, useRef, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "SOLIVA SUNWRAP — Luxury Sun Protection" },
      {
        name: "description",
        content: "SOLIVA SUNWRAP — A new era of luxury sun protection.",
      },
    ],
  }),
});

// Skip the brand loader if the user has already seen it this tab session,
// so navigating back to "/" doesn't replay the 1.4s reveal.
const LOADER_SEEN_KEY = "soliva:loader-seen";

function getInitialLoading(): boolean {
  if (typeof window === "undefined") return true;
  try {
    return sessionStorage.getItem(LOADER_SEEN_KEY) !== "1";
  } catch {
    return true;
  }
}

function Index() {
  const [loading, setLoading] = useState<boolean>(getInitialLoading);
  const mainRef = useRef<HTMLDivElement>(null);
  const handleLoadingComplete = useCallback(() => {
    try {
      sessionStorage.setItem(LOADER_SEEN_KEY, "1");
    } catch {
      /* ignore */
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Global Lenis Smooth Scroll on Body (Natural Scroll)
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5,
      infinite: false,
    });

    lenis.on("scroll", ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    // Ensure scroll locking is completely disabled
    ScrollTrigger.normalizeScroll(false);

    gsap.config({
      force3D: true,
      nullTargetWarn: false,
    });

    return () => {
      lenis.destroy();
      gsap.ticker.remove(lenis.raf);
    };
  }, []);

  useEffect(() => {
    if (!loading && mainRef.current) {
      ScrollTrigger.refresh();

      // Simple Reveal Animation for Content
      gsap.to(mainRef.current, {
        opacity: 1,
        visibility: "visible",
        duration: 1.5,
        ease: "power2.out",
      });
    }
  }, [loading]);

  return (
    <>
      {loading && <LoadingPage onComplete={handleLoadingComplete} />}

      {/* The global luxury image is rendered on body::before. No additional
          ambient overlay needed here — fewer composite layers, faster paints. */}

      {!loading && <Header />}

      <main
        ref={mainRef}
        className="relative min-h-screen bg-transparent w-full"
        style={{ opacity: 0, visibility: "hidden" }}
      >
        <Hero isRevealed={!loading} />
        <VideoSection />
        <UrbanStorytelling />
        <CollectionSection />
        <CompareSection />
        <FinalCTA />
      </main>
    </>
  );
}
