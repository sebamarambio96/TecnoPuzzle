import React, { useEffect, useState } from 'react'
import { useCartContext } from '../../context/CartContext'
import { AiOutlineClose, AiOutlineDelete } from 'react-icons/ai';
import Button from 'react-bootstrap/Button';
import { FaRegGrinBeamSweat } from "react-icons/fa";
import { createOrder, getItemByID, updateStock } from '../../../services/firebase';
import { Card, Modal } from 'react-bootstrap';


export const CartContainer = () => {
  const { cartList, setNavbar, deleteProduct, clearCart } = useCartContext()
  const [show, setShow] = useState(false);
  const [finalPrice, setFinalPrice] = useState()
  const [orderNumber, setOrderNumber] = useState()
  const [valid, setValid] = useState(false)
  const [dataForm, setDataForm] = useState({
    name: '',
    email: '',
    emailValidation: '',
    phone: '',
    date: ''
  })

  //NAVBAR Control
  useEffect(() => {
    setNavbar(true)
  }, [])
  useEffect(() => {
    const changeBackground = () => {
      if (window.scrollY >= 0) {
        setNavbar(true)
      }
    }
    window.addEventListener('scroll', changeBackground)
  })
  //calculate TOTAL PRICE
  useEffect(() => {
    setFinalPrice(cartList.reduce((total, item) => total += item.amount * item.price, 0))
  }, [cartList])

  //ORDER MODAL
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //? FORM
  //update DATAFORM in real time
  const handleOnChange = (e) => {
    const form = { ...dataForm, [e.target.name]: e.target.value, date: new Date() }
    setDataForm(form)
  }
  //form VALIDATION
  useEffect(() => {
    if (dataForm.name === "" || dataForm.phone === "" || dataForm.email === "" || dataForm.email !== dataForm.emailValidation) {
      setValid(false)
    } else {
      setValid(true)
    }
  }, [dataForm])

  //CREATE, UPDATE stock and SHOW order
  async function sendOrder(e) {
    e.preventDefault()
    //CREATE order and return ID
    const orderNumber = await createOrder(cartList, finalPrice, dataForm)
    setOrderNumber(orderNumber._key.path.segments[1])
    //UPDATE stock on each element
    await cartList.map(item => {
      getItemByID('products', item.id).then(resp => {
        let stockFinal = resp.stock - item.amount
        updateStock(item.id, stockFinal)
      })
    })
    //SHOW modal witch order information
    handleShow()
  }
  //PREVENT not valid info
  function notValid(e) {
    e.preventDefault()
  }

  return (
    <div className='container-fluid vw-99'>
      <div className='backfill'></div>

      <div className='row'>
        <div className='col-9 productCartContainer border d-flex flex-column justify-content-between fontNormal backCart1'>
          <h4 className='py-2 border-bottom'>Productos</h4>
          <div className='scrolly fontNormal '>

            {/* PRODUCTS IN CART*/}
            {cartList.length === 0
              ?
              <h4 className='fontErrorCart text-warning'>Ups, parece que no has agregado nada al carrito <FaRegGrinBeamSweat /></h4>
              :
              cartList.map(item =>
                <React.Fragment key={item.id}>
                  <div className='card-body row my-4'>
                    <div className='offerImgContainer col-2 ms-3'>
                      <Card.Img variant="top" className='offerImg' width="90" height="120" src={item.img} alt={item.name} />
                    </div>

                    <div className='col-8 mx-2'>
                      <h6>SKU: {item.id}</h6>
                      <h5>{item.name}</h5>
                      <h5>Cantidad: {item.amount}</h5>
                      <h4>$ {item.price}</h4>
                    </div>
                    <div className='col-1 d-flex flex-column justify-content-center'>
                      <Button variant="outline-warning" onClick={() => deleteProduct(item.id)}><AiOutlineClose /></Button>
                    </div>
                  </div>
                </React.Fragment>
              )}
          </div>

          <div className='formCartContainer border-top container-fluid p-2'>
            {/* FORM */}
            <form onSubmit={valid ? sendOrder : notValid} id='CreateForm' className='row'>
              <h4>Datos de compra</h4>
              <div className='col-8 mb-3'>
                <label className="form-label text-info">Nombre Completo</label>
                <input
                  className='form-control'
                  type="text"
                  name="name"
                  placeholder='Henry Cavill'
                  value={dataForm.name}
                  onChange={handleOnChange}
                />
              </div>
              <div className='col-4 mb-3'>
                <label className="form-label text-info">Teléfono</label>
                <input
                  className='form-control'
                  type="text"
                  name="phone"
                  placeholder='555 555 55'
                  value={dataForm.phone}
                  onChange={handleOnChange}
                />
              </div>
              <div className='col-6 mb-3'>
                <label className="form-label text-info">Ingrese su email</label>
                <input
                  className='form-control'
                  type="email"
                  name="email"
                  placeholder='henryCavill@gmail.com'
                  value={dataForm.email}
                  onChange={handleOnChange}
                />
              </div>
              <div className='col-6 mb-3'>
                <label className="form-label text-info">Confirma tu email</label>
                <input
                  className='form-control'
                  type="text"
                  name="emailValidation"
                  value={dataForm.emailValidation}
                  onChange={handleOnChange}
                />
              </div>
            </form>
          </div>
        </div>

        {/* TOTAL DEL CARRITO */}
        <div className='col-3 totalCartContainer border fontNormal backCart2'>
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
              <h5>Precio total: ${finalPrice}</h5>
            </div>
            <div className='row'>
              <div className='col-2'>
                <Button variant="outline-warning" onClick={() => clearCart()}><AiOutlineDelete /></Button>
              </div>
              <div className='col-10'>
                <button type="submit" form="CreateForm" className={valid ?
                  'btn btn-warning btnBuy d-flex align-items-center justify-content-center'
                  :
                  'btn bg-secondary btnBuy d-flex align-items-center justify-content-center'}>COMPRAR
                </button>
                {/* ORDER */}
                <Modal centered show={show} onHide={handleClose}>
                  <Modal.Header className='modalStyle' closeButton>
                    <Modal.Title>COMPRA EXITOSA!!!</Modal.Title>
                  </Modal.Header>
                  <div className='backStyleModal'>
                    <Modal.Body>Su orden a sido generada con el codigo: <span className='text-warning fw-bolder'>{orderNumber}</span></Modal.Body>
                    <Modal.Body className='fw-bold'>DATOS:</Modal.Body>
                    <Modal.Body><span className='text-info fw-bold'>Nombre:</span> {dataForm.name}</Modal.Body>
                    <Modal.Body><span className='text-info fw-bold'>Teléfono:</span> {dataForm.phone}</Modal.Body>
                    <Modal.Body><span className='text-info fw-bold'>Email:</span> {dataForm.email}</Modal.Body>
                    <Modal.Body><span className='text-info fw-bold'>Fecha:</span> {(dataForm.date).toString()}</Modal.Body>
                  </div>
                  <Modal.Footer className='modalStyle'>
                  </Modal.Footer>
                </Modal>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}