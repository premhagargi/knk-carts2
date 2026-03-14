import Hero from '@/components/sections/hero';
import Legacy from '@/components/sections/legacy';
import Products from '@/components/sections/products';
import Ecosystem from '@/components/sections/ecosystem';
import Blueprint from '@/components/sections/blueprint';
import Marquee from '@/components/sections/marquee';
import Footer from '@/components/sections/footer';

export default function Home() {
  return (
    <>
      <Hero />
      <Legacy />
      <Products />
      <Ecosystem />
      <Blueprint />
      <Marquee />
      <Footer />
    </>
  );
}
