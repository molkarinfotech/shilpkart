'use client';

import { createSupabaseBrowserClient } from '@/lib/supabase/config';

export function createClient() {
  return createSupabaseBrowserClient();
}
