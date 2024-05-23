import {
  AwaitedReactNode,
  SetStateAction,
  JSXElementConstructor,
  Key,
  ReactElement,
  ReactNode,
  ReactPortal,
  useState,
} from "react";

import { Dialog, Menu, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import {
  FunnelIcon,
} from "@heroicons/react/20/solid";

import Individuals from "@/backendData/individuals.json";

const subCategories = [
  { name: "All", href: "#" },
  { name: "Reloadable Shells", href: "#" },
  { name: "500 Gram Repeaters", href: "#" },
  { name: "350 Gram Repeaters", href: "#" },
  { name: "200 Gram Repeaters", href: "#" },
  { name: "Rockets", href: "#" },
  { name: "Roman Candles", href: "#" },
  { name: "Firecrackers", href: "#" },
  { name: "Fountains", href: "#" },
  { name: "Novelty", href: "#" },
  { name: "Assortment", href: "#" },
];

// Define the type for the category order map
type CategoryOrderMap = {
  [key: string]: number;
};

// Create a mapping from category names to their order index
const categoryOrderMap: CategoryOrderMap = subCategories.reduce(
  (acc: CategoryOrderMap, category, index) => {
    acc[category.name] = index;
    return acc;
  },
  {}
);

export default function FireworkListing() {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const sortFireworksByCategory = (fireworks: any[]) => {
    return fireworks.sort(
      (a: { category: string }, b: { category: string }) => {
        const orderA = categoryOrderMap[a.category] || Infinity;
        const orderB = categoryOrderMap[b.category] || Infinity;
        return orderA - orderB;
      }
    );
  };

  const sortedIndividuals = sortFireworksByCategory(Individuals.individuals);

  const filteredIndividuals =
    selectedCategory === "All"
      ? sortedIndividuals
      : sortedIndividuals.filter(
          (product: { category: string }) =>
            product.category === selectedCategory
        );

  const handleCategoryClick = (category: SetStateAction<string>) => {
    setSelectedCategory(category);
  };

  return (
    <div className="min-h-screen">
      <div>
        {/* Mobile filter dialog */}
        <Transition show={mobileFiltersOpen}>
          <Dialog
            className="relative z-40 lg:hidden"
            onClose={setMobileFiltersOpen}
          >
            <Transition.Child
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black bg-opacity-25" />
            </Transition.Child>

            <div className="fixed inset-0 z-40 flex">
                <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
                  <div className="flex items-center justify-between px-4">
                    <h2 className="text-lg font-medium text-gray-900">
                      Filters
                    </h2>
                    <button
                      type="button"
                      className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                      onClick={() => setMobileFiltersOpen(false)}
                    >
                      <span className="sr-only">Close menu</span>
                      <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>

                  {/* Filters */}
                  <form className="mt-4 border-t border-gray-200">
                    <h3 className="sr-only">Categories</h3>
                    <ul
                      role="list"
                      className="px-2 py-3 font-medium text-gray-900"
                    >
                      {subCategories.map((category) => (
                        <li key={category.name}>
                          <button
                            type="button"
                            className="block px-2 py-3 w-full text-left"
                            onClick={() => {
                              handleCategoryClick(category.name);
                              setMobileFiltersOpen(false);
                            }}
                          >
                            {category.name}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </form>
                </Dialog.Panel>
            </div>
          </Dialog>
        </Transition>

        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-24">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900">
             Fireworks 
            </h1>

            <div className="flex items-center">
              <Menu as="div" className="relative inline-block text-left">
                  <Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1"></div>
                  </Menu.Items>
              </Menu>

              <button
                type="button"
                className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
                onClick={() => setMobileFiltersOpen(true)}
              >
                <span className="sr-only">Filters</span>
                <FunnelIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div>

          <section aria-labelledby="products-heading" className="pb-24 pt-6">
            <h2 id="products-heading" className="sr-only">
              Products
            </h2>

            <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
              {/* Filters */}
              <form className="hidden lg:block">
                <h3 className="sr-only">Categories</h3>
                <ul
                  role="list"
                  className="space-y-4 border-b border-gray-200 pb-6 text-sm font-medium text-gray-900"
                >
                  {subCategories.map((category) => (
                    <li key={category.name}>
                      <button
                        type="button"
                        className="block px-2 py-1 w-full text-left"
                        onClick={() => handleCategoryClick(category.name)}
                      >
                        {category.name}
                      </button>
                    </li>
                  ))}
                </ul>
              </form>

              {/* Product grid */}
              <div className="lg:col-span-3">
                <div className="bg-white">
                  <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
                    <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                      {filteredIndividuals.map(
                        (product: {
                          id: Key | null | undefined;
                          image: string | undefined;
                          name:
                            | string
                            | number
                            | bigint
                            | boolean
                            | ReactElement<
                                any,
                                string | JSXElementConstructor<any>
                              >
                            | Iterable<ReactNode>
                            | Promise<AwaitedReactNode>
                            | null
                            | undefined;
                          href: string | undefined;
                          price:
                            | string
                            | number
                            | bigint
                            | boolean
                            | ReactElement<
                                any,
                                string | JSXElementConstructor<any>
                              >
                            | Iterable<ReactNode>
                            | ReactPortal
                            | Promise<AwaitedReactNode>
                            | null
                            | undefined;
                        }) => (
                          <div key={product.id} className="group relative">
                            <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                              <img
                                src={product.image}
                                className="bg-white h-full w-full object-scale-down object-center lg:h-full lg:w-full"
                              />
                            </div>
                            <div className="mt-4 flex justify-between">
                              <div>
                                <h3 className="text-sm text-gray-700">
                                  <a href={product.href}>
                                    <span
                                      aria-hidden="true"
                                      className="absolute inset-0"
                                    />
                                    {product.name}
                                  </a>
                                </h3>
                              </div>
                              <p className="text-sm font-medium text-gray-900">
                                ${product.price}
                              </p>
                            </div>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
