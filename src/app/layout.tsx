import type {Metadata} from 'next';
import './globals.css';
import LenisProvider from '@/components/lenis-provider';
import Navbar from '@/components/navbar';
import ChatbotWidget from '@/components/chatbot-widget';
import ScrollBackground from '@/components/scroll-background';

export const metadata: Metadata = {
  title: 'KnK Karts | India\'s Premium Karting Ecosystem',
  description: 'Unleash performance with 25 years of excellence in go-kart manufacturing, track design, and turnkey motorsport solutions.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased bg-black text-white selection:bg-primary">
        <LenisProvider>
          <ScrollBackground />
          <Navbar />
          <main>{children}</main>
          <ChatbotWidget />
        </LenisProvider>
      </body>
    </html>
  );
}
