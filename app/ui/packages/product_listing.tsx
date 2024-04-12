import Image from 'next/image';

import Package1 from '@/public/images/package_images/assortment_1.jpg';
import Package2 from '@/public/images/package_images/assortment_2.jpg';
import Package3 from '@/public/images/package_images/assortment_3.jpg';
import Package4 from '@/public/images/package_images/assortment_4.jpg';
import Package5 from '@/public/images/package_images/assortment_5.jpg';
import Package6 from '@/public/images/package_images/assortment_6.jpg';

const products = [
	{
	  id: 1,
	  name: 'Star Light',
	  href: '/packages/star-light',
	  price: '$100',
	  description: '1 Rocket, 1 Fountain, 1 Firecracker',
	  imageSrc: Package1,
	  imageAlt: 'Image of package 1, including: 1 rocket, 1 fountain, 1 firecracker.',
	},
	{
	  id: 2,
	  name: 'Killer Value',
	  href: '#',
	  price: '$150',
	  description: '2 Rockets, 2 Fountains, 1 Firecracker',
	  imageSrc: Package2,
	  imageAlt: 'Image of package 2, including: 2 rockets, 2 fountains, 1 firecracker.',
	},
	{
	  id: 3,
	  name: 'Two for the Show',
	  href: '#',
	  price: '$200',
	  description: '3 Rockets, 3 Fountains, 2 Firecrackers',
	  imageSrc: Package3,
	  imageAlt: 'Image of package 3, including: 3 rockets, 3 fountains, 2 firecrackers.',
	},
	{
	  id: 4,
	  name: 'Full Power',
	  href: '#',
	  price: '$250',
	  description: '3 Rockets, 3 Fountains, 3 Firecrackers',
	  imageSrc: Package4,
	  imageAlt: 'Image of package 4, including: 3 rockets, 3 fountains, 3 firecrackers.',
	},
	{
	  id: 5,
	  name: 'Stars & Stripes',
	  href: '#',
	  price: '$350',
	  description: '4 Rockets, 4 Fountains, 2 Firecrackers',
	  imageSrc: Package5,
	  imageAlt: 'Image of package 5, including: 4 rockets, 4 fountains, 2 firecrackers.',
	},
	{
	  id: 6,
	  name: 'War Games',
	  href: '#',
	  price: '$400',
	  description: '4 Rockets, 4 Fountains, 4 Firecrackers',
	  imageSrc: Package6,
	  imageAlt: 'Image of package 6, including: 4 rockets, 4 fountains, 4 firecrackers.',
	},

  ]
  
  export default function Example() {
	return (
	  <div className="bg-white">
		<div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
		  <h2 id="products-heading" className="sr-only">
			Products
		  </h2>
  
		  <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
			{products.map((product) => (
			  <a key={product.id} href={product.href} className="group">
				<div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg sm:aspect-h-3 sm:aspect-w-2">
				  <Image
					src={product.imageSrc}
					alt={product.imageAlt}
					height={600}
					width={600}
					className="h-full w-full object-cover object-center group-hover:opacity-75"
				  />
				</div>
				<div className="mt-4 flex items-center justify-between text-base font-medium text-gray-900">
				  <h3>{product.name}</h3>
				  <p>{product.price}</p>
				</div>
				<p className="mt-1 text-sm italic text-gray-500">{product.description}</p>
			  </a>
			))}
		  </div>
		</div>
	  </div>
	)
  }
  