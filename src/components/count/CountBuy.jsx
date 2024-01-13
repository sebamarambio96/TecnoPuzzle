import { useState } from "react";
import { Modal } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import { FaPlus, FaMinus } from "react-icons/fa";
import { Link } from "react-router-dom";

export const CountBuy = ({ initial = 1, stock = 5, addCart }) => {
    const [count, setCount] = useState(initial);
    const [sent, setSent] = useState(false);

    //count CONTROL (min and max)
    const add = () => {
        count < stock && setCount(count + 1);
    };

    const subtract = () => {
        count > initial && setCount(count - 1);
    };
    //ADD cart and EXCHANGE BTN control
    const amount = () => {
        addCart(count);
        setSent(true);
    };

    return (
        <div>
            <label className="form-label">
                <h4>Cantidad:</h4>
            </label>
            <InputGroup className="amount mb-2">
                <div className="d-flex">
                    <Button variant="outline-warning" className="me-2" onClick={subtract}>
                        <FaMinus />
                    </Button>
                    <div className="form-control text-center">{count}</div>
                    <Button variant="outline-warning" className="ms-2" onClick={add}>
                        <FaPlus />
                    </Button>
                </div>
            </InputGroup>
            {sent ? (
                <div className="mt-3">
                    <Link className="btn btn-info p-3 me-3" to="/category">
                        Seguir Comprando
                    </Link>
                    <Link className="btn btn-success p-3" to="/cart">
                        Ir al Carrito
                    </Link>
                </div>
            ) : (
                <button className="btn btn-warning p-3 px-4 fs-4 mt-4" onClick={amount}>
                    Comprar
                </button>
            )}
        </div>
    );
};
