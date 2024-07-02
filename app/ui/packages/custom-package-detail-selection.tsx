import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Tab } from "@headlessui/react";
import UserInfoForm from "../cart/user-info-form";
import { XMarkIcon } from "@heroicons/react/24/outline";

interface Firework {
  id: number;
  name: string;
  description: string;
  imagehref: string;
  category: string;
  price: number;
}

interface UserInfo {
  name: string;
  email: string;
  phone: string;
  // Add any other fields here
}

const subCategories = [
  "All",
  "Reloadable Shells",
  "500 Gram Repeaters",
  "350 Gram Repeaters",
  "200 Gram Repeaters",
  "Rockets",
  "Roman Candles",
  "Firecrackers",
  "Fountains",
  "Novelty",
  "Assortment",
];

export default function FireworksForm() {
  const [fireworks, setFireworks] = useState<Firework[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [quantities, setQuantities] = useState<{
    [key: number]: number | null;
  }>({});
  const [updatedQuantities, setUpdatedQuantities] = useState<{
    [key: number]: boolean;
  }>({});
  const [isUserInfoValid, setIsUserInfoValid] = useState(false);
  const [userInfo, setUserInfo] = useState<UserInfo>({
    name: "",
    email: "",
    phone: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const userInfoFormRef = useRef<HTMLDivElement>(null);

  const sendEmail = async () => {
    const selectedFireworks = fireworks.filter(
      (firework) =>
        quantities[firework.id] !== null &&
        quantities[firework.id] !== undefined &&
        quantities[firework.id]! > 0
    );

    let totalCost = 0;
    const emailBody = selectedFireworks
      .map((firework, index) => {
        totalCost += firework.price * (quantities[firework.id] || 0);
        return `
          <div>
            <p><strong>${index + 1}. ${firework.name}</strong></p>
            <p>Quantity: ${quantities[firework.id]}</p>
            <p>Price: $${firework.price}</p>
            <p>Total: $${firework.price * (quantities[firework.id] || 0)}</p>
          </div>
        `;
      })
      .join("");

    const userInfoBody = Object.entries(userInfo)
      .map(([key, value]) => {
        if (key === "phone") {
          return `<p><strong>${key}:</strong> <a href="tel:${value}">${value}</a></p>`;
        }
        return `<p><strong>${key}:</strong> ${value}</p>`;
      })
      .join("");

    const response = await fetch("/api/send-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        to: [ userInfo.email, 'gainesvillefireworks@gmail.com' ],
        subject: "Firework Custom Pack Submission",
        text: `Here are the details of your custom firework package submission:\n${emailBody}\n\nTotal Cost: $${totalCost}\n\nUser Information:\n${userInfoBody}`,
        html: `
            <div>
              <h1>Gainesville Fireworks Custom Package Submission</h1>
              <div>
                <h2>Custom Firework Package Submission</h2>
                ${emailBody}
                <p><strong>Total Cost: $${totalCost}</strong></p>
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

    // Set the isSubmitted state to true to display the success message
    setIsSubmitted(true);
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
    setUpdatedQuantities((prev) => ({ ...prev, [id]: true }));
    setTimeout(() => {
      setUpdatedQuantities((prev) => ({ ...prev, [id]: false }));
    }, 2000); // Remove message after 2 seconds
  };

  // Create a mapping from category names to their index positions
  const categoryOrder = subCategories.reduce((acc, category, index) => {
    acc[category] = index;
    return acc;
  }, {} as { [key: string]: number });

  const sortFireworksByCategory = (fireworks: Firework[]) => {
    return fireworks.sort(
      (a, b) => categoryOrder[a.category] - categoryOrder[b.category]
    );
  };

  const scrollToUserInfoForm = () => {
    if (userInfoFormRef.current) {
      userInfoFormRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  if (loading)
    return (
      <p className="text-center mb-4 text-red-600 text-xl font-semibold">
        Loading Fireworks...
      </p>
    );
  if (error) return <p>Error: {error}</p>;

  // Filter the fireworks based on the quantities
  const selectedFireworks = fireworks.filter(
    (firework) =>
      quantities[firework.id] !== null &&
      quantities[firework.id] !== undefined &&
      quantities[firework.id]! > 0
  );

  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-baseline justify-between pb-6 pt-24">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900">
            Fireworks
          </h1>
          <button
            onClick={scrollToUserInfoForm}
            className="h-auto border-2 hover:bg-red-700 border-red-800 bg-red-600 rounded-md text-white text-lg p-2 font-bold mt-4 sm:mt-0"
          >
            Go to Submission Form
          </button>
        </div>

        <Tab.Group defaultIndex={1}>
          <Tab.List className="flex space-x-1 rounded-xl bg-red-900/20 p-1 overflow-x-auto">
            {subCategories.map((category) => (
              <Tab
                key={category}
                className={({ selected }) =>
                  `w-full px-2 py-2.5 text-sm leading-5 font-medium text-red-700 rounded-lg whitespace-nowrap
                    ${
                      selected
                        ? "bg-white shadow"
                        : "text-red-100 hover:bg-white/[0.12] hover:text-white"
                    }`
                }
              >
                {category}
              </Tab>
            ))}
          </Tab.List>
          <Tab.Panels className="mt-2">
            {subCategories.map((category) => (
              <Tab.Panel key={category} className="rounded-xl bg-white p-3">
                <div className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                  {sortFireworksByCategory(
                    fireworks.filter(
                      (firework: any) =>
                        category === "All" || firework.category === category
                    )
                  ).map((firework) => (
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
                      {updatedQuantities[firework.id] && (
                        <p className="mt-1 text-green-600 text-sm">
                          Quantity Updated
                        </p>
                      )}
                      <div className="mt-4 flex justify-between">
                        <h3 className="text-sm text-gray-700">
                          {firework.name}
                        </h3>
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
              </Tab.Panel>
            ))}
          </Tab.Panels>
        </Tab.Group>
      </div>
      <div
        ref={userInfoFormRef}
        className="flex flex-col justify-center items-center gap-4 mb-20 border-t-2 border-zinc-900/50 mx-4 lg:mx-40 mt-10"
      >
        <h1 className="text-5xl font-bold mt-10 text-center">
          Custom Package Submission
        </h1>
        <div className="flex gap-4 flex-col sm:flex-row mt-6">
          <div>
            <h1 className="font-bold text-3xl mb-2">
              Custom Discount Pack Items
            </h1>
            <section aria-labelledby="cart-heading" className="lg:col-span-7">
              <h2 id="cart-heading" className="sr-only">
                Items in your shopping cart
              </h2>

              <ul
                role="list"
                className="divide-y divide-gray-200 border-b border-t border-gray-200"
              >
                {selectedFireworks.map((item, productIdx) => (
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
                            value={quantities[item.id] || ""}
                            onChange={(e) =>
                              handleQuantityChange(
                                item.id,
                                parseInt(e.target.value)
                              )
                            }
                          >
                            {[...Array(100)].map((_, i) => (
                              <option key={i} value={i + 1}>
                                {i + 1}
                              </option>
                            ))}
                          </select>

                          <div className="absolute right-0 top-0">
                            <button
                              type="button"
                              className="-m-2 inline-flex p-2 text-gray-400 hover:text-gray-500"
                              onClick={() =>
                                handleQuantityChange(item.id, null)
                              }
                            >
                              <span className="sr-only">Remove</span>
                              <XMarkIcon
                                className="h-5 w-5"
                                aria-hidden="true"
                              />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          </div>
          <div>
            <div className="flex justify-center">
              <div className="w-full max-w-md">
                <h1 className="font-bold text-3xl mb-2">
                 Customer Information 
                </h1>
                <UserInfoForm
                  onFormChange={setUserInfo}
                  setValidationResult={setIsUserInfoValid}
                />
              </div>
            </div>
            <div className="flex flex-col justify-center items-center mt-4">
              <button
                onClick={sendEmail}
                disabled={!isUserInfoValid}
                className="h-auto border-2 hover:bg-red-700 border-red-800 bg-red-600 text-white rounded-md text-3xl p-2 font-bold disabled:bg-zinc-300 disabled:border-0"
              >
                Submit Package for Review
              </button>
              {!isUserInfoValid && (
                <p className="text-red-600 mt-2 text-center">
                  Please check that all fields are populated and agree to the
                  Terms of Sale to submit.
                </p>
              )}
              {isSubmitted && (
                <p className="mt-4 text-green-600 text-lg font-semibold">
                  Your custom package has been submitted!
                  <br /> You will recieve an email shortly. Please check your
                  spam if you do not see your email.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
