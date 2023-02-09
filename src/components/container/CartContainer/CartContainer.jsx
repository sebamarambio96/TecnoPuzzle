import React, { useEffect, useState } from 'react'
import { useCartContext } from '../../context/CartContext'
import { LoginWidget } from '../../loginWidget/LoginWidget'


export const CartContainer = () => {
  const { cartList, setNavbar } = useCartContext()
  const [precioFinal, setPrecioFinal] = useState()
  console.log(cartList)

  

  useEffect(() => {
    setNavbar(true)
  }, [])

  useEffect(()=>{
    setPrecioFinal()
  },[])

  return (
    <div className='container-fluid vw-100'>
      <div className='relleno'></div>

      <div className='row'>
        <div className='col-9 productCartContainer border d-flex flex-column justify-content-between'>
          <h1>Carrito</h1>
          <div className='scrolly'>

            {/* PRODUCTOS EN CARRITO*/}
            {cartList.map(item =>
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
            <div className='formCartContainer'>
              <hr />
              {/* FORM */}
              HOLA
              HOLA
              HOLA
              HOLA
              HOLA
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
        </div>

        {/* TOTAL DEL CARRITO */}
        <div className='col-3 totalCartContainer border'>
          <div className='totalCart'>
              
          </div>
          <div className='buttonCartContainer d-flex flex-column justify-content-end'>
            <div className='d-flex align-items-center justify-content-center'>
              <h5>Precio total: $1000</h5>
            </div>
            <a type="button" className="btn btn-warning btnBuy d-flex align-items-center justify-content-center">COMPRAR</a>
          </div>
        </div>
      </div>
    </div>
  )
}
