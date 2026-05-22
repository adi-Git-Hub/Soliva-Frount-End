/**
 * LoadingOverlay — semi-transparent veil for blocking interactions during
 * inline async work (form submits, mutation pending, etc.).
 *
 * NOT for full-page loads (use AppLoader) or initial route loads (use
 * RouteLoader). This is for the "user clicked something, server is working"
 * moment where you want to prevent further input without unmounting the UI.
 *
 * Usage:
 *   <div className="relative">
 *     <Form />
 *     {isSubmitting && <LoadingOverlay caption="Securing access" />}
 *   </div>
 */

import { motion, AnimatePresence } from "framer-motion";
import { overlay, loadingMotion } from "./loading.config";

interface LoadingOverlayProps {
  /** Show / hide the overlay */
  show?: boolean;
  /** Optional caption rendered centered in the veil */
  caption?: string;
  /** Absolute-position the overlay (default) or fixed full-screen */
  fixed?: boolean;
  /** Z-index override (default 50) */
  zIndex?: number;
}

export function LoadingOverlay({
  show = true,
  caption,
  fixed = false,
  zIndex = 50,
}: LoadingOverlayProps) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            duration: overlay.fadeMs / 1000,
            ease: loadingMotion.ease,
          }}
          className={`${fixed ? "fixed" : "absolute"} inset-0 flex items-center justify-center`}
          style={{
            background: overlay.veil,
            backdropFilter: `blur(${overlay.blur})`,
            WebkitBackdropFilter: `blur(${overlay.blur})`,
            zIndex,
          }}
          role="status"
          aria-busy="true"
          aria-live="polite"
        >
          {caption && (
            <div className="flex items-center gap-4">
              <span className="block h-px w-8 bg-brown-deep/30" />
              <span className="font-mono text-[11px] tracking-[0.4em] uppercase text-brown-deep/60">
                {caption}
              </span>
              <span className="block h-px w-8 bg-brown-deep/30" />
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
