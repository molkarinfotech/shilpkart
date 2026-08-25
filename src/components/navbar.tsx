'use client';

import Link from 'next/link';
import { ShoppingBag, User, Search } from 'lucide-react';

export function Navbar() {
  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="text-2xl font-display font-bold text-primary-700">
            ShilpKart
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <Link href="/marketplace" className="text-gray-700 hover:text-primary-700">
              Marketplace
            </Link>
            <Link href="/categories" className="text-gray-700 hover:text-primary-700">
              Categories
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search products..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 w-64"
              />
              <Search className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
            </div>
            <Link href="/cart" className="relative">
              <ShoppingBag className="w-6 h-6 text-gray-700 hover:text-primary-700" />
            </Link>
            <Link href="/auth/login" className="flex items-center gap-2 text-gray-700 hover:text-primary-700">
              <User className="w-6 h-6" />
              <span>Login</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
