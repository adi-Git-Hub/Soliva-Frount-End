const oldWay = [
  "Slips off in traffic and wind",
  "Traps heat against the face",
  "Leaves the neck and temples exposed",
  "Needs constant adjustment",
  "Smudges makeup, tangles hair",
];
const newWay = [
  "Stays in place, hands-free",
  "Dual-layer breathable airflow",
  "Wraps fully — crown to collarbone",
  "Designed once, worn all day",
  "Smooth interior, no smudge, no snag",
];

export function CompareSection() {
  return (
    <section className="relative w-full overflow-hidden bg-cinematic-veil py-24 md:py-32">
      {/* Center light glow — replaced expensive 160px blur with a static
          radial gradient for the same look at a fraction of the cost. */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_55%_45%_at_50%_50%,rgba(245,130,13,0.10),transparent_70%)]" />

      <div className="relative mx-auto max-w-7xl px-6 md:px-12">
        <div className="mx-auto max-w-3xl text-center mb-20">
          <span className="text-[10px] tracking-[0.3em] text-orange-glow uppercase font-medium text-shadow-sm">
            — THE COMPARISON
          </span>
          <h2 className="font-display mt-6 text-4xl md:text-6xl text-cream leading-[1.2] text-shadow-sm">
            Still using a dupatta or
            <br />
            <span className="italic text-orange-glow">regular scarf?</span>
          </h2>
        </div>

        <div className="mt-20 grid grid-cols-1 gap-px md:grid-cols-2 bg-luxury-beige/10 border border-luxury-beige/20 shadow-[0_0_40px_rgba(245,239,228,0.05)]">
          {/* Old Way Block */}
          <div className="relative bg-black/25 p-10 md:p-16 overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-50" />

            <div className="relative z-10">
              <div className="flex items-center justify-between mb-10">
                <span className="text-[10px] tracking-[0.3em] text-cream/60 uppercase font-medium">
                  THE OLD WAY
                </span>
                <span className="font-mono text-[8px] tracking-[0.35em] text-cream/35 uppercase">Vector A</span>
              </div>
              <h3 className="font-display text-3xl text-cream/95 mb-6 text-shadow-sm">
                Borrowed protection.
              </h3>
              <div className="mb-10 grid grid-cols-3 gap-3 pt-4 border-t border-cream/10">
                <div className="space-y-1">
                  <span className="block font-mono text-[7px] tracking-[0.35em] text-cream/40 uppercase">UPF</span>
                  <span className="block font-mono text-[11px] text-cream/75">≤ 15</span>
                </div>
                <div className="space-y-1">
                  <span className="block font-mono text-[7px] tracking-[0.35em] text-cream/40 uppercase">Adjust / hr</span>
                  <span className="block font-mono text-[11px] text-cream/75">18×</span>
                </div>
                <div className="space-y-1">
                  <span className="block font-mono text-[7px] tracking-[0.35em] text-cream/40 uppercase">Coverage</span>
                  <span className="block font-mono text-[11px] text-cream/75">Partial</span>
                </div>
              </div>
              <ul className="space-y-6">
                {oldWay.map((t) => (
                  <li
                    key={t}
                    className="flex items-start gap-4 text-cream/80 text-sm leading-relaxed font-light"
                  >
                    <span className="mt-2.5 inline-block h-px w-6 bg-cream/30" />
                    <span className="text-shadow-sm">{t}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* New Way Block */}
          <div className="relative bg-orange-glow/10 p-10 md:p-16 border-l md:border-l-0 md:border-t-0 overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-orange-glow/10 to-transparent opacity-30" />
            <div className="absolute inset-y-0 left-0 w-px bg-gradient-to-b from-transparent via-orange-glow/40 to-transparent hidden md:block" />

            <div className="relative z-10">
              <div className="flex items-center justify-between mb-10">
                <span className="text-[10px] tracking-[0.3em] text-orange-glow uppercase font-bold text-shadow-sm">
                  SOLIVA SUNWRAP
                </span>
                <span className="font-mono text-[8px] tracking-[0.35em] text-orange-glow/60 uppercase">Vector B</span>
              </div>
              <h3 className="font-display text-3xl text-cream mb-6 text-glow">
                Engineered protection.
              </h3>
              <div className="mb-10 grid grid-cols-3 gap-3 pt-4 border-t border-orange-glow/20">
                <div className="space-y-1">
                  <span className="block font-mono text-[7px] tracking-[0.35em] text-cream/40 uppercase">UPF</span>
                  <span className="block font-mono text-[11px] text-orange-glow">50+</span>
                </div>
                <div className="space-y-1">
                  <span className="block font-mono text-[7px] tracking-[0.35em] text-cream/40 uppercase">Adjust / hr</span>
                  <span className="block font-mono text-[11px] text-orange-glow">0×</span>
                </div>
                <div className="space-y-1">
                  <span className="block font-mono text-[7px] tracking-[0.35em] text-cream/40 uppercase">Coverage</span>
                  <span className="block font-mono text-[11px] text-orange-glow">360°</span>
                </div>
              </div>
              <ul className="space-y-6">
                {newWay.map((t) => (
                  <li
                    key={t}
                    className="flex items-start gap-4 text-cream text-sm leading-relaxed font-medium"
                  >
                    <span className="mt-2.5 inline-block h-px w-6 bg-orange-glow shadow-[0_0_10px_rgba(255,124,0,0.5)]" />
                    <span className="text-shadow-sm">{t}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <p className="font-display mx-auto mt-20 max-w-2xl text-center text-2xl md:text-3xl italic text-cream/70 text-shadow-sm">
          "Protection shouldn't depend on adjustment."
        </p>
      </div>
    </section>
  );
}
