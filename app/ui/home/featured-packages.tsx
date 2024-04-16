import Image from 'next/image';

import package1 from '@/public/images/package_images/assortment_1.jpg';
import package2 from '@/public/images/package_images/assortment_2.jpg';
import package3 from '@/public/images/package_images/assortment_3.jpg';

const callouts = [
	{
	  description: '1 Rocket, 1 Fountain, 1 Firecracker',
	  name: 'Star Light',
	  image: package1,
	  imageAlt: 'Image of package 1, containing: 1 Rocket, 1 Fountain, 1 Firecracker.',
	  href: '/packages/star-light'
	},
	{
	  description: '2 Rockets, 2 Fountains, 2 Firecrackers',
	  name: 'Kiler Value',
	  image: package2,
	  imageAlt: 'Image of package 2, containing: 2 Rockets, 2 Fountains, 2 Firecrackers.',
	  href: '#',
	},
	{
	  description: '3 Rockets, 3 Fountains, 3 Firecrackers',
	  name: 'Two for the Show',
	  image: package3,
	  imageAlt: 'Image of package 3, containing: 3 Rockets, 3 Fountains, 3 Firecrackers.',
	  href: '#',
	},
  ]
  
  export default function FeaturedProducts() {
	return (
	  <div className="bg-gray-100">
		<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		  <div className="mx-auto max-w-2xl py-16 sm:py-24 lg:max-w-none lg:py-32">
			<h2 className="text-2xl font-bold text-gray-900">Featured Fireworks</h2>
  
			<div className="mt-6 space-y-12 lg:grid lg:grid-cols-3 lg:gap-x-6 lg:space-y-0">
			  {callouts.map((callout) => (
				<div key={callout.description} className="group relative">
				  <div className="relative h-80 w-full overflow-hidden rounded-lg bg-white sm:aspect-h-1 sm:aspect-w-2 lg:aspect-h-1 lg:aspect-w-1 group-hover:opacity-75 sm:h-64">
					<Image
					  src={callout.image}
					  alt={callout.imageAlt}
					  className="h-full w-full object-cover object-top"
					/>
				  </div>
				  <h3 className="mt-6 text-sm text-gray-500">
					<a href={callout.href}>
					  <span className="absolute inset-0" />
					  {callout.description}
					</a>
				  </h3>
				  <p className="text-base font-semibold text-gray-900">{callout.name}</p>
				</div>
			  ))}
			</div>
		  </div>
		</div>
	  </div>
	)
  }
  