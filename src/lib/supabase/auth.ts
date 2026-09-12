import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

export function createServerSupabaseClient() {
  const cookieStore = cookies();
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL ?? '',
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? '',
    {
      cookies: {
        getAll() {
          return cookieStore.getAll().map((cookie) => ({
            name: cookie.name,
            value: cookie.value,
          }));
        },
        setAll(cookiesToSet: { name: string; value: string; options?: Record<string, unknown> }[]) {
          for (const { name, value, options } of cookiesToSet) {
            cookieStore.set(name, value, options as any);
          }
        },
      },
    }
  );
}

export async function getSession() {
  try {
    const supabase = createServerSupabaseClient();
    const { data: { session } } = await supabase.auth.getSession();
    return session;
  } catch {
    return null;
  }
}

export async function getCurrentUser() {
  const session = await getSession();
  if (!session) return null;
  try {
    const supabase = createServerSupabaseClient();
    const { data: profile } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', session.user.id)
      .maybeSingle();
    return { session, profile };
  } catch {
    return { session, profile: null };
  }
}

export async function getUserRole() {
  const currentUser = await getCurrentUser();
  return currentUser?.profile?.role ?? null;
}

export async function isAdmin() {
  const role = await getUserRole();
  return role === 'admin' || role === 'superadmin';
}

/** For admin pages: verify the request is from the marketplace admin email. */
export async function isMarketplaceAdmin() {
  const role = await getUserRole();
  if (role === 'superadmin' || role === 'admin') return true;

  const expectedAdminEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL;
  if (!expectedAdminEmail) return false;

  try {
    const supabase = createServerSupabaseClient();
    const session = await getSession();
    if (!session) return false;
    const { data: profile } = await supabase
      .from('profiles')
      .select('email')
      .eq('id', session.user.id)
      .maybeSingle();
    return profile?.email === expectedAdminEmail;
  } catch {
    return false;
  }
}

export async function signIn(email: string, password: string) {
  const supabase = createServerSupabaseClient();
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  return { data, error };
}

export async function signUp(email: string, password: string, fullName: string) {
  const supabase = createServerSupabaseClient();
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: { data: { full_name: fullName } },
  });
  return { data, error };
}

export async function signOut() {
  const supabase = createServerSupabaseClient();
  const { error } = await supabase.auth.signOut();
  return { error };
}

/** Returns the verified seller profile for the current user, or null. */
export async function getVerifiedSellerProfile(userId: string) {
  try {
    const supabase = createServerSupabaseClient();
    const { data } = await supabase
      .from('seller_profiles')
      .select('*')
      .eq('seller_id', userId)
      .eq('status', 'verified')
      .maybeSingle();
    return data;
  } catch {
    return null;
  }
}

/** Returns true when the user is a verified seller. */
export async function isVerifiedSeller(userId: string, role: string | null) {
  if (role !== 'seller') return false;
  const sellerProfile = await getVerifiedSellerProfile(userId);
  return sellerProfile !== null;
}
