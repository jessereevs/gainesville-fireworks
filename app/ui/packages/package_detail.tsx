import React, {useState} from "react";

import { FireworkPackage } from "@/types";
import Image from "next/image";

import Alert from "@/app/ui/cart/item-added-alert";

interface PackageDetailProps {
	fireworkPackage: FireworkPackage;
}

export default function PackageDetail({ fireworkPackage }: PackageDetailProps) {
	const [isVisable, setIsVisable] = useState(false);

	const toggleVisability = () => {
		setIsVisable(!isVisable);
	}

	return(
		<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
			<div className="pt-4">
				{isVisable && (
				<Alert />
				)}
			</div>
			<div className="mx-auto max-w-3xl py-16 flex">
				<div className="mr-10">
					<h1 className="font-bold text-3xl pb-2">{fireworkPackage.name}</h1>
					<h2>${fireworkPackage.price} | <span className="text-neutral-600">${fireworkPackage.value} Value</span></h2>
					<h2 className="font-bold mt-6">This package includes:</h2>
					<ul>
					{fireworkPackage.includes.map((firework) => (
						<li key={firework} className="">{firework}</li>
					))}
					<li className="text-xs mt-2 italic">Fireworks listed above that are not available at the time of purchase will be replaced with a firework from the same category of equal or greater value.</li>
					</ul>
					<h2 className="py-8">{fireworkPackage.description}</h2>
					<button type="button" onClick={toggleVisability} className="rounded-md bg-red-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600">Purchase Package</button>
				</div>
				<Image 
					src={fireworkPackage.image}
					alt="Firework Package Image"
					width={300}
					height={400}
				/>
			</div>
		</div>
	)
}