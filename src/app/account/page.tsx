import { redirect } from 'next/navigation';
import { getCurrentUser } from '@/lib/supabase/server';
import { AccountForm } from './account-form';

export const dynamic = 'force-dynamic';

export default async function AccountPage() {
  const { session, profile } = await getCurrentUser();

  if (!session || !profile) {
    redirect('/auth/login?redirectTo=/account');
  }

  return (
    <main>
      <AccountForm profile={profile} session={session} />
    </main>
  );
}
