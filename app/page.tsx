"use client";

import Header from '@/app/ui/header';
import PromoSection from '@/app/ui/home/promo_section';

export default function Home() {
  return (
    <main>
      <Header />
      <PromoSection />
      <div className='m-32'></div>
    </main>
  );
}
