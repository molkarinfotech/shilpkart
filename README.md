# ShilpKart - Indian Artisan Marketplace

🛍️ Connecting traditional Indian craftspeople with buyers worldwide

## Features

- **Multi-vendor marketplace** - Artisans can register and sell products
- **Seller verification** - Aadhaar-based verification system
- **Product management** - Full CRUD with images, variants, inventory
- **Shopping cart** - Guest and registered user support
- **Payment integration** - Stripe (international) + Razorpay (India: UPI, Paytm, cards)
- **Order management** - Complete order lifecycle tracking
- **Reviews & ratings** - Product and seller reviews
- **Commission system** - 30% marketplace commission on sales

## Tech Stack

- **Frontend**: Next.js 14, React, TypeScript, Tailwind CSS
- **Backend**: Supabase (PostgreSQL, Auth, Storage, Edge Functions)
- **Payments**: Stripe + Razorpay
- **Deployment**: Vercel
- **Email**: Resend

## Getting Started

### Prerequisites

- Node.js 18+
- Supabase account
- Stripe account
- Razorpay account (for Indian payments)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/molkarinfotech/shilpkart.git
cd shilpkart
```

2. Install dependencies:
```bash
npm install
```

3. Copy `.env.example` to `.env.local` and fill in your keys:
```bash
cp .env.example .env.local
```

4. Set up Supabase database:
   - Create a new Supabase project
   - Run the SQL migrations in `supabase/migrations/`
   - Update the Supabase URL and keys in `.env.local`

5. Start the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the marketplace.

## Project Structure

```
shilpkart/
├── src/
│   ├── app/              # Next.js App Router
│   │   ├── (marketplace)/ # Public marketplace pages
│   │   ├── (dashboard)/   # User dashboards
│   │   │   ├── seller/    # Seller dashboard
│   │   │   ├── buyer/     # Buyer dashboard
│   │   │   └── admin/     # Admin panel
│   │   ├── api/           # API routes
│   │   └── layout.tsx
│   ├── components/        # Reusable components
│   ├── lib/              # Utilities and helpers
│   └── types/            # TypeScript types
├── supabase/
│   └── migrations/        # Database migrations
├── types/
│   └── database.ts        # Supabase generated types
└── public/               # Static assets
```

## Database Schema

The database includes:
- User profiles (buyers, sellers, admins)
- Seller verification (Aadhaar, PAN, GST)
- Products with variants and inventory
- Orders and order items
- Payments with escrow
- Reviews and ratings
- Shopping cart and favorites
- Categories (hierarchical)
- Coupons and discounts

## Payment Flow

1. Buyer places order → Payment authorized
2. Seller ships product → Payment captured
3. Delivery confirmed → Funds released to seller (minus 30% commission)

## Seller Verification

For production, integrate with:
- **Signzy** or **Perfios** for Aadhaar verification
- **Digio** for e-KYC
- **Karza** for identity verification

For prototype: Manual admin verification of uploaded documents.

## License

MIT

---

Built with ❤️ for Indian artisans
