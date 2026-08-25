import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

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

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://zqekrkuwxgzkqnuhwlyi.supabase.co';

export async function POST(request: Request) {
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!serviceRoleKey) {
    return NextResponse.json(
      { error: 'Checkout is not configured yet. Please add SUPABASE_SERVICE_ROLE_KEY in Vercel and redeploy.' },
      { status: 503 },
    );
  }

  try {
    const body = (await request.json()) as CheckoutPayload;
    const { buyerName, buyerEmail, addressLine1, city, state, pincode, items } = body;

    if (!buyerName || !buyerEmail || !addressLine1 || !city || !state || !/^[1-9][0-9]{5}$/.test(pincode || '') || !items?.length) {
      return NextResponse.json({ error: 'Please complete your contact, delivery and bag details.' }, { status: 400 });
    }

    if (items.some((item) => !item.id || !Number.isInteger(item.quantity) || item.quantity < 1 || item.quantity > 10)) {
      return NextResponse.json({ error: 'Your bag contains an invalid item.' }, { status: 400 });
    }

    const supabase = createClient(supabaseUrl, serviceRoleKey, {
      auth: { persistSession: false, autoRefreshToken: false },
    });
    const ids = [...new Set(items.map((item) => item.id))];
    const { data: products, error: productsError } = await supabase
      .from('demo_products')
      .select('id,title,price_inr')
      .in('id', ids);

    if (productsError || !products || products.length !== ids.length) {
      return NextResponse.json({ error: 'One or more products are no longer available.' }, { status: 400 });
    }

    const catalog = new Map(products.map((product) => [product.id, product]));
    const detailedItems = items.map((item) => {
      const product = catalog.get(item.id);
      if (!product) throw new Error('Missing product');
      return { ...item, title: product.title, price: product.price_inr, lineTotal: product.price_inr * item.quantity };
    });
    const subtotal = detailedItems.reduce((sum, item) => sum + item.lineTotal, 0);
    const shipping = subtotal >= 2500 ? 0 : 180;
    const total = subtotal + shipping;
    const orderNumber = `SK-${Date.now().toString(36).toUpperCase()}-${Math.floor(Math.random() * 900 + 100)}`;

    const { data: order, error: orderError } = await supabase
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

    const { error: itemsError } = await supabase.from('demo_order_items').insert(
      detailedItems.map((item) => ({
        order_id: order.id,
        demo_product_id: item.id,
        product_title: item.title,
        quantity: item.quantity,
        unit_price: item.price,
        line_total: item.lineTotal,
      })),
    );

    if (itemsError) {
      await supabase.from('demo_orders').delete().eq('id', order.id);
      throw itemsError;
    }

    return NextResponse.json({ orderNumber });
  } catch (error) {
    console.error('Demo order creation failed', error);
    return NextResponse.json({ error: 'We could not place your order. Please try again.' }, { status: 500 });
  }
}
