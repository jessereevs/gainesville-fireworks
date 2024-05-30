"use client";

import { FireworkPackage } from "@/types";

import Header from "@/app/ui/header";
import PackageDetail from "@/app/ui/packages/package_detail";
import FeaturedProducts from "@/app/ui/home/featured-packages";
import Footer from "@/app/ui/footer";

import PackageImage from "@/public/images/package/package-500-total.jpg";

let fireworkPackage: FireworkPackage = {
  id: "starlightSymphonyCollection",
  name: "Starlight Symphony Collection",
  description:
    "The Starlight Symphony Collection value pack offers a dazzling assortment of fireworks, providing a spectacular and varied display perfect for any celebration.",
  amountOfFireworks: 15,
  reloadableShells: [
    "Hammer of Thunder (24 Shot),",
    "Magnum Artillery (12 Shot)",
  ],
  repeaters500: ["Captain Jake,", "Downtown Display,", "Route 66"],
  repeaters350: ["Shenanigans"],
  repeaters200: ["Patriotic Medley,", "Sons of Liberty,", "Special"],
  fountains: ["Great American Value Pack (4 Pack)"],
  romanCandles: [
    "Barage Candle (196 Shots),",
    "Classic Roman Candles (Pack of 6),",
    "Mini Roman Candles (Pack of 10)",
  ],
  misc: [
    "1/2 Brick Firecrackers (640 firecrackers),",
    "Sparklers 10 inch (12 boxes of 8)",
  ],
  price: 500,
  value: 845,
  imagehref: "/images/package/package-500-total.jpg",
  category: "Value Pack",
  href: "/packages/500"
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
