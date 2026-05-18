import { Link } from "@tanstack/react-router";
import { Minus, Plus, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { PriceDisplay } from "@/components/shared/PriceDisplay";
import { useCartStore } from "../store";
import type { CartLine } from "../schema";

export function CartLineItem({ line }: { line: CartLine }) {
  const setQuantity = useCartStore((s) => s.setQuantity);
  const remove = useCartStore((s) => s.remove);

  return (
    <div className="flex gap-4 border-b border-border/40 py-5">
      <Link
        to="/products/$slug"
        params={{ slug: line.slug }}
        className="block h-28 w-24 shrink-0 overflow-hidden rounded-xl bg-secondary"
      >
        <img
          src={line.image}
          alt={line.name}
          loading="lazy"
          className="h-full w-full object-cover"
        />
      </Link>

      <div className="flex flex-1 flex-col justify-between gap-3">
        <div className="flex items-start justify-between gap-3">
          <Link
            to="/products/$slug"
            params={{ slug: line.slug }}
            className="font-display text-lg leading-tight text-foreground hover:underline"
          >
            {line.name}
          </Link>
          <button
            type="button"
            onClick={() => remove(line.productId)}
            className="text-muted-foreground transition-colors hover:text-foreground"
            aria-label={`Remove ${line.name} from cart`}
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="flex items-center justify-between">
          <div className="inline-flex items-center rounded-full border border-border">
            <Button
              size="icon"
              variant="ghost"
              className="h-8 w-8 rounded-full"
              onClick={() => setQuantity(line.productId, line.quantity - 1)}
              aria-label="Decrease quantity"
            >
              <Minus className="h-3 w-3" />
            </Button>
            <span className="w-8 text-center text-sm tabular-nums">{line.quantity}</span>
            <Button
              size="icon"
              variant="ghost"
              className="h-8 w-8 rounded-full"
              onClick={() => setQuantity(line.productId, line.quantity + 1)}
              aria-label="Increase quantity"
            >
              <Plus className="h-3 w-3" />
            </Button>
          </div>

          <PriceDisplay
            priceCents={line.priceCents * line.quantity}
            currency={line.currency}
            size="sm"
          />
        </div>
      </div>
    </div>
  );
}
