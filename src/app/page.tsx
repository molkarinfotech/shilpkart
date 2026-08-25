import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Navigation */}
      <nav className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex-shrink-0">
              <Link href="/" className="text-3xl font-bold text-primary-700">
                🛍️ ShilpKart
              </Link>
            </div>
            <div className="hidden md:flex space-x-8">
              <Link href="/marketplace" className="text-gray-700 hover:text-primary-700 px-3 py-2 font-medium">
                Marketplace
              </Link>
              <Link href="/categories" className="text-gray-700 hover:text-primary-700 px-3 py-2 font-medium">
                Categories
              </Link>
              <Link href="/sellers" className="text-gray-700 hover:text-primary-700 px-3 py-2 font-medium">
                Our Artisans
              </Link>
              <Link href="/about" className="text-gray-700 hover:text-primary-700 px-3 py-2 font-medium">
                About
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/cart" className="text-gray-700 hover:text-primary-700">
                🛒 Cart
              </Link>
              <Link href="/auth/login" className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                Login
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-100 via-primary-50 to-orange-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold text-primary-900 mb-6 leading-tight">
              Discover Authentic Indian Handicrafts
            </h1>
            <p className="text-xl md:text-2xl text-primary-700 mb-8 leading-relaxed">
              Connect directly with talented artisans across India. Shop handcrafted textiles, jewellery, handicrafts, and more - each piece tells a story.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/marketplace"
                className="bg-primary-600 hover:bg-primary-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all transform hover:scale-105 shadow-lg"
              >
                Start Shopping →
              </Link>
              <Link
                href="/seller/register"
                className="bg-white hover:bg-gray-50 text-primary-700 px-8 py-4 rounded-lg font-semibold text-lg border-2 border-primary-600 transition-all transform hover:scale-105 shadow-lg"
              >
                Become a Seller
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-4 text-gray-900">
            Why Choose ShilpKart?
          </h2>
          <p className="text-center text-gray-600 mb-16 text-lg max-w-2xl mx-auto">
            We're more than just a marketplace - we're a community preserving traditional crafts
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard
              icon="🧵"
              title="Authentic Products"
              description="Every product is verified to be genuinely handcrafted by Indian artisans using traditional techniques"
            />
            <FeatureCard
              icon="⭐"
              title="Quality Assured"
              description="Rigorous seller verification and product quality checks ensure you receive the best"
            />
            <FeatureCard
              icon="👨‍🎨"
              title="Direct from Artisans"
              description="Fair prices that support artisans directly and help preserve traditional crafts"
            />
            <FeatureCard
              icon="🔒"
              title="Secure Payments"
              description="Protected transactions with escrow - payment released only after delivery confirmation"
            />
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-4 text-gray-900">
            Shop by Category
          </h2>
          <p className="text-center text-gray-600 mb-16 text-lg max-w-2xl mx-auto">
            Explore our curated collection of handcrafted products across multiple categories
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            <CategoryCard name="Textiles" slug="textiles" emoji="🧵" color="from-pink-100 to-pink-200" />
            <CategoryCard name="Jewellery" slug="jewellery" emoji="💎" color="from-purple-100 to-purple-200" />
            <CategoryCard name="Handicrafts" slug="handicrafts" emoji="🎨" color="from-blue-100 to-blue-200" />
            <CategoryCard name="Accessories" slug="accessories" emoji="👗" color="from-green-100 to-green-200" />
            <CategoryCard name="Handbags" slug="handbags" emoji="👜" color="from-yellow-100 to-yellow-200" />
            <CategoryCard name="Shawls" slug="shawls" emoji="🧣" color="from-red-100 to-red-200" />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6 text-white">
            Are You an Artisan?
          </h2>
          <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
            Join thousands of artisans selling their handcrafted products on ShilpKart. Reach customers worldwide and grow your business.
          </p>
          <Link
            href="/seller/register"
            className="inline-block bg-white hover:bg-gray-100 text-primary-900 px-8 py-4 rounded-lg font-semibold text-lg transition-all transform hover:scale-105 shadow-lg"
          >
            Start Selling Today →
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-4">🛍️ ShilpKart</h3>
              <p className="text-gray-400">
                Connecting artisans with buyers worldwide
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Shop</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/marketplace" className="hover:text-white">Marketplace</Link></li>
                <li><Link href="/categories" className="hover:text-white">Categories</Link></li>
                <li><Link href="/new-arrivals" className="hover:text-white">New Arrivals</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Sell</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/seller/register" className="hover:text-white">Become a Seller</Link></li>
                <li><Link href="/seller/stories" className="hover:text-white">Success Stories</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/help" className="hover:text-white">Help Center</Link></li>
                <li><Link href="/contact" className="hover:text-white">Contact Us</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p> © 2026 ShilpKart. Built with ❤️ for Indian artisans</p>
          </div>
        </div>
      </footer>
    </main>
  );
}

function FeatureCard({ icon, title, description }: { 
  icon: string; 
  title: string; 
  description: string;
}) {
  return (
    <div className="text-center p-6 rounded-xl hover:shadow-xl transition-shadow bg-white border border-gray-100">
      <div className="text-5xl mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-3 text-gray-900">{title}</h3>
      <p className="text-gray-600 leading-relaxed">{description}</p>
    </div>
  );
}

function CategoryCard({ name, slug, emoji, color }: { 
  name: string; 
  slug: string; 
  emoji: string;
  color: string;
}) {
  return (
    <Link
      href={`/marketplace?category=${slug}`}
      className={`bg-gradient-to-br ${color} p-6 rounded-xl shadow-md hover:shadow-xl transition-all transform hover:scale-105 text-center`}
    >
      <div className="text-5xl mb-3">{emoji}</div>
      <h3 className="font-semibold text-gray-800 text-lg">{name}</h3>
    </Link>
  );
}
