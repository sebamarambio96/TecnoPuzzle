import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link, useParams } from 'react-router-dom';
import { FaGrinBeamSweat } from "react-icons/fa";
import { getItemByCategory, getItems } from '../../services/firebase';

export const Products = () => {
    const [products, setProducts] = useState([])
    const [category, setCategory] = useState([])
    const { categoryId } = useParams()

    useEffect(() => {
        getItems('categories').then(resp => setCategory(resp.map(item => item.idCategory)))
        if (categoryId) {
            getItemByCategory(categoryId).then(resp => setProducts(resp))
        } else {
            getItems('products').then(resp => setProducts(resp))
        }
    }, [categoryId])

    return (
        <div className='products py-3 d-flex flex-column container-fluid'>
            <h1 className='py-3 fontNormal'>Productos</h1>
            <div className='row gap-3 gx-4 gx-lg-5 row-cols-2 justify-content-evenly cardProductsContainer'>
                {categoryId
                    ?
                    category.indexOf(categoryId) === -1
                        ?
                        <h2 className='fontErrorCategory'>Ups, parece que te perdiste <FaGrinBeamSweat /></h2>
                        :
                        products.map(item =>
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
                            </React.Fragment>)
                    :
                    products.map(item =>
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
                        </React.Fragment>)
                }
            </div>
        </div>
    )
}
