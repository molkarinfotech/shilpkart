import { NextResponse } from 'next/server';
import { createSupabaseServiceClient } from '@/lib/supabase/config';
import { calculateShippingInRupees, calculateTotalInRupees } from '@/lib/policy';

/**
 * POST /api/demo-orders
 *
 * Demo-only order creation path. Writes a "cod / pending" order and its
 * line items into the `demo_orders` / `demo_order_items` tables so the
 * shopping flow can be exercised end to end without live payments.
 *
 * This is NOT a production checkout path. A real checkout flow with Stripe
 * or Razorpay, payment intents, webhooks, and order lifecycle state is
 * planned but not yet wired.
 *
 * Requires:
 *  - SUPABASE_SERVICE_ROLE_KEY (server-side only, bypasses RLS)
 *  - NEXT_PUBLIC_DEMO_MODE=true (opt-in gate, so deploys do not expose the
 *    demo order path by accident)
 */
export async function POST(request: Request) {
  if (!process.env.NEXT_PUBLIC_DEMO_MODE) {
    return NextResponse.json(
      {
        error:
          'Checkout is not available yet. The demo order path is disabled by default.',
      },
      { status: 503 }
    );
  }

  let client: ReturnType<typeof createSupabaseServiceClient>;
  try {
    client = createSupabaseServiceClient();
  } catch (error) {
    console.error('Supabase service client could not be created:', error);
    return NextResponse.json(
      {
        error:
          'Checkout is not configured yet. Add SUPABASE_SERVICE_ROLE_KEY to your environment and redeploy.',
      },
      { status: 503 }
    );
  }

  type IncomingItem = { id: string; quantity: number };
  type CheckoutPayload = {
    buyerName?: string;
    buyerEmail?: string;
    addressLine1?: string;
    city?: string;
    state?: string;
    pincode?: string;
    items?: IncomingItem[];
  };

  try {
    const body = (await request.json()) as CheckoutPayload;
    const { buyerName, buyerEmail, addressLine1, city, state, pincode, items } =
      body;

    if (
      !buyerName ||
      !buyerEmail ||
      !addressLine1 ||
      !city ||
      !state ||
      !/^[1-9][0-9]{5}$/.test(pincode || '') ||
      !items?.length
    ) {
      return NextResponse.json(
        { error: 'Please complete your contact, delivery and bag details.' },
        { status: 400 }
      );
    }

    if (
      items.some(
        (item) =>
          !item.id ||
          !Number.isInteger(item.quantity) ||
          item.quantity < 1 ||
          item.quantity > 10
      )
    ) {
      return NextResponse.json(
        { error: 'Your bag contains an invalid item.' },
        { status: 400 }
      );
    }

    const ids = items.map((item) => item.id).filter(
      (id, index, values) => values.indexOf(id) === index
    );
    const { data: products, error: productsError } = await client
      .from('demo_products')
      .select('id,title,price_inr')
      .in('id', ids);

    if (productsError || !products || products.length !== ids.length) {
      return NextResponse.json(
        { error: 'One or more products are no longer available.' },
        { status: 400 }
      );
    }

    const catalog = new Map(products.map((product) => [product.id, product]));
    const detailedItems = items.map((item) => {
      const product = catalog.get(item.id);
      if (!product) throw new Error('Missing product');
      return {
        ...item,
        title: product.title,
        price: product.price_inr,
        lineTotal: product.price_inr * item.quantity,
      };
    });

    const subtotal = detailedItems.reduce(
      (sum, item) => sum + item.lineTotal,
      0
    );
    const shipping = calculateShippingInRupees(subtotal);
    const total = calculateTotalInRupees(subtotal);
    const orderNumber = `SK-${Date.now().toString(36).toUpperCase()}-${Math.floor(Math.random() * 900 + 100)}`;

    const { data: order, error: orderError } = await client
      .from('demo_orders')
      .insert({
        order_number: orderNumber,
        buyer_name: buyerName.trim(),
        buyer_email: buyerEmail.trim().toLowerCase(),
        shipping_address_line1: addressLine1.trim(),
        shipping_city: city.trim(),
        shipping_state: state.trim(),
        shipping_pincode: pincode,
        subtotal_amount: subtotal,
        shipping_amount: shipping,
        total_amount: total,
        payment_method: 'cod',
        payment_status: 'pending',
        status: 'confirmed',
      })
      .select('id')
      .single();

    if (orderError || !order) throw orderError || new Error('Order could not be created.');

    const { error: itemsError } = await client.from('demo_order_items').insert(
      detailedItems.map((item) => ({
        order_id: order.id,
        demo_product_id: item.id,
        product_title: item.title,
        quantity: item.quantity,
        unit_price: item.price,
        line_total: item.lineTotal,
      }))
    );

    if (itemsError) {
      await client.from('demo_orders').delete().eq('id', order.id);
      throw itemsError;
    }

    return NextResponse.json({ orderNumber });
  } catch (error) {
    console.error('Demo order creation failed', error);
    return NextResponse.json(
      { error: 'We could not place your order. Please try again.' },
      { status: 500 }
    );
  }
}
