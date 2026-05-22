import { useEffect, useState } from "react";
import { Particles } from "./Particles";
import { SolivaLogo } from "./SolivaLogo";

export function IntroLoader({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    const start = Date.now();
    const duration = 2800;
    const tick = setInterval(() => {
      const elapsed = Date.now() - start;
      const pct = Math.min(100, (elapsed / duration) * 100);
      setProgress(pct);
      if (pct >= 100) {
        clearInterval(tick);
        setTimeout(() => setExiting(true), 400);
        setTimeout(() => onComplete(), 1200);
      }
    }, 30);
    return () => clearInterval(tick);
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-cinematic-dark grain transition-all duration-700 ${
        exiting ? "opacity-0 scale-110 pointer-events-none" : "opacity-100"
      }`}
    >
      <Particles count={40} />

      {/* Ambient glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent-faint blur-[120px]" />
      </div>

      <div className="relative z-10 flex flex-col items-center px-6">
        {/* Logo mark - Replaced with official logo asset */}
        <div className="mb-8 flex justify-center animate-premium-pulse">
          <SolivaLogo size={120} className="text-orange-glow" />
        </div>

        <p
          className="mt-2 text-xs tracking-editorial text-cream/60 reveal-up uppercase font-light"
          style={{ animationDelay: "0.6s" }}
        >
          SUNWRAP
        </p>

        <div className="mt-12 text-3d-float reveal-up" style={{ animationDelay: "1s" }}>
          <h2
            className="font-display text-5xl md:text-7xl text-cream/95 tracking-cta"
            style={{
              textShadow:
                "1px 1px 0 #c46300, 2px 2px 0 #a55300, 3px 3px 0 #864300, 4px 4px 0 #7a4900, 5px 5px 14px rgba(255,124,0,0.6), 0 0 50px rgba(255,124,0,0.5)",
            }}
          >
            COMING SOON
          </h2>
        </div>

        {/* Progress */}
        <div className="mt-16 w-72">
          <div className="h-px w-full overflow-hidden bg-cream/15">
            <div
              className="h-full bg-gradient-to-r from-orange-glow via-cream to-orange-glow"
              style={{ width: `${progress}%`, transition: "width 0.1s linear" }}
            />
          </div>
          <div className="mt-3 flex justify-between text-micro-md tracking-luxe text-cream/50">
            <span>LOADING</span>
            <span>{Math.floor(progress)}%</span>
          </div>
        </div>
      </div>
    </div>
  );
}
