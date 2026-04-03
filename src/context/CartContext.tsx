import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import type { Product } from "../data/products";

type CartItem = {
  product: Product;
  size?: string;
  qty: number;
};

type CartContextValue = {
  items: CartItem[];
  addItem: (product: Product, size?: string) => void;
  removeItem: (productId: string, size?: string) => void;
  updateQty: (productId: string, qty: number, size?: string) => void;
  subtotal: number;
  count: number;
  toast: { message: string; subtitle?: string } | null;
  clearToast: () => void;
};

const CartContext = createContext<CartContextValue | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [toast, setToast] = useState<{ message: string; subtitle?: string } | null>(null);
  const toastTimer = useMemo<{ id: ReturnType<typeof setTimeout> | null }>(() => ({ id: null }), []);

  const addItem = (product: Product, size?: string) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.product.id === product.id && i.size === size);
      if (existing) {
        return prev.map((i) =>
          i.product.id === product.id && i.size === size ? { ...i, qty: i.qty + 1 } : i
        );
      }
      return [...prev, { product, size, qty: 1 }];
    });
    if (toastTimer.id) clearTimeout(toastTimer.id);
    setToast({ message: `${product.name}`, subtitle: "Added to bag" });
    toastTimer.id = setTimeout(() => setToast(null), 2400);
  };

  const removeItem = (productId: string, size?: string) => {
    setItems((prev) => prev.filter((i) => !(i.product.id === productId && i.size === size)));
  };

  const updateQty = (productId: string, qty: number, size?: string) => {
    setItems((prev) =>
      prev
        .map((i) =>
          i.product.id === productId && i.size === size ? { ...i, qty: Math.max(1, qty) } : i
        )
        .filter((i) => i.qty > 0)
    );
  };

  const subtotal = useMemo(
    () => items.reduce((sum, item) => sum + item.product.price * item.qty, 0),
    [items]
  );
  const count = useMemo(() => items.reduce((sum, item) => sum + item.qty, 0), [items]);

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQty,
        subtotal,
        count,
        toast,
        clearToast: () => setToast(null),
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
};
