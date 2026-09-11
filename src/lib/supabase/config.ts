import { createClient } from '@supabase/supabase-js';
import { createBrowserClient } from '@supabase/ssr';
import type { Database } from '@/types/database';

function requireEnv(name: string, fallback?: string): string {
  const value = process.env[name];
  if (!value && !fallback) {
    throw new Error(
      `Missing required environment variable: ${name}. ` +
        `Copy .env.example to .env.local and fill in your Supabase credentials, ` +
        `then restart the dev server.`
    );
  }
  return (value ?? fallback) as string;
}

/**
 * Supabase config is sourced exclusively from environment variables.
 *
 * The project URL and anon key MUST come from .env.local (or the hosting
 * platform's environment settings). There is no fallback to a live project
 * URL in source code — if the variables are missing the app surfaces a clear
 * error at startup rather than silently connecting to a shared project.
 */
export const supabaseConfig = {
  url: requireEnv('NEXT_PUBLIC_SUPABASE_URL'),
  anonKey: requireEnv('NEXT_PUBLIC_SUPABASE_ANON_KEY'),
  serviceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY,
} as const;

export function createSupabaseClient() {
  return createClient(supabaseConfig.url, supabaseConfig.anonKey);
}

export function createSupabaseBrowserClient() {
  return createBrowserClient<Database>(supabaseConfig.url, supabaseConfig.anonKey);
}

/**
 * Creates a Supabase client authenticated as the service role.
 *
 * Service-role clients bypass row-level security and must only be used inside
 * trusted server-side code (API routes, server components, migrations).
 * Never expose `SUPABASE_SERVICE_ROLE_KEY` to the browser.
 */
export function createSupabaseServiceClient() {
  if (!supabaseConfig.serviceRoleKey) {
    throw new Error(
      'SUPABASE_SERVICE_ROLE_KEY is not configured. ' +
        'The feature you are trying to use requires server-side Supabase access ' +
        'with the service role key. Add it to .env.local and redeploy.'
    );
  }
  return createClient(supabaseConfig.url, supabaseConfig.serviceRoleKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
