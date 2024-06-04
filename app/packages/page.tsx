"use client";

import Header from '@/app/ui/header';
import Products from '@/app/ui/packages/product_listing';
import Footer from '@/app/ui/footer';

export default function Packages() {
	return(
		<main>
			<Header />
			<div className='mx-auto max-w-7xl px-4 pt-12 sm:px-6 lg:px-8'>
				<h1 className='mx-auto max-w-3xl mt-6 text-center font-bold text-5xl'>Value Packs</h1>
			</div>
			<Products />
			<Footer />
		</main>
	);
}