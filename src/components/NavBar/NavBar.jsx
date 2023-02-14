import { useEffect, useState } from "react"
import { CartWidget } from "../CartWidget/CartWidget"
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link, NavLink } from "react-router-dom";
import { useCartContext } from "../context/CartContext";
import { ButtonGroup, Dropdown, DropdownButton } from "react-bootstrap";
import { getItems } from "../../services/firebase";
import NavDropdown from 'react-bootstrap/NavDropdown';

export const NavBar = (prop) => {
    const { navbar, setNavbar } = useCartContext()
    const [categories, setCategories] = useState([])
    useEffect(() => {
        getItems('categories').then(resp => {
            setCategories(resp)
        })
    }, [])
    let variant = 'outline-info'


    return (
        <>
            <Navbar collapseOnSelect expand="lg" bg="bg-*" variant="dark" fixed="top" className={(navbar && 'navActive')}>
                <Container fluid className="brand">
                    <NavLink className="navLinks" to="/"><img src="/logo.png" alt="" /> TecnoPuzzle</NavLink>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav" className={(navbar && 'navActive2')}>
                        <Nav className="me-auto col-8 d-flex justify-content-evenly navLinks">
                            <NavLink className={({ isActive }) => isActive ? 'btn btn-outline-light' : 'btn navLinks'} to="/inicio">Inicio</NavLink>
                            <NavDropdown
                                className="navLinks"
                                as={ButtonGroup}
                                key={variant}
                                id={`dropdown-variants-${variant}`}
                                variant={variant.toLowerCase()}
                                title={'Productos'}>
                                <Link className='dropdown-item' TO={`/category/`} eventKey="4">Categorías</Link>
                                <NavDropdown.Divider />
                                {categories.map(item =>
                                    <Link key={item.idCategory} className='dropdown-item' to={`/category/${item.idCategory}`} eventKey={item.idCategory}>{item.name}</Link>
                                )}
                            </NavDropdown>
                            <NavLink className={({ isActive }) => isActive ? 'btn btn-outline-light' : 'btn navLinks'} to="/contacto">Contacto</NavLink>
                        </Nav>
                        <Nav className='gap-5 col-4 d-flex justify-content-center'>
                            <CartWidget />
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

        </>
    )
}