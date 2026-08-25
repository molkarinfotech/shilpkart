'use client';

import { createContext, useContext, useEffect, useMemo, useState } from 'react';

export type CartItem = {
  id: string;
  slug: string;
  title: string;
  priceInr: number;
  imageUrl?: string | null;
  imageLabel?: string;
  artisanName?: string;
  artisanLocation?: string;
  quantity: number;
};

type AddableCartItem = Omit<CartItem, 'quantity'>;
type DemoCartContextValue = { items: CartItem[]; count: number; subtotal: number; add: (item: AddableCartItem) => void; setQuantity: (id: string, quantity: number) => void; remove: (id: string) => void; clear: () => void };
const DemoCartContext = createContext<DemoCartContextValue | null>(null);
const storageKey = 'shilpkart-demo-cart';

export function DemoCartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [ready, setReady] = useState(false);
  useEffect(() => { try { const stored = window.localStorage.getItem(storageKey); if (stored) setItems(JSON.parse(stored)); } catch { window.localStorage.removeItem(storageKey); } finally { setReady(true); } }, []);
  useEffect(() => { if (ready) window.localStorage.setItem(storageKey, JSON.stringify(items)); }, [items, ready]);
  const value = useMemo<DemoCartContextValue>(() => ({
    items,
    count: items.reduce((total, item) => total + item.quantity, 0),
    subtotal: items.reduce((total, item) => total + item.priceInr * item.quantity, 0),
    add: (item) => setItems((current) => { const existing = current.find((entry) => entry.id === item.id); return existing ? current.map((entry) => entry.id === item.id ? { ...entry, quantity: entry.quantity + 1 } : entry) : [...current, { ...item, quantity: 1 }]; }),
    setQuantity: (id, quantity) => setItems((current) => quantity <= 0 ? current.filter((item) => item.id !== id) : current.map((item) => item.id === id ? { ...item, quantity } : item)),
    remove: (id) => setItems((current) => current.filter((item) => item.id !== id)),
    clear: () => setItems([]),
  }), [items]);
  return <DemoCartContext.Provider value={value}>{children}</DemoCartContext.Provider>;
}

export function useDemoCart() { const context = useContext(DemoCartContext); if (!context) throw new Error('useDemoCart must be used within DemoCartProvider'); return context; }
