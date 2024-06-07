import { useState, useEffect, Fragment } from "react";
import Image from "next/image";
import { Dialog, Transition } from "@headlessui/react";
import { FunnelIcon, XMarkIcon } from "@heroicons/react/20/solid";
import UserInfoForm from "../cart/user-info-form";

interface Firework {
  id: number;
  name: string;
  description: string;
  imagehref: string;
  category: string;
  price: number;
}

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

export default function FireworksForm() {
  const [fireworks, setFireworks] = useState<Firework[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [quantities, setQuantities] = useState<{
    [key: number]: number | null;
  }>({});
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [isUserInfoValid, setIsUserInfoValid] = useState(false);
  const [userInfo, setUserInfo] = useState({});

  const sendEmail = async () => {
    const selectedFireworks = fireworks.filter(
      (firework) =>
        quantities[firework.id] !== null &&
        quantities[firework.id] !== undefined &&
        quantities[firework.id]! > 0
    );

    const emailBody = selectedFireworks
      .map(
        (firework) => `
          <div>
            <p><strong>${firework.name}</strong></p>
            <p>Quantity: ${quantities[firework.id]}</p>
          </div>
        `
      )
      .join("");

    const userInfoBody = Object.entries(userInfo)
      .map(([key, value]) => `<p><strong>${key}:</strong> ${value}</p>`)
      .join("");

    const response = await fetch("/api/send-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        to: "jessereeves.17@outlook.com",
        subject: "Firework Order",
        text: `Here are the details of your firework order:\n${emailBody}\n\nUser Information:\n${userInfoBody}`,
        html: `
            <div>
              <div>
                <h2>Firework Order</h2>
                ${emailBody}
              </div>
              <div>
                <h2>User Information</h2>
                ${userInfoBody}
              </div>
            </div>
          `,
      }),
    });

    const result = await response.json();
    console.log(result);
  };

  useEffect(() => {
    const fetchFireworks = async () => {
      try {
        const response = await fetch("/api/get-firework-details");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setFireworks(data.fireworks);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFireworks();
  }, []);

  const handleQuantityChange = (id: number, value: number | null) => {
    setQuantities((prev) => ({ ...prev, [id]: value }));
  };

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
  };

  const handleFormChange = (updatedUserInfo: any) => {
    setUserInfo(updatedUserInfo);
  };

  const sortFireworksByCategory = (fireworks: Firework[]) => {
    return fireworks.sort((a, b) => {
      const orderA = categoryOrderMap[a.category] || Infinity;
      const orderB = categoryOrderMap[b.category] || Infinity;
      return orderA - orderB;
    });
  };

  const sortedFireworks = sortFireworksByCategory(fireworks);

  const filteredFireworks =
    selectedCategory === "All"
      ? sortedFireworks
      : sortedFireworks.filter(
          (product) => product.category === selectedCategory
        );

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-24">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900">
            Fireworks
          </h1>
          <div className="flex items-center">
            <button
              type="button"
              className="ml-4 p-2 text-gray-400 hover:text-gray-500 lg:hidden"
              onClick={() => setMobileFiltersOpen(true)}
            >
              <span className="sr-only">Filters</span>
              <FunnelIcon className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>

        <Transition.Root show={mobileFiltersOpen} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-40 lg:hidden"
            onClose={setMobileFiltersOpen}
          >
            <Transition.Child
              as={Fragment}
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
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
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
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>

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
              <div className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                {filteredFireworks.map((firework) => (
                  <div
                    key={firework.id}
                    className="group relative border p-4 rounded-lg bg-white"
                  >
                    <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md bg-white lg:aspect-none lg:h-60">
                      <Image
                        src={firework.imagehref}
                        alt={`Image of ${firework.name}`}
                        height={240}
                        width={240}
                        className="h-full w-full object-scale-down object-center lg:h-full lg:w-full"
                      />
                    </div>
                    <div className="flex items-center mt-4">
                      <div className="flex items-center">
                        <input
                          type="number"
                          id={`quantity-${firework.id}`}
                          min="0"
                          placeholder="Quantity"
                          className="border rounded p-1 w-full"
                          value={quantities[firework.id] || ""}
                          onChange={(e) =>
                            handleQuantityChange(
                              firework.id,
                              e.target.value ? parseInt(e.target.value) : null
                            )
                          }
                        />
                      </div>
                    </div>
                    <div className="mt-4 flex justify-between">
                      <h3 className="text-sm text-gray-700">{firework.name}</h3>
                      <p className="text-sm font-medium text-gray-900">
                        ${firework.price}
                      </p>
                    </div>
                    <p className="mt-1 text-sm text-gray-500">
                      {firework.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
      <div className="flex flex-col justify-center items-center gap-4 mb-20 border-t-2 border-zinc-900/50 mx-40">
        <h1 className="text-5xl font-bold mt-10">Custom Package Submission</h1>
        <div className="flex justify-center">
          <div className="max-w-md">
            <UserInfoForm
              onFormChange={handleFormChange}
              setValidationResult={setIsUserInfoValid}
            />
          </div>
        </div>
        <div className="flex justify-center">
          <button
            onClick={sendEmail}
            disabled={!isUserInfoValid}
            className="h-20 border-2 hover:bg-red-700 border-red-800 bg-red-600 rounded-md text-white text-3xl p-2 font-bold disabled:bg-zinc-600 disabled:border-zinc-700"
          >
            Submit Package for Review
          </button>
        </div>
      </div>
    </div>
  );
}
