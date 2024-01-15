import { useEffect, useState } from "react";
import { CartWidget } from "../CartWidget/CartWidget";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link, NavLink } from "react-router-dom";
import { useCartContext } from "../context/CartContext";
import { ButtonGroup } from "react-bootstrap";
import { getItems } from "../../services/firebase";
import NavDropdown from "react-bootstrap/NavDropdown";

export const NavBar = (prop) => {
    const { navbar } = useCartContext();
    const [categories, setCategories] = useState([]);
    useEffect(() => {
        getItems("categories").then((resp) => {
            setCategories(resp);
        });
    }, []);

    //STYLE dropdown
    let variant = "outline-info";

    return (
        <>
            <Navbar collapseOnSelect expand="lg" bg="bg-*" variant="dark" fixed="top" className={navbar && "navActive"}>
                <Container fluid className="brand">
                    <NavLink className="navLinks" to="/">
                        <section>
                            <img src="/logo.png" alt="" /> TecnoPuzzle
                        </section>
                    </NavLink>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" className="ms-auto" />
                    <Navbar.Collapse id="responsive-navbar-nav" className={navbar && "navActive2"}>
                        <Nav className="me-auto col-8 d-flex justify-content-evenly align-items-center navLinks">
                            <NavLink className={({ isActive }) => (isActive ? "btn btn-outline-light cartButton" : "btn navLinks cartButton")} to="/inicio">
                                Inicio
                            </NavLink>
                            
                            <NavDropdown className="navLinks cartButton" as={ButtonGroup} key={variant} id={`dropdown-variants-${variant}`} variant={variant.toLowerCase()} title={"Productos"}>
                                <Link className="dropdown-item" to={`/category/`}>
                                    Todos
                                </Link>
                                <NavDropdown.Divider />
                                {/* CATEGORIES */}
                                {categories.map((item) => (
                                    <Link key={item.idCategory} className="dropdown-item" to={`/category/${item.idCategory}`}>
                                        {item.name}
                                    </Link>
                                ))}
                            </NavDropdown>
                        </Nav>
                        <Nav className="gap-5 col-4 d-flex justify-content-center cartButton">
                            <CartWidget />
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    );
};
