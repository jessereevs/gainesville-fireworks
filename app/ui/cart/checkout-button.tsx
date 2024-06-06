import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "../CartContext";

interface CheckoutButtonProps {
  isEnabled: boolean;
}

const CheckoutButton: React.FC<CheckoutButtonProps> = ({ isEnabled }) => {
  const { cart } = useCart();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleCheckout = async () => {
    setLoading(true);
    
    try {
      // Construct the purchase_units array
      const purchase_units = [{
        reference_id: 'default',
        amount: {
          currency_code: 'USD',
          value: cart.reduce((acc, item) => acc + (item.price * item.quantity), 0).toFixed(2),
          breakdown: {
            item_total: {
              currency_code: 'USD',
              value: cart.reduce((acc, item) => acc + (item.price * item.quantity), 0).toFixed(2)
            }
          }
        },
        items: cart.map(item => ({
          name: item.name,
          description: "Firework",
          unit_amount: {
            currency_code: 'USD',
            value: item.price.toFixed(2)
          },
          quantity: item.quantity.toString(),
          sku: item.id,
          category: 'PHYSICAL_GOODS'
        }))
      }];

      // Log the generated purchase_units for debugging
      console.log('purchase_units:', JSON.stringify(purchase_units, null, 2));

      const response = await fetch('/api/create-paypal-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ purchase_units }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();

      if (data.approvalUrl) {
        router.push(data.approvalUrl)
        // window.location.href = data.approvalUrl; // Redirect to PayPal for approval
      }
    } catch (error) {
      console.error('Error creating PayPal order:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      className="w-full rounded-md border border-transparent bg-red-600 px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-gray-50 disabled:bg-zinc-300"
      onClick={handleCheckout}
      disabled={!isEnabled || loading}
    >
      {loading ? "Processing..." : "Checkout"}
    </button>
  );
};

export default CheckoutButton;
