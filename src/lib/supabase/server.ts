import { createServerSupabaseClient } from './auth';

/**
 * Available as `@/lib/supabase/server`.
 *
 * Thin re-export of the server-side auth helpers so middleware and server
 * components can use them without importing from the browser-oriented
 * `client.ts`.
 */
export { createServerSupabaseClient } from './auth';
export {
  getSession,
  getCurrentUser,
  getUserRole,
  isAdmin,
  isMarketplaceAdmin,
  getVerifiedSellerProfile,
  isVerifiedSeller,
  signIn,
  signUp,
  signOut,
} from './auth';
