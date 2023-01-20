import React, { useEffect, useState } from 'react'
import { Container, Form, InputGroup } from 'react-bootstrap'
import { useParams } from 'react-router-dom'


export const ItemDetailContainer = () => {
    const { detailId } = useParams()
    const [products, setProducts] = useState([])

    async function getProducts() {
        const products = await fetch('/data/products.json')
        const productsParse = await products.json()
        console.log(productsParse);
        setProducts(productsParse.filter(item => item.id === parseInt(detailId)))
        console.log(products)
    }

    useEffect(() => {
        getProducts()
    }, [detailId])

    return (
        <div className='products py-3 d-flex flex-column container-fluid detailContainer'>
            <div className='relleno'></div>

            {products.map(item =>
                <div className='fontDetail container'>
                    <div className='row'>
                        <div className='col-5'>
                            <img className='imgDetail' src={item.img} alt="" />
                        </div>
                        <div className='col-7'>
                            <h1 className='fontHero2'>{item.name}</h1>
                            <h3>SKU: {item.id}</h3>
                            <label for="exampleInputEmail1" className='form-label'><h4>Cantidad:</h4></label>
                            <input type="number" className='amount form-control my-2' id="howMany" aria-describedby="emailHelp" placeholder='0' min="0"></input>
                            <h4>$ {item.price}</h4>
                            <button className='btn btn-warning'>Comprar</button>
                        </div>
                    </div>
                    <p className='fontDescription py-5'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum ratione quo quos maxime laboriosam, quis vero! Pariatur sequi, veniam alias blanditiis repudiandae a excepturi, sapiente, placeat recusandae minima aliquam dolor eius dolore voluptates nulla quas sunt explicabo doloribus ducimus. Recusandae tempora distinctio doloremque dignissimos beatae autem aliquid repellat ducimus, nisi suscipit quibusdam animi doloribus quam inventore error numquam alias vero fugiat earum culpa optio sapiente dolorem. Ipsam sapiente ullam quaerat deserunt accusantium aspernatur officiis explicabo voluptatem alias, velit aperiam ex saepe omnis natus et voluptatibus sit laudantium beatae quae animi similique quisquam reiciendis iure voluptas! Molestias incidunt dicta repellat sit.</p>
                </div>
            )}
        </div>
    )
}
