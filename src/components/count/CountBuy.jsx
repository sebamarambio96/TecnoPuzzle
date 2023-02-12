import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { FaPlus,FaMinus } from "react-icons/fa";

export const CountBuy = ({ initial = 1, stock = 5, addCart}) => {
    const [count, setCount] = useState(initial)

    const add = () =>{
        count < stock && setCount(count + 1)
    }

    const subtract = () =>{
        count > initial && setCount(count - 1)
    }

    const amount = () =>{
        addCart(count)
    }
    
    return (
        <div>
            <label className='form-label'><h4>Cantidad:</h4></label>
            <InputGroup className='amount mb-2'>
                <Button variant="outline-warning" onClick={add}><FaPlus/></Button>
                <div className="form-control d-flex justify-content-center">{count}</div>
                <Button variant="outline-warning" onClick={subtract}><FaMinus/></Button>
            </InputGroup>
            <button className='btn btn-warning' onClick={amount}>Comprar</button>
        </div>
    )
}