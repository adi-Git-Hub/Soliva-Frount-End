import { createFileRoute } from "@tanstack/react-router";

import { CategoryCard } from "@/features/catalog/components/CategoryCard";
import { useCategories } from "@/features/catalog/api";
import { Skeleton } from "@/components/ui/skeleton";

export const Route = createFileRoute("/_public/categories/")({
  component: CategoriesRoute,
});

function CategoriesRoute() {
  const { data: categories = [], isLoading } = useCategories();

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:py-12 md:px-8 md:py-16 safe-x">
      <header className="mb-6 sm:mb-10">
        <h1 className="font-display text-3xl sm:text-4xl text-foreground md:text-5xl">Categories</h1>
        <p className="mt-2 text-sm text-muted-foreground">Browse the collection by category.</p>
      </header>

      {isLoading ? (
        <div className="grid grid-cols-1 gap-5 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="aspect-[5/6] w-full rounded-2xl" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-5 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
          {categories.map((c) => (
            <CategoryCard key={c.id} category={c} />
          ))}
        </div>
      )}
    </div>
  );
}
