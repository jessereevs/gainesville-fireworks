"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

import Header from "../ui/header";
import SuccessText from "../ui/success/success-text";
import FeaturedProducts from "../ui/home/featured-packages";
import Footer from "../ui/footer";

const Success = () => {
  const router = useRouter();

  useEffect(() => {
    // Fetch the cart from local storage or session storage
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");

    // Call the inventory update endpoint
    const updateInventory = async () => {
      try {
        const response = await axios.post("/api/update-inventory", { cart });
        console.log("Inventory updated successfully:", response.data);
        // Clear the cart from local storage after successful inventory update
        localStorage.removeItem("cart");
      } catch (error) {
        console.error("Error updating inventory:", error);
      }
    };

    if (cart.length > 0) {
      updateInventory();
    }
  }, []);

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
