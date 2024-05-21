"use client";

import { FireworkPackage } from "@/types";

import Header from "@/app/ui/header";
import PackageDetail from "@/app/ui/packages/package_detail";
import FeaturedProducts from "@/app/ui/home/featured-packages";
import Footer from "@/app/ui/footer";

import PackageImage from "@/public/images/package/package-1000-total.jpg";

let fireworkPackage: FireworkPackage = {
  name: "Extreme Explosive Ensemble",
  description:
    "The Extreme Explosive Ensemble value pack is the ultimate fireworks collection, featuring an impressive array of reloadable shells, repeaters, and more, designed to deliver a spectacular and unforgettable display.",
  reloadableShells: [
    "Hammer of Thunder (24 Shot),",
    "Magnum Artillery (12 Shot),",
    "1 inch Mini Artillery (6 Shot)",
  ],
  repeaters500: [
    "Captain Jake,",
    "Hit the Road Jack,",
    "Victory Day,",
    "Celebrate America,",
    "Downtown Display,",
    "Route 66,",
    "Lady Liberty",
  ],
  repeaters350: ["Shenanigans"],
  repeaters200: [
    "Mega Volt,",
    "Mobile Menace,",
    "Victory Celebration,",
    "Patriotic Medley,",
    "Let Freedom Ring,",
    "Sons of Liberty,",
    "Special,",
    "Gold Rush,",
    "Industrial Revoultion",
  ],
  fountains: ["Great American Value Pack (4 Pack)"],
  romanCandles: [
    "Barage Candle (196 Shots),",
    "Classic Roman Candles (Pack of 6),",
    "Mini Roman Candles (Pack of 10)",
  ],
  misc: [
    "1/2 Brick Firecrackers (640 firecrackers),",
    "Sparklers 10 inch (12 boxes of 8),",
    "Space Capsules (Pack of 4),",
    "Titan Rockets (Pack of 12)",
  ],
  price: 1000,
  value: 1501,
  image: PackageImage,
};

export default function package1000() {
  return (
    <>
      <Header />
      <PackageDetail fireworkPackage={fireworkPackage} />
      <FeaturedProducts />
      <Footer />
    </>
  );
}
