"use client";

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

const CART_ITEMS_STORAGE_KEY = "cart_items";

export interface CartItemInput {
  id: string;
  name: string;
  platform: string;
  image: string;
  price: number;
  currency: string;
}

export interface CartItem extends CartItemInput {
  quantity: number;
}

function isValidCartItem(value: unknown): value is CartItem {
  if (!value || typeof value !== "object") return false;

  const item = value as CartItem;
  return (
    typeof item.id === "string" &&
    typeof item.name === "string" &&
    typeof item.platform === "string" &&
    typeof item.image === "string" &&
    typeof item.price === "number" &&
    typeof item.currency === "string" &&
    typeof item.quantity === "number"
  );
}

interface CartContextType {
  cartItems: CartItem[];
  cartCount: number;
  addToCart: (item: CartItemInput) => void;
  incrementItem: (itemId: string) => void;
  decrementItem: (itemId: string) => void;
  removeItem: (itemId: string) => void;
  resetCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    let idleCallbackId: number | undefined;
    let timeoutId: ReturnType<typeof setTimeout> | undefined;

    const hydrateCart = () => {
      const storedItems = localStorage.getItem(CART_ITEMS_STORAGE_KEY);
      if (!storedItems) return;

      try {
        const parsed = JSON.parse(storedItems) as unknown;
        if (!Array.isArray(parsed)) return;

        const sanitized = parsed.filter(isValidCartItem).map((item) => ({
          ...item,
          quantity: Number.isFinite(item.quantity)
            ? Math.max(1, Math.floor(item.quantity))
            : 1,
        }));

        setCartItems(sanitized);
      } catch {
        localStorage.removeItem(CART_ITEMS_STORAGE_KEY);
      }
    };

    if (typeof window.requestIdleCallback === "function") {
      idleCallbackId = window.requestIdleCallback(hydrateCart, {
        timeout: 2000,
      });
    } else {
      timeoutId = globalThis.setTimeout(hydrateCart, 300);
    }

    return () => {
      if (idleCallbackId !== undefined && "cancelIdleCallback" in window) {
        window.cancelIdleCallback(idleCallbackId);
      }
      if (timeoutId !== undefined) {
        globalThis.clearTimeout(timeoutId);
      }
    };
  }, []);

  useEffect(() => {
    if (cartItems.length === 0) {
      localStorage.removeItem(CART_ITEMS_STORAGE_KEY);
      return;
    }

    localStorage.setItem(CART_ITEMS_STORAGE_KEY, JSON.stringify(cartItems));
  }, [cartItems]);

  const cartCount = useMemo(
    () => cartItems.reduce((total, item) => total + item.quantity, 0),
    [cartItems],
  );

  const addToCart = (item: CartItemInput) => {
    setCartItems((prev) => {
      const existingIndex = prev.findIndex(
        (cartItem) => cartItem.id === item.id,
      );
      if (existingIndex === -1) {
        return [...prev, { ...item, quantity: 1 }];
      }

      return prev.map((cartItem, index) =>
        index === existingIndex
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem,
      );
    });
  };

  const incrementItem = (itemId: string) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item,
      ),
    );
  };

  const decrementItem = (itemId: string) => {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item.id === itemId ? { ...item, quantity: item.quantity - 1 } : item,
        )
        .filter((item) => item.quantity > 0),
    );
  };

  const removeItem = (itemId: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== itemId));
  };

  const resetCart = () => {
    setCartItems([]);
    localStorage.removeItem(CART_ITEMS_STORAGE_KEY);
  };

  const value = useMemo(
    () => ({
      cartItems,
      cartCount,
      addToCart,
      incrementItem,
      decrementItem,
      removeItem,
      resetCart,
    }),
    [cartItems, cartCount],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
