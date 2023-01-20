import { useParams } from "react-router-dom";
import { Categories } from "../../categories/categories";
import { HeroSection } from "../../heroSection/HeroSection";
import { Products } from "../../products/Products";

export const ItemListContainer = () => {

    return (
        <>
            <HeroSection/>
            <Categories/>
            <Products/>
        </>
    )
}