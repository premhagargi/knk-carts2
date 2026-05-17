'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Package,
  Wrench,
  FolderKanban,
  Inbox,
} from 'lucide-react';

const nav = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard, exact: true },
  { href: '/admin/products', label: 'Products', icon: Package },
  { href: '/admin/services', label: 'Services', icon: Wrench },
  { href: '/admin/projects', label: 'Projects', icon: FolderKanban },
  { href: '/admin/inquiries', label: 'Inquiries', icon: Inbox },
];

export default function AdminNav() {
  const pathname = usePathname();

  return (
    <nav className="flex-1 py-4">
      {nav.map((item) => {
        const active = item.exact
          ? pathname === item.href
          : pathname === item.href || pathname.startsWith(item.href + '/');

        return (
          <Link
            key={item.href}
            href={item.href}
            className={`relative flex items-center gap-3 px-6 py-3 text-[11px] uppercase tracking-widest font-semibold transition-colors ${
              active
                ? 'text-white bg-admin-surface-2'
                : 'text-white/60 hover:text-white hover:bg-admin-surface-2'
            }`}
          >
            {active && (
              <span className="absolute left-0 top-0 h-full w-[3px] bg-primary" />
            )}
            <item.icon
              className={`w-4 h-4 ${active ? 'text-primary' : ''}`}
            />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
