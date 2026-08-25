import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'ShilpKart | Indian Artisan Marketplace',
  description: 'Discover handcrafted Indian textiles, jewellery, handicrafts and more.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
