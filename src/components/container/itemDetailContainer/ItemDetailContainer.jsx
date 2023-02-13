import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getItemByID, getItems } from '../../../services/firebase'
import { useCartContext } from '../../context/CartContext'
import { CountBuy } from '../../count/CountBuy'
import { NotFound } from '../../error/notFound'


export const ItemDetailContainer = () => {
    const { detailId } = useParams()
    const { addCart, cartList, updateCart } = useCartContext()
    const [product, setProduct] = useState([])

    useEffect(() => {
        getItemByID('products', detailId).then(resp => setProduct(resp))
    }, [detailId])

    const addProductCart = (amount) => {
        if (cartList.find(item => item.id == product.id)) {
            updateCart(product, amount)
        } else {
            addCart({ ...product, amount: amount })
        }
    }

    return (
        <div>
            {
                product
                    ?
                    <div className='products d-flex flex-column container-fluid detailContainer'>
                        <div className='relleno'></div>
                        <div className='fontDetail container'>
                            <div className='row'>
                                <div className='col-5'>
                                    <img className='imgDetail' src={product.img} alt={product.name} />
                                </div>
                                <div className='col-7'>
                                    <h1 className='fontHero2'>{product.name}</h1>
                                    <h3>SKU: {product.id}</h3>
                                    <h4 className='fs-2'>$ {product.price}</h4>
                                    <CountBuy addCart={addProductCart} stock={product.stock}/>
                                </div>
                            </div>
                            <p className='fontDescription py-5'>{product.description}</p>
                        </div>
                    </div>
                    :
                    <NotFound />
            }
        </div>
    )
}
