"use client"

import Header from "../ui/header";
import CancelText from "../ui/cancel/cancel-text";
import FeaturedProducts from "../ui/home/featured-packages";
import Footer from "../ui/footer";

export default function Cancel() {
    return(
        <div>
            <Header />
            <CancelText />
                <FeaturedProducts />
            <Footer />
        </div>
    )
}