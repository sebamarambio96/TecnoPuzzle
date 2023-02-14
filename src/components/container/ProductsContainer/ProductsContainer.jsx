import React, { useEffect } from 'react'
import { Categories } from '../../categories/categories'
import { useCartContext } from '../../context/CartContext'
import { Footer } from '../../Footer/Footer'
import { NavBar } from '../../NavBar/NavBar'
import { Products } from '../../products/Products'

export const ProductsContainer = () => {
    const { setNavbar } = useCartContext()
    useEffect(()=>{
        setNavbar(true)
    },[])
    useEffect(() => {
        const changeBackground = () => {
            if (window.scrollY >= 0) {
                setNavbar(true)
            }
        }
        window.addEventListener('scroll', changeBackground)
    })

    return (
        <>
            <div className='backfill'></div>
            <NavBar />
            <Categories />
            <Products />
            <Footer/>
        </>
    )
}
