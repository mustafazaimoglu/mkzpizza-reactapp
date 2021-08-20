import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getPizzas } from "../../redux/actions/pizzaActions";
import { getSizes } from "../../redux/actions/sizeActions";
import { changeSize } from "../../redux/actions/sizeActions";
import alertify from "alertifyjs";
import { addToCart } from "../../redux/actions/cartActions";

function PizzaList({
    pizzas,
    sizes,
    getPizzas,
    getSizes,
    changeSize,
    addToCart,
}) {
    let { id } = useParams();

    useEffect(() => {
        if (sizes.length === 0) {
            getSizes();
        }
    });

    useEffect(() => {
        if (id) {
            changeSize(sizes.find((s) => s.id === parseInt(id)));
            getPizzas(id);
        } else {
            getPizzas();
            changeSize({});
        }
    }, [id]); // eslint-disable-line react-hooks/exhaustive-deps

    function sizeNameFind(sizeId) {
        let temp;
        sizes.forEach((s) => {
            if (s.id === sizeId) {
                temp = s.sizeName;
            }
        });

        return temp;
    }

    function addToCartIU(pizza) {
        addToCart({ pizza, quantity: 1 });
        alertify.success(pizza.pizzaName + " sepete eklendi");
    }

    return (
        <div>
            <div className="row">
                {pizzas.length === 0 ? (
                    <div className="text-center">
                        <h2>NO PIZZA FOUND</h2>
                    </div>
                ) : (
                    pizzas.map((p) => (
                        <div className="col-md-6 mb-3" key={p.id}>
                            <div
                                className="card border-dark mkzTest shadow"
                                style={{ height: "100%" }}
                            >
                                <img
                                    src={p.imageUrl}
                                    className="card-img-top imageTestAlignment"
                                    alt="pizzaImage"
                                />
                                <h5 className="card-header">{p.pizzaName}</h5>
                                <div className="card-body d-flex flex-column justify-content-between">
                                    <h5 className="card-title">Ingredients</h5>
                                    <p className="card-text">
                                        {p.ingredients.map((i) => (
                                            <span
                                                className="badge bg-success"
                                                style={{
                                                    marginRight: "8px",
                                                    marginBottom: "8px",
                                                    fontSize: "16px",
                                                }}
                                            >
                                                {i.toUpperCase() + " "}
                                            </span>
                                        ))}
                                    </p>
                                    <p className="card-text">
                                        SIZE : {sizeNameFind(p.sizeId)}
                                    </p>

                                    <div className="d-flex justify-content-between ">
                                        <button
                                            type="button"
                                            className="btn btn-danger"
                                            disabled
                                        >
                                            {p.price + " ₺"}
                                        </button>
                                        <Link
                                            to={"/detail/" + p.id}
                                            className="btn btn-warning"
                                        >Detail</Link>
                                        <button
                                            type="button"
                                            className="btn btn-info"
                                            onClick={() => addToCartIU(p)}
                                        >
                                            Add
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

function mapStateToProps(state) {
    return {
        pizzas: state.pizzaListReducer,
        sizes: state.sizeListReducer,
    };
}

const mapDispatchToProps = {
    getPizzas,
    getSizes,
    changeSize,
    addToCart,
};

export default connect(mapStateToProps, mapDispatchToProps)(PizzaList);
