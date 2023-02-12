import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link, useParams } from 'react-router-dom';

export const Categories = () => {
    const [categories, setCategories] = useState([])

    async function getCategories() {
        const categories = await fetch('/data/categories.json')
        const categoriesParse = await categories.json()
        setCategories(categoriesParse)
    }
    useEffect(() => {
        getCategories()
    }, [])
    return (
        <div className='categories py-3 d-flex flex-column container-fluid'>
            <h1 className='py-3 fontNormal'>Categorías</h1>
            <div className='row gap-3 gx-4 gx-lg-5 row-cols-2 justify-content-evenly cardCategoriesContainer'>
                {categories.map(item =>
                    <React.Fragment key={item.id}>
                        <Card  className="cardCategories fontNormal">
                            <Card.Body >
                                <Card.Title>{item.name}</Card.Title>
                                <Card.Img variant="top" src="" />
                                <Link to={`/category/${item.id}`}>
                                    <Button variant="primary">Ver Productos</Button>
                                </Link>
                            </Card.Body>
                        </Card>
                    </React.Fragment>
                )}

            </div>
        </div>
    )
}