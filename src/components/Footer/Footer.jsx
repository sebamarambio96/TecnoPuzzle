import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getItems } from '../../services/firebase'

export const Footer = () => {
    const [categories, setCategories] = useState([])
    //GET categories for links
    useEffect(() => {
        getItems('categories').then(resp => {
            setCategories(resp)
        })
    }, [])

    return (
        <>
            <footer className="container-fluid py-5 backStyleFooter fontNormal">
                <div className="row">
                    <div className="col-12 col-md gap-2">
                        <img src="/logo.png" width="24" height="24"></img>
                        <small className="d-block mb-3 text-muted">&copy; Sebastián Marambio 2023</small>
                    </div>
                    <div className="col-6 col-md">
                        <h5>Inicio</h5>
                        <ul className="list-unstyled text-small">
                            <Link className="link-secondary" to={"/"}><li>Nosotros</li></Link>
                            <Link className="link-secondary" to={"/"}><li>Ofertas</li></Link>
                            <Link className="link-secondary" to={"/"}><li>Sugerencias</li></Link>
                        </ul>
                    </div>
                    <div className="col-6 col-md">
                        <h5>Productos</h5>
                        <ul className="list-unstyled text-small">
                            {categories.map(item =>
                                <Link key={item.idCategory} to={`/category/${item.idCategory}`} className="link-secondary"><li>{item.name}</li></Link>
                            )}
                        </ul>
                    </div>
                    <div className="col-6 col-md">
                        <h5>Recursos</h5>
                        <ul className="list-unstyled text-small">
                            <Link className="link-secondary" to={"/cart"}><li>Mis Compras</li></Link>
                            <Link className="link-secondary" to={"/cart"}><li>Pagar</li></Link>
                            <Link className="link-secondary" to={"/cart"}><li>Eliminar compras</li></Link>
                            <Link className="link-secondary" to={"/cart"}><li>Detalle</li></Link>
                        </ul>
                    </div>
                    <div className="col-6 col-md">
                        <h5>Contacto</h5>
                        <ul className="list-unstyled text-small">
                            <li><a className='text-info' href="https://www.linkedin.com/in/sebamarambio/" target="_blank">Linkedin</a></li>
                            <li><a className='text-info' href="https://github.com/sebamarambio96/" target="_blank">Github</a></li>
                        </ul>
                    </div>
                </div>
            </footer>
        </>
    )
}
