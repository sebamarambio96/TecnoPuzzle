import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useCartContext } from '../../context/CartContext'
import { CountBuy } from '../../count/CountBuy'
import { NotFound } from '../../error/notFound'


export const ItemDetailContainer = () => {
    const { detailId } = useParams()
    const { addCart, cartList, updateCart } = useCartContext()
    const [product, setProduct] = useState([])

    async function getProduct(detailId) {
        const products = await fetch('/data/products.json')
        const productsParse = await products.json()
        const [item] = productsParse.filter(item => item.id === parseInt(detailId))
        setProduct(item)
    }

    useEffect(() => {
        getProduct(detailId)
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
                                    <CountBuy addCart={addProductCart} />
                                </div>
                            </div>
                            <p className='fontDescription py-5'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum ratione quo quos maxime laboriosam, quis vero! Pariatur sequi, veniam alias blanditiis repudiandae a excepturi, sapiente, placeat recusandae minima aliquam dolor eius dolore voluptates nulla quas sunt explicabo doloribus ducimus. Recusandae tempora distinctio doloremque dignissimos beatae autem aliquid repellat ducimus, nisi suscipit quibusdam animi doloribus quam inventore error numquam alias vero fugiat earum culpa optio sapiente dolorem. Ipsam sapiente ullam quaerat deserunt accusantium aspernatur officiis explicabo voluptatem alias, velit aperiam ex saepe omnis natus et voluptatibus sit laudantium beatae quae animi similique quisquam reiciendis iure voluptas! Molestias incidunt dicta repellat sit.</p>
                        </div>
                    </div>
                    :
                    <NotFound/>
            }
        </div>

    )
}
