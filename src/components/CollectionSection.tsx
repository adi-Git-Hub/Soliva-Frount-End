import { motion } from "framer-motion";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

const products = [
  {
    id: "01",
    name: "Blush Pink",
    image: "/pink.png",
    desc: "Soft, elegant, and visually lightweight. Designed to reflect heat while maintaining a refined feminine aesthetic.",
    tone: "from-[#FFF5F7] to-[#FCE7F3]",
    glow: "rgba(251, 207, 232, 0.4)",
  },
  {
    id: "02",
    name: "Zesty Lime",
    image: "/lemon.png",
    desc: "Fresh energy with high visibility. A brighter tone engineered for harsh daylight conditions.",
    tone: "from-[#FBFFF0] to-[#ECFCCB]",
    glow: "rgba(217, 249, 157, 0.4)",
  },
  {
    id: "03",
    name: "Green Edition",
    image: "/lime.png",
    desc: "Balanced, grounded, and naturally calming. Built for effortless daily wear.",
    tone: "from-[#F5FFF7] to-[#DCFCE7]",
    glow: "rgba(187, 247, 208, 0.4)",
  },
  {
    id: "04",
    name: "Deep Blue",
    image: "/blue.png",
    desc: "Refined and versatile. A richer tone designed for timeless everyday styling.",
    tone: "from-[#F0F7FF] to-[#DBEAFE]",
    glow: "rgba(191, 219, 254, 0.4)",
  },
  {
    id: "05",
    name: "Classic Beige",
    image: "/pink.png", // Reusing pink for Classic Beige as requested for the 5th card
    desc: "Minimal, premium, and heat-friendly. A timeless neutral designed for all-day comfort.",
    tone: "from-[#FFFBF5] to-[#F3ECE2]",
    glow: "rgba(243, 236, 226, 0.4)",
  },
];

const trustLines = [
  "UPF 50+ Protection",
  "Breathable Comfort",
  "Full Coverage Design",
  "Built For Indian Conditions",
  "Everyday Essential",
];

export function CollectionSection() {
  const containerRef = useScrollReveal();

  return (
    <section
      ref={containerRef}
      className="relative w-full overflow-hidden bg-luxury-beige pt-2 md:pt-3 pb-8 md:pb-10 z-20"
    >
      {/* Background Decorative Elements (Global Consistency) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-[-10%] w-[120%] h-[120%] bg-[radial-gradient(circle_at_20%_30%,rgba(245,130,13,0.04),transparent_50%),radial-gradient(circle_at_80%_20%,rgba(252,231,243,0.5),transparent_60%)] opacity-80" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[120%] h-[120%] bg-[radial-gradient(circle_at_70%_80%,rgba(243,236,226,1),transparent_50%),radial-gradient(circle_at_30%_90%,rgba(245,130,13,0.06),transparent_40%)] opacity-70" />
        <div className="absolute inset-0 opacity-[0.02] mix-blend-overlay pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]" />
      </div>

      <div className="relative mx-auto max-w-[90rem] px-6 md:px-12 z-10">
        {/* Header Section */}
        <div className="flex flex-col items-center text-center mb-6 md:mb-8 bg-white/10 border border-brown/5 rounded-[2.5rem] px-8 py-2 md:py-3 backdrop-blur-md shadow-sm">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-4 mb-3"
          >
            <div className="h-px w-8 bg-brown/20" />
            <span className="text-[10px] tracking-[0.6em] text-orange-glow uppercase font-bold">
              PREVIEW COLLECTION
            </span>
            <div className="h-px w-8 bg-brown/20" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-display text-2xl md:text-[2.6rem] text-brown-deep leading-[1.1] tracking-tight whitespace-nowrap"
          >
            Five editions.{" "}
            <span className="italic font-serif text-orange-glow drop-shadow-sm">One philosophy.</span>
          </motion.h2>

          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="mt-3 h-[2px] w-16 bg-gradient-to-r from-transparent via-brown/20 to-transparent"
          />

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="mt-3 max-w-md text-xs md:text-sm text-brown/60 leading-relaxed font-light italic"
          >
            Protective essentials, engineered for everyday Indian conditions.
          </motion.p>
        </div>

        {/* Collection Cards Grid */}
        <div className="flex overflow-x-auto pb-8 snap-x snap-mandatory hide-scrollbar md:grid md:grid-cols-5 md:gap-4 md:overflow-visible md:pb-0 md:-mt-4 md:items-end">
          {products.map((p, i) => (
            <motion.article
              key={p.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.1, duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
              className="flex-none w-[85vw] snap-center px-3 md:w-full md:px-0 group cursor-default"
            >
              <div className="relative flex flex-col h-full">
                {/* Image Container */}
                <div className="relative aspect-[4/5.2] overflow-hidden rounded-[2.5rem] border border-brown/10 bg-white/30 backdrop-blur-md transition-all duration-700 group-hover:-translate-y-1 group-hover:shadow-[0_20px_50px_-15px_rgba(58,42,34,0.14)] group-hover:ring-1 group-hover:ring-orange-glow/15">
                  {/* Subtle Background Glow */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${p.tone} opacity-40 transition-opacity duration-700 group-hover:opacity-60`}
                  />

                  {/* Mesh Gradient / Ambient Light */}
                  <div
                    className="absolute inset-0 opacity-0 transition-opacity duration-1000 group-hover:opacity-100"
                    style={{
                      background: `radial-gradient(circle at 50% 50%, ${p.glow}, transparent 70%)`,
                    }}
                  />

                  {/* Cinematic Ground Shadow — grounds the product, removes floating-PNG feel */}
                  <div className="absolute left-1/2 -translate-x-1/2 rounded-[50%] bg-brown-deep/30 blur-2xl pointer-events-none bottom-[14%] w-[52%] h-2.5" />

                  {/* Edition Badge */}
                  <div className="absolute top-6 left-6 z-20 bg-white/40 border border-white/50 backdrop-blur-sm rounded-2xl p-2.5 shadow-sm">
                    <div className="flex flex-col gap-0.5 items-center">
                      <span className="font-mono text-[8px] tracking-[0.2em] text-brown-deep/60 uppercase font-bold">
                        EDITION
                      </span>
                      <span className="font-mono text-sm tracking-tighter text-brown-deep font-black">
                        {p.id}
                      </span>
                    </div>
                  </div>

                  {/* Product Image */}
                  <div className="absolute inset-0 flex items-center justify-center p-3 md:p-4 z-10">
                    <motion.img
                      src={p.image}
                      alt={p.name}
                      className="w-full h-full object-contain drop-shadow-[0_20px_40px_rgba(58,42,34,0.18)]"
                      initial={{ scale: 0.9, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      animate={{
                        y: [0, -5, 0],
                      }}
                      transition={{
                        duration: 1,
                        delay: 0.2 + i * 0.1,
                        y: {
                          duration: 4,
                          repeat: Infinity,
                          ease: "easeInOut",
                        },
                      }}
                    />
                  </div>

                  {/* Glassmorphism Reveal Label */}
                  <div className="absolute bottom-6 inset-x-6 z-20 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-700">
                    <div className="bg-white/60 backdrop-blur-xl border border-white/50 rounded-full py-2.5 px-4 text-center shadow-[0_10px_30px_rgba(58,42,34,0.1)]">
                      <span className="text-[9px] tracking-[0.2em] text-brown-deep font-bold uppercase">
                        Reveal on Launch
                      </span>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="mt-5 text-center md:text-left px-2 bg-white/10 border border-brown/5 rounded-2xl p-4 backdrop-blur-sm">
                  <h3 className="font-display text-xl text-brown-deep tracking-tight mb-1.5 transition-colors duration-500 group-hover:text-orange-glow font-bold">
                    {p.name}
                  </h3>
                  <p className="text-[10.5px] leading-relaxed text-brown/70 font-medium tracking-wide line-clamp-2">
                    {p.desc}
                  </p>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Bottom CTA Text */}
        <div className="mt-10 text-center">
          <motion.h4
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="font-display text-3xl md:text-4xl text-brown-deep leading-[1.1] tracking-tight"
          >
            Thoughtfully layered.
            <br />
            <span className="italic text-orange-glow drop-shadow-sm">Effortlessly worn.</span>
          </motion.h4>
        </div>
      </div>

      {/* Infinite Marquee Strip */}
      <div className="mt-8 border-y border-brown/10 bg-white/20 backdrop-blur-md py-6 md:py-8 overflow-hidden relative [mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]">
        <div className="flex whitespace-nowrap overflow-hidden">
          <motion.div
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              duration: 30,
              repeat: Infinity,
              ease: "linear",
            }}
            className="flex gap-16 items-center pr-16"
          >
            {[...trustLines, ...trustLines].map((line, idx) => (
              <div key={idx} className="flex items-center gap-16">
                <span className="text-[11px] md:text-xs tracking-[0.4em] text-brown-deep font-bold uppercase">
                  {line}
                </span>
                <span className="text-orange-glow text-xl">✦</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `,
        }}
      />
    </section>
  );
}
