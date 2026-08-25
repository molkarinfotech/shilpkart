import Link from 'next/link';

export default function CategoriesPage() {
  const categories = [
    { name: 'Textiles', slug: 'textiles', emoji: '🧵', description: 'Traditional Indian textiles and fabrics' },
    { name: 'Jewellery', slug: 'jewellery', emoji: '💎', description: 'Handcrafted Indian jewellery' },
    { name: 'Handicrafts', slug: 'handicrafts', emoji: '🎨', description: 'Traditional handicraft items' },
    { name: 'Women Accessories', slug: 'women-accessories', emoji: '👗', description: 'Accessories for women' },
    { name: 'Handbags', slug: 'handbags', emoji: '👜', description: 'Handmade handbags and purses' },
    { name: 'Shawls', slug: 'shawls', emoji: '🧣', description: 'Traditional shawls and stoles' },
  ];

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
              <Link href="/marketplace" className="text-gray-700 hover:text-primary-700">Marketplace</Link>
              <Link href="/categories" className="text-primary-700 font-medium">Categories</Link>
              <Link href="/" className="text-gray-700 hover:text-primary-700">Home</Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Page Header */}
      <section className="bg-white py-12 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Browse Categories</h1>
          <p className="text-lg text-gray-600">
            Explore our curated collection of handcrafted products
          </p>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category) => (
              <Link
                key={category.slug}
                href={`/marketplace?category=${category.slug}`}
                className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all p-6 transform hover:scale-105"
              >
                <div className="text-5xl mb-4">{category.emoji}</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{category.name}</h3>
                <p className="text-gray-600">{category.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
