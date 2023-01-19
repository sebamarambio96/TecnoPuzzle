import { CartWidget } from "../CartWidget/CartWidget"
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from "react-router-dom";
import { LoginWidget } from "../loginWidget/LoginWidget";

export const NavBar = () => {
    return (
        <>
            <Navbar collapseOnSelect expand="lg" bg="bg-*" variant="dark" fixed="top">
                <Container fluid>
                    <img src="/logo.png" alt="" />
                    <NavLink className={'navLinks'} to="/">TecnoPuzzle</NavLink>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
                    <Navbar.Collapse id="responsive-navbar-nav row">
                        <Nav className="me-auto col-8 d-flex justify-content-evenly navLinks">
                            <NavLink className={({ isActive }) => isActive ? 'btn btn-outline-light': 'btn navLinks'} to="/inicio">Inicio</NavLink>
                            <NavLink className={({ isActive }) => isActive ? 'btn btn-outline-light': 'btn navLinks'} to="/nosotros">Nosotros</NavLink>
                            <NavLink className={({ isActive }) => isActive ? 'btn btn-outline-light': 'btn navLinks'} to="/productos">Productos</NavLink>
                            <NavLink className={({ isActive }) => isActive ? 'btn btn-outline-light': 'btn navLinks'} to="/contacto">Contacto</NavLink>
                        </Nav>
                        <Nav className='gap-5 col-4 d-flex justify-content-center'>
                            {/*Boton carrito*/}
                            
                            <LoginWidget />
                            <CartWidget />
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

        </>
    )
}