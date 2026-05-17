'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '@/lib/api-client';

export default function LoginForm({ next }: { next: string }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setError(null);
        const fd = new FormData(e.currentTarget);
        const payload = {
          email: String(fd.get('email') ?? '').trim(),
          password: String(fd.get('password') ?? ''),
        };
        startTransition(async () => {
          try {
            await api.post('/api/auth/sign-in', payload);
            router.push(next || '/admin');
            router.refresh();
          } catch (err) {
            setError(err instanceof Error ? err.message : 'Sign-in failed.');
          }
        });
      }}
      className="space-y-6"
    >
      <div>
        <label className="block text-[10px] uppercase tracking-widest font-bold text-admin-muted mb-2">
          Email
        </label>
        <input
          name="email"
          type="email"
          required
          autoComplete="email"
          className="bg-admin-bg border border-admin-border p-4 text-sm w-full outline-none focus:border-primary"
        />
      </div>
      <div>
        <label className="block text-[10px] uppercase tracking-widest font-bold text-admin-muted mb-2">
          Password
        </label>
        <input
          name="password"
          type="password"
          required
          autoComplete="current-password"
          className="bg-admin-bg border border-admin-border p-4 text-sm w-full outline-none focus:border-primary"
        />
      </div>
      {error && (
        <p className="text-xs uppercase tracking-widest font-bold text-primary">
          {error}
        </p>
      )}
      <button
        type="submit"
        disabled={isPending}
        className="bg-primary text-white py-4 px-8 text-xs font-black uppercase tracking-[0.3em] hover:bg-white hover:text-black transition-all w-full disabled:opacity-50"
      >
        {isPending ? 'Signing in…' : 'Sign in'}
      </button>
    </form>
  );
}
