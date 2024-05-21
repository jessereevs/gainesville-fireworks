"use client";

import { FireworkPackage } from "@/types";

import Header from "@/app/ui/header";
import PackageDetail from "@/app/ui/packages/package_detail";
import FeaturedProducts from "@/app/ui/home/featured-packages";
import Footer from "@/app/ui/footer";

import PackageImage from "@/public/images/package/package-300-total.jpg";

let fireworkPackage: FireworkPackage = {
  name: "Galaxy Burst Bundle",
  description:
    "The Galaxy Burst Bundle value pack delivers an enchanting array of fireworks, perfect for creating a captivating and memorable display for any occasion.",
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
