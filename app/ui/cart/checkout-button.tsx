import { loadStripe } from "@stripe/stripe-js";
import React, { useState } from "react";
import { useCart } from "../CartContext";

interface CheckoutButtonProps {
  isEnabled: boolean
}

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

const CheckoutButton: React.FC<CheckoutButtonProps> = ({isEnabled}) => {
  const { cart } = useCart();
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    setLoading(true);
    const stripe = await stripePromise;
    
    try {
      const response = await fetch('/api/checkout-sessions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ cart }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const session = await response.json();

      const result = await stripe?.redirectToCheckout({
        sessionId: session.id,
      });

      if (result?.error) {
        console.error(result.error.message);
      }
    } catch (error) {
      console.error('Error creating checkout session:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      className="w-full rounded-md border border-transparent bg-red-600 px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-gray-50 disabled:bg-zinc-300"
      onClick={handleCheckout}
      disabled={!isEnabled}
    >
      Checkout
    </button>
  );
};

export default CheckoutButton;
