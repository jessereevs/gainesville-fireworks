import { useState, useEffect } from "react";
import Image from "next/image";
import CustomPackageListing from "./custom-package-listing";

export default function Listing() {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const response = await fetch("/api/get-package-details");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setPackages(data.packages);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPackages();
  }, []);

  return (
    <div>
      <div className="bg-white">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          <h2 id="products-heading" className="sr-only">
            Products
          </h2>

          <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-2 xl:gap-x-8">
            {packages.map((product) => (
              <a key={product["id"]} href={product["href"]} className="group">
                <div className="aspect-h-2 aspect-w-3 w-full overflow-hidden rounded-lg">
                  <Image
                    src={product["imagehref"]}
                    alt="Image of the firework package."
                    height={600}
                    width={600}
                    className="h-full w-full object-cover object-center group-hover:opacity-75"
                  />
                </div>
                <div className="mt-4 flex items-center justify-between text-base font-medium text-gray-900">
                  <div className="flex gap-2">
                    <h3>{product["name"]}</h3>
                    <h4 className=" text-red-600 italic">
                      (Click Here for Details)
                    </h4>
                  </div>
                  <p>${product["price"]}</p>
                </div>
                <p className="mt-1 text-sm italic text-gray-500">
                  {product["description"]}
                </p>
              </a>
            ))}
          </div>
          {/*
          <div className="w-full border-zinc-400 border my-4"></div>
          <CustomPackageListing />
          */}
        </div>
      </div>
    </div>
  );
}
