import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import { getItems } from "../../services/firebase";
import { Loading } from "../Loading/Loading";

export const Categories = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        //GET categories
        getItems("categories").then((resp) => {
            setCategories(resp);
            setLoading(false);
        });
    }, []);

    return (
        <div className="categories container-fluid d-flex flex-column justify-content-evenly align-items-center">
            <h1 className="fontNormal">Categorías</h1>
            <div className="row gap-3 gap-sm-1 gap-md-3 gap-lg-5 row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 d-flex justify-content-center align-items-center cardCategoriesContainer container">
                {loading ? (
                    <Loading />
                ) : (
                    categories.map((item) => (
                        <React.Fragment key={item.idCategory}>
                            <Card className="cardCategories fontNormal shadow rounded my-3">
                                <Card.Body className="d-flex flex-column justify-content-evenly align-items-center">
                                    <div id="offerOption2" className=" d-flex flex-column justify-content-evenly align-items-center">
                                        <Card.Title className="categoryFont fw-normal text-center my-3">{item.name}</Card.Title>
                                        <Link to={`/category/${item.idCategory}`}>
                                            <Button variant="warning">Ver Productos</Button>
                                        </Link>
                                    </div>
                                </Card.Body>
                            </Card>
                        </React.Fragment>
                    ))
                )}
            </div>
        </div>
    );
};
