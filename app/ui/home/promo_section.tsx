import Image from "next/image";
import HeroImage from "@/public/images/hero_images/fireworks_with_flag.jpg";
import Generic_Fireworks_1 from "@/public/images/hero_images/generic_fireworks_1.jpg";
import Generic_Fireworks_2 from "@/public/images/hero_images/generic_fireworks_2.jpg";
import Fireworks_Packages from "@/public/images/hero_images/basic_packages.jpg";
import { Sansita_Swashed } from "next/font/google";

const sansita_swashed = Sansita_Swashed({
  subsets: ["latin"],
  display: "swap",
});

const collections = [
  {
    name: "Individual Fireworks",
    href: "/fireworks",
    imageSrc: Generic_Fireworks_1,
    imageAlt: "Individual Fireworks",
  },
  {
    name: "Firework Packages",
    href: "/packages",
    imageSrc: Fireworks_Packages,
    imageAlt: "Firework Packages",
  },
  {
    name: "All Fireworks",
    href: "/fireworks",
    imageSrc: Generic_Fireworks_2,
    imageAlt: "All Fireworks",
  },
];

export default function PromoPage() {
  function handleButtonClick() {
    window.open("/packages", "_self");
  }

  return (
    <div className="relative bg-white">
      {/* Background image and overlap */}
      <div
        aria-hidden="true"
        className="absolute inset-0 hidden sm:flex sm:flex-col"
      >
        <div className="relative w-full flex-1 bg-gray-800">
          <div className="absolute inset-0 overflow-hidden">
            <Image
              src={HeroImage}
              alt="Hero Image"
              fill={true}
              priority={true}
            />
          </div>
          <div className="absolute inset-0 bg-gray-900 opacity-50" />
        </div>
        <div className="h-32 w-full bg-white md:h-40 lg:h-48" />
      </div>

      <div className="relative mx-auto max-w-3xl px-4 pb-96 text-center sm:px-6 sm:pb-0 lg:px-8">
        {/* Background image and overlap */}
        <div
          aria-hidden="true"
          className="absolute inset-0 flex flex-col sm:hidden"
        >
          <div className="relative w-full flex-1 bg-gray-800">
            <div className="absolute inset-0 overflow-hidden">
              <Image
                src={HeroImage}
                alt="Hero Image"
                fill={true}
                priority={true}
              />
            </div>
            <div className="absolute inset-0 bg-gray-900 opacity-50" />
          </div>
          <div className="h-48 w-full bg-white" />
        </div>
        <div className="relative py-32">
          <h1 className="pb-4 text-5xl font-bold tracking-tight text-white sm:text-6xl md:text-7xl">
            <span className={sansita_swashed.className}>
              Gainesville Fireworks
            </span>
          </h1>
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-4xl">
            Buy Your Fireworks Locally!
          </h2>
          <div className="mt-6 mb-2 border-2 border-red-950 rounded-md bg-red-600 p-6">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-4xl">
             NOW ACCEPTING ORDERS FOR JULY 4TH! 
            </h2>
          </div>
          <div className="mt-4 sm:mt-6">
            <button
              onClick={handleButtonClick}
              className="inline-block rounded-md border border-transparent bg-red-600 px-8 py-3 font-medium text-white hover:bg-red-700"
            >
              Shop Value Packs
            </button>
          </div>
        </div>
      </div>

      <section
        aria-labelledby="collection-heading"
        className="relative -mt-96 sm:mt-0"
      >
        <h2 id="collection-heading" className="sr-only">
          Collections
        </h2>
        <div className="mx-auto grid max-w-md grid-cols-1 gap-y-6 px-4 sm:max-w-7xl sm:grid-cols-3 sm:gap-x-6 sm:gap-y-0 sm:px-6 lg:gap-x-8 lg:px-8">
          {collections.map((collection) => (
            <div
              key={collection.name}
              className="group relative h-96 rounded-lg bg-white shadow-xl sm:aspect-h-5 sm:aspect-w-4 sm:h-auto"
            >
              <div>
                <div
                  aria-hidden="true"
                  className="absolute inset-0 overflow-hidden rounded-lg"
                >
                  <div className="absolute inset-0 overflow-hidden group-hover:opacity-75">
                    <Image
                      src={collection.imageSrc}
                      alt={collection.imageAlt}
                      className="h-full w-full object-cover object-center"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-50" />
                </div>
                <div className="absolute inset-0 flex items-end rounded-lg p-6">
                  <div>
                    <h3 className="mt-1 font-semibold text-white">
                      <a href={collection.href}>
                        <span className="absolute inset-0" />
                        {collection.name}
                      </a>
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
