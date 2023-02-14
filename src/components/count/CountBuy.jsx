import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import { FaPlus, FaMinus } from "react-icons/fa";
import { Link } from 'react-router-dom';

export const CountBuy = ({ initial = 1, stock = 5, addCart }) => {
    const [count, setCount] = useState(initial)
    const [sent, setSent] = useState(false)

    const add = () => {
        count < stock && setCount(count + 1)
    }

    const subtract = () => {
        count > initial && setCount(count - 1)
    }

    const amount = () => {
        addCart(count)
        setSent(true)
    }

    return (
        <div>
            <label className='form-label'><h4>Cantidad:</h4></label>
            <InputGroup className='amount mb-2'>
                <Button variant="outline-warning" onClick={add}><FaPlus /></Button>
                <div className="form-control d-flex justify-content-center">{count}</div>
                <Button variant="outline-warning" onClick={subtract}><FaMinus /></Button>
            </InputGroup>
            {sent
                ?
                <div>
                    <Link className='btn btn-info p-3 mt-3' to="/category/">Seguir Comprando</Link>
                    <Link className='btn btn-success p-2 ms-3 mt-3' to="/cart">Ir al Carrito</Link>
                </div>
                :
                <button className='btn btn-warning p-3 px-4 fs-4 mt-4' onClick={amount}>Comprar</button>
            }

        </div>
    )
}