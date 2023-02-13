import React, { useEffect, useState } from 'react'
import { useCartContext } from '../../context/CartContext'
import { AiOutlineClose, AiOutlineDelete } from 'react-icons/ai';
import Button from 'react-bootstrap/Button';
import { FaRegGrinBeamSweat } from "react-icons/fa";
import { createOrder, getItemByID, updateStock } from '../../../services/firebase';

export const CartContainer = () => {
  const { cartList, setNavbar, deleteProduct, clearCart } = useCartContext()
  const [precioFinal, setPrecioFinal] = useState()
  const [dataForm, setDataForm] = useState({
    name: '',
    email: '',
    validarMail:'',
    phone: ''
  })
  
  setNavbar(true)

  useEffect(() => {
    setPrecioFinal(cartList.reduce((total, item) => total += item.amount * item.price, 0))
  }, [cartList])

  const handleOnChange = (e) =>{
    console.log(e.target.name)
    console.log(e.target.value)
    setDataForm({
      ...dataForm, 
      [e.target.name]: e.target.value
    })
  }

  function sendOrder(e) {
    e.preventDefault()
    createOrder(cartList, precioFinal,dataForm)
    cartList.map(item => {
      getItemByID('products', item.id).then(resp => {
        let stockFinal = resp.stock - item.amount
        updateStock(item.id, stockFinal)
      })
    })
  }

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
              <h4 className='fontErrorCart'>Ups, parece que no has agregado nada al carrito <FaRegGrinBeamSweat /></h4>
              :
              cartList.map(item =>
                <React.Fragment key={item.id}>
                  <div className='card-body row my-4'>
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
                      <Button variant="outline-danger" onClick={() => deleteProduct(item.id)}><AiOutlineClose /></Button>
                    </div>
                  </div>
                </React.Fragment>
              )}
          </div>

          <div className='formCartContainer form-control'>
            <hr />
            {/* FORM */}
            <form onSubmit={sendOrder} id='CreateForm'>
              <h4>Datos de compra</h4>
              <input
                type="text"
                name="name"
                placeholder='Ingresar nombre'
                value={dataForm.name}
                onChange={handleOnChange}
              />
              <input
                type="text"
                name="phone"
                placeholder='Ingresa tu celular'
                value={dataForm.phone}
                onChange={handleOnChange}
              />
              <input
                type="email"
                name="email"
                placeholder='Ingresa tu email'
                value={dataForm.email}
                onChange={handleOnChange}
              />
              <input
                type="text"
                name="validarMail"
                placeholder='Confirma tu email'
                value={dataForm.validarMail}
                onChange={handleOnChange}
              />
              
            </form>
          </div>
        </div>

        {/* TOTAL DEL CARRITO */}
        <div className='col-3 totalCartContainer border'>
          <div className='totalCart scrolly'>
            <h2 className='pt-2'>Detalle</h2>
            <ul>
              {cartList.map(item =>
                <React.Fragment key={item.id}>
                  <p>- {item.name} X {item.amount} = ${item.amount * item.price}</p>
                </React.Fragment>
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
                <button type="submit" form="CreateForm" className="btn btn-warning btnBuy d-flex align-items-center justify-content-center">COMPRAR</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
