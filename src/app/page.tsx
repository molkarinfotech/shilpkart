import Link from 'next/link';
import { ShoppingBag, Star, Users, Shield } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-50 to-primary-100 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-display font-bold text-primary-900 mb-6">
              Discover Authentic Indian Crafts
            </h1>
            <p className="text-xl text-primary-700 mb-8">
              Connect directly with talented artisans across India. Shop handcrafted textiles, 
              jewellery, handicrafts, and more.
            </p>
            <div className="flex gap-4 justify-center">
              <Link
                href="/marketplace"
                className="bg-primary-600 hover:bg-primary-700 text-white px-8 py-3 rounded-lg font-semibold"
              >
                Start Shopping
              </Link>
              <Link
                href="/seller/register"
                className="bg-white hover:bg-gray-50 text-primary-700 px-8 py-3 rounded-lg font-semibold border-2 border-primary-600"
              >
                Become a Seller
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-display font-bold text-center mb-12">
            Why Choose ShilpKart?
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard
              icon={<ShoppingBag className="w-12 h-12 text-primary-600" />}
              title="Authentic Products"
              description="Every product verified as genuinely handcrafted"
            />
            <FeatureCard
              icon={<Star className="w-12 h-12 text-primary-600" />}
              title="Quality Assured"
              description="Rigorous seller verification and quality checks"
            />
            <FeatureCard
              icon={<Users className="w-12 h-12 text-primary-600" />}
              title="Direct from Artisans"
              description="Fair prices supporting traditional crafts"
            />
            <FeatureCard
              icon={<Shield className="w-12 h-12 text-primary-600" />}
              title="Secure Payments"
              description="Protected transactions with escrow"
            />
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-display font-bold text-center mb-4">
            Shop by Category
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mt-8">
            <CategoryCard name="Textiles" slug="textiles" emoji="🧵" />
            <CategoryCard name="Jewellery" slug="jewellery" emoji="💎" />
            <CategoryCard name="Handicrafts" slug="handicrafts" emoji="🎨" />
            <CategoryCard name="Accessories" slug="women-accessories" emoji="👗" />
            <CategoryCard name="Handbags" slug="handbags" emoji="👜" />
            <CategoryCard name="Shawls" slug="shawls" emoji="🧣" />
          </div>
        </div>
      </section>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { 
  icon: React.ReactNode; 
  title: string; 
  description: string;
}) {
  return (
    <div className="text-center p-6">
      <div className="mb-4 flex justify-center">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}

function CategoryCard({ name, slug, emoji }: { 
  name: string; 
  slug: string; 
  emoji: string;
}) {
  return (
    <Link
      href={`/marketplace?category=${slug}`}
      className="bg-white hover:bg-primary-50 p-6 rounded-lg shadow-sm text-center"
    >
      <div className="text-4xl mb-2">{emoji}</div>
      <h3 className="font-semibold text-gray-800">{name}</h3>
    </Link>
  );
}
