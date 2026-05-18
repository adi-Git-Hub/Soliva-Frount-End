import { create } from "zustand";
import { persist } from "zustand/middleware";

import type { CartLine } from "./schema";

type CartState = {
  lines: CartLine[];
  add: (line: Omit<CartLine, "quantity"> & { quantity?: number }) => void;
  remove: (productId: string) => void;
  setQuantity: (productId: string, quantity: number) => void;
  clear: () => void;
};

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      lines: [],
      add: (input) => {
        const quantity = input.quantity ?? 1;
        const existing = get().lines.find((l) => l.productId === input.productId);
        if (existing) {
          set({
            lines: get().lines.map((l) =>
              l.productId === input.productId ? { ...l, quantity: l.quantity + quantity } : l,
            ),
          });
          return;
        }
        const { quantity: _omit, ...rest } = input;
        set({ lines: [...get().lines, { ...rest, quantity }] });
      },
      remove: (productId) => set({ lines: get().lines.filter((l) => l.productId !== productId) }),
      setQuantity: (productId, quantity) => {
        if (quantity <= 0) {
          set({ lines: get().lines.filter((l) => l.productId !== productId) });
          return;
        }
        set({
          lines: get().lines.map((l) => (l.productId === productId ? { ...l, quantity } : l)),
        });
      },
      clear: () => set({ lines: [] }),
    }),
    {
      name: "soliva.cart",
      version: 1,
    },
  ),
);

// Selectors
export const selectCartCount = (s: CartState) => s.lines.reduce((sum, l) => sum + l.quantity, 0);

export const selectCartSubtotalCents = (s: CartState) =>
  s.lines.reduce((sum, l) => sum + l.priceCents * l.quantity, 0);
