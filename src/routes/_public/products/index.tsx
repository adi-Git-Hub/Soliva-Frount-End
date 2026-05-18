import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { z } from "zod";

import { FilterSidebar } from "@/features/catalog/components/FilterSidebar";
import { ProductGrid } from "@/features/catalog/components/ProductGrid";
import { SortMenu } from "@/features/catalog/components/SortMenu";
import { useProducts } from "@/features/catalog/api";
import { EmptyState } from "@/components/shared/EmptyState";
import { motion } from "framer-motion";

const searchSchema = z.object({
  category: z.string().optional(),
  minPrice: z.coerce.number().int().nonnegative().optional(),
  maxPrice: z.coerce.number().int().nonnegative().optional(),
  sort: z.enum(["newest", "price-asc", "price-desc", "rating"]).catch("newest").default("newest"),
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
      search: (prev) => ({
        ...prev,
        ...partial,
        sort: partial.sort ?? prev.sort ?? "newest",
      }),
    });
  }

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-luxury-beige pt-32 pb-24 z-10">
      {/* Background Mesh (Global Consistency) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-0 w-[80%] h-[80%] bg-[radial-gradient(circle_at_70%_20%,rgba(243,236,226,0.8),transparent_70%)] opacity-80" />
        <div className="absolute inset-0 opacity-[0.02] mix-blend-overlay pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]" />
      </div>

      <div className="mx-auto max-w-7xl px-6 md:px-12 relative z-10">
        <div className="mb-14 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <div className="flex items-center gap-4 mb-4">
              <span className="block h-px w-6 bg-brown/20" />
              <span className="font-mono text-[10px] tracking-[0.6em] text-orange-glow uppercase font-bold">
                THE COLLECTION
              </span>
            </div>
            <h1 className="font-display text-5xl md:text-7xl text-brown-deep tracking-tight leading-none mb-4">Shop all</h1>
            <p className="text-sm md:text-base text-brown/70 font-light italic">
              {products.length} {products.length === 1 ? "piece" : "pieces"} thoughtfully engineered for movement.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <SortMenu value={search.sort} onChange={(sort) => update({ sort })} />
          </motion.div>
        </div>

        <div className="grid gap-10 md:grid-cols-[240px_1fr]">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="bg-white/10 border border-brown/5 rounded-[2rem] p-6 backdrop-blur-md shadow-sm h-fit"
          >
            <FilterSidebar
              category={search.category}
              minPrice={search.minPrice}
              maxPrice={search.maxPrice}
              onChange={update}
              onClear={() => navigate({ to: "/products", search: { sort: "newest" } })}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
          >
            {!isLoading && products.length === 0 ? (
              <div className="bg-white/10 border border-brown/5 rounded-[2.5rem] p-10 backdrop-blur-md">
                <EmptyState
                  title="Nothing matches yet"
                  description="Try clearing a filter or browsing all categories."
                />
              </div>
            ) : (
              <ProductGrid products={products} loading={isLoading} />
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
