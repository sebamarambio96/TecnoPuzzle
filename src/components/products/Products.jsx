import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FaGrinBeamSweat } from "react-icons/fa";
import { getItemByCategory, getItems } from '../../services/firebase';
import { CardProduct } from '../CardProduct/CardProduct';
import { Loading } from '../Loading/Loading';

export const Products = () => {
    const [products, setProducts] = useState([])
    const [category, setCategory] = useState([])
    const [loading, setLoading] = useState(true)
    const { categoryId } = useParams()

    useEffect(() => {
        getItems('categories').then(resp => setCategory(resp.map(item => item.idCategory)))
        if (categoryId) {
            getItemByCategory(categoryId).then(resp => {
                setProducts(resp)
                setLoading(false)
            })
        } else {
            getItems('products').then(resp => {
                setProducts(resp)
                setLoading(false)
            })
        }
    }, [categoryId])

    return (
        <div className='products py-3 d-flex flex-column container-fluid backStyle'>
            <h1 className='py-3 fontNormal'>Productos</h1>
            <div className='row gap-3 gx-4 gx-lg-5 row-cols-2 justify-content-evenly cardProductsContainer'>
                {loading
                    ?
                    <Loading />
                    :
                    categoryId
                        ?
                        category.indexOf(categoryId) === -1
                            ?
                            <h2 className='fontErrorCategory text-warning'>Ups, parece que te perdiste <FaGrinBeamSweat /></h2>
                            :
                            products.map(product => <CardProduct item={product} desc={''} key={product.id} />)
                        :
                        products.map(product => <CardProduct item={product} desc={''} key={product.id} />)
                }
            </div>
        </div>
    )
}
