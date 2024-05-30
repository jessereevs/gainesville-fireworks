import React, { useState } from "react";

import { FireworkPackage } from "@/types";
import Image from "next/image";

import Alert from "@/app/ui/cart/item-added-alert";

import AddToCartButton from "../cart/addToCartButton";

interface PackageDetailProps {
  fireworkPackage: FireworkPackage;
}

export default function PackageDetail({ fireworkPackage }: PackageDetailProps) {
  const [isVisable, setIsVisable] = useState(false);

  const toggleVisability = () => {
    setIsVisable(!isVisable);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="pt-4">{isVisable && <Alert />}</div>
      <div className="mx-auto max-w-5xl py-16 flex">
        <div className="mr-10">
          <h1 className="font-bold text-3xl pb-2">{fireworkPackage.name}</h1>
          <h2>
            ${fireworkPackage.price} |{" "}
            <span className="text-neutral-600">
              ${fireworkPackage.value} Value
            </span>
          </h2>
          <ul className="mt-3">
            <li className=" font-bold text-xl mb-1">This Package Includes {fireworkPackage.amountOfFireworks} Fireworks</li>
            <ul className="flex flex-wrap gap-1 mb-2">
              {fireworkPackage.reloadableShells && (
                <li className="font-bold">Reloadable Shells:</li>
              )}
              {fireworkPackage.reloadableShells &&
                fireworkPackage.reloadableShells.map((firework) => (
                  <li key={firework} className="">
                    {firework}
                  </li>
                ))}
            </ul>
            <ul className="flex flex-wrap gap-1 mb-2">
              {fireworkPackage.repeaters500 && (
                <li className="font-bold">500 Gram Repeaters:</li>
              )}
              {fireworkPackage.repeaters500 &&
                fireworkPackage.repeaters500.map((firework) => (
                  <li key={firework} className="">
                    {firework}
                  </li>
                ))}
            </ul>
            <ul className="flex flex-wrap gap-1 mb-2">
              {fireworkPackage.repeaters350 && (
                <li className="font-bold">350 Gram Repeaters:</li>
              )}
              {fireworkPackage.repeaters350 &&
                fireworkPackage.repeaters350.map((firework) => (
                  <li key={firework} className="">
                    {firework}
                  </li>
                ))}
            </ul>
            <ul className="flex flex-wrap gap-1 mb-2">
              {fireworkPackage.repeaters200 && (
                <li className="font-bold">200 Gram Repeaters:</li>
              )}
              {fireworkPackage.repeaters200 &&
                fireworkPackage.repeaters200.map((firework) => (
                  <li key={firework} className="">
                    {firework}
                  </li>
                ))}
            </ul>
            <ul className="flex flex-wrap gap-1 mb-2">
              {fireworkPackage.rockets && (
                <li className="font-bold">Rockets:</li>
              )}
              {fireworkPackage.rockets &&
                fireworkPackage.rockets.map((firework) => (
                  <li key={firework} className="">
                    {firework}
                  </li>
                ))}
            </ul>
            <ul className="flex flex-wrap gap-1 mb-2">
              {fireworkPackage.fountains && (
                <li className="font-bold">Fountains:</li>
              )}
              {fireworkPackage.fountains &&
                fireworkPackage.fountains.map((firework) => (
                  <li key={firework} className="">
                    {firework}
                  </li>
                ))}
            </ul>
            <ul className="flex flex-wrap gap-1 mb-2">
              {fireworkPackage.romanCandles && (
                <li className="font-bold">Roman Candles:</li>
              )}
              {fireworkPackage.romanCandles &&
                fireworkPackage.romanCandles.map((firework) => (
                  <li key={firework} className="">
                    {firework}
                  </li>
                ))}
            </ul>
            <ul className="flex flex-wrap gap-1 mb-2">
              {fireworkPackage.misc && <li className="font-bold">Extra:</li>}
              {fireworkPackage.misc &&
                fireworkPackage.misc.map((firework) => (
                  <li key={firework} className="">
                    {firework}
                  </li>
                ))}
            </ul>
            <li className="text-xs mt-2 italic">
              Fireworks listed above that are not available at the time of
              purchase will be replaced with a firework from the same category
              of equal or greater value.
            </li>
          </ul>
          <h2 className="py-8">{fireworkPackage.description}</h2>
          <a onClick={toggleVisability}>
            <AddToCartButton item={fireworkPackage} />
          </a>
        </div>
        <div className="flex w-fit h-fit">
          <Image
            src={fireworkPackage.imagehref}
            alt="Image of the firework package."
            height={1110}
            width={1600}
            className="w-full object-cover object-center group-hover:opacity-75 rounded-md border-zinc-950 border"
          />
        </div>
      </div>
    </div>
  );
}
