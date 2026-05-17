import { Link, createFileRoute, notFound } from "@tanstack/react-router";
import { toast } from "sonner";
import { ChevronRight } from "lucide-react";

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
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 md:grid-cols-2 md:px-8 md:py-16">
        <Skeleton className="aspect-[4/5] w-full rounded-2xl" />
        <div className="space-y-4">
          <Skeleton className="h-10 w-2/3" />
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-24 w-full" />
          <Skeleton className="h-12 w-full" />
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
    <article className="mx-auto max-w-7xl px-4 py-12 md:px-8 md:py-16">
      {/* Breadcrumb */}
      <nav
        aria-label="Breadcrumb"
        className="mb-8 flex items-center gap-1 text-xs text-muted-foreground"
      >
        <Link to="/" className="hover:text-foreground">
          Home
        </Link>
        <ChevronRight className="h-3 w-3" />
        <Link
          to="/categories/$slug"
          params={{ slug: product.categorySlug }}
          className="capitalize hover:text-foreground"
        >
          {product.categorySlug}
        </Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-foreground">{product.name}</span>
      </nav>

      <div className="grid gap-10 md:grid-cols-2">
        {/* Gallery */}
        <div className="space-y-3">
          <div className="aspect-[4/5] overflow-hidden rounded-2xl bg-secondary">
            <img
              src={product.images[0]}
              alt={product.name}
              fetchPriority="high"
              className="h-full w-full object-cover"
            />
          </div>
          {product.images.length > 1 && (
            <div className="grid grid-cols-4 gap-3">
              {product.images.slice(1).map((src, i) => (
                <div
                  key={i}
                  className="aspect-square overflow-hidden rounded-lg bg-secondary"
                >
                  <img
                    src={src}
                    alt=""
                    loading="lazy"
                    className="h-full w-full object-cover"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Details */}
        <div className="space-y-6">
          <header className="space-y-3">
            <h1 className="font-display text-4xl text-foreground md:text-5xl">
              {product.name}
            </h1>
            <PriceDisplay
              priceCents={product.priceCents}
              compareAtCents={product.compareAtCents}
              currency={product.currency}
              size="lg"
            />
            {!product.inStock && <Badge variant="secondary">Out of stock</Badge>}
          </header>

          <p className="text-base leading-relaxed text-muted-foreground">
            {product.description}
          </p>

          <Button
            size="lg"
            className="w-full md:w-auto md:px-12"
            onClick={onAdd}
            disabled={!product.inStock}
          >
            {product.inStock ? "Add to cart" : "Out of stock"}
          </Button>

          <dl className="grid grid-cols-2 gap-y-2 border-t border-border/40 pt-6 text-sm">
            <dt className="text-muted-foreground">Rating</dt>
            <dd className="text-foreground">
              {product.rating.toFixed(1)} ({product.reviewCount} reviews)
            </dd>
            <dt className="text-muted-foreground">Category</dt>
            <dd className="capitalize text-foreground">{product.categorySlug}</dd>
          </dl>
        </div>
      </div>
    </article>
  );
}
