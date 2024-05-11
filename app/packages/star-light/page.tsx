"use client"

import { FireworkPackage } from '@/types';

import Header from '@/app/ui/header';
import PackageDetail from '@/app/ui/packages/package_detail';
import FeaturedProducts from '@/app/ui/home/featured-packages';
import Footer from '@/app/ui/footer';

import PackageImage from '@/public/images/package_images/1000-package/1000-package-full.jpg';


let fireworkPackage: FireworkPackage = {
	name: "Explosive Ensemble",
	description: "This is the description for the Explosive Ensemeble package. This package is very very very good. This is some other nonsense. These are random words: Firework BANG huge testing.",
	includes: ["2 500 Gram Repeater", "4 Fountains"],
	price: 1000,
	value: 1501,
	image: PackageImage
}

export default function StarLight() {
	return(
		<>
			<Header />
			<PackageDetail
				fireworkPackage = {fireworkPackage}
			/>
			<FeaturedProducts />
			<Footer />
		</>
	);
}