# ShilpKart - Indian Artisan Marketplace

🛍️ Connecting traditional Indian craftspeople with buyers worldwide

## What works today

- **Homepage** — artisan-first landing page with category entry points.
- **Marketplace** — product grid backed by Supabase `demo_products`, with
  category filtering via `?category=` query param.
- **Product detail** — single product page with artisan name, location,
  price, compare-at price, description, and maker's story.
- **Cart** — client-side cart persisted to `localStorage`, with quantity
  steppers, remove, and computed totals.
- **Checkout (demo mode)** — validates shipping details and creates a
  `demo_orders` / `demo_order_items` record in Supabase. This is a **demo
  path only** — it records COD/pending orders for exercising the flow, not
  live payments.
- **Seller application** — artisans can submit an application; admins can
  review applications in a table with status filters.

## What is planned, not yet wired

- **User authentication** — login page exists as a UI stub; Supabase Auth
  (email + providers) with protected dashboard routes is planned.
- **Seller registration** — the application form exists, but the path from
  "approved application" to a real seller profile with product CRUD is planned.
- **Payments** — Stripe and Razorpay packages are installed and utility files
  exist, but checkout currently records COD/pending demo orders. A real
  checkout flow with payment intents, webhooks, and order lifecycle state is
  planned.
- **Product CRUD for sellers** — no seller-facing product management UI yet.
- **Reviews and ratings** — planned.
- **Escrow / order lifecycle** — the README payment flow (authorized → captured
  → released) is the design goal; the current code does not implement it.

## Tech Stack

- **Frontend**: Next.js 14, React, TypeScript, Tailwind CSS
- **Backend**: Supabase (PostgreSQL, Auth, Storage) — configured via
  environment variables; the app does not ship with a shared project URL
- **Payments (planned)**: Stripe + Razorpay
- **Deployment**: Vercel
- **Email (planned)**: Resend

## Getting Started

### Prerequisites

- Node.js 18+
- A Supabase project (create your own — do not use a shared project URL)

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

4. Open `.env.local` and set at minimum:

```env
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
NEXT_PUBLIC_DEMO_MODE=true
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

`NEXT_PUBLIC_DEMO_MODE=true` enables the demo shopping flow so you can add
items to the cart and complete checkout against the `demo_products` and
`demo_orders` tables. Leave it `false` (the default) on production deploys.

5. Set up the Supabase schema:

   - Create a new Supabase project
   - Apply the SQL migrations that define `demo_products`, `demo_orders`,
     `demo_order_items`, and `seller_applications` (todo: add to
     `supabase/migrations/`)
   - Update the Supabase URL and keys in `.env.local`

6. Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the marketplace.

## Project Structure

```
shilpkart/
├── src/
│   ├── app/              # Next.js App Router
│   │   ├── api/          # API routes (demo-orders, seller-application)
│   │   ├── auth/         # Auth pages (login stub)
│   │   ├── cart/         # Cart page
│   │   ├── checkout/     # Checkout + success page
│   │   ├── marketplace/  # Product listing
│   │   ├── products/     # Product detail ([slug])
│   │   ├── seller/       # Seller registration
│   │   ├── sellers/      # Artisan directory (static)
│   │   ├── admin/        # Admin seller-application review
│   │   ├── categories/   # Categories (static)
│   │   ├── about/        # About page
│   │   └── layout.tsx
│   ├── components/       # Reusable components
│   ├── lib/
│   │   ├── supabase/     # Supabase client config
│   │   ├── demo-products.ts
│   │   └── policy.ts     # Shared marketplace policy
│   └── types/
│       └── database.ts   # Supabase generated types
├── types/
│   └── database.ts       # Supabase generated types (mirror)
├── .env.example
├── SETUP_GUIDE.md
├── tailwind.config.ts
└── postcss.config.mjs
```

## Current Data Model

The running code speaks to these tables (not the full schema in
`types/database.ts`):

- `demo_products` — product cards shown on the marketplace and product pages.
- `demo_orders` / `demo_order_items` — demo checkout records.
- `seller_applications` — artisan applications submitted via
  `/seller/register`.

The intended production schema (profiles, seller_profiles, products,
categories, orders, payments, reviews, cart, coupons) is defined in
`src/types/database.ts` and is the target for the next phase of work.

## Payment Flow (design goal)

1. Buyer places order → Payment authorized
2. Seller ships product → Payment captured
3. Delivery confirmed → Funds released to seller (minus 30% commission)

This flow is the design goal. The current checkout records COD/pending demo
orders and does not yet integrate Stripe or Razorpay.

## Seller Verification

For production, integrate with:

- **Signzy** or **Perfios** for Aadhaar verification
- **Digio** for e-KYC
- **Karza** for identity verification

For the prototype: manual admin review of seller applications submitted
through `/seller/register`.

## Marketplace Policy

- Shipping: free above ₹2,500, else ₹180.
- Commission: 30% marketplace commission on sales.

These are defined in `src/lib/policy.ts` and used by the cart, checkout, and
demo order API so they stay in sync.

## License

MIT

---

Built with ❤️ for Indian artisans
