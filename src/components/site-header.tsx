import Link from 'next/link';

export function SiteHeader() {
  return (
    <header className="border-b border-orange-100 bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5">
        <Link href="/" className="text-2xl font-bold tracking-tight text-orange-800">Shilp<span className="text-amber-500">Kart</span></Link>
        <nav className="hidden items-center gap-7 text-sm font-semibold text-stone-700 md:flex">
          <Link href="/marketplace" className="hover:text-orange-700">Marketplace</Link>
          <Link href="/categories" className="hover:text-orange-700">Categories</Link>
          <Link href="/sellers" className="hover:text-orange-700">Our Artisans</Link>
          <Link href="/about" className="hover:text-orange-700">About</Link>
        </nav>
        <div className="flex items-center gap-3 text-sm font-semibold">
          <Link href="/cart" className="hidden rounded-full border border-stone-200 px-4 py-2 text-stone-700 hover:border-orange-400 sm:block">Cart</Link>
          <Link href="/auth/login" className="rounded-full bg-orange-700 px-4 py-2 text-white hover:bg-orange-800">Sign in</Link>
        </div>
      </div>
    </header>
  );
}
