"use client";

import Header from "@/app/ui/header";
import FireworkDetail from "@/app/ui/fireworks/firework-detail";
import FeaturedProducts from "@/app/ui/home/featured-packages";
import Footer from "@/app/ui/footer";

export default function FireworksDetails({
  params,
}: {
  params: { firework: string };
}) {
  return (
    <main>
      <Header />
      <FireworkDetail fireworkDetail={params.firework} />
      <FeaturedProducts />
      <Footer />
    </main>
  );
}
