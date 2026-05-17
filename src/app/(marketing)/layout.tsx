import LenisProvider from '@/components/lenis-provider';
import Navbar from '@/components/navbar';
import ChatbotWidget from '@/components/chatbot-widget';
import ScrollBackground from '@/components/scroll-background';

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <LenisProvider>
      <ScrollBackground />
      <Navbar />
      <main>{children}</main>
      <ChatbotWidget />
    </LenisProvider>
  );
}
