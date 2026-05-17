'use client';

import { useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { LogOut } from 'lucide-react';
import { api } from '@/lib/api-client';

export default function SignOutButton() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  return (
    <button
      type="button"
      disabled={isPending}
      onClick={() =>
        startTransition(async () => {
          try {
            await api.post('/api/auth/sign-out', {});
          } catch {
            // Even if the call fails, clearing the session locally is best-effort.
          }
          router.push('/admin/login');
          router.refresh();
        })
      }
      className="w-full flex items-center gap-3 px-6 py-4 text-[11px] uppercase tracking-widest font-semibold text-white/60 hover:text-primary transition-colors disabled:opacity-50"
    >
      <LogOut className="w-4 h-4" />
      {isPending ? 'Signing out…' : 'Sign out'}
    </button>
  );
}
