import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getPizza } from "../../redux/actions/pizzaActions";
import { getSizes } from "../../redux/actions/sizeActions";
import { useParams } from "react-router-dom";
import { addToCart } from "../../redux/actions/cartActions";
import alertify from "alertifyjs";

function PizzaDetail({ getSizes, getPizza, pizza, sizes, addToCart }) {
    const { pizzaId } = useParams();
    const [counter, setCounter] = useState(0);
    const [imgs] = useState([
        "https://cdn.pixabay.com/photo/2017/12/09/08/18/pizza-3007395_1280.jpg",
        "https://cdn.pixabay.com/photo/2017/01/03/11/33/pizza-1949183_1280.jpg",
        "https://cdn.pixabay.com/photo/2021/07/19/16/04/pizza-6478478_1280.jpg",
        "https://images.unsplash.com/photo-1585238342024-78d387f4a707?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
    ]);
    const [imgsrc, setImgsrc] = useState(imgs[0]);

    useEffect(() => {
        if (sizes.length === 0) {
            getSizes();
        }
    });

    useEffect(() => {
        getPizza(pizzaId);
    }, [pizzaId]); // eslint-disable-line react-hooks/exhaustive-deps

    function nextImage() {
        let c = counter;
        if (c !== imgs.length - 1) {
            c++;
        }
        setCounter(c);
        setImgsrc(imgs[c]);
    }

    function previousImage() {
        let c = counter;
        if (c !== 0) {
            c--;
        }
        setCounter(c);
        setImgsrc(imgs[c]);
    }

    function sizeNameFind(sizeId) {
        let temp;
        sizes.forEach((s) => {
            if (s.id === sizeId) {
                temp = s.sizeName;
            }
        });

        return temp;
    }

    function actualSizeFind(sizeId) {
        let temp;
        sizes.forEach((s) => {
            if (s.id === sizeId) {
                temp = s.actualSize;
            }
        });

        return temp;
    }

    function addToCartIU(pizza) {
        addToCart({pizza,quantity:1});
        alertify.success(pizza.pizzaName + " sepete eklendi");
    }

    return (
        <div>
            <div className="container my-4">
                <div className="row shadow rounded bg-light p-5">
                    <div className="col-md-6 py-2">
                        <div>
                            <img
                                className="rounded detailImageAlignment"
                                src={imgsrc}
                                alt="pizzaImage"
                            ></img>
                            <div className="d-flex justify-content-center align-items-center text-center mt-3">
                                <button
                                    className="imageChangerBox btn btn-secondary"
                                    onClick={previousImage}
                                >
                                    Previous
                                </button>
                                <button
                                    className="imageChangerBox btn btn-secondary"
                                    onClick={nextImage}
                                >
                                    Next
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div>
                            <div>
                                <h2 className="my-3">
                                    {pizza.pizzaName}
                                    <span className="badge bg-success float-end">
                                        {pizza.price + " TL"}
                                    </span>
                                </h2>
                            </div>
                        </div>
                        <div className="text-center">
                            <h3>
                                {"Size : " +
                                    sizeNameFind(pizza.sizeId) +
                                    " (" +
                                    actualSizeFind(pizza.sizeId) +
                                    " CM)"}
                            </h3>
                            <div>
                                <h4>Ingredients: </h4>
                                <ul className="list-group">
                                    {pizza.ingredients.map((i) => (
                                        <li className="list-group-item list-group-item-dark">
                                            {i.toUpperCase()}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="col">
                        <button className="detailAddButton" onClick={() => addToCartIU(pizza)}>Add to Cart</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

function mapStateToProps(state) {
    return {
        pizza: state.pizzaDetailReducer,
        sizes: state.sizeListReducer,
    };
}

const mapDispatchToProps = {
    getPizza,
    getSizes,
    addToCart
};

export default connect(mapStateToProps, mapDispatchToProps)(PizzaDetail);
