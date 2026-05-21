import { useState } from "react";
import { motion } from "framer-motion";
import { Particles } from "./Particles";
import { SolivaLogo } from "./SolivaLogo";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

export function FinalCTA() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const containerRef = useScrollReveal();

  return (
    <section
      ref={containerRef}
      className="relative w-full overflow-hidden bg-cinematic-veil grain py-16 md:py-20 perspective-2000"
    >
      <Particles count={24} />
      
      {/* Cinematic Background Atmosphere */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,rgba(245,130,13,0.12),transparent_75%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(42,30,23,0.4)_100%)] opacity-60" />
      </div>

      <div className="relative mx-auto max-w-5xl px-6 text-center">
        {/* Main Panel */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 bg-black/15 rounded-[3rem] p-10 md:p-16 border border-luxury-beige/10 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.4)]"
        >
          <div className="reveal-on-scroll mx-auto inline-flex text-cream/90">
            <SolivaLogo size={110} />
          </div>

          <h2
            className="reveal-on-scroll font-display mt-8 text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-[0.05em] text-cream leading-[1.05] will-change-transform"
            style={{
              transitionDelay: "200ms",
              textShadow:
                "0.5px 0.5px 0 #a55300, 1px 1px 0 #864300, 2px 2px 5px rgba(245,130,13,0.3), 0 0 40px rgba(245,130,13,0.15)",
            }}
          >
            PREMIERE
            <br />
            <span className="italic font-serif">SOON</span>
          </h2>

          <p
            className="reveal-on-scroll font-display mt-6 text-lg md:text-xl italic text-cream/70 tracking-wide"
            style={{ transitionDelay: "400ms" }}
          >
            Engineering protection. Designed in India.
          </p>

          {!submitted ? (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (email) setSubmitted(true);
              }}
              className="reveal-on-scroll mx-auto mt-12 flex max-w-md flex-col gap-4 sm:flex-row items-stretch"
              style={{ transitionDelay: "600ms" }}
            >
              <div className="flex-1 relative group">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="w-full rounded-full border border-cream/20 bg-white/[0.03] px-8 py-4 text-sm text-cream placeholder:text-cream/30 outline-none focus:border-brown transition-all backdrop-blur-md shadow-inner"
                />
              </div>
              <button
                type="submit"
                className="group relative overflow-hidden rounded-full bg-gradient-to-br from-brown via-orange-glow to-brown-deep px-10 py-4 text-[9px] tracking-[0.3em] text-white transition-all duration-700 hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(245,130,13,0.3)] light-sweep uppercase font-bold"
              >
                <span className="relative z-10">SECURE ACCESS</span>
              </button>
            </form>
          ) : (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="reveal-on-scroll mx-auto mt-12 max-w-md rounded-full border border-orange-glow/20 bg-orange-glow/5 px-8 py-4 text-sm tracking-[0.1em] text-cream/90 backdrop-blur-sm"
            >
              You're on the list. Welcome to SOLIVA.
            </motion.div>
          )}
        </motion.div>

        {/* Release dossier — editorial micro-anchor */}
        <div
          className="reveal-on-scroll mx-auto mt-12 grid w-full max-w-3xl grid-cols-2 md:grid-cols-4 gap-y-6 gap-x-8 border-t border-cream/5 pt-10 text-left"
          style={{ transitionDelay: "700ms" }}
        >
          {[
            { k: "Edition", v: "Sunwrap 01" },
            { k: "Serial", v: "SLV / 26.001" },
            { k: "Release", v: "Spring · 2026" },
            { k: "Atelier", v: "Delhi · IN" },
          ].map((item) => (
            <div key={item.k} className="space-y-1">
              <span className="block font-mono text-[7px] tracking-[0.6em] text-cream/25 uppercase">
                {item.k}
              </span>
              <span className="block font-display text-sm text-cream/70 italic">{item.v}</span>
            </div>
          ))}
        </div>

        {/* Footer Meta */}
        <div
          className="reveal-on-scroll mt-14 flex flex-col items-center gap-10"
          style={{ transitionDelay: "800ms" }}
        >
          <div className="flex gap-10 text-[8px] tracking-[0.4em] font-light items-center uppercase text-cream/40">
            <span className="hover:text-cream transition-colors cursor-pointer">INSTAGRAM</span>
            <span className="opacity-20 text-xs">✦</span>
            <span className="hover:text-cream transition-colors cursor-pointer">JOURNAL</span>
            <span className="opacity-20 text-xs">✦</span>
            <span className="hover:text-cream transition-colors cursor-pointer">PRESS</span>
          </div>
          <div className="flex flex-col items-center gap-4">
            <motion.div 
              animate={{ opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="opacity-40"
            >
              <SolivaLogo size={40} />
            </motion.div>
            <div className="font-mono text-[8px] opacity-30 uppercase tracking-[0.2em]">
              © 2026 SOLIVA SUNWRAP — DESIGNED IN INDIA
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
