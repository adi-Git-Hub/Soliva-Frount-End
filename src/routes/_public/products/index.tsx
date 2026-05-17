import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { z } from "zod";

import { FilterSidebar } from "@/features/catalog/components/FilterSidebar";
import { ProductGrid } from "@/features/catalog/components/ProductGrid";
import { SortMenu } from "@/features/catalog/components/SortMenu";
import { useProducts } from "@/features/catalog/api";
import { EmptyState } from "@/components/shared/EmptyState";

const searchSchema = z.object({
  category: z.string().optional(),
  minPrice: z.coerce.number().int().nonnegative().optional(),
  maxPrice: z.coerce.number().int().nonnegative().optional(),
  sort: z
    .enum(["newest", "price-asc", "price-desc", "rating"])
    .catch("newest")
    .default("newest"),
});

export const Route = createFileRoute("/_public/products/")({
  validateSearch: (search) => searchSchema.parse(search),
  component: ProductsRoute,
});

function ProductsRoute() {
  const search = Route.useSearch();
  const navigate = useNavigate();
  const { data: products = [], isLoading } = useProducts({
    ...search,
    limit: 24,
  });

  function update(partial: Partial<typeof search>) {
    navigate({
      to: "/products",
      search: (prev) => ({ ...prev, ...partial }),
    });
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 md:px-8 md:py-16">
      <div className="mb-10 flex items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-4xl text-foreground md:text-5xl">
            Shop all
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            {products.length} {products.length === 1 ? "piece" : "pieces"}
          </p>
        </div>
        <SortMenu value={search.sort} onChange={(sort) => update({ sort })} />
      </div>

      <div className="grid gap-10 md:grid-cols-[220px_1fr]">
        <FilterSidebar
          category={search.category}
          minPrice={search.minPrice}
          maxPrice={search.maxPrice}
          onChange={update}
          onClear={() =>
            navigate({ to: "/products", search: { sort: "newest" } })
          }
        />

        <div>
          {!isLoading && products.length === 0 ? (
            <EmptyState
              title="Nothing matches yet"
              description="Try clearing a filter or browsing all categories."
            />
          ) : (
            <ProductGrid products={products} loading={isLoading} />
          )}
        </div>
      </div>
    </div>
  );
}
