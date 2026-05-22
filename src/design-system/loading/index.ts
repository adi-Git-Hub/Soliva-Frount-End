/**
 * Loading architecture — barrel export.
 *
 * Six loading primitives + a shared config, all consuming the design-system
 * motion + color tokens for a unified luxury loading language.
 */

export { AppLoader } from "./AppLoader";
export { RouteLoader } from "./RouteLoader";
export { SectionLoader } from "./SectionLoader";
export { ImageLoader } from "./ImageLoader";
export { SkeletonCard } from "./SkeletonCard";
export { LoadingOverlay } from "./LoadingOverlay";

export {
  appLoader,
  routeLoader,
  sectionLoader,
  imageLoader,
  skeleton,
  overlay,
  loadingMotion,
} from "./loading.config";
