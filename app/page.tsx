"use client";

import Header from '@/app/ui/header';
import PromoSection from '@/app/ui/home/promo_section';
import FAQ from '@/app/ui/home/faq';

export default function Home() {
  return (
    <main>
      <Header />
      <PromoSection />
      <FAQ />
    </main>
  );
}
