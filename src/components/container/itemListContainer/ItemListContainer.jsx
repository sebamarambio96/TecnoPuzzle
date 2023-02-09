import { useParams } from "react-router-dom";
import { Categories } from "../../categories/categories";
import { useCartContext } from "../../context/CartContext";
import { HeroSection } from "../../heroSection/HeroSection";
import { Products } from "../../products/Products";

export const ItemListContainer = () => {
    const { setNavbar } = useCartContext()
    setNavbar(false)

    return (
        <>
            <HeroSection />
            <Categories />
            <Products />
        </>
    )
}