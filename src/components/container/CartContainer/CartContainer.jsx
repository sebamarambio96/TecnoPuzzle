import React, { useEffect, useState } from 'react'
import { useCartContext } from '../../context/CartContext'
import { AiOutlineClose, AiOutlineDelete } from 'react-icons/ai';
import Button from 'react-bootstrap/Button';
import { FaRegGrinBeamSweat } from "react-icons/fa";
import { LoginWidget } from '../../loginWidget/LoginWidget'


export const CartContainer = () => {
  const { cartList, setNavbar, deleteProduct, clearCart } = useCartContext()
  const [precioFinal, setPrecioFinal] = useState()
 console.log(cartList)
  useEffect(() => {
    setNavbar(true)
  }, [])

  useEffect(() => {
    setPrecioFinal(cartList.reduce((total, item) => total += item.amount * item.price, 0))
  }, [])

return (
  <div className='container-fluid vw-100'>
    <div className='relleno'></div>

    <div className='row'>
      <div className='col-9 productCartContainer border d-flex flex-column justify-content-between'>
        <h2 className='pt-2'>Productos</h2>
        <div className='scrolly'>

          {/* PRODUCTOS EN CARRITO*/}
          {cartList.length === 0
            ?
            <h4 className='fontErrorCart'>Ups, parece que no has agregado nada al carrito <FaRegGrinBeamSweat/></h4>
            :
            cartList.map(item =>
              <div className='card-body row my-4 '>
                <div className='col-2'>
                  <img id="imgProductoCompras" src={item.img} alt={item.name} width="90" height="120"></img>
                </div>

                <div className='col-8'>
                  <h6>SKU: {item.id}</h6>
                  <h5>{item.name}</h5>
                  <h5>Cantidad: {item.amount}</h5>
                  <h4>$ {item.price}</h4>
                </div>
                <div className='col-1 d-flex flex-column justify-content-center'>
                  <Button variant="outline-danger" onClick={() => deleteProduct(item.id)}><AiOutlineClose/></Button>
                </div>
              </div>
            )}
        </div>

        <div className='formCartContainer'>
          <hr />
          {/* FORM */}
          HOLA
          HOLA
          HOLA
          HOLA
          HOLA
        </div>
      </div>

      {/* TOTAL DEL CARRITO */}
      <div className='col-3 totalCartContainer border'>
        <div className='totalCart scrolly'>
          <h2 className='pt-2'>Detalle</h2>
          <ul>
            {cartList.map(item =>
              <p>- {item.name} X {item.amount} = ${item.amount * item.price}</p>
            )}
          </ul>
        </div>
        <div className='buttonCartContainer d-flex flex-column justify-content-end'>
          <div className='d-flex align-items-center justify-content-center'>
            <h5>Precio total: ${precioFinal}</h5>
          </div>
          <div className='row'>
            <div className='col-2'>
              <Button variant="outline-danger" onClick={() => clearCart()}><AiOutlineDelete /></Button>
            </div>
            <div className='col-10'>
              <button type="button" className="btn btn-warning btnBuy d-flex align-items-center justify-content-center">COMPRAR</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
)
}
