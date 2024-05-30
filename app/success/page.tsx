"use client"

import Header from "../ui/header";
import SuccessText from "../ui/success/success-text";
import FeaturedProducts from "../ui/home/featured-packages";
import Footer from "../ui/footer";

export default function Cancel() {
    return(
        <div>
            <Header />
            <SuccessText />
                <FeaturedProducts />
            <Footer />
        </div>
    )
}