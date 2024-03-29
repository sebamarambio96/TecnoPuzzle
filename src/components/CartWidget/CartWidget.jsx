import { FaShoppingCart } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { useCartContext } from '../context/CartContext'

export const CartWidget = () => {
    //GET the sum of all products
    const { counterCart } = useCartContext()

    return (
        <Link to='/cart' className=" btn btn-outline-light">
            <i className='cart'><FaShoppingCart /></i><span> Compras: {counterCart()}</span>
        </Link>
    )
}