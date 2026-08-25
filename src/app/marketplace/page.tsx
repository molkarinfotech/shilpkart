import Link from 'next/link';

export default function MarketplacePage() {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="text-3xl font-bold text-primary-700">
              🛍️ ShilpKart
            </Link>
            <div className="flex space-x-6">
              <Link href="/marketplace" className="text-primary-700 font-medium">Marketplace</Link>
              <Link href="/categories" className="text-gray-700 hover:text-primary-700">Categories</Link>
              <Link href="/" className="text-gray-700 hover:text-primary-700">Home</Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Page Header */}
      <section className="bg-white py-12 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Marketplace</h1>
          <p className="text-lg text-gray-600">
            Discover unique handcrafted products from talented Indian artisans
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-xl shadow-md p-8 text-center">
            <div className="text-6xl mb-4">🎨</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Coming Soon!</h2>
            <p className="text-gray-600 mb-6 max-w-xl mx-auto">
              We're working hard to bring you an amazing marketplace experience. 
              Soon you'll be able to browse products, filter by category, and discover unique handicrafts.
            </p>
            <Link href="/" className="inline-block bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg font-medium transition-colors">
              ← Back to Home
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
