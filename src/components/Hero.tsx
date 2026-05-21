import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { SolivaLogo } from "./SolivaLogo";

export function Hero({ isRevealed = false }: { isRevealed?: boolean }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Cinematic parallax transforms
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const opacity = useTransform(scrollYProgress, [0.7, 1], [1, 0]);

  return (
    <section
      ref={containerRef}
      className="relative h-screen w-full overflow-hidden bg-transparent"
    >
      {/* Sticky Wrapper for the Cinematic Scene */}
      <div className="sticky top-0 h-screen w-full overflow-hidden z-10">
        {/* Fullscreen Cinematic Visual */}
        <div className="absolute inset-0 z-0 bg-transparent">
          <motion.div
            initial={{ scale: 1.1, filter: "blur(20px)" }}
            animate={{ scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 2.5, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 bg-top bg-no-repeat mix-blend-multiply opacity-80"
            style={{ scale: bgScale, backgroundImage: "url('/hero-image.jpg')", backgroundSize: "165% auto" }}
          />
          {/* Atmospheric overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-luxury-beige/40 via-transparent to-transparent pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-tr from-brown-deep/20 to-transparent pointer-events-none" />
          <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]" />
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
        </nav>

        {/* LEFT EDITORIAL RAIL — dossier metadata, vertical anchor */}
        <motion.aside
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.4, delay: 1.8 }}
          className="hidden md:flex absolute left-10 lg:left-16 top-1/2 -translate-y-1/2 z-20 flex-col gap-8 pointer-events-none bg-white/10 border border-brown/10 rounded-[2rem] p-8 backdrop-blur-md shadow-sm"
        >
          <div className="flex items-center gap-3">
            <span className="block h-px w-8 bg-brown/30" />
            <span className="font-mono text-[8px] tracking-[0.45em] text-brown/60 uppercase font-bold">
              Dossier 26.01
            </span>
          </div>
          <div className="space-y-6 max-w-[180px]">
            <div className="space-y-1">
              <span className="block font-mono text-[7px] tracking-[0.5em] text-brown/50 uppercase">
                Edition
              </span>
              <span className="block font-display text-base text-brown-deep italic">
                Sunwrap 01
              </span>
            </div>
            <div className="space-y-1">
              <span className="block font-mono text-[7px] tracking-[0.5em] text-brown/50 uppercase">
                Origin
              </span>
              <span className="block font-mono text-[10px] tracking-[0.2em] text-brown/80 font-medium">
                Delhi · IN
              </span>
            </div>
            <div className="space-y-1">
              <span className="block font-mono text-[7px] tracking-[0.5em] text-brown/50 uppercase">
                Calibrated
              </span>
              <span className="block font-mono text-[10px] tracking-[0.2em] text-brown/80 font-medium">
                28.6°N · 77.2°E
              </span>
            </div>
            <div className="pt-2 flex items-center gap-2">
              <span className="block h-1.5 w-1.5 rounded-full bg-orange-glow animate-premium-pulse" />
              <span className="font-mono text-[8px] tracking-[0.4em] text-brown/60 uppercase font-bold">
                In Atelier
              </span>
            </div>
          </div>
        </motion.aside>

        {/* RIGHT EDITORIAL RAIL — live environmental readout */}
        <motion.aside
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.4, delay: 2 }}
          className="hidden md:flex absolute right-10 lg:right-16 top-1/2 -translate-y-1/2 z-20 flex-col gap-8 items-end pointer-events-none bg-white/10 border border-brown/10 rounded-[2rem] p-8 backdrop-blur-md shadow-sm"
        >
          <div className="flex items-center gap-3">
            <span className="font-mono text-[8px] tracking-[0.45em] text-brown/60 uppercase font-bold">
              Environ · Live
            </span>
            <span className="block h-px w-8 bg-brown/30" />
          </div>
          <div className="space-y-6 text-right max-w-[200px]">
            <div className="space-y-1">
              <span className="block font-mono text-[7px] tracking-[0.5em] text-brown/50 uppercase">
                UV Index
              </span>
              <div className="flex items-baseline justify-end gap-2">
                <span className="font-display text-2xl text-brown-deep leading-none">09</span>
                <span className="font-mono text-[8px] tracking-[0.3em] text-orange-glow uppercase font-bold">
                  Extreme
                </span>
              </div>
            </div>
            <div className="space-y-1">
              <span className="block font-mono text-[7px] tracking-[0.5em] text-brown/50 uppercase">
                Particulate
              </span>
              <span className="block font-mono text-[10px] tracking-[0.2em] text-brown/80 font-medium">
                142 μg/m³ · PM2.5
              </span>
            </div>
            <div className="space-y-1">
              <span className="block font-mono text-[7px] tracking-[0.5em] text-brown/50 uppercase">
                Ambient
              </span>
              <span className="block font-mono text-[10px] tracking-[0.2em] text-brown/80 font-medium">
                41°C · 18% RH
              </span>
            </div>
            <div className="pt-2 flex justify-end items-center gap-2">
              <span className="font-mono text-[8px] tracking-[0.4em] text-brown/60 uppercase font-bold">
                Threshold
              </span>
              <span className="block h-px w-10 bg-gradient-to-r from-transparent via-orange-glow/40 to-orange-glow" />
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
              className="mb-8"
            >
              <SolivaLogo height={80} />
            </motion.div>

            {/* Pre-title editorial marker */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.4, delay: 0.6 }}
              className="mb-8 flex items-center gap-4 bg-white/20 px-6 py-2 rounded-full backdrop-blur-md border border-brown/10"
            >
              <span className="block h-px w-6 bg-brown/30" />
              <span className="font-mono text-[8px] tracking-[0.6em] text-brown-deep uppercase font-bold">
                SS / 26 — Volume 01
              </span>
              <span className="block h-px w-6 bg-brown/30" />
            </motion.div>

            {/* Brand Title with Cinematic Reveal */}
            <div className="mb-10 overflow-hidden">
              <motion.h1
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ duration: 1.8, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="font-display text-5xl sm:text-7xl md:text-9xl lg:text-[10rem] tracking-[0.3em] uppercase font-light leading-none text-brown-deep drop-shadow-xl"
              >
                SOLIVA
              </motion.h1>
            </div>

            {/* Sub-title editorial counterweight */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.4, delay: 1.4 }}
              className="mb-2 flex items-center justify-center gap-6 font-mono text-[8px] tracking-[0.5em] text-brown/70 uppercase font-bold"
            >
              <span>Sunwrap</span>
              <span className="block h-1.5 w-1.5 rounded-full bg-orange-glow/60" />
              <span>UPF 50+</span>
              <span className="block h-1.5 w-1.5 rounded-full bg-orange-glow/60" />
              <span>Engineered in India</span>
            </motion.div>

            {/* Subtitle / Coming Soon */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 2, delay: 1.6 }}
              className="space-y-10"
            >
              <p className="font-body text-[10px] md:text-[11px] font-bold tracking-[1.4em] text-orange-glow uppercase italic">
                Coming Soon
              </p>

              {/* Mission Statement */}
              <div className="max-w-2xl mx-auto border-t border-brown/20 pt-10">
                <p className="font-body text-[11px] md:text-sm font-light tracking-[0.25em] text-brown-deep leading-relaxed uppercase italic drop-shadow-sm">
                  Redefining urban movement <br className="hidden md:block" /> through advanced
                  textile architecture.
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
            <span className="font-mono text-[8px] tracking-[0.5em] text-brown/60 uppercase font-bold">
              SYSTEM ARCHIVE // 26.01
            </span>
            <div className="w-16 h-[2px] bg-brown/20" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 2.2 }}
            className="flex items-center gap-6 bg-white/10 px-6 py-2 rounded-full backdrop-blur-sm border border-brown/5"
          >
            <span className="font-mono text-[8px] tracking-[0.5em] text-brown-deep uppercase font-bold">
              SCROLL TO EXPLORE
            </span>
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
              className="w-[2px] h-6 bg-gradient-to-b from-orange-glow to-transparent rounded-full"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
