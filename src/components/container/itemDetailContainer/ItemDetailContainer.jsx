import React, { useEffect, useState } from 'react'
import { Card } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import { getItemByID, getItems } from '../../../services/firebase'
import { useCartContext } from '../../context/CartContext'
import { CountBuy } from '../../count/CountBuy'
import { NotFound } from '../../error/notFound'


export const ItemDetailContainer = () => {
    const { detailId } = useParams()
    const { addCart, cartList, updateCart, setNavbar } = useCartContext()
    const [product, setProduct] = useState([])
    setNavbar(true)

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
        <div className='container-fluid'>
            {
                product
                    ?
                    <div className='products detailContainer'>  {/* d-flex flex-column */}
                        <div className='backfill'></div>
                        <div className='fontDetail p-4'>
                            <div className='row'>
                                <div className='detailImgContainer col-4 m-3'>
                                    <Card.Img variant="top" className='offerImg' src={product.img} alt={product.name}/>
                                </div>
                                <div className='col-7 m-3'>
                                    <h1 className='fontHero2'>{product.name}</h1>
                                    <h3>SKU: {product.id}</h3>
                                    <h4 className='fs-2'>$ {product.price}</h4>
                                    <CountBuy addCart={addProductCart} stock={product.stock} />
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
