import { createContext, useContext, useState } from "react";


export const CartContext = createContext()

export const useCartContext = () => useContext(CartContext)

export const CardContextProvider = ({children}) =>{

    const [cartList, setCarList] = useState([])
    const [product, setProduct] = useState([])
    const[navbar,setNavbar] = useState(false)

    const addCart = (product) => {
        setCarList([...cartList,product])
    }

    async function getProduct(detailId) {
        const products = await fetch('/data/products.json')
        const productsParse = await products.json()
        console.log(productsParse);
        const [item] = productsParse.filter(item => item.id === parseInt(detailId))
        console.log(item)
        setProduct(item)
    }

    return(
        <CartContext.Provider value={{
            cartList,
            product,
            navbar,
            setNavbar,
            addCart,
            getProduct
        }}>
            {children}
        </CartContext.Provider>
    )
}