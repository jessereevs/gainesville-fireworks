"use client"

import { FireworkPackage } from '@/types';

import Header from '@/app/ui/header';
import PackageDetail from '@/app/ui/packages/package_detail';
import Footer from '@/app/ui/footer';

import PackageImage from '@/public/images/package_images/assortment_1.jpg';


let fireworkPackage: FireworkPackage = {
	name: "Star Light",
	description: "This is the description for the star light package. This package is very very very good. This is some other nonsense. These are random words: Firework BANG huge testing.",
	price: 100,
	value: 150,
	image: PackageImage
}

export default function StarLight() {
	return(
		<>
			<Header />
			<PackageDetail
				fireworkPackage = {fireworkPackage}
			/>
			<div className='m-8'></div>
			<Footer />
		</>
	);
}