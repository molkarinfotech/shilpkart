import { redirect } from 'next/navigation';
import {
  getCurrentUser,
  getVerifiedSellerProfile,
} from '@/lib/supabase/server';
import { SellerDashboardContent } from './seller-dashboard-content';

export const dynamic = 'force-dynamic';

export default async function SellerDashboardPage() {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    redirect('/auth/login?redirectTo=/seller/dashboard');
  }

  const { session, profile } = currentUser;

  if (!profile) {
    redirect('/auth/login?redirectTo=/seller/dashboard');
  }

  // Only verified sellers may enter this dashboard.
  if (profile.role !== 'seller') {
    redirect('/dashboard');
  }

  const sellerProfile = await getVerifiedSellerProfile(session.user.id);
  if (!sellerProfile) {
    redirect('/dashboard');
  }

  return <SellerDashboardContent profile={profile} sellerProfile={sellerProfile} />;
}
