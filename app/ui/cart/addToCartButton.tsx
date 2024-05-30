import React from "react";
import { useCart } from "../CartContext";

interface AddToCartButtonProps {
  item: {
    id: string;
    name: string;
    description: string;
    category: string;
    price: number;
    imagehref: string;
    href: string;
  };
}

const AddToCartButton: React.FC<AddToCartButtonProps> = ({ item }) => {
  const { cart, setCart } = useCart();

  const addToCart = () => {
    setCart((prevCart) => {
      console.log("Previous Cart:", prevCart);

      // Check if the item already exists in the cart
      const existingItem = prevCart.find((cartItem) => cartItem.id === item.id);

      if (existingItem) {
        console.log(`Updating quantity for ${item.name}`);
        // If it exists, update the quantity
        const updatedCart = prevCart.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
        console.log("Updated Cart:", updatedCart);
        return updatedCart;
      } else {
        console.log(`Adding new item ${item.name}`);
        // If it doesn't exist, add the new item
        const newCart = [...prevCart, { ...item, quantity: 1 }];
        console.log("New Cart:", newCart);
        return newCart;
      }
    });
  };

  return (
    <button
      className="rounded-md bg-red-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
      onClick={addToCart}
    >
      Add to Cart
    </button>
  );
};

export default AddToCartButton;
