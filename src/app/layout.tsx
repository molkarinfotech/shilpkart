import type { Metadata } from 'next';
import './globals.css';
import { DemoCartProvider } from '@/components/demo-cart-provider';

export const metadata: Metadata = {
  title: 'ShilpKart | Indian Artisan Marketplace',
  description: 'Discover handcrafted Indian textiles, jewellery, handicrafts and more.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <DemoCartProvider>{children}</DemoCartProvider>
      </body>
    </html>
  );
}
