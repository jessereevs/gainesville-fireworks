"use client";

import { FireworkPackage } from "@/types";

import Header from "@/app/ui/header";
import PackageDetail from "@/app/ui/packages/package_detail";
import FeaturedProducts from "@/app/ui/home/featured-packages";
import Footer from "@/app/ui/footer";

import PackageImage from "@/public/images/package/package-100-total.jpg";

let fireworkPackage: FireworkPackage = {
  name: "Eruption Spectacular",
  description: "The Eruption Spectacular value pack offers a delightful mix of fireworks, perfect for adding a touch of magic and excitement to any celebration.",
  reloadableShells: [
    "Magnum Artillery (12 Shot),",
    "1 inch Mini Artillery (6 Shot)",
  ],
  repeaters200: ["Special"],
  romanCandles: ["Classic Roman Candles (Pack of 6)"],
  misc: [
    "1/2 Brick Firecrackers (640 Firecrackers),",
    "Sparklers 10 inch (12 boxes of 8)",
  ],
  price: 100,
  value: 152,
  image: PackageImage,
};

export default function package500() {
  return (
    <>
      <Header />
      <PackageDetail fireworkPackage={fireworkPackage} />
      <FeaturedProducts />
      <Footer />
    </>
  );
}
