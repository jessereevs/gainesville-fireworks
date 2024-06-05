import React, { useEffect, useState } from "react";
import { useCart } from "../CartContext";
import CheckoutButton from "./checkout-button";
import Image from "next/image";
import FeaturedProducts from "../home/featured-packages";
import { XMarkIcon } from "@heroicons/react/24/outline";
import UserInfoForm from "./user-info-form";

export default function ShoppingCart() {
  const { cart, setCart, removeFromCart } = useCart();
  const [userInfo, setUserInfo] = useState({});
  const [clientCart, setClientCart] = useState<typeof cart>([]);
  const [isUserInfoValid, setIsUserInfoValid] = useState(false);
  const [inventoryData, setInventoryData] = useState<{ [key: string]: number }>({});
  const [insufficientInventoryItems, setInsufficientInventoryItems] = useState<string[]>([]);

  const handleFormChange = (updatedUserInfo: any) => {
    setUserInfo(updatedUserInfo);
  };

  useEffect(() => {
    // Ensure cart is only set on the client side to avoid hydration issues
    setClientCart(cart);
  }, [cart]);

  useEffect(() => {
    // Save user info and cart to local storage whenever they change
    localStorage.setItem("userInfo", JSON.stringify(userInfo));
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [userInfo, cart]);

  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const response = await fetch(`/api/get-firework-details?timestamp=${new Date().getTime()}`, {
          headers: {
            'Cache-Control': 'no-store',
          },
        });
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        const inventory = data.fireworks.reduce((acc: { [key: string]: number }, firework: { id: string, inventory: number }) => {
          acc[firework.id] = firework.inventory;
          return acc;
        }, {});
        setInventoryData(inventory);
      } catch (error) {
        console.error("Error fetching inventory data:", error);
      }
    };

    fetchInventory();
  }, []);

  useEffect(() => {
    const checkInventory = () => {
      const insufficientItems = clientCart.filter((item) => {
        const inventory = inventoryData[item.id] || 0;
        return item.quantity > inventory;
      }).map((item) => item.name);
      setInsufficientInventoryItems(insufficientItems);
    };

    if (Object.keys(inventoryData).length > 0) {
      checkInventory();
    }
  }, [clientCart, inventoryData]);

  const total = clientCart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleQuantityChange = (id: string, quantity: number) => {
    setCart((prevCart) =>
      prevCart.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 pb-24 pt-16 sm:px-6 lg:max-w-7xl lg:px-8">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Shopping Cart
        </h1>
        <form className="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
          <section aria-labelledby="cart-heading" className="lg:col-span-7">
            <h2 id="cart-heading" className="sr-only">
              Items in your shopping cart
            </h2>

            <ul
              role="list"
              className="divide-y divide-gray-200 border-b border-t border-gray-200"
            >
              {clientCart.map((item, productIdx) => (
                <li key={item.id} className="flex py-6 sm:py-10">
                  <div className="flex-shrink-0">
                    <Image
                      src={item.imagehref}
                      alt="Firework Image"
                      height={600}
                      width={400}
                      className="h-28 w-20 rounded-md object-cover object-center sm:h-48 sm:w-48"
                    />
                  </div>

                  <div className="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
                    <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                      <div>
                        <div className="flex justify-between">
                          <h3 className="text-sm font-bold">{item.name}</h3>
                        </div>
                        <div className="flex justify-between">
                          <h3 className="text-sm italic">{item.category}</h3>
                        </div>
                        <div className="mt-1 flex text-sm"></div>
                        <p className="mt-1 text-sm font-medium text-gray-900">
                          ${item.price}
                        </p>
                      </div>

                      <div className="mt-4 sm:mt-0 sm:pr-9">
                        <label
                          htmlFor={`quantity-${productIdx}`}
                          className="sr-only"
                        >
                          Quantity, {item.name}
                        </label>
                        <select
                          id={`quantity-${productIdx}`}
                          name={`quantity-${productIdx}`}
                          className="max-w-full rounded-md border border-gray-300 py-1.5 text-left text-base font-medium leading-5 text-gray-700 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                          value={item.quantity}
                          onChange={(e) =>
                            handleQuantityChange(
                              item.id,
                              parseInt(e.target.value)
                            )
                          }
                        >
                          {[...Array(10)].map((_, i) => (
                            <option key={i} value={i + 1}>
                              {i + 1}
                            </option>
                          ))}
                        </select>

                        <div className="absolute right-0 top-0">
                          <button
                            type="button"
                            className="-m-2 inline-flex p-2 text-gray-400 hover:text-gray-500"
                            onClick={() => removeFromCart(item.id)}
                          >
                            <span className="sr-only">Remove</span>
                            <XMarkIcon className="h-5 w-5" aria-hidden="true" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </section>

          {/* Order summary */}
          <section
            aria-labelledby="summary-heading"
            className="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8"
          >
            <h2
              id="summary-heading"
              className="text-lg font-medium text-gray-900"
            >
              Checkout
            </h2>
            <UserInfoForm onFormChange={handleFormChange} setValidationResult={setIsUserInfoValid} />
            <dl className="mt-6 space-y-4">
              <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                <dt className="text-base font-medium text-gray-900">
                  Order total
                </dt>
                <dd className="text-base font-medium text-gray-900">
                  ${total.toFixed(2)}
                </dd>
              </div>
            </dl>

            <div className="mt-6">
              {insufficientInventoryItems.length === 0 ? (
                <CheckoutButton isEnabled={isUserInfoValid} />
              ) : (
                <div>
                  <p className="text-red-600">Please decrease the quantity of these items:</p>
                  <ul className="text-red-600 list-disc ml-5">
                    {insufficientInventoryItems.map((itemName, idx) => (
                      <li key={idx}>{itemName}</li>
                    ))}
                  </ul>
                  <h1 className="mt-3 text-red-600">At this time, we do not have the inventory to fulfill an order of this size. Please contact us if you wish to place a custom order.</h1>
                </div>
              )}
            </div>
          </section>
        </form>
      </div>
      <FeaturedProducts />
    </div>
  );
}
