import Link from 'next/link';

export default function SellerRegisterPage() {
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
            Become a Seller on ShilpKart
          </h1>
          <p className="text-xl text-primary-100 max-w-2xl mx-auto">
            Join thousands of artisans selling their handcrafted products to customers worldwide
          </p>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
            Why Sell on ShilpKart?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <BenefitCard
              icon="🌍"
              title="Reach Global Customers"
              description="Sell to customers across India and internationally"
            />
            <BenefitCard
              icon="💰"
              title="Fair Commission"
              description="Only 30% commission - you keep 70% of every sale"
            />
            <BenefitCard
              icon="🔒"
              title="Secure Payments"
              description="Get paid reliably through our escrow system"
            />
            <BenefitCard
              icon="📊"
              title="Seller Dashboard"
              description="Easy-to-use tools to manage products and orders"
            />
            <BenefitCard
              icon="📦"
              title="Shipping Support"
              description="Choose your own shipping or use our partners"
            />
            <BenefitCard
              icon="🎯"
              title="Marketing Support"
              description="We promote your products to our customer base"
            />
          </div>
        </div>
      </section>

      {/* Registration Form Placeholder */}
      <section className="py-16 bg-white">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gray-50 rounded-xl shadow-md p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Registration Form
            </h2>
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📝</div>
              <p className="text-gray-600 mb-6">
                Registration form coming soon! We're building a simple process to get you started.
              </p>
              <Link href="/" className="inline-block bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg font-medium transition-colors">
                ← Back to Home
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function BenefitCard({ icon, title, description }: { 
  icon: string; 
  title: string; 
  description: string;
}) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-100">
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2 text-gray-900">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}
