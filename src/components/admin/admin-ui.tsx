'use client';

import Link from 'next/link';
import { useTransition, useState } from 'react';
import { Plus, Trash2, Pencil } from 'lucide-react';

export function AdminPageHeader({
  title,
  description,
  action,
}: {
  title: string;
  description?: string;
  action?: { href: string; label: string };
}) {
  return (
    <header className="flex justify-between items-end mb-10 gap-6">
      <div>
        <h1 className="text-3xl font-black uppercase tracking-tightest">
          {title}
        </h1>
        {description && (
          <p className="text-xs uppercase tracking-widest font-bold text-admin-muted mt-2">
            {description}
          </p>
        )}
      </div>
      {action && (
        <Link
          href={action.href}
          className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 text-[10px] uppercase tracking-widest font-bold hover:bg-white hover:text-black transition-all"
        >
          <Plus className="w-4 h-4" />
          {action.label}
        </Link>
      )}
    </header>
  );
}

export function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <label className="block text-[10px] uppercase tracking-widest font-bold text-admin-muted">
        {label}
      </label>
      {children}
      {hint && <p className="text-[10px] text-admin-muted/70">{hint}</p>}
    </div>
  );
}

const fieldClass =
  'bg-admin-bg border border-admin-border p-4 text-sm w-full outline-none focus:border-primary';

export const inputClass = fieldClass;
export const textareaClass = fieldClass + ' font-mono leading-relaxed';

export function SubmitButton({
  label,
  pendingLabel,
}: {
  label: string;
  pendingLabel: string;
}) {
  return (
    <button
      type="submit"
      className="bg-primary text-white py-4 px-8 text-xs font-black uppercase tracking-[0.3em] hover:bg-white hover:text-black transition-all"
    >
      <SubmitLabel idle={label} pending={pendingLabel} />
    </button>
  );
}

function SubmitLabel({ idle, pending }: { idle: string; pending: string }) {
  // useFormStatus would be ideal but for now keep static.
  return <span>{idle}</span>;
  // (pending param kept to preserve API for future swap)
  void pending;
}

export function DeleteButton({
  onConfirm,
  label = 'Delete',
}: {
  onConfirm: () => Promise<void>;
  label?: string;
}) {
  const [isPending, startTransition] = useTransition();
  const [confirming, setConfirming] = useState(false);

  if (confirming) {
    return (
      <span className="inline-flex items-center gap-2">
        <button
          type="button"
          onClick={() =>
            startTransition(async () => {
              await onConfirm();
              setConfirming(false);
            })
          }
          disabled={isPending}
          className="text-[10px] uppercase tracking-widest font-bold text-primary hover:underline"
        >
          {isPending ? 'Deleting…' : 'Confirm'}
        </button>
        <button
          type="button"
          onClick={() => setConfirming(false)}
          className="text-[10px] uppercase tracking-widest font-bold text-admin-muted hover:text-white"
        >
          Cancel
        </button>
      </span>
    );
  }

  return (
    <button
      type="button"
      onClick={() => setConfirming(true)}
      className="inline-flex items-center gap-2 text-[10px] uppercase tracking-widest font-bold text-admin-muted hover:text-primary transition-colors"
    >
      <Trash2 className="w-3.5 h-3.5" />
      {label}
    </button>
  );
}

export function EditLink({ href }: { href: string }) {
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-2 text-[10px] uppercase tracking-widest font-bold text-admin-muted hover:text-white transition-colors"
    >
      <Pencil className="w-3.5 h-3.5" />
      Edit
    </Link>
  );
}
