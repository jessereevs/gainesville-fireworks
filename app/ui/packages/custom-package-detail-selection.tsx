
import { useState, useEffect, useRef, Fragment } from "react";
import Image from "next/image";
import { Tab } from "@headlessui/react";
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
  const [quantities, setQuantities] = useState<{ [key: number]: number | null }>({});
  const [updatedQuantities, setUpdatedQuantities] = useState<{ [key: number]: boolean }>({});
  const [isUserInfoValid, setIsUserInfoValid] = useState(false);
  const [userInfo, setUserInfo] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const userInfoFormRef = useRef<HTMLDivElement>(null);

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
        to: (userInfo as { email: string }).email,
        bcc: "gainesvillefireworks@gmail.com",
        subject: "Firework Custom Pack Submission",
        text: `Here are the details of your custom firework package submission:\n${emailBody}\n\nUser Information:\n${userInfoBody}`,
        html: `
            <div>
            <h1>Gainesville Fireworks Custom Package Submission</h1>
              <div>
                <h2>Custom Firework Package Submission</h2>
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
    return fireworks.sort((a, b) => categoryOrder[a.category] - categoryOrder[b.category]);
  };

  const scrollToUserInfoForm = () => {
    if (userInfoFormRef.current) {
      userInfoFormRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  if (loading) return <p className="text-center mb-4 text-red-600 text-xl font-semibold">Loading Fireworks...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-baseline justify-between pb-6 pt-24">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900">Fireworks</h1>
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
                    ${selected ? "bg-white shadow" : "text-red-100 hover:bg-white/[0.12] hover:text-white"}`
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
                      (firework: any) => category === "All" || firework.category === category
                    )
                  ).map((firework) => (
                    <div key={firework.id} className="group relative border p-4 rounded-lg bg-white">
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
                        <p className="mt-1 text-green-600 text-sm">Quantity Updated</p>
                      )}
                      <div className="mt-4 flex justify-between">
                        <h3 className="text-sm text-gray-700">{firework.name}</h3>
                        <p className="text-sm font-medium text-gray-900">${firework.price}</p>
                      </div>
                      <p className="mt-1 text-sm text-gray-500">{firework.description}</p>
                    </div>
                  ))}
                </div>
              </Tab.Panel>
            ))}
          </Tab.Panels>
        </Tab.Group>
      </div>
      <div ref={userInfoFormRef} className="flex flex-col justify-center items-center gap-4 mb-20 border-t-2 border-zinc-900/50 mx-4 lg:mx-40">
        <h1 className="text-5xl font-bold mt-10 text-center">Custom Package Submission</h1>
        <div className="flex justify-center">
          <div className="w-full max-w-md">
            <UserInfoForm onFormChange={setUserInfo} setValidationResult={setIsUserInfoValid} />
          </div>
        </div>
        <div className="flex flex-col justify-center items-center">
          <button
            onClick={sendEmail}
            disabled={!isUserInfoValid}
            className="h-auto border-2 hover:bg-red-700 border-red-800 bg-red-600 rounded-md text-white text-3xl p-2 font-bold"
          >
            Submit Package for Review
          </button>
          {
            !isUserInfoValid && (
              <p className="text-red-600 mt-2">Please check that all fields are populated.</p>
            )
          }
          {isSubmitted && (
            <p className="mt-4 text-green-600 text-lg font-semibold">
              Your custom package has been submitted!
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
