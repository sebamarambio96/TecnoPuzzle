import { createContext, useContext, useState } from "react";

export const CartContext = createContext()
export const useCartContext = () => useContext(CartContext)

export const CardContextProvider = ({ children }) => {
    const [navbar, setNavbar] = useState()
    const [cartList, setCarList] = useState([])

    //ITEW DETAIL and BUY
    const addCart = (product) => setCarList([...cartList, product])

    const updateCart = (product, amount) => {
        let item = {}
        item = cartList.find(item => item.id == product.id)
        let itemIndex = cartList.indexOf(item)
        cartList[itemIndex].amount += amount
        setCarList([...cartList])
    }

    //CART
    const deleteProduct = id => setCarList(cartList.filter(item => item.id !== id))

    const clearCart = () => setCarList([])

    const counterCart = () => cartList.reduce((counter, item) => counter += item.amount, 0)

    return (
        <CartContext.Provider value={{
            cartList,
            navbar,
            setNavbar,
            addCart,
            deleteProduct,
            clearCart,
            counterCart,
            updateCart
        }}>
            {children}
        </CartContext.Provider>
    )
}