import { Link, createFileRoute, notFound } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";

import { ProductGrid } from "@/features/catalog/components/ProductGrid";
import { Skeleton } from "@/components/ui/skeleton";
import { useCategory, useProducts } from "@/features/catalog/api";
import { EmptyState } from "@/components/shared/EmptyState";

export const Route = createFileRoute("/_public/categories/$slug")({
  component: CategoryRoute,
});

function CategoryRoute() {
  const { slug } = Route.useParams();
  const { data: category, isError } = useCategory(slug);
  const { data: products = [], isLoading } = useProducts({
    category: slug,
    sort: "newest",
    limit: 24,
  });

  if (isError) throw notFound();

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 md:px-8 md:py-16">
      <nav
        aria-label="Breadcrumb"
        className="mb-6 flex items-center gap-1 text-xs text-muted-foreground"
      >
        <Link to="/" className="hover:text-foreground">
          Home
        </Link>
        <ChevronRight className="h-3 w-3" />
        <Link to="/categories" className="hover:text-foreground">
          Categories
        </Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-foreground">{category?.name ?? "…"}</span>
      </nav>

      <header className="mb-10">
        {category ? (
          <>
            <h1 className="font-display text-4xl text-foreground md:text-5xl">{category.name}</h1>
            <p className="mt-2 max-w-xl text-sm text-muted-foreground">{category.description}</p>
          </>
        ) : (
          <Skeleton className="h-12 w-64" />
        )}
      </header>

      {!isLoading && products.length === 0 ? (
        <EmptyState
          title="No items in this category yet"
          description="Check back soon — we add to each collection slowly and with care."
        />
      ) : (
        <ProductGrid products={products} loading={isLoading} />
      )}
    </div>
  );
}
