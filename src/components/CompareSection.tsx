import { motion, useScroll, useTransform, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";

const oldWay = [
  "Slips during rides",
  "Constant repositioning",
  "Traps heat & sweat",
  "Leaves neck exposed",
  "Gaps around ears & nose",
  "Tangled hair & smudged makeup",
];

const newWay = [
  "Full face & neck coverage",
  "Dual-layer breathable airflow",
  "Stays secure while moving",
  "Lightweight all-day comfort",
  "Designed for real-world commuting",
  "No exposed gaps",
];

const marqueeItems = [
  "UPF 50+ Protection",
  "Breathable Airflow",
  "360° Coverage",
  "Designed For Indian Conditions",
  "Daily Wear Comfort",
  "No Constant Adjustments",
];

export function CompareSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Mouse tracking for premium glow on LEFT card
  const leftMouseX = useMotionValue(0);
  const leftMouseY = useMotionValue(0);
  const leftSpringX = useSpring(leftMouseX, { stiffness: 100, damping: 30 });
  const leftSpringY = useSpring(leftMouseY, { stiffness: 100, damping: 30 });

  // Mouse tracking for premium glow on RIGHT card
  const rightMouseX = useMotionValue(0);
  const rightMouseY = useMotionValue(0);
  const rightSpringX = useSpring(rightMouseX, { stiffness: 100, damping: 30 });
  const rightSpringY = useSpring(rightMouseY, { stiffness: 100, damping: 30 });

  function handleLeftMouseMove(e: React.MouseEvent) {
    const rect = e.currentTarget.getBoundingClientRect();
    leftMouseX.set(e.clientX - rect.left);
    leftMouseY.set(e.clientY - rect.top);
  }

  function handleRightMouseMove(e: React.MouseEvent) {
    const rect = e.currentTarget.getBoundingClientRect();
    rightMouseX.set(e.clientX - rect.left);
    rightMouseY.set(e.clientY - rect.top);
  }

  return (
    <section 
      ref={containerRef}
      className="relative w-full overflow-hidden bg-luxury-beige py-24 md:py-32 z-20"
    >
      {/* PREMIUM ATMOSPHERIC TRANSITION ZONE */}
      <div className="absolute top-0 inset-x-0 h-64 pointer-events-none z-30">
        <div className="absolute inset-0 bg-gradient-to-b from-white/60 via-luxury-beige/40 to-transparent backdrop-blur-[1px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(245,130,13,0.1),transparent_70%)]" />
      </div>

      {/* LUXURY EDITORIAL BACKGROUND SYSTEM */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div 
          animate={{ 
            x: [-20, 20, -20],
            y: [-10, 10, -10],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute top-0 left-[-10%] w-[120%] h-[120%] bg-[radial-gradient(circle_at_20%_30%,rgba(245,130,13,0.04),transparent_50%),radial-gradient(circle_at_80%_20%,rgba(252,231,243,0.5),transparent_60%)] opacity-80" 
        />
        <motion.div 
          animate={{ 
            x: [20, -20, 20],
            y: [10, -10, 10],
          }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-[-10%] right-[-10%] w-[120%] h-[120%] bg-[radial-gradient(circle_at_70%_80%,rgba(243,236,226,1),transparent_50%),radial-gradient(circle_at_30%_90%,rgba(245,130,13,0.06),transparent_40%)] opacity-70" 
        />
        <div className="absolute inset-0 opacity-[0.02] mix-blend-overlay pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]" />
      </div>

      <div className="relative mx-auto max-w-[90rem] px-4 md:px-8 z-10">
        {/* PREMIUM EDITORIAL PANEL SHELL (CHAMPAGNE LAYER) */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          className="relative bg-white/10 border border-brown/10 rounded-[4rem] p-12 md:px-20 md:py-24 backdrop-blur-md shadow-[0_40px_100px_-40px_rgba(58,42,34,0.1),inset_0_0_80px_rgba(243,236,226,0.3)] overflow-hidden"
        >
          {/* Ambient Inset Lighting for Shell */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_0%_0%,rgba(245,130,13,0.02),transparent_40%),radial-gradient(circle_at_100%_100%,rgba(252,231,243,0.15),transparent_50%)] pointer-events-none" />

          {/* Header Section */}
          <div className="flex flex-col items-center text-center mb-24 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-4 mb-8"
            >
              <div className="h-px w-8 bg-brown/20" />
              <span className="text-[10px] tracking-[0.8em] text-orange-glow uppercase font-black">
                THE COMPARISON
              </span>
              <div className="h-px w-8 bg-brown/20" />
            </motion.div>
            
            <motion.h2 
              initial={{ opacity: 0, y: 30, filter: "blur(12px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
              className="font-display text-4xl md:text-7xl text-brown-deep leading-[1.05] mb-10 tracking-tighter"
            >
              Still using a dupatta or<br />
              <span className="relative inline-block">
                <span className="italic font-serif text-brown-deep">
                  regular scarf?
                </span>
              </span>
            </motion.h2>

            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, duration: 1.2 }}
              className="max-w-2xl text-brown/60 text-sm md:text-xl font-light italic leading-relaxed"
            >
              It feels like protection. <br className="hidden md:block" />
              But it was never engineered for daily exposure.
            </motion.p>
          </div>

          {/* Comparison Experience Container */}
          <div className="relative flex flex-col md:flex-row items-stretch gap-8 perspective-2000 z-10">
            
            {/* Left Panel: The Old Way (MATTE WARM GREY-BEIGE) */}
            <motion.div
              initial={{ opacity: 0, x: -30, scale: 0.96 }}
              whileInView={{ opacity: 1, x: 0, scale: 0.98 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 1.4, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              onMouseMove={handleLeftMouseMove}
              whileHover={{ scale: 1.02, y: -4 }}
              className="flex-1 relative bg-[#EBE5DE]/80 border border-brown/20 rounded-[3rem] p-10 md:p-12 backdrop-blur-xl transition-all duration-1000 group/old shadow-[0_20px_40px_-15px_rgba(58,42,34,0.08),inset_0_0_40px_rgba(255,255,255,0.2)] overflow-hidden"
            >
              {/* Subtle Texture & Lighting */}
              <div className="absolute inset-0 opacity-[0.04] bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] rounded-[3rem] pointer-events-none" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.4),transparent)] opacity-50 pointer-events-none" />

              {/* Interaction Glow */}
              <motion.div
                style={{
                  left: leftSpringX,
                  top: leftSpringY,
                }}
                className="absolute -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-brown/5 rounded-full blur-[80px] pointer-events-none z-0"
              />

              <div className="relative z-10">
                <header className="mb-10">
                  <span className="text-[9px] tracking-[0.5em] text-brown/60 uppercase font-mono font-bold mb-4 block">
                    01 // CONVENTIONAL
                  </span>
                  <h3 className="font-display text-3xl md:text-4xl text-brown-deep/70 mb-4 tracking-tight group-hover/old:text-brown-deep/90 transition-colors duration-700">
                    Borrowed <br />protection.
                  </h3>
                  <p className="text-brown/70 text-xs md:text-sm font-light leading-relaxed max-w-[240px] italic">
                    Makeshift solutions were never designed for real environmental exposure.
                  </p>
                </header>

                {/* Readable Stats Grid (Champagne Tint) */}
                <div className="grid grid-cols-3 gap-6 py-8 border-y border-brown/15 mb-10 bg-[#F3ECE2]/40 rounded-xl px-4 shadow-[inset_0_1px_1px_rgba(255,255,255,0.5)] transition-all duration-700 group-hover/old:bg-[#F3ECE2]/60">
                  <div className="space-y-2">
                    <span className="block text-[8px] text-brown/60 uppercase font-mono tracking-widest font-bold">UPF</span>
                    <span className="text-xl md:text-2xl text-brown/70 font-mono tracking-tighter italic block group-hover/old:text-brown-deep transition-colors">≤ 15</span>
                  </div>
                  <div className="space-y-2 border-x border-brown/15 px-4 md:px-6">
                    <span className="block text-[8px] text-brown/60 uppercase font-mono tracking-widest font-bold">Adj / Hr</span>
                    <span className="text-xl md:text-2xl text-brown/70 font-mono tracking-tighter italic block group-hover/old:text-brown-deep transition-colors">18×</span>
                  </div>
                  <div className="space-y-2">
                    <span className="block text-[8px] text-brown/60 uppercase font-mono tracking-widest font-bold">Cover</span>
                    <span className="text-xl md:text-2xl text-brown/70 font-mono tracking-tighter italic block group-hover/old:text-brown-deep transition-colors">Partial</span>
                  </div>
                </div>

                {/* Problems List */}
                <ul className="space-y-5 mb-10">
                  {oldWay.map((item, i) => (
                    <motion.li 
                      key={item}
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2 + 0.1 * i }}
                      className="flex items-start gap-4 text-brown/70 text-[13px] md:text-[14px] font-medium group/item"
                    >
                      <span className="mt-[10px] h-[1px] w-4 bg-brown/30 group-hover/item:w-6 transition-all duration-500" />
                      <span className="group-hover/item:text-brown-deep transition-colors">{item}</span>
                    </motion.li>
                  ))}
                </ul>

                <div className="pt-8 border-t border-brown/15">
                  <p className="font-display text-xl text-brown/50 leading-tight">
                    Looks covered. <br />
                    <span className="text-brown/70 italic">Still exposed.</span>
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Right Panel: SOLIVA AIRSHIELD™ (PREMIUM IVORY & BRONZE) */}
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 1.01 }}
              whileInView={{ opacity: 1, y: 0, scale: 1.02 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
              onMouseMove={handleRightMouseMove}
              whileHover={{ scale: 1.04, y: -8 }}
              className="flex-[1.1] relative bg-[#FDFBF7]/95 border-2 border-orange-glow/30 rounded-[3rem] p-10 md:p-14 backdrop-blur-2xl shadow-[0_40px_80px_-20px_rgba(58,42,34,0.2),inset_0_0_60px_rgba(245,130,13,0.05)] group/card overflow-hidden transition-all duration-700"
            >
              {/* Internal Depth Layers */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-orange-glow/5 pointer-events-none" />
              <div className="absolute inset-0 opacity-[0.02] bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] pointer-events-none" />
              
              {/* Mouse Tracking Interaction Glow */}
              <motion.div
                style={{
                  left: rightSpringX,
                  top: rightSpringY,
                }}
                className="absolute -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-orange-glow/20 rounded-full blur-[100px] pointer-events-none z-0"
              />
              
              <div className="absolute top-0 right-0 w-64 h-64 bg-orange-glow/10 blur-[80px] -mr-32 -mt-32 rounded-full" />

              <div className="relative z-10">
                <header className="mb-12">
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-[10px] tracking-[0.6em] text-orange-glow uppercase font-black">
                      02 // SOLIVA AIRSHIELD™
                    </span>
                    <motion.div 
                      animate={{ scale: [1, 1.4, 1], opacity: [0.4, 1, 0.4] }}
                      transition={{ duration: 4, repeat: Infinity }}
                      className="h-2.5 w-2.5 rounded-full bg-orange-glow shadow-[0_0_15px_rgba(245,130,13,1)]" 
                    />
                  </div>
                  <h3 className="font-display text-4xl md:text-6xl text-brown-deep mb-6 tracking-tight leading-none">
                    Engineered <br />protection.
                  </h3>
                  <p className="text-brown-deep/80 text-sm md:text-lg font-medium leading-relaxed max-w-[320px]">
                    Purpose-built for Indian heat, pollution, movement, and long daily wear.
                  </p>
                </header>

                {/* HIGH-CONTRAST STATS (CHAMPAGNE FRAME) */}
                <div className="grid grid-cols-3 gap-6 py-10 border-y border-orange-glow/20 mb-12 bg-white/95 rounded-2xl px-6 shadow-[0_15px_40px_-10px_rgba(58,42,34,0.1),inset_0_1px_0_rgba(255,255,255,0.9)] group-hover/card:bg-white transition-all duration-700">
                  <div className="space-y-2">
                    <span className="block text-[9px] text-orange-glow uppercase font-mono tracking-widest font-black">UPF</span>
                    <span className="text-4xl md:text-5xl text-brown-deep font-mono font-black tracking-tighter group-hover/card:scale-110 origin-left transition-transform duration-500 block">50+</span>
                  </div>
                  <div className="space-y-2 border-x border-orange-glow/20 px-4 md:px-6">
                    <span className="block text-[9px] text-orange-glow uppercase font-mono tracking-widest font-black">Adj / Hr</span>
                    <span className="text-4xl md:text-5xl text-brown-deep font-mono font-black tracking-tighter group-hover/card:scale-110 transition-transform duration-500 block">0×</span>
                  </div>
                  <div className="space-y-2">
                    <span className="block text-[9px] text-orange-glow uppercase font-mono tracking-widest font-black">Cover</span>
                    <span className="text-4xl md:text-5xl text-brown-deep font-mono font-black tracking-tighter group-hover/card:scale-110 origin-right transition-transform duration-500 block">360°</span>
                  </div>
                </div>

                {/* Premium Benefits List */}
                <ul className="space-y-6 mb-12">
                  {newWay.map((item, i) => (
                    <motion.li 
                      key={item}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 + 0.1 * i, duration: 0.8, ease: "easeOut" }}
                      className="flex items-start gap-6 text-brown-deep text-[14px] md:text-[17px] font-bold group/item"
                    >
                      <div className="mt-2.5 h-1.5 w-5 bg-orange-glow rounded-full shadow-[0_0_15px_rgba(245,130,13,0.5)] group-hover/item:w-10 transition-all duration-700" />
                      <span className="group-hover/item:text-orange-glow transition-colors duration-500">{item}</span>
                    </motion.li>
                  ))}
                </ul>

                <div className="pt-10 border-t border-orange-glow/30">
                  <p className="font-display text-3xl text-brown-deep leading-tight font-bold">
                    Designed once. <br />
                    <span className="text-orange-glow font-black italic">Worn effortlessly.</span>
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Strong Bottom Statement */}
          <div className="mt-24 text-center space-y-6 relative z-10">
            <motion.h4 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2 }}
              className="font-display text-3xl md:text-5xl text-brown-deep tracking-tighter font-bold"
            >
              Protection shouldn’t depend on <span className="italic font-serif text-orange-glow underline underline-offset-[12px] decoration-orange-glow/30 decoration-2">adjustment.</span>
            </motion.h4>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, duration: 1.2 }}
              className="text-brown/50 text-[10px] tracking-[0.5em] uppercase font-black"
            >
              Designed for real life. Not temporary fixes.
            </motion.p>
          </div>
        </motion.div>
      </div>

      {/* LUXURY INFINITE MARQUEE */}
      <div className="mt-32 border-y border-brown/10 bg-white/20 backdrop-blur-sm py-12 overflow-hidden relative [mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]">
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-luxury-beige to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-luxury-beige to-transparent z-10 pointer-events-none" />
        
        <div className="flex whitespace-nowrap">
          <motion.div 
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
            className="flex gap-24 items-center pr-24"
          >
            {[...marqueeItems, ...marqueeItems].map((item, i) => (
              <div key={`${item}-${i}`} className="flex items-center gap-24">
                <span className="text-[10px] md:text-xs tracking-[0.7em] text-brown-deep/40 uppercase font-black hover:text-orange-glow transition-colors duration-700 cursor-default">
                  {item}
                </span>
                <span className="text-orange-glow/20 text-xl font-serif">✦</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .perspective-2000 {
          perspective: 2000px;
        }
      `}} />
    </section>
  );
}
