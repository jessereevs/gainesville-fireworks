"use client";

import { FireworkPackage } from "@/types";

import Header from "@/app/ui/header";
import PackageDetail from "@/app/ui/packages/package_detail";
import FeaturedProducts from "@/app/ui/home/featured-packages";
import Footer from "@/app/ui/footer";

import PackageImage from "@/public/images/package/package-300-total.jpg";

let fireworkPackage: FireworkPackage = {
  name: "Explosive Ensemble",
  description:
    "This is the description for the Explosive Ensemeble package. This package is very very very good. This is some other nonsense. These are random words: Firework BANG huge testing.",
  reloadableShells: [
    "Hammer of Thunder (24 Shot),",
    "Magnum Artillery (12 Shot)",
  ],
  repeaters500: ["Hit the Road Jack"],
  repeaters200: [
    "Patriotic Medley,",
    "Special,",
    "Gold Rush,",
    "Industrial Revolution",
  ],
  price: 300,
  value: 445,
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
