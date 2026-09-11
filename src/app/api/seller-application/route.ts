import { NextRequest, NextResponse } from 'next/server';
import { createSupabaseServiceClient } from '@/lib/supabase/config';

export async function POST(request: NextRequest) {
  let client: ReturnType<typeof createSupabaseServiceClient>;
  try {
    client = createSupabaseServiceClient();
  } catch (error) {
    console.error('Supabase service client could not be created:', error);
    return NextResponse.json(
      { error: 'Seller applications are not configured yet. Add SUPABASE_SERVICE_ROLE_KEY to your environment and redeploy.' },
      { status: 503 }
    );
  }

  try {
    const body = await request.json();
    const {
      full_name,
      email,
      phone,
      business_name,
      craft_category,
      craft_story,
      city,
      state,
      pincode,
      delivery_preference,
      aadhaar_last_four,
      verification_consent,
    } = body;

    if (!full_name || !email || !phone || !business_name || !craft_category || !craft_story || !city || !state || !pincode || !delivery_preference) {
      return NextResponse.json(
        { error: 'Please complete all required fields.' },
        { status: 400 }
      );
    }

    const { data, error } = await client
      .from('seller_applications')
      .insert({
        full_name,
        email,
        phone,
        business_name,
        craft_category,
        craft_story,
        city,
        state,
        pincode,
        delivery_preference,
        aadhaar_last_four: aadhaar_last_four || null,
        verification_consent: verification_consent ?? false,
        status: 'pending',
      })
      .select()
      .single();

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('Request error:', error);
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }
}
