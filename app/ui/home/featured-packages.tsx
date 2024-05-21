import Image from 'next/image';

import package1 from '@/public/images/package/package-1000-total.jpg';
import package2 from '@/public/images/package/package-500-total.jpg';
import package3 from '@/public/images/package/package-300-total.jpg';

const callouts = [
	{
	  description: '$1000 Value Pack',
	  name: 'Extreme Explosive Ensemble',
	  image: package1,
	  imageAlt: 'Extreme Explosive Ensemble',
	  href: '/packages/1000'
	},
	{
	  description: '$500 Value Pack',
	  name: 'Starlight Symphony Collection',
	  image: package2,
	  imageAlt: 'Starlight Symphony Collection',
	  href: '/packages/500'
	},
	{
	  description: '$300 Value Pack',
	  name: 'Galaxy Burst Bundle',
	  image: package3,
	  imageAlt: 'Galaxy Burst Bundle',
	  href: '/packages/300'
	},
  ]
  
  export default function FeaturedProducts() {
	return (
	  <div className="bg-gray-100">
		<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		  <div className="mx-auto max-w-2xl py-16 sm:py-24 lg:max-w-none lg:py-32">
			<h2 className="text-2xl font-bold text-gray-900">Recommended Value Packs</h2>
  
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
  