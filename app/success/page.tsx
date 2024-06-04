"use client";

import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useCart } from "../ui/CartContext";

import Header from "../ui/header";
import SuccessText from "../ui/success/success-text";
import FeaturedProducts from "../ui/home/featured-packages";
import Footer from "../ui/footer";

const SuccessPage = () => {
  const { cart, clearCart } = useCart();
  const [userInfo, setUserInfo] = useState({});
  const orderPlacedRef = useRef(false); // Ref to track if the API call was made
  const [isUserInfoLoaded, setIsUserInfoLoaded] = useState(false); // State to track user info loading

  useEffect(() => {
    console.log("useEffect called");

    if (typeof window !== "undefined") {
      const storedUserInfo = JSON.parse(localStorage.getItem("userInfo") || "{}");
      setUserInfo(storedUserInfo);
      setIsUserInfoLoaded(true); // Set user info loaded state
      console.log("User info set:", storedUserInfo);
    }
  }, []); // Empty dependency array to run only once on mount

  useEffect(() => {
    if (!isUserInfoLoaded || orderPlacedRef.current) return;

    const updateInventoryAndRecordOrder = async () => {
      if (orderPlacedRef.current) {
        console.log("Order already placed, skipping API call");
        return;
      }
      try {
        console.log("Calling /api/place-order");
        const response = await axios.post("/api/place-order", { userInfo, cart });
        console.log("Order placed successfully:", response.data);
        // Clear the cart from local storage and context after successful order placement
        localStorage.removeItem("cart");
        localStorage.removeItem("userInfo");
        clearCart();
        orderPlacedRef.current = true; // Mark API call as made
      } catch (error) {
        console.error("Error placing order:", error);
      }
    };

    if (cart.length > 0 && Object.keys(userInfo).length > 0 && !orderPlacedRef.current) {
      updateInventoryAndRecordOrder();
    }
  }, [cart, clearCart, isUserInfoLoaded, userInfo]); // Dependency array ensures this effect runs only when userInfo is loaded

  console.log("Render SuccessPage", { cart, userInfo, orderPlacedRef: orderPlacedRef.current });

  return (
    <div>
      <Header />
      <SuccessText />
      <FeaturedProducts />
      <Footer />
    </div>
  );
};

export default SuccessPage;
