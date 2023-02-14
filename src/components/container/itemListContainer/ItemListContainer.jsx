import { useEffect } from "react";
import { Categories } from "../../categories/categories";
import { useCartContext } from "../../context/CartContext";
import { Footer } from "../../Footer/Footer";
import { HeroSection } from "../../heroSection/HeroSection";
import { Products } from "../../products/Products";
import { OfferProducts } from "../OfferProducts/OfferProducts";

export const ItemListContainer = () => {
    const { setNavbar } = useCartContext()
    const changeBackground = () => {
        if (window.scrollY >= 50) {
            setNavbar(true)
        } else {
            setNavbar(false)
        }
    }

    useEffect(()=>{
        changeBackground()
    },[])

    useEffect(() => {
        window.addEventListener('scroll', changeBackground)
    })
    
    return (
        <>  
            <HeroSection />
            <OfferProducts/>
            <Categories />
            <Footer/>
        </>
    )
}