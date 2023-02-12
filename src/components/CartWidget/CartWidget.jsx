import { useEffect, useState } from 'react'
import { FaShoppingCart } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { useCartContext } from '../context/CartContext'

export const CartWidget = () => {
    const { counterCart } = useCartContext()

    return (
        <Link to='/cart' className=" btn btn-outline-light">
            <i className='carrito'><FaShoppingCart /></i><span> Compras: {counterCart()}</span>
        </Link>
    )
}