import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useIsMobile } from "@/hooks/use-mobile";
import { SolivaLogo } from "./SolivaLogo";
import { motion, useScroll, useTransform } from "framer-motion";
import { useNavigate } from "@tanstack/react-router";

gsap.registerPlugin(ScrollTrigger);

const problemPoints = [
  {
    id: 1,
    tag: "Radiance",
    title: "Silent Radiance",
    desc: "Invisible UV rays penetrate ordinary weaves, reaching your skin even when you feel covered.",
    image: "/sun.jpg",
    metrics: [
      { k: "UVA", v: "320–400 nm" },
      { k: "Blocked", v: "<40%" },
      { k: "Index", v: "EXT 09" },
    ],
  },
  {
    id: 2,
    tag: "Atmosphere",
    title: "Atmospheric Debt",
    desc: "Micro-pollutants and urban dust find every opening, settling silently into your pores during the ride.",
    image: "/dust.jpg",
    metrics: [
      { k: "PM 2.5", v: "142 μg/m³" },
      { k: "Particle", v: "0.3 μ" },
      { k: "Filter", v: "Open" },
    ],
  },
  {
    id: 3,
    tag: "Friction",
    title: "Kinetic Friction",
    desc: "A slipping scarf is more than an inconvenience; it's a distraction from the journey you're navigating.",
    image: "/constant-slipping.jpg",
    metrics: [
      { k: "Slip", v: "18 / hr" },
      { k: "Anchor", v: "None" },
      { k: "Adjust", v: "Constant" },
    ],
  },
  {
    id: 4,
    tag: "Thermal",
    title: "Stifled Breath",
    desc: "In the peak of noon, heavy layers turn protection into a suffocating burden of trapped heat.",
    image: "/heate-sufacation.jpg",
    metrics: [
      { k: "ΔT", v: "+6 °C" },
      { k: "Airflow", v: "Blocked" },
      { k: "Vapor", v: "Trapped" },
    ],
  },
  {
    id: 5,
    tag: "Exposure",
    title: "Residual Exposure",
    desc: "The jaw, the neck, the delicate edges. Standard coverings leave your most vital areas completely exposed.",
    image: "/incompelete-protection.jpg",
    metrics: [
      { k: "Coverage", v: "Partial" },
      { k: "Gaps", v: "Multi-zone" },
      { k: "Surface", v: "62%" },
    ],
  },
];

export function UrbanStorytelling() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const navigate = useNavigate();

  // Scroll logic for the 3D button reveal and horizontal progress
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "center center"] });
  const buttonRotateX = useTransform(scrollYProgress, [0.85, 1], [90, 0]);
  const buttonOpacity = useTransform(scrollYProgress, [0.85, 1], [0, 1]);
  const buttonScale = useTransform(scrollYProgress, [0.85, 1], [0.8, 1]);

  // Refs for animations
  const p1TextRef = useRef<HTMLDivElement>(null);
  const p2VisualRef = useRef<HTMLDivElement>(null);
  const p2TextRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!isMobile) {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            pin: true,
            scrub: true,
            start: "top top",
            end: "+=350%",
            anticipatePin: 1,
            pinSpacing: false, // Essential for the next section to glide over this one
            invalidateOnRefresh: true,
            fastScrollEnd: true,
          },
        });

        // --- PANEL 1 REVEAL ---
        const cards = gsap.utils.toArray<HTMLElement>(".problem-card-container");
        tl.fromTo(cards, { autoAlpha: 0, scale: 0.95, y: 30 }, { autoAlpha: 1, scale: 1, y: 0, duration: 1.5, stagger: 0.1, ease: "power2.out" });
        tl.to({}, { duration: 1 });

        // --- TRANSITION TO PANEL 2 (Horizontal Slide) ---
        tl.to(containerRef.current, { xPercent: -50, duration: 2, ease: "power2.inOut" });

        // --- PANEL 2 REVEAL ---
        tl.fromTo(p2VisualRef.current, { autoAlpha: 0, scale: 1.05 }, { autoAlpha: 1, scale: 1, duration: 1.5, ease: "power3.out" }, "-=1.2");
        tl.fromTo(p2TextRef.current, { autoAlpha: 0, y: 40 }, { autoAlpha: 1, y: 0, duration: 1, ease: "power3.out" }, "-=1.0");
        
        // Final hold duration while the next section glides over
        tl.to({}, { duration: 1.5 });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [isMobile]);

  return (
    <>
      <section ref={sectionRef} className="relative bg-transparent overflow-hidden min-h-screen w-full z-10">
        {/* Top fade — softens the transition from the dark VideoSection above */}
        <div className="absolute inset-x-0 top-0 h-40 pointer-events-none z-0 bg-gradient-to-b from-[#F7F0EA]/60 to-transparent" />

        <div ref={containerRef} className="flex flex-col md:flex-row md:flex-nowrap md:w-[200%] h-auto md:h-screen items-center z-10 relative">
          {/* PANEL 1 — EDITORIAL GRID PROBLEM — composed as one tight cinematic strip */}
          <div className="relative flex flex-col h-auto md:h-full w-full md:w-1/2 justify-center px-8 md:px-16 lg:px-20 py-20 md:py-12 lg:py-16 flex-shrink-0">
            <div className="flex flex-col w-full gap-y-8 md:gap-y-10 max-w-[1500px] mx-auto relative z-10">
              {/* HEADER ROW — kicker + headline left, atmospheric pull-quote right, tightly bound */}
              <div ref={p1TextRef} className="relative flex flex-col md:flex-row md:items-end justify-between gap-6 md:gap-10">
                <div className="max-w-2xl space-y-4 z-10">
                  <span className="block font-mono text-[9px] uppercase tracking-[0.8em] text-[#8B7B6E]">01 — The Unseen Reality</span>
                  <h2 className="font-display text-sculpted text-4xl sm:text-5xl md:text-5xl lg:text-6xl leading-[0.95] tracking-[-0.02em] text-[#3D2E26]">
                    Protection is an <span className="italic font-normal text-[#D9772B]">illusion</span> we believe.
                  </h2>
                </div>
                <div className="md:max-w-[260px] flex flex-col items-start md:items-end gap-3 md:pb-2">
                  <div className="hidden md:block h-px w-12 bg-[#3D2E26]/20" />
                  <p className="text-[13px] md:text-sm font-light text-[#8B7B6E] leading-relaxed italic md:text-right">
                    Navigating <span className="text-[#D9772B]/75">invisible</span> landscapes — five vectors of urban exposure, measured.
                  </p>
                </div>
              </div>

              {/* STRESSOR MAP — connective tissue between headline and cards */}
              <div className="flex items-center gap-4">
                <span className="font-mono text-[9px] tracking-[0.5em] text-[#8B7B6E]/70 uppercase">Stressor Map</span>
                <span className="block h-px flex-1 bg-gradient-to-r from-[#3D2E26]/15 via-[#D9772B]/30 to-[#3D2E26]/5" />
                <span className="hidden sm:block font-mono text-[9px] tracking-[0.5em] text-[#8B7B6E]/40 uppercase">05 Vectors</span>
              </div>

              {/* THE EDITORIAL GRID — sits immediately under the divider, no dead air */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 md:gap-6 items-start">
                {problemPoints.map((point) => (
                  <div key={point.id} className="problem-card-container flex-shrink-0 space-y-3 group cursor-pointer relative">
                    {/* Top stressor tag */}
                    <div className="flex items-center justify-between px-1">
                      <span className="font-mono text-[9px] tracking-[0.35em] text-[#D9772B]/70 uppercase">{point.tag}</span>
                      <span className="font-mono text-[9px] tracking-[0.2em] text-[#8B7B6E]/45">0{point.id}<span className="text-[#8B7B6E]/25"> / 05</span></span>
                    </div>
                    <div className="relative aspect-[3/4] rounded-[1.75rem] overflow-hidden bg-[#EFE7DC] transition-all duration-1000 group-hover:scale-[1.03]" style={{ border: "1px solid rgba(90,60,30,0.10)", boxShadow: "0 10px 30px rgba(80,50,20,0.05)" }}>
                      <img src={point.image} loading="lazy" decoding="async" className="h-full w-full object-cover grayscale-[0.2] contrast-[1.05] brightness-[0.98] transition-transform duration-[2000ms] group-hover:scale-110" alt={point.title} />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#3D2E26]/30 via-transparent to-transparent opacity-60" />
                      <div className="absolute top-4 left-4 h-7 w-7 rounded-full border border-white/30 bg-black/15 flex items-center justify-center text-[10px] font-mono text-white/90">0{point.id}</div>
                      {/* Caption strip at base of image */}
                      <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[8px] font-mono tracking-[0.25em] text-white/55 uppercase">
                        <span>SLV · F26</span>
                        <span className="block h-px w-5 bg-white/30" />
                        <span>EXHIBIT</span>
                      </div>
                    </div>
                    <div className="space-y-2 px-1 transition-opacity duration-500 group-hover:opacity-90">
                      <h3 className="font-display text-lg lg:text-xl text-[#3D2E26] leading-tight tracking-tight">{point.title}</h3>
                      <p className="font-light text-[11px] text-[#8B7B6E] leading-relaxed">{point.desc}</p>
                    </div>
                    {/* Technical metrics strip */}
                    <div className="grid grid-cols-3 gap-2 px-1 pt-2 border-t border-[#3D2E26]/8">
                      {point.metrics.map((m) => (
                        <div key={m.k} className="space-y-0.5">
                          <span className="block font-mono text-[7px] tracking-[0.35em] text-[#8B7B6E]/55 uppercase">{m.k}</span>
                          <span className="block font-mono text-[10px] tracking-[0.05em] text-[#3D2E26]/80">{m.v}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Investigation footnote — reinforces narrative completion */}
              <div className="hidden md:flex items-center justify-between pt-3 border-t border-[#3D2E26]/5">
                <div className="flex items-center gap-3">
                  <span className="block h-1.5 w-1.5 rounded-full bg-[#D9772B]/60" />
                  <span className="font-mono text-[9px] tracking-[0.45em] text-[#8B7B6E]/65 uppercase">Field Study — Delhi · Aug 2025</span>
                </div>
                <div className="flex items-center gap-3 font-mono text-[9px] tracking-[0.4em] text-[#8B7B6E]/45 uppercase">
                  <span>Subjects · 142</span>
                  <span className="block h-px w-5 bg-[#3D2E26]/15" />
                  <span>Hours Logged · 2,310</span>
                </div>
              </div>
            </div>
          </div>

          {/* PANEL 2 — SYSTEM ARCHITECTURE */}
          <div className="relative flex h-auto md:h-full w-full md:w-1/2 items-center bg-transparent px-10 md:px-24 py-24 md:py-0 flex-shrink-0 overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-20 md:gap-32 items-center w-full max-w-[1400px] mx-auto relative z-10">
              <div ref={p2VisualRef} className="relative aspect-square group">
                <div className="absolute inset-0 bg-gradient-to-br from-[#F5EFE6] to-[#EFE7DC] rounded-[3.5rem] overflow-hidden" style={{ border: "1px solid rgba(90,60,30,0.08)", boxShadow: "0 20px 60px rgba(80,50,20,0.04)" }}>
                  <div className="absolute inset-0 opacity-[0.04] pointer-events-none" style={{ backgroundImage: `radial-gradient(#4A382F 0.5px, transparent 0.5px)`, backgroundSize: "32px 32px" }} />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="opacity-[0.04] scale-150 rotate-[-12deg] transition-transform duration-[4000ms] group-hover:scale-[1.7]"><SolivaLogo height={450} /></div>
                    <div className="relative z-10 p-16 rounded-full bg-white/40 border border-white/30 shadow-luxury-soft transition-transform duration-1000 group-hover:scale-105"><SolivaLogo height={150} /></div>
                  </div>
                </div>
              </div>
              <div ref={p2TextRef} className="space-y-16 md:space-y-20">
                <div className="space-y-8 relative">
                  <span className="block font-mono text-[10px] uppercase tracking-[0.8em] text-[#D9772B]">02 — THE RATIONALE</span>
                  <h2 className="font-display text-sculpted text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] leading-[0.9] tracking-[-0.03em] text-[#4A382F]">Engineered <br /><span className="italic font-normal opacity-90">Movement.</span></h2>
                  <p className="max-w-xl text-sm md:text-base text-[#8B7B6E] leading-relaxed font-light italic">Soliva reimaged protection not as a temporary layer, but as a system of defense that understands the geometry of the commute.</p>
                </div>
                <div className="grid grid-cols-1 gap-12">
                  {["Adaptive Coverage Architecture", "Atmospheric Intelligence", "Kinetic Equilibrium"].map((label, i) => (
                    <div key={i} className="group flex items-start gap-10">
                      <span className="font-mono text-[11px] text-[#D9772B]/60 pt-1">0{i + 1}</span>
                      <div className="space-y-2">
                        <h4 className="font-display text-2xl md:text-3xl text-[#3D2E26] tracking-tight group-hover:text-[#D9772B] transition-colors duration-500">{label}</h4>
                        <div className="w-0 h-[1px] bg-[#D9772B]/20 group-hover:w-full transition-all duration-700" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* LUXURY FOOTER STRIP — soft cream editorial bar instead of harsh dark cut */}
        <div className="hidden md:flex fixed bottom-0 left-0 right-0 z-50 w-full px-12 lg:px-16 py-3 items-center justify-between border-t border-[#3D2E26]/8 bg-[#F7F0EA]/95">
          <div className="flex items-center gap-10">
            <div className="opacity-90 hover:opacity-100 transition-opacity duration-500 pr-8 border-r border-[#3D2E26]/10"><SolivaLogo height={22} /></div>
            <div className="flex items-center gap-10">
              <div className="flex flex-col">
                <span className="font-mono text-[7px] tracking-[0.7em] text-[#3D2E26]/55 uppercase leading-none text-nowrap">SYSTEM ARCHIVE // 26.01</span>
                <span className="font-mono text-[6px] text-[#8B7B6E]/60 uppercase mt-1 tracking-widest text-nowrap">MILAN // PARIS // TOKYO</span>
              </div>
              <div className="w-px h-5 bg-[#3D2E26]/10" />
              <span className="font-mono text-[7px] tracking-[0.7em] text-[#3D2E26]/45 uppercase text-nowrap">ENGINEERED FOR MOVEMENT</span>
            </div>
          </div>
          <div className="perspective-2000">
            <motion.button onClick={() => navigate({ to: "/beyond-the-scarf" })} style={{ rotateX: buttonRotateX, opacity: buttonOpacity, scale: buttonScale, transformStyle: "preserve-3d" }} whileHover={{ y: -1, scale: 1.05 }} whileTap={{ scale: 0.98 }} className="group relative overflow-hidden flex items-center gap-4 px-8 py-2.5 rounded-full bg-gradient-to-r from-[#C96A1D] to-[#E38B33] border border-white/30 shadow-[0_10px_30px_-10px_rgba(201,106,29,0.45)]">
              <div className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-[1500ms] ease-in-out bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-[-20deg]" />
              <span className="font-body text-[10px] font-medium tracking-[0.2em] uppercase text-[#FFF8F2] relative z-10">Beyond the Scarf</span>
              <svg width="14" height="10" viewBox="0 0 16 12" fill="none" className="relative z-10 group-hover:translate-x-1.5 transition-transform duration-500"><path d="M10 1L15 6L10 11" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M1 6H15" stroke="white" strokeWidth="2" strokeLinecap="round"/></svg>
            </motion.button>
          </div>
        </div>

      </section>

      {/* Spacer — transparent so the global luxury image continues unbroken
          while the next section glides over this one. */}
      <div className="h-[350vh] w-full pointer-events-none bg-transparent relative overflow-hidden" />
    </>
  );
}
