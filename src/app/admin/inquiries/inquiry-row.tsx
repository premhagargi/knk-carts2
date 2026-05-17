'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronDown } from 'lucide-react';
import { api } from '@/lib/api-client';

type InquiryStatus = 'new' | 'read' | 'archived';

type Inquiry = {
  id: string;
  name: string;
  email: string;
  company: string | null;
  inquiry_type: string | null;
  message: string;
  status: InquiryStatus;
  created_at: string;
};

const statusStyles: Record<InquiryStatus, string> = {
  new: 'bg-primary text-white',
  read: 'bg-admin-surface-2 text-admin-muted',
  archived: 'bg-admin-bg text-admin-muted/60 border border-admin-border',
};

export default function InquiryRow({ inquiry }: { inquiry: Inquiry }) {
  const router = useRouter();
  const [open, setOpen] = useState(inquiry.status === 'new');
  const [status, setStatus] = useState<InquiryStatus>(inquiry.status);
  const [isPending, startTransition] = useTransition();

  const setStatusOptimistic = (next: InquiryStatus) => {
    const prev = status;
    setStatus(next);
    startTransition(async () => {
      try {
        await api.patch(`/api/inquiries/${inquiry.id}`, { status: next });
        router.refresh();
      } catch {
        setStatus(prev);
      }
    });
  };

  return (
    <div className="border border-admin-border bg-admin-surface">
      <button
        type="button"
        onClick={() => {
          setOpen((o) => !o);
          if (status === 'new') setStatusOptimistic('read');
        }}
        className="w-full p-5 flex items-center gap-4 text-left hover:bg-admin-surface-2 transition-colors"
      >
        <span
          className={`text-[9px] uppercase tracking-widest font-black px-2 py-1 ${statusStyles[status]}`}
        >
          {status}
        </span>
        <span className="font-bold text-sm">{inquiry.name}</span>
        <span className="text-xs text-admin-muted font-mono">{inquiry.email}</span>
        {inquiry.inquiry_type && (
          <span className="text-[10px] uppercase tracking-widest font-bold text-admin-muted">
            · {inquiry.inquiry_type}
          </span>
        )}
        <span className="ml-auto text-[10px] uppercase tracking-widest font-bold text-admin-muted">
          {new Date(inquiry.created_at).toLocaleString()}
        </span>
        <ChevronDown
          className={`w-4 h-4 transition-transform ${open ? 'rotate-180' : ''}`}
        />
      </button>

      {open && (
        <div className="p-6 border-t border-admin-border space-y-6">
          {inquiry.company && (
            <div className="text-[10px] uppercase tracking-widest font-bold text-admin-muted">
              Company · {inquiry.company}
            </div>
          )}
          <p className="text-sm leading-relaxed whitespace-pre-wrap">
            {inquiry.message}
          </p>
          <div className="flex gap-3 pt-3 border-t border-admin-border">
            <a
              href={`mailto:${inquiry.email}?subject=Re: VCR Inquiry`}
              className="text-[10px] uppercase tracking-widest font-bold text-primary hover:underline"
            >
              Reply by email
            </a>
            <span className="text-admin-muted/30">·</span>
            {(['new', 'read', 'archived'] as const).map((s) =>
              s === status ? null : (
                <button
                  key={s}
                  type="button"
                  disabled={isPending}
                  onClick={() => setStatusOptimistic(s)}
                  className="text-[10px] uppercase tracking-widest font-bold text-admin-muted hover:text-white"
                >
                  Mark {s}
                </button>
              ),
            )}
          </div>
        </div>
      )}
    </div>
  );
}
