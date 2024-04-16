import Image from 'next/image';
import Facebook_Logo from '@/public/images/Facebook_Logo_Secondary.png';

const navigation = [
	{
	  name: 'Facebook',
	  href: '#',
	  icon: () => ( 
	  <Image 
		src={Facebook_Logo}
		alt='Facebook Logo'
		width={20}
		height={20}
	  />	
	  )
	},
  ]
  
  export default function Footer() {
	return (
	  <footer className="bg-black">
		<div className="mx-auto max-w-7xl px-6 py-12 md:flex md:items-center md:justify-between lg:px-8">
		  <div className="flex justify-center space-x-6 md:order-2">
			{navigation.map((item) => (
			  <a key={item.name} href={item.href} className="text-gray-400 hover:text-gray-500">
				<span className="sr-only">{item.name}</span>
				<item.icon aria-hidden="true" />
			  </a>
			))}
		  </div>
		  <div className="mt-8 md:order-1 md:mt-0">
			<p className="text-center text-xs leading-5 text-gray-500">
			  &copy; 2024 Gainesville Fireworks All rights reserved.
			</p>
		  </div>
		</div>
	  </footer>
	)
  }
  