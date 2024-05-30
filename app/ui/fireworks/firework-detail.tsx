import React, { useState, useEffect } from "react";
import Image from "next/image";
import Alert from "@/app/ui/cart/item-added-alert";
import AddToCartButton from "../cart/addToCartButton";

interface FireworkDetailProps {
  fireworkDetail: string;
}

export default function FireworkDetail({
  fireworkDetail,
}: FireworkDetailProps) {
  const [isVisable, setIsVisable] = useState(false);
  const [fireworks, setFireworks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  const toggleVisability = () => {
    setIsVisable(!isVisable);
  };

  const defaultFirework = {
    id: "loadingFirework",
    name: "Loading...",
    description: "",
    category: "none",
    price: 0,
    imagehref: "",
    href: "#",
  };

  var firework = fireworks.find((item) => item["id"] === fireworkDetail) || defaultFirework;


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
          <a onClick={toggleVisability}>
          <AddToCartButton item={firework} />
          </a>
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
