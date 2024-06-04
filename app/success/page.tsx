"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useCart } from "../ui/CartContext";

import Header from "../ui/header";
import SuccessText from "../ui/success/success-text";
import FeaturedProducts from "../ui/home/featured-packages";
import Footer from "../ui/footer";

const Success = () => {
  const router = useRouter();
  const { clearCart } = useCart();

  useEffect(() => {
    // Fetch the cart from local storage or session storage
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    console.log("Cart retrieved from local storage:", cart);

    // Call the inventory update endpoint
    const updateInventory = async () => {
      try {
        const response = await axios.post("/api/update-inventory", { cart });
        console.log("Inventory updated successfully:", response.data);
        // Clear the cart from local storage and context after successful inventory update
        localStorage.removeItem("cart");
        clearCart();
        console.log("Cart cleared from local storage and context");
      } catch (error) {
        console.error("Error updating inventory:", error);
      }
    };

    if (cart.length > 0) {
      updateInventory();
    }
  }, [clearCart]);

  return (
    <div>
      <Header />
      <SuccessText />
      <FeaturedProducts />
      <Footer />
    </div>
  );
};

export default Success;
