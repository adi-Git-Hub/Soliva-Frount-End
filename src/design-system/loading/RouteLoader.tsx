/**
 * RouteLoader — subtle route-to-route fade. Wraps a route's children with a
 * key-driven AnimatePresence so navigating between pages crossfades briefly
 * (~220 ms) instead of hard-cutting.
 *
 * Designed to be invisible most of the time: the fade is short enough not to
 * register as a "transition," just long enough to mask the visual flash of
 * a new render. Preserves scroll position (does not reset scroll itself —
 * pair with TanStack Router's scroll restoration).
 *
 * Usage (inside a route component):
 *   <RouteLoader routeKey={pathname}>
 *     <PageContent />
 *   </RouteLoader>
 *
 * Or wrap an Outlet for sitewide application.
 */

import { motion, AnimatePresence } from "framer-motion";
import type { ReactNode } from "react";
import { routeLoader, loadingMotion } from "./loading.config";

interface RouteLoaderProps {
  /** Unique key per route — typically the pathname */
  routeKey: string;
  children: ReactNode;
}

export function RouteLoader({ routeKey, children }: RouteLoaderProps) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={routeKey}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{
          duration: routeLoader.fadeMs / 1000,
          ease: loadingMotion.ease,
        }}
        className="contents"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
