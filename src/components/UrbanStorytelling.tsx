import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useIsMobile } from "@/hooks/use-mobile";
import { SolivaLogo } from "./SolivaLogo";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useNavigate } from "@tanstack/react-router";
import { ChevronLeft, ChevronRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const problemPoints = [
  {
    id: 1,
    tag: "RADIANCE",
    title: "Silent Radiance",
    desc: "Harmful UV rays penetrate ordinary fabrics during everyday commuting, continuously exposing skin even when covered.",
    image: "/sun.jpg",
    metrics: [
      { k: "UVA", v: "320–400nm" },
      { k: "BLOCK RATE", v: "<40%" },
      { k: "EXPOSURE INDEX", v: "EXT 09" },
    ],
  },
  {
    id: 2,
    tag: "ATMOSPHERE",
    title: "Atmospheric Debt",
    desc: "Dust, smoke, and micro-pollutants settle through loose fabrics and uncovered gaps during urban travel.",
    image: "/dust.jpg",
    metrics: [
      { k: "PM2.5", v: "142 μg/m³" },
      { k: "PARTICLE SIZE", v: "0.3 μ" },
      { k: "FILTER STATUS", v: "OPEN" },
    ],
  },
  {
    id: 3,
    tag: "FRICTION",
    title: "Kinetic Friction",
    desc: "Traditional scarves constantly shift during movement, forcing repeated adjustment and reducing practical protection.",
    image: "/constant-slipping.jpg",
    metrics: [
      { k: "SLIP RATE", v: "18/hr" },
      { k: "ANCHOR", v: "NONE" },
      { k: "ADJUSTMENT", v: "CONSTANT" },
    ],
  },
  {
    id: 4,
    tag: "THERMAL",
    title: "Stifled Breath",
    desc: "Heavy layered fabrics trap heat and reduce airflow, making long daily wear uncomfortable in Indian weather conditions.",
    image: "/heate-sufacation.jpg",
    metrics: [
      { k: "TEMP LOAD", v: "+6°C" },
      { k: "AIRFLOW", v: "BLOCKED" },
      { k: "HEAT STATE", v: "TRAPPED" },
    ],
  },
  {
    id: 5,
    tag: "EXPOSURE",
    title: "Residual Exposure",
    desc: "Critical areas like the neck, ears, jawline, and side profile remain exposed despite being partially covered.",
    image: "/incompelete-protection.jpg",
    metrics: [
      { k: "COVERAGE", v: "PARTIAL" },
      { k: "GAP ZONES", v: "MULTI-ZONE" },
      { k: "EXPOSED AREA", v: "62%" },
    ],
  },
];

const rationalePoints = [
  {
    title: "Adaptive Coverage Architecture",
    desc: "Designed to maintain stable protection across movement, reducing exposed zones during everyday commuting.",
  },
  {
    title: "Atmospheric Intelligence",
    desc: "Built for Indian environmental conditions including UV exposure, dust, pollution, and trapped urban heat.",
  },
  {
    title: "Breathable Mobility System",
    desc: "Dual-layer comfort structure engineered for airflow, long-duration wearability, and lightweight daily use.",
  },
  {
    title: "Kinetic Stability",
    desc: "Minimizes slipping, shifting, and repeated adjustment during active movement and two-wheeler commuting.",
  },
];

const productGallery = ["/1.JPG", "/2.JPG"];

export function UrbanStorytelling() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const [activeImage, setActiveImage] = useState(0);

  // Scroll logic for global interaction
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });

  const buttonRotateX = useTransform(scrollYProgress, [0.9, 1], [90, 0]);
  const buttonOpacity = useTransform(scrollYProgress, [0.9, 1], [0, 1]);
  const buttonScale = useTransform(scrollYProgress, [0.9, 1], [0.8, 1]);

  // Refs for animations
  const p2VisualRef = useRef<HTMLDivElement>(null);
  const p2TextRef = useRef<HTMLDivElement>(null);
  const bgLogoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!isMobile) {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            pin: true,
            scrub: true,
            start: "top top",
            end: "+=400%",
            anticipatePin: 1,
            pinSpacing: false,
            invalidateOnRefresh: true,
            fastScrollEnd: true,
          },
        });

        // Elements
        const p1Headline = ".p1-headline";
        const p1Subtext = ".p1-subtext";
        const p1Labels = ".p1-label";
        const cards = ".problem-card-container";
        const cardMetrics = ".card-metric";

        // Initial setup
        gsap.set([p1Headline, p1Subtext, p1Labels, cards, cardMetrics], { autoAlpha: 0 });

        // --- PANEL 1 SEQUENCE ---
        tl.fromTo(
          p1Headline,
          { autoAlpha: 0, y: 50, filter: "blur(15px)" },
          { autoAlpha: 1, y: 0, filter: "blur(0px)", duration: 2, ease: "power4.out" },
        );
        tl.fromTo(
          p1Subtext,
          { autoAlpha: 0, y: 30 },
          { autoAlpha: 1, y: 0, duration: 1.5, ease: "power3.out" },
          "-=1.5",
        );
        tl.fromTo(
          p1Labels,
          { autoAlpha: 0, scaleX: 0, transformOrigin: "left" },
          { autoAlpha: 1, scaleX: 1, stagger: 0.2, duration: 1.2, ease: "expo.out" },
          "-=1.2",
        );
        tl.fromTo(
          cards,
          { autoAlpha: 0, y: 40, rotationY: -10 },
          { autoAlpha: 1, y: 0, rotationY: 0, duration: 2, stagger: 0.2, ease: "power3.out" },
          "-=1.0",
        );
        tl.fromTo(
          cardMetrics,
          { autoAlpha: 0, scale: 0.8 },
          { autoAlpha: 1, scale: 1, stagger: 0.1, duration: 0.8, ease: "back.out(1.7)" },
          "-=0.5",
        );

        tl.to({}, { duration: 1 });

        // --- TRANSITION ---
        tl.to(containerRef.current, { xPercent: -50, duration: 3, ease: "power2.inOut" });

        // Background Logo Parallax during transition
        tl.to(
          bgLogoRef.current,
          { x: -100, rotation: -5, duration: 3, ease: "power2.inOut" },
          "-=3",
        );

        // --- PANEL 2 SEQUENCE ---
        const p2Headline = ".p2-headline";
        const p2Subtext = ".p2-subtext";
        const rationaleItems = ".rationale-point";
        const rationaleNumbers = ".rationale-number";

        gsap.set([p2Headline, p2Subtext, rationaleItems, rationaleNumbers], { autoAlpha: 0 });

        tl.fromTo(
          p2VisualRef.current,
          { autoAlpha: 0, scale: 0.95, rotationY: 10 },
          { autoAlpha: 1, scale: 1, rotationY: 0, duration: 2, ease: "expo.out" },
          "-=1.5",
        );
        tl.fromTo(
          p2Headline,
          { autoAlpha: 0, y: 60, filter: "blur(15px)" },
          { autoAlpha: 1, y: 0, filter: "blur(0px)", duration: 1.8, ease: "power4.out" },
          "-=1.5",
        );
        tl.fromTo(
          p2Subtext,
          { autoAlpha: 0, opacity: 0 },
          { autoAlpha: 1, opacity: 1, duration: 1.5 },
          "-=1.2",
        );
        tl.fromTo(
          rationaleNumbers,
          { autoAlpha: 0, scale: 0 },
          { autoAlpha: 1, scale: 1, stagger: 0.3, duration: 1, ease: "back.out(2)" },
          "-=1.0",
        );
        tl.fromTo(
          rationaleItems,
          { autoAlpha: 0, x: 30 },
          { autoAlpha: 1, x: 0, stagger: 0.3, duration: 1.5, ease: "power3.out" },
          "-=1.2",
        );

        tl.to({}, { duration: 2 });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [isMobile]);

  const nextImage = () => setActiveImage((prev) => (prev + 1) % productGallery.length);
  const prevImage = () =>
    setActiveImage((prev) => (prev - 1 + productGallery.length) % productGallery.length);

  return (
    <>
      <section
        ref={sectionRef}
        className="relative bg-transparent h-screen w-full z-10 overflow-hidden"
      >
        {/* Animated Background Gradients using Global Colors */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.3, 0.5, 0.3],
              x: [0, 20, 0],
              y: [0, -20, 0],
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[-10%] -left-[10%] w-[50%] h-[50%] rounded-full bg-[radial-gradient(circle_at_center,var(--cream),transparent)] blur-[120px]"
          />
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.2, 0.4, 0.2],
              x: [0, -30, 0],
              y: [0, 30, 0],
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            className="absolute bottom-[-10%] -right-[10%] w-[60%] h-[60%] rounded-full bg-[radial-gradient(circle_at_center,rgba(245,130,13,0.1),transparent)] blur-[150px]"
          />
          <div className="absolute inset-0 opacity-[0.02] mix-blend-overlay pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]" />
        </div>

        <div className="absolute inset-x-0 top-0 h-32 pointer-events-none z-10 bg-gradient-to-b from-luxury-beige to-transparent" />

        <div
          ref={containerRef}
          className="flex flex-col md:flex-row md:flex-nowrap md:w-[200%] h-full items-center z-10 relative overflow-visible"
        >
          {/* PANEL 1 — EDITORIAL GRID PROBLEM */}
          <div className="relative flex flex-col h-full w-full md:w-1/2 justify-center px-6 md:px-12 lg:px-16 pt-20 pb-16 md:pt-24 md:pb-20 flex-shrink-0 overflow-visible">
            <div className="flex flex-col w-full gap-y-6 md:gap-y-8 max-w-[1400px] mx-auto relative z-10 overflow-visible">
              <div className="relative flex flex-col md:flex-row md:items-start justify-between gap-6 md:gap-8 lg:gap-16 overflow-visible bg-white/5 border border-brown/5 rounded-[3rem] p-10 backdrop-blur-md shadow-sm">
                <div className="max-w-3xl space-y-3 z-10 overflow-visible">
                  <span className="p1-label block font-mono text-[10px] uppercase tracking-[0.6em] text-brown opacity-70 mb-0.5 font-bold">
                    STRESSOR MAP
                  </span>
                  <div className="relative overflow-visible">
                    <h2 className="p1-headline font-display text-sculpted text-[clamp(1.8rem,4vw,3.25rem)] leading-[1.1] tracking-[-0.03em] text-brown-deep py-2">
                      Protection is often an{" "}
                      <span className="italic font-normal text-orange-glow drop-shadow-sm">
                        illusion
                      </span>{" "}
                      we choose to believe.
                    </h2>
                  </div>
                </div>
                <div className="md:max-w-[260px] flex flex-col items-start md:items-end gap-3 md:mt-16">
                  <div className="p1-label hidden md:block h-px w-10 bg-brown/20" />
                  <p className="p1-subtext text-[13px] md:text-sm font-light text-brown leading-relaxed italic md:text-right">
                    Everyday commuting silently exposes people to{" "}
                    <span className="text-orange-glow font-medium">
                      UV rays, pollution, trapped heat,
                    </span>{" "}
                    and incomplete coverage — even while feeling “covered.”
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <span className="p1-label font-mono text-[9px] tracking-[0.5em] text-brown/70 uppercase">
                  STRESSOR MAP
                </span>
                <span className="block h-px flex-1 bg-gradient-to-r from-brown/15 via-orange-glow/30 to-brown/5" />
                <span className="p1-label hidden sm:block font-mono text-[9px] tracking-[0.5em] text-brown/40 uppercase">
                  05 VECTORS
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 md:gap-6 items-start">
                {problemPoints.map((point) => (
                  <div
                    key={point.id}
                    className="problem-card-container flex-shrink-0 space-y-2 group cursor-pointer relative bg-white/20 border border-brown/10 rounded-3xl p-3 backdrop-blur-sm hover:bg-white/40 transition-all duration-500 shadow-sm"
                  >
                    <div className="flex items-center justify-between px-1 mb-2">
                      <span className="font-mono text-[9px] tracking-[0.35em] text-orange-glow font-bold uppercase">
                        {point.tag}
                      </span>
                      <span className="font-mono text-[9px] tracking-[0.2em] text-brown/50">
                        0{point.id}
                        <span className="text-brown/30"> / 05</span>
                      </span>
                    </div>
                    <div
                      className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-cream transition-all duration-1000 group-hover:scale-[1.02] perspective-1000 border border-brown/5"
                    >
                      <img
                        src={point.image}
                        loading="lazy"
                        decoding="async"
                        className="h-full w-full object-cover grayscale-[0.1] contrast-[1.1] brightness-[1.05] transition-transform duration-[2000ms] group-hover:scale-110"
                        alt={point.title}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-brown-deep/40 via-transparent to-transparent opacity-60" />
                      <div className="absolute top-2 left-2 h-6 w-6 rounded-full border border-white/30 bg-black/20 flex items-center justify-center text-[9px] font-mono text-white/90 backdrop-blur-md">
                        0{point.id}
                      </div>
                      <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between text-[7px] font-mono tracking-[0.25em] text-white/90 uppercase">
                        <span>SLV · F26</span>
                        <span className="block h-px w-4 bg-white/40" />
                        <span>EXHIBIT</span>
                      </div>
                    </div>
                    <div className="space-y-1.5 px-1 pt-2 transition-opacity duration-500 group-hover:opacity-100 opacity-90">
                      <h3 className="font-display text-base lg:text-lg text-brown-deep leading-tight tracking-tight">
                        {point.title}
                      </h3>
                      <p className="font-light text-[10px] text-brown leading-relaxed line-clamp-2">
                        {point.desc}
                      </p>
                    </div>
                    <div className="grid grid-cols-3 gap-1.5 px-1 pt-2 mt-1 border-t border-brown/10">
                      {point.metrics.map((m) => (
                        <div key={m.k} className="card-metric space-y-0.5">
                          <span className="block font-mono text-[6px] tracking-[0.35em] text-brown/60 uppercase">
                            {m.k}
                          </span>
                          <span className="block font-mono text-[9px] tracking-[0.05em] text-brown-deep font-bold">
                            {m.v}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="p1-label hidden md:flex items-center justify-between pt-4 border-t border-brown/10 px-4">
                <div className="flex items-center gap-3">
                  <span className="block h-1.5 w-1.5 rounded-full bg-orange-glow/60 animate-premium-pulse" />
                  <span className="font-mono text-[9px] tracking-[0.45em] text-brown/60 uppercase font-bold">
                    Field Study — Delhi · Aug 2025
                  </span>
                </div>
                <div className="flex items-center gap-3 font-mono text-[9px] tracking-[0.4em] text-brown/50 uppercase">
                  <span>Subjects · 142</span>
                  <span className="block h-px w-5 bg-brown/20" />
                  <span>Hours Logged · 2,310</span>
                </div>
              </div>
            </div>
          </div>

          {/* PANEL 2 — THE RATIONALE */}
          <div className="relative flex h-full w-full md:w-1/2 items-center bg-transparent px-10 md:px-20 py-24 md:py-0 flex-shrink-0 overflow-visible">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center w-full max-w-[1400px] mx-auto relative z-10 overflow-visible">
              {/* IMMERSIVE PRODUCT SHOWCASE */}
              <div ref={p2VisualRef} className="relative aspect-square group">
                <div
                  className="absolute inset-0 bg-white/40 border border-brown/5 rounded-[3.5rem] overflow-hidden shadow-[0_40px_100px_-20px_rgba(58,42,34,0.1)] backdrop-blur-xl"
                >
                  <div
                    className="absolute inset-0 opacity-[0.03] pointer-events-none"
                    style={{
                      backgroundImage: `radial-gradient(var(--brown-deep) 0.5px, transparent 0.5px)`,
                      backgroundSize: "32px 32px",
                    }}
                  />

                  {/* Gallery Container — Full Bleed Immersive */}
                  <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
                    {/* Background Logo Glow with Parallax */}
                    <div
                      ref={bgLogoRef}
                      className="absolute opacity-[0.02] scale-150 rotate-[-12deg] z-0"
                    >
                      <SolivaLogo height={400} />
                    </div>

                    <AnimatePresence mode="wait">
                      <motion.div
                        key={activeImage}
                        initial={{ opacity: 0, x: 20, scale: 1.05 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        exit={{ opacity: 0, x: -20, scale: 0.95 }}
                        transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
                        className="absolute inset-0 w-full h-full"
                      >
                        <img
                          src={productGallery[activeImage]}
                          alt={`Soliva Product View ${activeImage + 1}`}
                          className="w-full h-full object-cover"
                        />
                        {/* Soft Ambient Overlay for Premium Feel */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-brown-deep/10 via-transparent to-white/10 pointer-events-none" />
                      </motion.div>
                    </AnimatePresence>

                    {/* Minimal Interactive Controls */}
                    <div className="absolute inset-x-4 top-1/2 -translate-y-1/2 flex justify-between z-30 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <button
                        onClick={prevImage}
                        className="p-3 rounded-full bg-white/30 backdrop-blur-xl border border-white/40 text-brown-deep hover:bg-white/50 transition-all shadow-sm"
                      >
                        <ChevronLeft size={20} />
                      </button>
                      <button
                        onClick={nextImage}
                        className="p-3 rounded-full bg-white/30 backdrop-blur-xl border border-white/40 text-brown-deep hover:bg-white/50 transition-all shadow-sm"
                      >
                        <ChevronRight size={20} />
                      </button>
                    </div>

                    {/* Pagination Dots */}
                    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-30">
                      {productGallery.map((_, i) => (
                        <button
                          key={i}
                          onClick={() => setActiveImage(i)}
                          className={`h-1.5 transition-all duration-700 rounded-full ${activeImage === i ? "w-8 bg-orange-glow" : "w-1.5 bg-white/50 backdrop-blur-sm"}`}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Floating Certification Card — Overlaid over gallery */}
                  <motion.div
                    animate={{
                      y: [0, 8, 0],
                      x: [0, 4, 0],
                    }}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                    className="absolute bottom-8 left-8 z-40 p-5 rounded-3xl bg-white/60 border border-white/50 backdrop-blur-xl shadow-[0_20px_40px_rgba(58,42,34,0.08)] pointer-events-none"
                  >
                    <div className="flex flex-col gap-1.5">
                      <span className="font-mono text-[8px] uppercase tracking-widest text-orange-glow font-bold">
                        Certified Protection
                      </span>
                      <span className="font-display text-2xl text-brown-deep leading-none">UPF 50+</span>
                      <div className="h-px w-full bg-brown/10 my-1.5" />
                      <span className="font-mono text-[8px] text-brown/80 uppercase tracking-tighter">
                        Blocks 98% of UV Rays
                      </span>
                    </div>
                  </motion.div>

                  {/* System Core Micro Label */}
                  <div className="absolute top-8 right-8 flex items-center gap-3 opacity-40 z-40">
                    <span className="font-mono text-[8px] uppercase tracking-[0.3em] text-brown-deep font-bold">
                      System Core
                    </span>
                    <div className="h-px w-8 bg-brown-deep" />
                  </div>
                </div>
              </div>

              <div ref={p2TextRef} className="space-y-10 md:space-y-12 bg-white/10 border border-brown/5 rounded-[3rem] p-10 backdrop-blur-md shadow-sm">
                <div className="space-y-5 relative">
                  <span className="block font-mono text-[10px] uppercase tracking-[0.8em] text-orange-glow font-bold">
                    02 — THE RATIONALE
                  </span>
                  <h2 className="p2-headline font-display text-sculpted text-3xl sm:text-4xl md:text-5xl lg:text-[4.25rem] leading-[1.05] tracking-tight text-brown-deep">
                    Engineered for <br />
                    <span className="italic font-normal text-orange-glow opacity-90">Everyday Exposure.</span>
                  </h2>
                  <p className="p2-subtext max-w-xl text-[13px] md:text-sm text-brown leading-relaxed font-light italic">
                    Protection should move naturally with the body — without heat, friction,
                    constant adjustment, or discomfort.
                  </p>
                </div>
                <div className="grid grid-cols-1 gap-6 md:gap-8">
                  {rationalePoints.map((point, i) => (
                    <div
                      key={i}
                      className="rationale-point group flex items-start gap-6 cursor-default p-4 rounded-2xl hover:bg-white/30 transition-colors duration-500 border border-transparent hover:border-brown/5"
                    >
                      <span className="rationale-number font-mono text-[10px] text-orange-glow/80 pt-1 font-bold">
                        0{i + 1}
                      </span>
                      <div className="space-y-2 flex-1">
                        <h4 className="font-display text-lg md:text-xl text-brown-deep tracking-tight group-hover:text-orange-glow transition-colors duration-500 uppercase font-bold">
                          {point.title}
                        </h4>
                        <p className="text-[11px] text-brown leading-relaxed font-light max-w-md opacity-80 group-hover:opacity-100 transition-opacity">
                          {point.desc}
                        </p>
                        <div className="h-[2px] bg-orange-glow/10 w-0 group-hover:w-full transition-all duration-700 mt-2" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* LUXURY FOOTER STRIP */}
        <div className="hidden md:flex fixed bottom-0 left-0 right-0 z-50 w-full px-12 lg:px-16 py-3 items-center justify-between border-t border-brown/10 bg-luxury-beige/95 backdrop-blur-xl shadow-[0_-10px_40px_rgba(58,42,34,0.05)]">
          <div className="flex items-center gap-10">
            <div className="opacity-90 hover:opacity-100 transition-opacity duration-500 pr-8 border-r border-brown/10">
              <SolivaLogo height={20} />
            </div>
            <div className="flex items-center gap-10">
              <div className="flex flex-col">
                <span className="font-mono text-[7px] tracking-[0.7em] text-brown-deep/60 uppercase leading-none text-nowrap font-bold">
                  SYSTEM ARCHIVE // 26.01
                </span>
                <span className="font-mono text-[6px] text-brown/60 uppercase mt-1 tracking-widest text-nowrap">
                  MILAN // PARIS // TOKYO
                </span>
              </div>
              <div className="w-px h-5 bg-brown/15" />
              <span className="font-mono text-[7px] tracking-[0.7em] text-brown-deep/50 uppercase text-nowrap font-bold">
                THOUGHTFULLY LAYERED. EFFORTLESSLY WORN.
              </span>
            </div>
          </div>
          <div className="perspective-2000">
            <motion.button
              onClick={() => navigate({ to: "/products", search: { sort: "newest" } })}
              style={{
                rotateX: buttonRotateX,
                opacity: buttonOpacity,
                scale: buttonScale,
                transformStyle: "preserve-3d",
              }}
              whileHover={{
                y: -2,
                scale: 1.02,
                boxShadow: "0 15px 35px -10px rgba(245,130,13,0.4)",
              }}
              whileTap={{ scale: 0.98 }}
              className="group relative overflow-hidden flex items-center gap-4 px-8 py-2.5 rounded-full bg-gradient-to-r from-brown to-orange-glow border border-white/30 shadow-sm"
            >
              <div className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-[1500ms] ease-in-out bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-[-20deg]" />
              <span className="font-body text-[10px] font-bold tracking-[0.2em] uppercase text-white relative z-10">
                ENGINEERED FOR MOVEMENT →
              </span>
              <svg
                width="14"
                height="10"
                viewBox="0 0 16 12"
                fill="none"
                className="relative z-10 group-hover:translate-x-1.5 transition-transform duration-500"
              >
                <path
                  d="M10 1L15 6L10 11"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path d="M1 6H15" stroke="white" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </motion.button>
          </div>
        </div>
      </section>

      {/* Spacer */}
      <div className="h-[400vh] w-full pointer-events-none bg-transparent relative overflow-hidden" />
    </>
  );
}
