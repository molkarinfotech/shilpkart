import { NextRequest, NextResponse } from 'next/server';
import {
  getSession,
  isMarketplaceAdmin,
  getVerifiedSellerProfile,
} from '@/lib/supabase/auth';

export async function GET() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ user: null }, { status: 200 });
  }

  const { user } = session;

  let role: string | null = null;
  let sellerProfile: Awaited<ReturnType<typeof getVerifiedSellerProfile>> = null;

  try {
    const { createServerSupabaseClient } = await import('@/lib/supabase/auth');
    const supabase = createServerSupabaseClient();

    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .maybeSingle();
    role = profile?.role ?? null;

    sellerProfile = await getVerifiedSellerProfile(user.id);
  } catch {
    // If the DB is not wired yet, return what we know from auth.
  }

  return NextResponse.json(
    {
      user: {
        id: user.id,
        email: user.email,
        role,
        isVerifiedSeller: sellerProfile !== null,
      },
    },
    { status: 200 }
  );
}
