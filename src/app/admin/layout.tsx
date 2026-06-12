import Link from 'next/link';
import Image from 'next/image';
import { createServerSupabaseClient } from '@/lib/supabase/server';
import AdminNav from './admin-nav';
import SignOutButton from './sign-out-button';

export const dynamic = 'force-dynamic';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Auth is enforced in middleware (src/lib/supabase/middleware.ts), which
  // validates the token with getUser() on every /admin request. Here we only
  // need the email to render the shell, so we read the session from the cookie
  // locally — getSession() avoids a second network round-trip to the auth
  // server on every admin page load.
  const supabase = await createServerSupabaseClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();
  const user = session?.user ?? null;

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
            <span className="flex items-center gap-3">
              <Image
                src="/VCR logo final 190116.png"
                alt="VCR"
                width={96}
                height={49}
                className="h-8 w-auto object-contain"
              />
              <span className="text-[10px] uppercase tracking-widest font-black text-admin-muted">
                Admin
              </span>
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
