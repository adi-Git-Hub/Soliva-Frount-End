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
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "+=200%", 
            scrub: 1.5,
            pin: true,
            pinSpacing: false, // Switching to manual spacer for better background control
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        // Scaling logic remains untouched
        tl.fromTo(videoContainerRef.current,
          { scale: 0.65, borderRadius: "4rem", border: "2px solid rgba(245,130,13,0.3)", boxShadow: "0 40px 100px rgba(58,42,34,0.15)" },
          { scale: 1, borderRadius: "0rem", border: "0px solid rgba(245,130,13,0)", boxShadow: "0 0 0 rgba(0,0,0,0)", duration: 1, ease: "power2.inOut" }
        );

        if (textContentRef.current) {
          // Move text up more aggressively and fade sooner
          tl.to(textContentRef.current, { 
            autoAlpha: 0, 
            y: -150, 
            scale: 0.9, 
            filter: "blur(10px)",
            duration: 0.7, 
            ease: "power2.inOut" 
          }, 0);
        }

        tl.to({}, { duration: 0.5 }); 
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <section ref={sectionRef} className="relative w-full h-screen overflow-hidden bg-transparent z-0">
        <div 
          ref={textContentRef} 
          className="absolute top-16 md:top-20 left-1/2 -translate-x-1/2 z-20 text-center w-full max-w-3xl px-6 pointer-events-none"
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
      
      {/* Manual Spacer for VideoSection — transparent so the global luxury
          image continues unbroken behind the pinned scroll area. */}
      <div className="h-[200vh] w-full pointer-events-none bg-transparent" />
    </>
  );
}
