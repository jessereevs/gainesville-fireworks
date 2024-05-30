import { loadStripe } from "@stripe/stripe-js";
import { useState } from "react";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

const CheckoutButton = () => {
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    setLoading(true);

    const response = await fetch("/api/checkout-sessions", {
      method: "POST",
    });

    const { id } = await response.json();
    const stripe = await stripePromise;

    if (stripe) {
      const { error } = await stripe.redirectToCheckout({ sessionId: id });

      if (error) {
        console.error(error);
      }
    } else {
      console.error("Stripe failed to load.");
    }

    setLoading(false);
  };

  return (
    <button
      className="w-full rounded-md border border-transparent bg-red-600 px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-gray-50"
      onClick={handleCheckout}
      disabled={loading}
    >
      {loading ? "Loading..." : "Checkout"}
    </button>
  );
};

export default CheckoutButton;
