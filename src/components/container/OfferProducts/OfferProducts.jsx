import React, { useEffect, useState } from "react";
import { getItems } from "../../../services/firebase";
import { CardProduct } from "../../CardProduct/CardProduct";
import { Loading } from "../../Loading/Loading";

export const OfferProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    //array with actual OFFERS
    const offer = ["11", "22", "34", "63", "45", "51", "76", "83"];

    //GET items matching items
    useEffect(() => {
        getItems("products").then((resp) => {
            setProducts(resp.filter((item) => offer.indexOf(item.id) !== -1));
            setLoading(false);
        });
    }, []);

    return (
        <>
            <div className="products container-fluid backStyle py-3">
                <h1 className="pb-2 fontNormal px-3">Ofertas</h1>
                <div className="row pb-4 gap-3 gx-lg-5 row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 container-fluid d-flex justify-content-center align-items-center cardProductsContainer">
                    {loading ? (
                        <div className="vw-100 d-flex justify-content-evenly align-items-center">
                            <Loading />
                        </div>
                    ) : (
                        products.map((item) => <CardProduct item={item} desc={"0% desc."} key={item.id} />)
                    )}
                </div>
            </div>
        </>
    );
};
