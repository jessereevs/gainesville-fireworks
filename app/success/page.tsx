"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
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
  const searchParams = useSearchParams()
  const token = searchParams.get('token'); // Get the order ID from the query parameters

  // Capture the PayPal order when the component mounts
  useEffect(() => {
    const captureOrder = async () => {
      if (!token) return;

      try {
        const response = await axios.post("/api/capture-paypal-order", {
          orderId: token
        });

        const data = response.data;
        if (data.status === "success") {
          console.log("Payment captured successfully");
          // Clear the cart and user info on successful payment capture
          localStorage.removeItem("cart");
          localStorage.removeItem("userInfo");
          clearCart();
        } else {
          console.error("Error capturing payment:", data.error);
        }
      } catch (error) {
        console.error("Error capturing PayPal order:", error);
      }
    };

    captureOrder();
  }, [token, clearCart]);

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
