import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { SolivaLogo } from "./SolivaLogo";

export function Hero({ isRevealed = false }: { isRevealed?: boolean }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Cinematic parallax transforms
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const opacity = useTransform(scrollYProgress, [0.7, 1], [1, 0]);

  return (
    <section ref={containerRef} className="relative h-[120vh] w-full overflow-hidden bg-transparent">
      {/* Sticky Wrapper for the Cinematic Scene */}
      <div className="sticky top-0 h-screen w-full overflow-hidden z-10">
        
        {/* Fullscreen Cinematic Visual */}
        <div className="absolute inset-0 z-0">
          <motion.div
            initial={{ scale: 1.1, filter: "blur(20px)" }}
            animate={{ scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 2.5, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 bg-cover bg-center"
            style={{ scale: bgScale, backgroundImage: "url('/hero-image.jpg')" }}
          />
          {/* Atmospheric overlay — single layer instead of three to cut compositing cost */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-transparent pointer-events-none" />
        </div>

        {/* Floating Navbar */}
        <nav className="absolute top-0 inset-x-0 z-20 flex items-center justify-between px-10 py-12 md:px-20">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="group cursor-pointer"
          >
            <SolivaLogo height={38} />
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.7 }}
            className="hidden gap-16 text-[9px] tracking-[0.5em] text-[#3A2A1F]/50 md:flex font-light uppercase"
          >
            {["Experience", "Technology", "Journal"].map((item) => (
              <span key={item} className="hover:text-[#3A2A1F] transition-colors duration-500 cursor-pointer">
                {item}
              </span>
            ))}
          </motion.div>
          <motion.button 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="rounded-full border border-[#3A2A1F]/10 px-8 py-2.5 text-[9px] tracking-[0.4em] text-[#3A2A1F]/60 hover:bg-[#3A2A1F] hover:text-white transition-all duration-700 uppercase font-medium"
          >
            Notify Me
          </motion.button>
        </nav>

        {/* LEFT EDITORIAL RAIL — dossier metadata, vertical anchor */}
        <motion.aside
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.4, delay: 1.8 }}
          className="hidden md:flex absolute left-10 lg:left-16 top-1/2 -translate-y-1/2 z-20 flex-col gap-10 pointer-events-none"
        >
          <div className="flex items-center gap-3">
            <span className="block h-px w-8 bg-[#3A2A1F]/25" />
            <span className="font-mono text-[8px] tracking-[0.45em] text-[#3A2A1F]/45 uppercase">Dossier 26.01</span>
          </div>
          <div className="space-y-6 max-w-[180px]">
            <div className="space-y-1">
              <span className="block font-mono text-[7px] tracking-[0.5em] text-[#3A2A1F]/30 uppercase">Edition</span>
              <span className="block font-display text-base text-[#3A2A1F]/70 italic">Sunwrap 01</span>
            </div>
            <div className="space-y-1">
              <span className="block font-mono text-[7px] tracking-[0.5em] text-[#3A2A1F]/30 uppercase">Origin</span>
              <span className="block font-mono text-[10px] tracking-[0.2em] text-[#3A2A1F]/55">Delhi · IN</span>
            </div>
            <div className="space-y-1">
              <span className="block font-mono text-[7px] tracking-[0.5em] text-[#3A2A1F]/30 uppercase">Calibrated</span>
              <span className="block font-mono text-[10px] tracking-[0.2em] text-[#3A2A1F]/55">28.6°N · 77.2°E</span>
            </div>
            <div className="pt-2 flex items-center gap-2">
              <span className="block h-1.5 w-1.5 rounded-full bg-[#F5820D] animate-premium-pulse" />
              <span className="font-mono text-[8px] tracking-[0.4em] text-[#3A2A1F]/45 uppercase">In Atelier</span>
            </div>
          </div>
        </motion.aside>

        {/* RIGHT EDITORIAL RAIL — live environmental readout */}
        <motion.aside
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.4, delay: 2 }}
          className="hidden md:flex absolute right-10 lg:right-16 top-1/2 -translate-y-1/2 z-20 flex-col gap-10 items-end pointer-events-none"
        >
          <div className="flex items-center gap-3">
            <span className="font-mono text-[8px] tracking-[0.45em] text-[#3A2A1F]/45 uppercase">Environ · Live</span>
            <span className="block h-px w-8 bg-[#3A2A1F]/25" />
          </div>
          <div className="space-y-6 text-right max-w-[200px]">
            <div className="space-y-1">
              <span className="block font-mono text-[7px] tracking-[0.5em] text-[#3A2A1F]/30 uppercase">UV Index</span>
              <div className="flex items-baseline justify-end gap-2">
                <span className="font-display text-2xl text-[#3A2A1F]/75 leading-none">09</span>
                <span className="font-mono text-[8px] tracking-[0.3em] text-[#F5820D]/80 uppercase">Extreme</span>
              </div>
            </div>
            <div className="space-y-1">
              <span className="block font-mono text-[7px] tracking-[0.5em] text-[#3A2A1F]/30 uppercase">Particulate</span>
              <span className="block font-mono text-[10px] tracking-[0.2em] text-[#3A2A1F]/55">142 μg/m³ · PM2.5</span>
            </div>
            <div className="space-y-1">
              <span className="block font-mono text-[7px] tracking-[0.5em] text-[#3A2A1F]/30 uppercase">Ambient</span>
              <span className="block font-mono text-[10px] tracking-[0.2em] text-[#3A2A1F]/55">41°C · 18% RH</span>
            </div>
            <div className="pt-2 flex justify-end items-center gap-2">
              <span className="font-mono text-[8px] tracking-[0.4em] text-[#3A2A1F]/45 uppercase">Threshold</span>
              <span className="block h-px w-10 bg-gradient-to-r from-transparent via-[#F5820D]/40 to-[#F5820D]/80" />
            </div>
          </div>
        </motion.aside>

        {/* Central Cinematic Composition */}
        <motion.div
          style={{ y: contentY, opacity }}
          className="relative z-10 h-full flex flex-col items-center justify-center px-6 text-center"
        >
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center"
          >
            {/* Logo Mark */}
            <motion.div 
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              className="mb-16"
            >
              <SolivaLogo height={80} />
            </motion.div>

            {/* Pre-title editorial marker */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.4, delay: 0.6 }}
              className="mb-8 flex items-center gap-4"
            >
              <span className="block h-px w-10 bg-[#3A2A1F]/20" />
              <span className="font-mono text-[8px] tracking-[0.6em] text-[#3A2A1F]/40 uppercase">SS / 26 — Volume 01</span>
              <span className="block h-px w-10 bg-[#3A2A1F]/20" />
            </motion.div>

            {/* Brand Title with Cinematic Reveal */}
            <div className="mb-10 overflow-hidden">
              <motion.h1
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ duration: 1.8, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="font-display text-5xl sm:text-7xl md:text-9xl lg:text-[10rem] tracking-[0.3em] uppercase font-light leading-none text-[#3A2A1F]"
              >
                SOLIVA
              </motion.h1>
            </div>

            {/* Sub-title editorial counterweight */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.4, delay: 1.4 }}
              className="mb-2 flex items-center justify-center gap-6 font-mono text-[8px] tracking-[0.5em] text-[#3A2A1F]/35 uppercase"
            >
              <span>Sunwrap</span>
              <span className="block h-1 w-1 rounded-full bg-[#F5820D]/50" />
              <span>UPF 50+</span>
              <span className="block h-1 w-1 rounded-full bg-[#F5820D]/50" />
              <span>Engineered in India</span>
            </motion.div>

            {/* Subtitle / Coming Soon */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 2, delay: 1.6 }}
              className="space-y-16"
            >
              <p className="font-body text-[10px] md:text-[11px] font-light tracking-[1.4em] text-[#3A2A1F]/40 uppercase italic">
                Coming Soon
              </p>

              {/* Mission Statement */}
              <div className="max-w-2xl mx-auto border-t border-[#3A2A1F]/5 pt-16">
                <p className="font-body text-[11px] md:text-sm font-light tracking-[0.25em] text-[#3A2A1F]/60 leading-relaxed uppercase italic">
                  Redefining urban movement <br className="hidden md:block" /> through advanced textile architecture.
                </p>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Bottom Details */}
        <div className="absolute bottom-12 inset-x-12 z-20 flex justify-between items-end pointer-events-none px-4 md:px-8">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 2.2 }}
            className="flex flex-col gap-3"
          >
            <span className="font-mono text-[8px] tracking-[0.5em] text-[#3A2A1F]/30 uppercase">SYSTEM ARCHIVE // 26.01</span>
            <div className="w-16 h-px bg-[#3A2A1F]/20" />
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 2.2 }}
            className="flex items-center gap-6"
          >
            <span className="font-mono text-[8px] tracking-[0.5em] text-[#3A2A1F]/30 uppercase">SCROLL TO EXPLORE</span>
            <motion.div 
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
              className="w-px h-10 bg-gradient-to-b from-[#3A2A1F]/30 to-transparent" 
            />
          </motion.div>
        </div>
      </div>

    </section>
  );
}
