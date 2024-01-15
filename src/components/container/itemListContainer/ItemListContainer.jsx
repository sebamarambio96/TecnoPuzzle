import { useEffect, useState } from "react";
import { Categories } from "../../categories/categories";
import { useCartContext } from "../../context/CartContext";
import { Footer } from "../../Footer/Footer";
import { HeroSection } from "../../heroSection/HeroSection";
import { OfferProducts } from "../OfferProducts/OfferProducts";

export const ItemListContainer = () => {
    const { setNavbar } = useCartContext();
    const [prevScrollPos, setPrevScrollPos] = useState(0);

    const handleScroll = () => {
        const currentScrollPos = window.scrollY;

        if (currentScrollPos >= 50 && prevScrollPos < 50) {
            setNavbar(true);
        } else if (currentScrollPos < 50 && prevScrollPos >= 50) {
            setNavbar(false);
        }

        setPrevScrollPos(currentScrollPos);
    };

    useEffect(() => {
        // Event listener for scroll
        window.addEventListener("scroll", handleScroll);

        // Cleanup
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [prevScrollPos]);

    useEffect(() => {
        // Initial state
        handleScroll();

        // Cleanup on component unmount
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <>
            <HeroSection />
            <OfferProducts />
            <Categories />
        </>
    );
};
