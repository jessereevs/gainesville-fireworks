import React, { useState } from "react";

import Image from "next/image";

import Individuals from "@/backendData/individuals.json"

import Alert from "@/app/ui/cart/item-added-alert";

interface FireworkDetailProps {
  fireworkDetail: string;
}

export default function FireworkDetail({ fireworkDetail }: FireworkDetailProps) {
  const [isVisable, setIsVisable] = useState(false);

  const toggleVisability = () => {
    setIsVisable(!isVisable);
  };

  var firework = Individuals.individuals.find(item => item.id === fireworkDetail )

  if(firework === undefined ) {
    firework = {
        "id": "itemNotFound",
        "name": "ITEM NOT FOUND",
        "description": "ITEM NOT FOUND",
        "category": "none",
        "price": 9999,
        "image": "",
        "imageAlt": "",
        "href": "#"
    }
  }

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="pt-4">{isVisable && <Alert />}</div>
      <div className="mx-auto max-w-5xl py-16 flex">
        <div className="mr-10">
          <h1 className="font-bold text-3xl pb-2">{firework.name}</h1>
          <h2>
            ${firework.price} |{" "}
            <span className="text-neutral-600">
              {firework.category} 
            </span>
          </h2>
          <h2 className="py-8">{firework.description}</h2>
          <button
            type="button"
            onClick={toggleVisability}
            className="rounded-md bg-red-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
          >
            Purchase Package
          </button>
        </div>
        <div className="flex w-fit h-fit">
          <Image
            src={firework.image}
            alt={firework.imageAlt}
            height={2110}
            width={1600}
            className="w-full object-cover object-center group-hover:opacity-75"
          />
        </div>
      </div>
    </div>
  );
}
