import Link from 'next/link';

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="text-3xl font-bold text-primary-700">
              🛍️ ShilpKart
            </Link>
            <Link href="/" className="text-gray-700 hover:text-primary-700">Home</Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-700 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            About ShilpKart
          </h1>
          <p className="text-xl text-primary-100 max-w-2xl mx-auto">
            Preserving traditional crafts, empowering artisans
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-xl shadow-md p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              ShilpKart is dedicated to connecting talented Indian artisans with buyers worldwide. 
              We believe in preserving traditional crafts and ensuring artisans receive fair compensation for their skilled work.
            </p>
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              Every product on our platform is handcrafted using traditional techniques passed down through generations. 
              By shopping on ShilpKart, you're not just buying a product - you're supporting a craftsperson and helping preserve cultural heritage.
            </p>
            <div className="text-center mt-8">
              <Link href="/marketplace" className="inline-block bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg font-medium transition-colors">
                Explore Marketplace →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
