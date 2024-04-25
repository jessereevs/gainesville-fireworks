"use client";

import FreeShippingBanner from '@/app/ui/free-shipping-banner';
import Header from '@/app/ui/header';
import PromoSection from '@/app/ui/home/promo_section';
import FAQ from '@/app/ui/home/faq';
import FeaturedProducts from '@/app/ui/home/featured-packages';
import Footer from '@/app/ui/footer';

export default function Home() {
  return (
    <main>
      <FreeShippingBanner />
      <Header />
      <PromoSection />
      <FAQ />
      <FeaturedProducts />
      <Footer />
    </main>
  );
}
