import React, { useState, useEffect } from "react";
import Image from "next/image";
import Alert from "@/app/ui/cart/item-added-alert";
import AddToCartButton from "../cart/addToCartButton";

interface Firework {
  id: string;
  name: string;
  description: string;
  category: string;
  inventory: number;
  price: number;
  imagehref: string;
  href: string;
}

interface FireworkDetailProps {
  fireworkDetail: string;
}

export default function FireworkDetail({
  fireworkDetail,
}: FireworkDetailProps) {
  const [isVisable, setIsVisable] = useState(false);
  const [fireworks, setFireworks] = useState<Firework[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFireworks = async () => {
      try {
        console.log("Fetching fireworks..."); // Debug log
        const response = await fetch(`/api/get-firework-details?timestamp=${new Date().getTime()}`, {
          headers: {
            'Cache-Control': 'no-store',
          },
        });
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        console.log("Fetched data:", data); // Debug log
        // Filter fireworks with inventory greater than 0
        const filteredFireworks = data.fireworks.filter((firework: Firework) => firework.inventory > 0);
        setFireworks(filteredFireworks);
      } catch (error: any) {
        console.error("Error fetching fireworks:", error); // Debug log
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFireworks();
  }, []);

  const toggleVisability = () => {
    setIsVisable(!isVisable);
  };

  const defaultFirework: Firework = {
    id: "loadingFirework",
    name: "Loading...",
    description: "",
    category: "none",
    inventory: 0,
    price: 0,
    imagehref: "",
    href: "#",
  };

  const firework: Firework =
    fireworks.find((item) => item.id === fireworkDetail) || defaultFirework;

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="pt-4">{isVisable && <Alert />}</div>
      <div className="mx-auto max-w-5xl py-16 flex">
        <div className="mr-10">
          <h1 className="font-bold text-3xl pb-2">{firework.name}</h1>
          <h2>
            ${firework.price} |{" "}
            <span className="text-neutral-600">{firework.category}</span>
          </h2>
          <h2 className="py-8">{firework.description}</h2>
          <div className="flex items-center gap-2">
            {firework.inventory > 0 ? (
              <a onClick={toggleVisability}>
                <AddToCartButton item={firework} />
              </a>
            ) : (
              <p className="text-red-600">Out of stock</p>
            )}
            {firework.inventory < 10 && (
              <h1 className="font-semibold italic text-red-600">Low Inventory Warning</h1>
            )}
            
          </div>
        </div>
        <div className="flex w-fit h-fit">
          <Image
            src={firework.imagehref}
            alt={firework.name}
            height={2110}
            width={1600}
            className="w-full object-cover object-center group-hover:opacity-75"
          />
        </div>
      </div>
    </div>
  );
}
