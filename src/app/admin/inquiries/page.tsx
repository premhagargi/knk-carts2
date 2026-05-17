import { createServerSupabaseClient } from '@/lib/supabase/server';
import { AdminPageHeader } from '@/components/admin/admin-ui';
import InquiryRow from './inquiry-row';

export const dynamic = 'force-dynamic';

type Inquiry = {
  id: string;
  name: string;
  email: string;
  company: string | null;
  inquiry_type: string | null;
  message: string;
  status: 'new' | 'read' | 'archived';
  created_at: string;
};

export default async function InquiriesPage() {
  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase
    .from('inquiries')
    .select('*')
    .order('created_at', { ascending: false });
  const inquiries = (data ?? []) as Inquiry[];
  const newCount = inquiries.filter((i) => i.status === 'new').length;

  return (
    <div>
      <AdminPageHeader
        title="Inquiries"
        description={`${inquiries.length} total · ${newCount} new`}
      />
      {error && (
        <div className="border border-primary/50 p-6 mb-6 text-sm text-primary">
          {error.message}
        </div>
      )}
      {inquiries.length === 0 ? (
        <div className="border border-admin-border p-12 text-center text-sm text-admin-muted">
          No inquiries yet.
        </div>
      ) : (
        <div className="space-y-3">
          {inquiries.map((i) => (
            <InquiryRow key={i.id} inquiry={i} />
          ))}
        </div>
      )}
    </div>
  );
}
