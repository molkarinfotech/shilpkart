import { createClient } from '@supabase/supabase-js';
import { createBrowserClient } from '@supabase/ssr';
import type { Database } from '@/types/database';

const rawSupabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const rawSupabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const rawServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

function requiredEnv(name: string, value: string | undefined): string {
  if (!value) {
    throw new Error(
      `Missing required environment variable: ${name}. ` +
        `Copy .env.example to .env.local and fill in your Supabase credentials, ` +
        `then restart the dev server.`
    );
  }
  return value;
}

/**
 * Supabase config is read from environment variables.
 *
 * The module never throws at import time — validation happens inside the
 * create*Client functions, so importing this module is safe during build,
 * test, and preview environments even when the env vars are absent.
 */
export const supabaseConfig = {
  url: rawSupabaseUrl,
  anonKey: rawSupabaseAnonKey,
  serviceRoleKey: rawServiceRoleKey,
} as const;

export function createSupabaseClient() {
  return createClient(
    requiredEnv('NEXT_PUBLIC_SUPABASE_URL', rawSupabaseUrl),
    requiredEnv('NEXT_PUBLIC_SUPABASE_ANON_KEY', rawSupabaseAnonKey)
  );
}

export function createSupabaseBrowserClient() {
  return createBrowserClient<Database>(
    requiredEnv('NEXT_PUBLIC_SUPABASE_URL', rawSupabaseUrl),
    requiredEnv('NEXT_PUBLIC_SUPABASE_ANON_KEY', rawSupabaseAnonKey)
  );
}

/**
 * Creates a Supabase client authenticated as the service role.
 *
 * Service-role clients bypass row-level security and must only be used inside
 * trusted server-side code (API routes, server components, migrations).
 * Never expose `SUPABASE_SERVICE_ROLE_KEY` to the browser.
 */
export function createSupabaseServiceClient() {
  return createClient(
    requiredEnv('NEXT_PUBLIC_SUPABASE_URL', rawSupabaseUrl),
    requiredEnv('SUPABASE_SERVICE_ROLE_KEY', rawServiceRoleKey),
    { auth: { persistSession: false, autoRefreshToken: false } }
  );
}
