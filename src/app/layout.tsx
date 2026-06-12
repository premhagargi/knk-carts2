import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';

export const metadata: Metadata = {
  title: 'VCR | Visions, Concepts & Realities — Motorsport Design Firm',
  description:
    'VCR is a specialized motorsport design firm developing high-performance handcrafted karts, track systems, and operator programs through precision engineering and selected manufacturing partnerships.',
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-body antialiased bg-background text-white selection:bg-primary">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
