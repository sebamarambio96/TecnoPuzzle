import React from 'react'
import { Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export const CardProduct = ({ item, desc }) => {
    return (
        <>
            <Card className="cardProducts fontNormal shadow rounded">
                <Card.Body className='d-flex flex-column justify-content-evenly align-items-center'>
                    <div className='offerImgContainer'>
                        <Card.Img variant="top" className='offerImg' src={item.img} />
                    </div>
                    <div>
                        <Card.Text className='priceFont'>$ {item.price} <span className='text-warning fst-italic descFont'>{desc}</span></Card.Text>
                    </div>
                    <div className='d-flex flex-column justify-content-evenly align-items-center'>
                        <Card.Title className='cardFont fw-normal text-center'>{item.name}</Card.Title>
                        <Link to={`/detail/${item.id}`}>
                            <Button variant="outline-info" className='fw-bold'>DETALLES</Button>
                        </Link>
                    </div>
                </Card.Body>
            </Card>
        </>)
}
