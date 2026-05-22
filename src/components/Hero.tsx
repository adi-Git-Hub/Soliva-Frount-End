import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { SolivaLogo } from "./SolivaLogo";
import { ease } from "@/design-system";

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
            transition={{ duration: 2.5, ease: ease.luxe }}
            className="absolute inset-0 bg-top bg-no-repeat mix-blend-multiply opacity-80"
            style={{ scale: bgScale, backgroundImage: "url('/hero-image.jpg')", backgroundSize: "165% auto" }}
          />
          {/* Atmospheric overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-luxury-beige/40 via-transparent to-transparent pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-tr from-brown-deep/20 to-transparent pointer-events-none" />
          <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]" />
        </div>

        {/* Floating Navbar */}
        <nav className="absolute top-0 inset-x-0 z-20 flex items-center justify-between px-5 py-6 sm:px-10 sm:py-10 md:px-20 md:py-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="group cursor-pointer"
          >
            <SolivaLogo height={28} className="sm:hidden" />
            <SolivaLogo height={38} className="hidden sm:inline-flex" />
          </motion.div>
        </nav>

        {/* LEFT EDITORIAL RAIL — dossier metadata, vertical anchor.
            Only rendered when the viewport is wide enough to not collide with
            the centred H1 (which is ~830px wide at its 160px cap). */}
        <motion.aside
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.4, delay: 1.8 }}
          className="hidden min-[1440px]:flex absolute left-10 lg:left-16 top-1/2 -translate-y-1/2 z-20 flex-col gap-8 pointer-events-none bg-surface-panel border border-line-soft rounded-panel-sm p-8 backdrop-blur-medium shadow-sm"
        >
          <div className="flex items-center gap-3">
            <span className="block h-px w-8 bg-brown/30" />
            <span className="font-mono text-micro-xs tracking-luxe text-ink-muted uppercase font-bold">
              Dossier 26.01
            </span>
          </div>
          <div className="space-y-6 max-w-[180px]">
            <div className="space-y-1">
              <span className="block font-mono text-micro-xs tracking-luxe text-ink-muted uppercase">
                Edition
              </span>
              <span className="block font-display text-base text-brown-deep italic">
                Sunwrap 01
              </span>
            </div>
            <div className="space-y-1">
              <span className="block font-mono text-micro-xs tracking-luxe text-ink-muted uppercase">
                Origin
              </span>
              <span className="block font-mono text-micro-md tracking-cta text-ink-soft font-medium">
                Delhi · IN
              </span>
            </div>
            <div className="space-y-1">
              <span className="block font-mono text-micro-xs tracking-luxe text-ink-muted uppercase">
                Calibrated
              </span>
              <span className="block font-mono text-micro-md tracking-cta text-ink-soft font-medium">
                28.6°N · 77.2°E
              </span>
            </div>
            <div className="pt-2 flex items-center gap-2">
              <span className="block h-1.5 w-1.5 rounded-full bg-orange-glow animate-premium-pulse" />
              <span className="font-mono text-micro-xs tracking-luxe text-ink-muted uppercase font-bold">
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
          className="hidden min-[1440px]:flex absolute right-10 lg:right-16 top-1/2 -translate-y-1/2 z-20 flex-col gap-8 items-end pointer-events-none bg-surface-panel border border-line-soft rounded-panel-sm p-8 backdrop-blur-medium shadow-sm"
        >
          <div className="flex items-center gap-3">
            <span className="font-mono text-micro-xs tracking-luxe text-ink-muted uppercase font-bold">
              Environ · Live
            </span>
            <span className="block h-px w-8 bg-brown/30" />
          </div>
          <div className="space-y-6 text-right max-w-[200px]">
            <div className="space-y-1">
              <span className="block font-mono text-micro-xs tracking-luxe text-ink-muted uppercase">
                UV Index
              </span>
              <div className="flex items-baseline justify-end gap-2">
                <span className="font-display text-2xl text-brown-deep leading-none">09</span>
                <span className="font-mono text-micro-xs tracking-eyebrow text-orange-glow uppercase font-bold">
                  Extreme
                </span>
              </div>
            </div>
            <div className="space-y-1">
              <span className="block font-mono text-micro-xs tracking-luxe text-ink-muted uppercase">
                Particulate
              </span>
              <span className="block font-mono text-micro-md tracking-cta text-ink-soft font-medium">
                142 μg/m³ · PM2.5
              </span>
            </div>
            <div className="space-y-1">
              <span className="block font-mono text-micro-xs tracking-luxe text-ink-muted uppercase">
                Ambient
              </span>
              <span className="block font-mono text-micro-md tracking-cta text-ink-soft font-medium">
                41°C · 18% RH
              </span>
            </div>
            <div className="pt-2 flex justify-end items-center gap-2">
              <span className="font-mono text-micro-xs tracking-luxe text-ink-muted uppercase font-bold">
                Threshold
              </span>
              <span className="block h-px w-10 bg-gradient-to-r from-transparent via-orange-glow/40 to-orange-glow" />
            </div>
          </div>
        </motion.aside>

        {/* Central Cinematic Composition */}
        <motion.div
          style={{ y: contentY, opacity }}
          className="relative z-10 h-full flex flex-col items-center justify-center px-4 sm:px-6 text-center"
        >
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 2, delay: 0.3, ease: ease.luxe }}
            className="flex w-full flex-col items-center"
          >
            {/* Logo Mark — gentler float for a quieter cadence */}
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              className="mb-8 sm:mb-10"
            >
              <SolivaLogo height={56} className="sm:hidden" />
              <SolivaLogo height={80} className="hidden sm:inline-flex" />
            </motion.div>

            {/* Pre-title editorial marker — bare hairlines + label, no pill */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.4, delay: 0.6 }}
              className="mb-8 sm:mb-12 flex items-center gap-4 sm:gap-6"
            >
              <span className="block h-px w-10 sm:w-16 bg-brown/30" />
              <span className="font-mono text-micro-xs sm:text-micro-md tracking-luxe sm:tracking-editorial text-brown-deep uppercase font-bold">
                SS / 26 — Volume 01
              </span>
              <span className="block h-px w-10 sm:w-16 bg-brown/30" />
            </motion.div>

            {/* Brand Title with Cinematic Reveal — single confident tracking */}
            <div className="mb-10 sm:mb-14 w-full overflow-hidden">
              <motion.h1
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ duration: 1.8, delay: 0.8, ease: ease.luxe }}
                className="font-display tracking-eyebrow uppercase font-light leading-none text-brown-deep drop-shadow-xl text-display-hero"
              >
                SOLIVA
              </motion.h1>
            </div>

            {/* Sub-title editorial counterweight — muted-tier label row */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.4, delay: 1.4 }}
              className="mb-2 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 sm:gap-x-6 font-mono text-micro-xs sm:text-micro-xs tracking-eyebrow sm:tracking-luxe text-ink-muted uppercase font-bold"
            >
              <span>Sunwrap</span>
              <span className="block h-1.5 w-1.5 rounded-full bg-accent-soft" />
              <span>UPF 50+</span>
              <span className="block h-1.5 w-1.5 rounded-full bg-accent-soft" />
              <span>Engineered in India</span>
            </motion.div>

            {/* Subtitle / Coming Soon */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 2, delay: 1.6 }}
              className="space-y-8 sm:space-y-10"
            >
              <p className="font-mono text-micro-md sm:text-micro-lg font-black tracking-editorial sm:tracking-runway text-orange-glow uppercase">
                Coming Soon
              </p>

              {/* Mission Statement — brand voice (Cormorant italic, mixed case) */}
              <div className="mx-auto max-w-2xl border-t border-line-strong pt-8 sm:pt-10">
                <p className="font-display text-lg sm:text-xl md:text-2xl font-light tracking-soft text-brown-deep leading-snug italic drop-shadow-sm">
                  Redefining urban movement<br className="hidden md:block" /> through advanced
                  textile architecture.
                </p>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Bottom Details */}
        <div className="absolute bottom-6 inset-x-4 z-20 flex flex-col items-center gap-3 pointer-events-none sm:bottom-12 sm:inset-x-12 sm:flex-row sm:items-end sm:justify-between sm:gap-0 sm:px-4 md:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 2.2 }}
            className="hidden sm:flex flex-col gap-3"
          >
            <span className="font-mono text-micro-xs tracking-luxe sm:tracking-luxe text-ink-muted uppercase font-bold">
              SYSTEM ARCHIVE // 26.01
            </span>
            <div className="w-16 h-[2px] bg-brown/20" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 2.2 }}
            className="flex items-center gap-4 bg-surface-panel px-4 py-2 sm:gap-6 sm:px-6 rounded-full backdrop-blur-subtle border border-line-hairline"
          >
            <span className="font-mono text-micro-xs sm:text-micro-xs tracking-eyebrow sm:tracking-luxe text-brown-deep uppercase font-bold">
              SCROLL TO EXPLORE
            </span>
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
              className="w-[2px] h-5 sm:h-6 bg-gradient-to-b from-orange-glow to-transparent rounded-full"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
