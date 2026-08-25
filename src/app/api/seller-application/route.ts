import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://zqekrkuwxgzkqnuhwlyi.supabase.co';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

export async function POST(request: NextRequest) {
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

    if (!supabaseServiceKey) {
      return NextResponse.json({ error: 'Service role key not configured' }, { status: 500 });
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const { data, error } = await supabase
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
