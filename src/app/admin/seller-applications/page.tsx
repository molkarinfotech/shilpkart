import { createClient } from '@supabase/supabase-js';
import { SiteHeader } from '@/components/site-header';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://zqekrkuwxgzkqnuhwlyi.supabase.co';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpxZWtya3V3eGd6a3FudWh3bHlpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODc2NDk0OTEsImV4cCI6MjEwMzIyNTQ5MX0.7pA4VTPpHArpqn8GfN7ztZUH_cKU-K35LNFojIcthhI';

const supabase = createClient(supabaseUrl, supabaseServiceKey);

export const dynamic = 'force-dynamic';

export default async function AdminSellerApplicationsPage({ searchParams }: { searchParams: { status?: string } }) {
  const statusFilter = searchParams.status || 'all';

  let query = supabase.from('seller_applications').select('*').order('created_at', { ascending: false });

  if (statusFilter !== 'all') {
    query = query.eq('status', statusFilter);
  }

  const { data: applications, error } = await query;

  const statusCounts = {
    all: applications?.length || 0,
    pending: applications?.filter((a) => a.status === 'pending').length || 0,
    approved: applications?.filter((a) => a.status === 'approved').length || 0,
    rejected: applications?.filter((a) => a.status === 'rejected').length || 0,
  };

  const statusBadges: Record<string, string> = {
    pending: 'bg-amber-100 text-amber-800 border-amber-300',
    approved: 'bg-moss-100 text-moss-800 border-moss-300',
    rejected: 'bg-red-100 text-red-800 border-red-300',
  };

  return (
    <main className="min-h-screen bg-sand-50">
      <SiteHeader />
      <section className="border-b border-ink-200/60 bg-sand-100">
        <div className="mx-auto max-w-7xl px-5 py-12">
          <p className="text-[11px] font-semibold uppercase tracking-[.24em] text-clay-600">Admin Dashboard</p>
          <h1 className="mt-3 font-display text-4xl tracking-tight text-ink-900">Seller Applications</h1>
          <p className="mt-2 text-ink-600">Review and manage artisan seller applications</p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-8">
        <div className="mb-6 flex flex-wrap gap-2">
          <a href="/admin/seller-applications?status=all" className={`rounded-full px-4 py-2 text-sm font-semibold border ${statusFilter === 'all' ? 'bg-ink-900 text-sand-50 border-ink-900' : 'bg-sand-50 text-ink-700 border-ink-200 hover:border-clay-400'}`}>All ({statusCounts.all})</a>
          <a href="/admin/seller-applications?status=pending" className={`rounded-full px-4 py-2 text-sm font-semibold border ${statusFilter === 'pending' ? 'bg-amber-600 text-white border-amber-600' : 'bg-sand-50 text-ink-700 border-ink-200 hover:border-amber-400'}`}>Pending ({statusCounts.pending})</a>
          <a href="/admin/seller-applications?status=approved" className={`rounded-full px-4 py-2 text-sm font-semibold border ${statusFilter === 'approved' ? 'bg-moss-600 text-white border-moss-600' : 'bg-sand-50 text-ink-700 border-ink-200 hover:border-moss-400'}`}>Approved ({statusCounts.approved})</a>
          <a href="/admin/seller-applications?status=rejected" className={`rounded-full px-4 py-2 text-sm font-semibold border ${statusFilter === 'rejected' ? 'bg-red-600 text-white border-red-600' : 'bg-sand-50 text-ink-700 border-ink-200 hover:border-red-400'}`}>Rejected ({statusCounts.rejected})</a>
        </div>

        {error ? (
          <div className="rounded-xl border border-red-300 bg-red-50 p-6 text-red-800">
            <p className="font-medium">Error loading applications</p>
            <p className="mt-1 text-sm">{error.message}</p>
          </div>
        ) : !applications || applications.length === 0 ? (
          <div className="rounded-xl border border-ink-200 bg-white p-12 text-center">
            <p className="font-display text-xl text-ink-800">No applications found</p>
            <p className="mt-1 text-ink-500">Applications will appear here once sellers submit the form.</p>
          </div>
        ) : (
          <div className="overflow-x-auto rounded-xl border border-ink-200 bg-white">
            <table className="min-w-full divide-y divide-ink-200">
              <thead className="bg-sand-100">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-ink-600">Business</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-ink-600">Contact</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-ink-600">Craft</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-ink-600">Location</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-ink-600">Status</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-ink-600">Applied</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-ink-100">
                {applications.map((app) => (
                  <tr key={app.id} className="hover:bg-sand-50">
                    <td className="px-4 py-3">
                      <p className="font-medium text-ink-900">{app.business_name}</p>
                      <p className="text-sm text-ink-600">{app.full_name}</p>
                    </td>
                    <td className="px-4 py-3">
                      <p className="text-sm text-ink-700">{app.email}</p>
                      <p className="text-sm text-ink-500">{app.phone}</p>
                    </td>
                    <td className="px-4 py-3">
                      <p className="text-sm text-ink-700 capitalize">{app.craft_category}</p>
                      {app.aadhaar_last_four && <p className="text-xs text-ink-400">Aadhaar: ****{app.aadhaar_last_four}</p>}
                    </td>
                    <td className="px-4 py-3">
                      <p className="text-sm text-ink-700">{app.city}, {app.state}</p>
                      <p className="text-xs text-ink-500">{app.pincode}</p>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium capitalize ${statusBadges[app.status] || 'bg-ink-100 text-ink-800 border-ink-300'}`}>
                        {app.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-ink-500">
                      {new Date(app.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </main>
  );
}
