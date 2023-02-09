import { FaShoppingCart } from 'react-icons/fa'
import { Link } from 'react-router-dom'

export const CartWidget = () => {

    return (
        <Link to='/cart' className=" btn btn-outline-light">
            <i className='carrito'><FaShoppingCart/></i><span> Compras</span>
        </Link>
    )
}