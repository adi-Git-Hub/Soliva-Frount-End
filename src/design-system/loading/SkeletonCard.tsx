/**
 * SkeletonCard — luxury placeholder for product / collection / order cards
 * during data fetch.
 *
 * Design philosophy: NOT a generic gray shimmer. A skeleton that reads as
 * "this is intentionally blank for now" rather than "loading spinner."
 * Single slow atmospheric shimmer cycle (2.4 s), brand-aligned tones, soft
 * rounded panel matching the actual card system.
 *
 * Variants:
 *   <SkeletonCard variant="product" />   // 4:5.2 aspect, edition card shape
 *   <SkeletonCard variant="row" />       // horizontal row item
 *   <SkeletonCard variant="metric" />    // compact metric placeholder
 *
 * Usage with React Query / suspended data:
 *   {isLoading ? <SkeletonCard variant="product" /> : <ProductCard data={d} />}
 */

import { skeleton } from "./loading.config";

type SkeletonVariant = "product" | "row" | "metric" | "block";

interface SkeletonCardProps {
  variant?: SkeletonVariant;
  className?: string;
  /** Override aspect-ratio (for variant="product" / "block") */
  aspectRatio?: string;
}

const VARIANT_DIMENSIONS: Record<SkeletonVariant, { aspect?: string; minHeight?: string }> = {
  product: { aspect: skeleton.card.aspect }, // 4 / 5.2
  row: { minHeight: "5rem" },
  metric: { aspect: "1 / 1" },
  block: { minHeight: "12rem" },
};

export function SkeletonCard({
  variant = "product",
  className,
  aspectRatio,
}: SkeletonCardProps) {
  const dims = VARIANT_DIMENSIONS[variant];

  return (
    <div
      className={`relative overflow-hidden rounded-[var(--radius-ds-panel)] border border-line-hairline bg-surface-muted ${
        className ?? ""
      }`}
      style={{
        aspectRatio: aspectRatio ?? dims.aspect,
        minHeight: dims.minHeight,
      }}
      role="status"
      aria-busy="true"
      aria-label="Loading"
    >
      {/* Soft brand-tone wash — anchors the skeleton in the editorial palette */}
      <div
        className="absolute inset-0"
        style={{ background: skeleton.fill }}
      />

      {/* Atmospheric shimmer — single slow sweep, brand-cream highlight */}
      <div
        className="absolute inset-0 -translate-x-full skeleton-shimmer"
        style={{
          background:
            "linear-gradient(110deg, transparent 30%, rgba(255,255,255,0.45) 50%, transparent 70%)",
        }}
      />

      {/* Variant-specific content placeholders */}
      {variant === "row" && (
        <div className="relative z-10 flex h-full items-center gap-4 px-5">
          <div className="h-12 w-12 rounded-full bg-cream/60" />
          <div className="flex-1 space-y-2">
            <div className="h-3 w-3/4 rounded-full bg-cream/60" />
            <div className="h-2 w-1/2 rounded-full bg-cream/40" />
          </div>
        </div>
      )}

      {/* Inline shimmer keyframe — colocated to keep the component self-contained */}
      <style>{`
        @keyframes skeleton-shimmer-sweep {
          0%   { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
        .skeleton-shimmer {
          animation: skeleton-shimmer-sweep ${skeleton.shimmerMs}ms cubic-bezier(0.4, 0, 0.2, 1) infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .skeleton-shimmer { animation: none; }
        }
      `}</style>
    </div>
  );
}
