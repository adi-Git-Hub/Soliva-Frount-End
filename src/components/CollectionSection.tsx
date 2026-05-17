import { useScrollReveal } from "@/hooks/use-scroll-reveal";

const products = [
  {
    name: "Soft Ivory",
    desc: "Morning Mist / Pure Silk",
    status: "Launching First",
    tone: "from-[#F7F3EE] to-[#EFE6DA]",
  },
  {
    name: "Classic Beige",
    desc: "Urban Sand / Desert Stone",
    status: "Premium Edition",
    tone: "from-[#EFE6DA] to-[#F3ECE2]",
  },
  {
    name: "Muted Taupe",
    desc: "Woven Flax / Earthy Tone",
    status: "New Release",
    tone: "from-[#F3ECE2] to-[#A08F84]/20",
  },
  {
    name: "Warm Umber",
    desc: "Sunset Glow / Terracotta",
    status: "Natural Edition",
    tone: "from-[#F3ECE2] to-[#F5820D]/15",
  },
  {
    name: "Deep Ebony",
    desc: "Midnight Shade / Dark Textile",
    status: "Limited Edition",
    tone: "from-[#EFE6DA] to-[#3A2A22]/20",
  },
];

const trust = ["UPF 50+", "DUAL LAYER", "FULL COVERAGE", "LIGHTWEIGHT", "BREATHABLE"];

export function CollectionSection() {
  const containerRef = useScrollReveal();
  const loop = [...trust, ...trust, ...trust];

  return (
    <section
      ref={containerRef}
      className="relative w-full overflow-hidden bg-transparent py-24 md:py-32 perspective-2000 z-20"
    >
      <div className="relative mx-auto max-w-7xl px-6 md:px-12 z-10">
        <div className="flex flex-col items-center text-center reveal-on-scroll mb-20 relative">
          <span className="text-[10px] tracking-[0.3em] text-orange-glow uppercase font-medium mb-6">
            — PREVIEW COLLECTION
          </span>
          <h2 className="font-display text-5xl md:text-7xl text-brown-deep leading-[1.2]">
            Five editions.
            <br />
            <span className="italic">One philosophy.</span>
          </h2>
          <div className="mt-10 h-px w-16 bg-brown/20" />
          <p className="mt-10 max-w-lg text-sm md:text-base text-brown/60 leading-relaxed font-light">
            An exclusive first look at the launch editions. Engineered for the transition from dawn
            to dusk.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-5 relative">
          {products.map((p, i) => (
            <article
              key={p.name}
              className="reveal-on-scroll group relative flex flex-col transition-all duration-1000"
              style={{ transitionDelay: `${i * 150}ms` }}
            >
              {/* Immersive Image Container */}
              <div className="relative aspect-[4/5] overflow-hidden rounded-sm border border-brown/5 bg-cream transition-all duration-700 group-hover:shadow-[0_30px_60px_-15px_rgba(122,73,0,0.12)] group-hover:-translate-y-1">
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${p.tone} opacity-80 group-hover:opacity-100 transition-opacity duration-700`}
                />
                <div className="absolute inset-0 grain opacity-40 mix-blend-overlay" />

                {/* Dynamic Lighting Overlay */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.15),transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />

                {/* Abstract Visual Shape */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <svg
                    className="h-[120%] w-[120%] opacity-20 group-hover:opacity-40 transition-all duration-1000 group-hover:scale-105"
                    viewBox="0 0 300 400"
                  >
                    <ellipse cx="150" cy="200" rx="90" ry="180" fill="oklch(1 0 0 / 0.1)" />
                    <ellipse cx="150" cy="200" rx="60" ry="150" fill="oklch(1 0 0 / 0.1)" />
                  </svg>
                </div>

                {/* Refined Metadata - Top */}
                <div className="absolute top-6 left-6 flex flex-col gap-1">
                  <span className="font-mono text-[8px] tracking-[0.2em] text-cream/40 uppercase">
                    EDITION
                  </span>
                  <span className="font-mono text-xs tracking-[0.1em] text-cream/80">0{i + 1}</span>
                </div>

                {/* Coming Soon Pill - Intentional & Elegant */}
                <div className="absolute top-6 right-6">
                  <div className="rounded-full border border-cream/20 bg-black/10 px-4 py-1.5 text-[9px] tracking-[0.2em] text-cream backdrop-blur-xl transition-transform duration-700 group-hover:scale-105">
                    {p.status}
                  </div>
                </div>

                {/* Visual Label - Bottom */}
                <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end">
                  <div className="h-px flex-1 bg-gradient-to-r from-cream/30 to-transparent mb-1" />
                  <span className="font-mono text-[8px] tracking-[0.3em] text-cream/40 uppercase ml-4">
                    SOLIVA_ENG
                  </span>
                </div>
              </div>

              {/* Typography Content - Now more breathable */}
              <div className="mt-8 text-center px-2">
                <h3 className="font-display text-2xl text-brown-deep tracking-tight mb-2 group-hover:text-orange-glow transition-colors duration-500">
                  {p.name}
                </h3>
                <p className="text-[9px] tracking-[0.3em] text-brown/40 uppercase font-light">
                  {p.desc}
                </p>
                <div className="mt-4 flex justify-center opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-700">
                  <span className="text-[9px] tracking-[0.2em] text-orange-glow font-medium">
                    REVEAL ON LAUNCH
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Marquee - More Integrated & Subtle */}
      <div className="reveal-on-scroll relative mt-32 border-y border-brown/5 bg-cream/20 py-8 overflow-hidden">
        <div className="marquee flex w-max gap-20 whitespace-nowrap opacity-40">
          {loop.map((t, i) => (
            <span
              key={i}
              className="flex items-center gap-20 font-display text-2xl text-brown-deep tracking-[0.05em] cursor-default"
            >
              {t}
              <span className="text-orange-glow/40 font-serif">✦</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
