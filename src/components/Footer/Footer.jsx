import React, { useEffect, useState } from 'react'
import { getItems } from '../../services/firebase'

export const Footer = () => {
    const [categories, setCategories] = useState([])
    useEffect(() => {
        getItems('categories').then(resp => {
            setCategories(resp)
        })
    }, [])

    return (
        <>
            <footer class="container-fluid py-5 backStyleFooter vw-100 fontNormal">
                <div class="row">
                    <div class="col-12 col-md gap-2">
                        <img src="/logo.png" width="24" height="24"></img>
                        <small class="d-block mb-3 text-muted">&copy; Sebastián Marambio 2023</small>
                    </div>
                    <div class="col-6 col-md">
                        <h5>Inicio</h5>
                        <ul class="list-unstyled text-small">
                            <li><a class="link-secondary" href="/">Nosotros</a></li>
                            <li><a class="link-secondary" href="/">Ofertas</a></li>
                            <li><a class="link-secondary" href="/">Sugerencias</a></li>
                        </ul>
                    </div>
                    <div class="col-6 col-md">
                        <h5>Productos</h5>
                        <ul class="list-unstyled text-small">
                            {categories.map(item =>
                                <li><a key={item.idCategory} href={`/category/${item.idCategory}`} class="link-secondary">{item.name}</a></li>
                            )}
                        </ul>
                    </div>
                    <div class="col-6 col-md">
                        <h5>Recursos</h5>
                        <ul class="list-unstyled text-small">
                            <li><a class="link-secondary" href="/cart">Mis Compras</a></li>
                            <li><a class="link-secondary" href="/cart">Pagar</a></li>
                            <li><a class="link-secondary" href="/cart">Eliminar compras</a></li>
                            <li><a class="link-secondary" href="/cart">Detalle</a></li>
                        </ul>
                    </div>
                    <div class="col-6 col-md">
                        <h5>Contacto</h5>
                        <ul class="list-unstyled text-small">
                            {/* <li><a class="link-secondary" href="#">Consultas</a></li>
                            <li><a class="link-secondary" href="#">Email</a></li> */}
                            <li><a class="link-secondary" href="https://www.linkedin.com/in/sebamarambio/" target="_blank">Linkedin</a></li>
                            <li><a class="link-secondary" href="https://github.com/sebamarambio96/" target="_blank">Github</a></li>
                        </ul>
                    </div>
                </div>
            </footer>
        </>
    )
}
