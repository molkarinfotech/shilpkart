import type { Metadata } from 'next';
import './globals.css';
import { DemoCartProvider } from '@/components/demo-cart-provider';

export const metadata: Metadata = { title: 'ShilpKart — Handcrafted in India', description: 'Discover considered, artisan-made pieces from across India.' };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en"><body><DemoCartProvider>{children}</DemoCartProvider></body></html>; }
