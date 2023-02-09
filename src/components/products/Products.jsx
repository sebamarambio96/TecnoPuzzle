import React, { useContext, useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link, useParams } from 'react-router-dom';
import { CartContext } from '../context/CartContext';

export const Products = () => {

    const {addCart, cartList} = useContext(CartContext)

    const onAdd = (cant) => {
        addCart({product, cantidad:cantidad})
    }



    const [products, setProducts] = useState([])
    const { categoryId } = useParams()
    console.log(categoryId)

    async function getProducts() {
        const products = await fetch('/data/products.json')
        const productsParse = await products.json()
        console.log(productsParse);
        setProducts(categoryId ? productsParse.filter(item => item.category === categoryId) : productsParse)
    }

    useEffect(() => {
        getProducts()
    }, [categoryId])

    return (
        <div className='products py-3 d-flex flex-column container-fluid'>
            <h1 className='py-3 fontNormal'>Productos</h1>
            <div className='row gap-3 gx-4 gx-lg-5 row-cols-2 justify-content-evenly cardProductsContainer'>

                {products.map(item =>
                    <React.Fragment key={item.id}>
                        <Card className="cardProducts fontNormal">
                            <Card.Body>
                                <Card.Title>{item.name}</Card.Title>
                                <Card.Text>{item.category}</Card.Text>
                                <Card.Text>ID: {item.id}</Card.Text>
                                <Card.Img variant="top" src={item.img} />
                                <Card.Text>$ {item.price}</Card.Text>
                                <Link to={`/detail/${item.id}`}>
                                    <Button variant="primary">DETALLES</Button>
                                </Link>
                            </Card.Body>
                        </Card>
                    </React.Fragment>)}

            </div>
        </div>
    )
}