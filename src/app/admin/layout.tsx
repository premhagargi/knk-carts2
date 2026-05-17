import Link from 'next/link';
import { createServerSupabaseClient } from '@/lib/supabase/server';
import AdminNav from './admin-nav';
import SignOutButton from './sign-out-button';

export const dynamic = 'force-dynamic';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // /admin/login renders without the shell.
  if (!user) {
    return (
      <div className="min-h-screen bg-admin-bg text-white">{children}</div>
    );
  }

  return (
    <div className="min-h-screen bg-admin-bg text-white flex">
      <aside className="w-64 shrink-0 border-r border-admin-border bg-admin-surface min-h-screen flex flex-col">
        <div className="p-6 border-b border-admin-border">
          <Link href="/" className="block">
            <span className="text-xl font-bold tracking-tightest uppercase italic flex items-center gap-2">
              <span className="bg-primary px-1 text-black">VCR</span>
              <span>ADMIN</span>
            </span>
          </Link>
        </div>
        <AdminNav />
        <div className="border-t border-admin-border">
          <SignOutButton />
        </div>
      </aside>

      <div className="flex-1 min-w-0 flex flex-col">
        <header className="border-b border-admin-border bg-admin-surface px-8 py-4 flex justify-between items-center">
          <span className="text-[10px] uppercase tracking-widest font-bold text-admin-muted">
            Signed in
          </span>
          <span className="text-xs text-white/80 font-mono">{user.email}</span>
        </header>
        <main className="flex-1 p-8 overflow-x-auto">{children}</main>
      </div>
    </div>
  );
}
