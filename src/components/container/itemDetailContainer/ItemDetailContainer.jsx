import React, { useEffect, useState } from 'react'
import { Card } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import { getItemByID } from '../../../services/firebase'
import { useCartContext } from '../../context/CartContext'
import { CountBuy } from '../../count/CountBuy'
import { NotFound } from '../../error/notFound'
import { Loading } from '../../Loading/Loading'

export const ItemDetailContainer = () => {
    //EXTRACT id from URL
    const { detailId } = useParams()
    const { addCart, cartList, updateCart, setNavbar } = useCartContext()
    const [product, setProduct] = useState({})
    const [loading, setLoading] = useState(true)

    //NAVBAR Control
    useEffect(() => {
        setNavbar(true)
    }, [])

    useEffect(() => {
        const changeBackground = () => {
            if (window.scrollY >= 0) {
                setNavbar(true)
            }
        }
        window.addEventListener('scroll', changeBackground)
    })
    //GET product by id
    useEffect(() => {
        getItemByID('products', detailId)
            .then(resp => {
                setProduct(resp)
                setLoading(false)
            })
    }, [detailId])

    //ADD product to cart and set AMOUNT
    const addProductCart = (amount) => {
        if (cartList.find(item => item.id == product.id)) {
            updateCart(product, amount)
        } else {
            addCart({ ...product, amount: amount })
        }
    }

    return (
        <div className='container-fluid detailContainer vw-100 vh-100 d-flex justify-content-evenly align-items-center'>
            {loading
                ?
                <Loading />
                :
                !product.name
                    ?
                    <NotFound />
                    :
                    <div className='products detailContainer'>
                        <div className='backfill'></div>
                        <div className='fontDetail p-4'>
                            <div className='row'>
                                <div className='detailImgContainer col-4 m-3'>
                                    <Card.Img variant="top" className='offerImg' src={product.img} alt={product.name} />
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

            }
        </div>
    )
}
Loading