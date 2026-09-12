import { redirect } from 'next/navigation';
import { getCurrentUser } from '@/lib/supabase/server';
import { DashboardContent } from './dashboard-content';

export const dynamic = 'force-dynamic';

export default async function DashboardPage() {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    redirect('/auth/login?redirectTo=/dashboard');
  }

  const { session, profile } = currentUser;

  if (!profile) {
    redirect('/auth/login?redirectTo=/dashboard');
  }

  return <DashboardContent profile={profile} session={session.user} />;
}
