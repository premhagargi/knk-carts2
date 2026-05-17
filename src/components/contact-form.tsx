'use client';

import { useState, useTransition } from 'react';
import { submitInquiry } from '@/app/actions/inquiries';
import { useToast } from '@/hooks/use-toast';

export default function ContactForm() {
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();
  const [submitted, setSubmitted] = useState(false);

  return (
    <form
      action={(formData) =>
        startTransition(async () => {
          const res = await submitInquiry(formData);
          if (res.ok) {
            setSubmitted(true);
            toast({
              title: 'Inquiry sent',
              description: 'We’ll respond within two working days.',
            });
          } else {
            toast({
              title: 'Could not send inquiry',
              description: res.error ?? 'Please try again.',
              variant: 'destructive',
            });
          }
        })
      }
      className="space-y-6"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <input
          name="name"
          required
          type="text"
          placeholder="NAME"
          className="bg-transparent border border-white/10 p-6 text-[10px] tracking-widest font-bold focus:border-primary outline-none w-full"
        />
        <input
          name="email"
          required
          type="email"
          placeholder="EMAIL"
          className="bg-transparent border border-white/10 p-6 text-[10px] tracking-widest font-bold focus:border-primary outline-none w-full"
        />
      </div>
      <input
        name="company"
        type="text"
        placeholder="COMPANY (OPTIONAL)"
        className="bg-transparent border border-white/10 p-6 text-[10px] tracking-widest font-bold focus:border-primary outline-none w-full"
      />
      <select
        name="inquiry_type"
        defaultValue=""
        className="bg-transparent border border-white/10 p-6 text-[10px] tracking-widest font-bold focus:border-primary outline-none w-full appearance-none"
      >
        <option value="" className="bg-black">
          INQUIRY TYPE
        </option>
        <option value="design" className="bg-black">
          KART DESIGN
        </option>
        <option value="track" className="bg-black">
          TRACK SOLUTIONS
        </option>
        <option value="rental" className="bg-black">
          RENTAL PROGRAM
        </option>
        <option value="spares" className="bg-black">
          SPARES & SUPPORT
        </option>
        <option value="consultancy" className="bg-black">
          CONSULTANCY
        </option>
      </select>
      <textarea
        name="message"
        required
        placeholder="MESSAGE"
        rows={6}
        className="bg-transparent border border-white/10 p-6 text-[10px] tracking-widest font-bold focus:border-primary outline-none w-full"
      />
      <button
        disabled={isPending || submitted}
        className="bg-primary text-white py-6 px-12 text-xs font-black uppercase tracking-[0.3em] hover:bg-white hover:text-black transition-all w-full disabled:opacity-50"
      >
        {submitted ? 'SENT' : isPending ? 'SENDING…' : 'SUBMIT REQUEST'}
      </button>
    </form>
  );
}
