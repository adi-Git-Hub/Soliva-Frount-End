import { Link, createFileRoute, notFound } from "@tanstack/react-router";
import { toast } from "sonner";
import { ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { PriceDisplay } from "@/components/shared/PriceDisplay";
import { useProduct } from "@/features/catalog/api";
import { useCartStore } from "@/features/cart/store";

export const Route = createFileRoute("/_public/products/$slug")({
  component: ProductRoute,
});

function ProductRoute() {
  const { slug } = Route.useParams();
  const { data: product, isLoading, isError } = useProduct(slug);
  const addToCart = useCartStore((s) => s.add);

  if (isError) throw notFound();

  if (isLoading || !product) {
    return (
      <div className="mx-auto grid max-w-[90rem] gap-12 px-6 py-20 md:grid-cols-2 md:px-12 md:py-32">
        <Skeleton className="aspect-[4/5] w-full rounded-[2.5rem] bg-cream/50" />
        <div className="space-y-6">
          <Skeleton className="h-12 w-2/3 bg-cream/50" />
          <Skeleton className="h-8 w-32 bg-cream/50" />
          <Skeleton className="h-32 w-full bg-cream/50" />
          <Skeleton className="h-14 w-full bg-cream/50" />
        </div>
      </div>
    );
  }

  function onAdd() {
    if (!product) return;
    addToCart({
      productId: product.id,
      slug: product.slug,
      name: product.name,
      image: product.images[0],
      priceCents: product.priceCents,
      currency: product.currency,
    });
    toast.success(`${product.name} added to cart`);
  }

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-luxury-beige pt-32 pb-24 z-10">
      {/* Background Mesh (Global Consistency) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-[-10%] w-[120%] h-[120%] bg-[radial-gradient(circle_at_20%_30%,rgba(245,130,13,0.04),transparent_50%),radial-gradient(circle_at_80%_20%,rgba(252,231,243,0.5),transparent_60%)] opacity-80" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[120%] h-[120%] bg-[radial-gradient(circle_at_70%_80%,rgba(243,236,226,1),transparent_50%),radial-gradient(circle_at_30%_90%,rgba(245,130,13,0.06),transparent_40%)] opacity-70" />
        <div className="absolute inset-0 opacity-[0.02] mix-blend-overlay pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]" />
      </div>

      <article className="mx-auto max-w-[90rem] px-6 py-12 md:px-12 md:py-16 relative z-10">
        {/* Breadcrumb */}
        <motion.nav
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          aria-label="Breadcrumb"
          className="mb-12 flex items-center gap-2 font-mono text-[10px] tracking-[0.2em] text-brown/60 uppercase font-bold"
        >
          <Link to="/" className="hover:text-brown-deep transition-colors">
            Home
          </Link>
          <ChevronRight className="h-3 w-3 opacity-50" />
          <Link
            to="/categories/$slug"
            params={{ slug: product.categorySlug }}
            className="hover:text-brown-deep transition-colors"
          >
            {product.categorySlug}
          </Link>
          <ChevronRight className="h-3 w-3 opacity-50" />
          <span className="text-brown-deep">{product.name}</span>
        </motion.nav>

        <div className="grid gap-12 md:grid-cols-2 lg:gap-20">
          {/* Gallery */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-4"
          >
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2.5rem] bg-cream/30 border border-brown/5 shadow-[0_40px_100px_-20px_rgba(58,42,34,0.1)] backdrop-blur-md">
              <img
                src={product.images[0]}
                alt={product.name}
                fetchPriority="high"
                className="h-full w-full object-cover mix-blend-multiply opacity-90 transition-transform duration-700 hover:scale-105"
              />
            </div>
            {product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-4">
                {product.images.slice(1).map((src, i) => (
                  <div key={i} className="aspect-square overflow-hidden rounded-2xl bg-cream/30 border border-brown/5 backdrop-blur-sm cursor-pointer hover:border-brown/20 transition-all duration-300">
                    <img src={src} alt="" loading="lazy" className="h-full w-full object-cover mix-blend-multiply opacity-80 hover:opacity-100 transition-opacity" />
                  </div>
                ))}
              </div>
            )}
          </motion.div>

          {/* Details Panel */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col space-y-10 bg-white/10 border border-brown/5 rounded-[3rem] p-10 md:p-14 backdrop-blur-md shadow-sm h-fit"
          >
            <header className="space-y-6">
              <div className="flex items-center gap-4">
                <span className="block h-px w-6 bg-brown/20" />
                <span className="font-mono text-[10px] tracking-[0.6em] text-orange-glow uppercase font-bold">
                  EDITION 01
                </span>
              </div>
              <h1 className="font-display text-4xl text-brown-deep md:text-5xl lg:text-6xl tracking-tight leading-[1.05]">{product.name}</h1>
              <div className="pt-2">
                <PriceDisplay
                  priceCents={product.priceCents}
                  compareAtCents={product.compareAtCents}
                  currency={product.currency}
                  size="lg"
                  className="text-brown-deep font-display"
                />
              </div>
              {!product.inStock && <Badge variant="secondary" className="bg-brown/10 text-brown-deep font-mono tracking-widest text-[10px]">Out of stock</Badge>}
            </header>

            <p className="text-base md:text-lg leading-relaxed text-brown/70 font-light italic">
              {product.description}
            </p>

            <div className="pt-4">
              <Button
                size="lg"
                className="w-full rounded-full py-7 bg-brown-deep text-white hover:bg-brown hover:shadow-[0_10px_30px_rgba(58,42,34,0.3)] transition-all duration-500 font-bold uppercase tracking-[0.2em] text-[11px]"
                onClick={onAdd}
                disabled={!product.inStock}
              >
                {product.inStock ? "Add to cart" : "Out of stock"}
              </Button>
            </div>

            <dl className="grid grid-cols-2 gap-y-6 border-t border-brown/10 pt-8 mt-4 text-sm">
              <div className="space-y-2">
                <dt className="font-mono text-[10px] tracking-[0.3em] text-brown/60 uppercase font-bold">Rating</dt>
                <dd className="font-display text-lg text-brown-deep italic">
                  {product.rating.toFixed(1)} <span className="text-sm font-sans not-italic text-brown/50">({product.reviewCount} reviews)</span>
                </dd>
              </div>
              <div className="space-y-2">
                <dt className="font-mono text-[10px] tracking-[0.3em] text-brown/60 uppercase font-bold">Category</dt>
                <dd className="font-display text-lg text-brown-deep italic capitalize">{product.categorySlug}</dd>
              </div>
            </dl>
          </motion.div>
        </div>
      </article>
    </div>
  );
}
