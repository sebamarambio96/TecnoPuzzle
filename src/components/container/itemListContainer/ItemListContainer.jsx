import { useEffect } from "react";
import { Categories } from "../../categories/categories";
import { useCartContext } from "../../context/CartContext";
import { Footer } from "../../Footer/Footer";
import { HeroSection } from "../../heroSection/HeroSection";
import { OfferProducts } from "../OfferProducts/OfferProducts";

export const ItemListContainer = () => {
    const { setNavbar } = useCartContext()
    //NAVBAR Control
    const changeBackground = () => {
        if (window.scrollY >= 50) {
            setNavbar(true)
        } else {
            setNavbar(false)
        }
    }
    //SET initial state
    useEffect(() => {
        changeBackground()
    }, [])
    //SET dinamic state
    useEffect(() => {
        window.addEventListener('scroll', changeBackground)
    })

    return (
        <>
            <HeroSection />
            <OfferProducts />
            <Categories />
        </>
    )
}