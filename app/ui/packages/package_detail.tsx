import { FireworkPackage } from "@/types";
import Image from "next/image";

interface PackageDetailProps {
	fireworkPackage: FireworkPackage;
}

export default function PackageDetail({ fireworkPackage }: PackageDetailProps) {
	return(
		<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
			<div className="mx-auto max-w-3xl py-16 flex">
				<div className="mr-10">
					<h1 className="font-bold text-3xl pb-2">{fireworkPackage.name}</h1>
					<h2>${fireworkPackage.price} | <span className="text-neutral-600">${fireworkPackage.value} Value</span></h2>
					<h2 className="py-8">{fireworkPackage.description}</h2>
					<button type="button" className="rounded-md bg-red-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600">Purchase Package</button>
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