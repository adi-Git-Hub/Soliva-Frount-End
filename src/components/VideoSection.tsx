import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function VideoSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoContainerRef = useRef<HTMLDivElement>(null);
  const textContentRef = useRef<HTMLDivElement>(null);
  // Lazy-load the 3.4 MB video. Only attach <source> once the section is
  // about to enter the viewport, so first-paint never waits for it.
  const [shouldLoadVideo, setShouldLoadVideo] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    if (typeof IntersectionObserver === "undefined") {
      setShouldLoadVideo(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setShouldLoadVideo(true);
          io.disconnect();
        }
      },
      { rootMargin: "400px 0px" },
    );
    io.observe(sectionRef.current);
    return () => io.disconnect();
  }, []);

  // Tell the <video> to actually fetch once we've attached the <source>.
  useEffect(() => {
    if (shouldLoadVideo) videoRef.current?.load();
  }, [shouldLoadVideo]);
  
  const trustItems = [
    "UPF 50+ PROTECTION", "DUAL-LAYER COMFORT", "FULL COVERAGE DESIGN",
    "BREATHABLE IN HEAT", "LIGHTWEIGHT DAILY WEAR", "NO SMUDGING", "NO MORE MESSY HAIR",
  ];
  const loop = [...trustItems, ...trustItems];

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (videoContainerRef.current) {
        // Light cinematic hold — pinned for ~80vh (vs the old 200vh trap) with
        // a snappier scrub (0.8) and anticipatePin so the magnet engages
        // smoothly. pinSpacing default (true) lets ScrollTrigger reserve the
        // exact scroll budget; no manual 200vh spacer needed.
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "+=80%",
            scrub: 0.8,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        // Video scale-in / border-radius / border / shadow easing — untouched.
        tl.fromTo(videoContainerRef.current,
          { scale: 0.65, borderRadius: "4rem", border: "2px solid rgba(245,130,13,0.3)", boxShadow: "0 40px 100px rgba(58,42,34,0.15)" },
          { scale: 1, borderRadius: "0rem", border: "0px solid rgba(245,130,13,0)", boxShadow: "0 0 0 rgba(0,0,0,0)", duration: 1, ease: "power2.inOut" }
        );

        if (textContentRef.current) {
          // Middle-ground exit — softer than the 200vh-era pin, more present
          // than the no-pin flow, so it reads cinematic in ~80vh of scrub.
          tl.to(textContentRef.current, {
            autoAlpha: 0,
            y: -100,
            scale: 0.93,
            filter: "blur(8px)",
            duration: 0.7,
            ease: "power2.inOut"
          }, 0);
        }
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      {/* Amber luxury ribbon — vertical amber-fade gradient blends into Hero
          above and VideoSection below (no hard borders), with bridge-strip
          pseudo-layers (warm drift + white light streak) sweeping across as
          glass shimmer. Glassmorphism via backdrop-blur. */}
      <div className="bridge-strip relative z-0 w-full bg-gradient-to-b from-orange-glow/5 via-orange-glow/30 to-orange-glow/5 backdrop-blur-sm">
        <div className="relative z-10 flex items-center justify-center px-6 py-3 md:py-4">
          <p className="font-display italic text-sm md:text-base text-brown-deep tracking-[0.18em] text-center">
            {"Built for Indian streets. Refined for modern living."
              .split(" ")
              .map((word, i, arr) => (
                <span
                  key={i}
                  className="punchline-word"
                  style={{ animationDelay: `${i * 90}ms` }}
                >
                  {word}
                  {i < arr.length - 1 ? " " : ""}
                </span>
              ))}
          </p>
        </div>
      </div>

      <section ref={sectionRef} className="relative w-full h-screen overflow-hidden bg-transparent z-0">
        {/* Cinematic atmospheric depth — soft amber drift + two floating glow
            orbs that peek into the section corners while the video container
            is scaled in (0.65 → 1.0). Hidden naturally once the video fills
            the section. z-1 so video (z-10), glass card (z-20) and marquee
            (z-30) all sit above. */}
        <div className="absolute inset-0 z-[1] pointer-events-none">
          <div className="video-ambient-drift" />
          <div className="video-orb video-orb-1 -top-32 -left-32 w-[32rem] h-[32rem]" />
          <div className="video-orb video-orb-2 -bottom-32 -right-32 w-[36rem] h-[36rem]" />
        </div>

        <div
          ref={textContentRef}
          className="absolute top-8 md:top-10 left-1/2 -translate-x-1/2 z-20 text-center w-full max-w-3xl px-6 pointer-events-none"
        >
          <div className="bg-white/10 border border-brown/5 rounded-[3rem] p-10 backdrop-blur-md shadow-sm inline-block w-full">
            <span className="text-[10px] tracking-[0.6em] text-orange-glow font-bold uppercase block mb-4">— SYSTEM CORE 01</span>
            <h2 className="text-sculpted font-display mt-2 text-4xl md:text-5xl lg:text-7xl text-brown-deep leading-[1.05] tracking-tight">
              Built For Real <span className="italic text-orange-glow drop-shadow-[0_2px_10px_rgba(245,130,13,0.1)]">Daily Protection.</span>
            </h2>
          </div>
        </div>

        <div ref={videoContainerRef} className="absolute inset-0 z-10 w-full h-full overflow-hidden bg-black" style={{ willChange: "transform, border-radius" }}>
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            preload="none"
            className="w-full h-full object-cover opacity-90"
          >
            {shouldLoadVideo && <source src="/soliva-logo-anim.mp4" type="video/mp4" />}
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-brown-deep/20 via-transparent to-brown-deep/40 pointer-events-none" />
        </div>

        <div className="absolute bottom-0 inset-x-0 z-30 border-t border-brown/10 bg-white/20 backdrop-blur-xl py-4 overflow-hidden shadow-[0_-10px_40px_rgba(58,42,34,0.05)]">
          <div className="marquee flex w-max gap-16 whitespace-nowrap">
            {loop.map((t, i) => (
              <span key={i} className="flex items-center gap-16 text-[9px] tracking-[0.4em] text-brown-deep/60 font-bold uppercase">
                {t}
                <span className="h-1.5 w-1.5 rounded-full bg-orange-glow/40 animate-premium-pulse" />
              </span>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
