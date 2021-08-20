import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { removeFromCart } from "../../redux/actions/cartActions";
import { getSizes } from "../../redux/actions/sizeActions";
import alertify from "alertifyjs";

function CartFinal({ removeFromCart, cart, sizes, getSizes }) {
    const [cartTotal, setCartTotal] = useState(0);
    useEffect(() => {
        let temp = 0;
        cart.forEach(cartItem => {
            temp += (cartItem.pizza.price * cartItem.quantity)
        });

        setCartTotal(temp)
    }, [cart]);

    useEffect(() => {
        if (sizes.length === 0) {
            getSizes();
        }
    });

    function removeFromCartUI(pizza) {
        removeFromCart(pizza);
        alertify.error(pizza.pizzaName + " sepetten silindi");
    }

    function sizeNameFind(sizeId) {
        let temp;
        sizes.forEach((s) => {
            if (s.id === sizeId) {
                temp = s.sizeName;
            }
        });

        return temp.toUpperCase();
    }

    function renderEmpty() {
        return (
            <div className="text-center m-5 p-5">
                <h2>CART IS EMPTY</h2>
            </div>
        );
    }

    function renderFinal() {
        return (
            <div className="container my-3">
                <div className="row" style={{ overflowX: "auto" }}>
                    <table className="table table-dark table-striped px-2 text-center">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Size</th>
                                <th>Price</th>
                                <th>Quantity</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {cart.map((cartItem) => (
                                <tr className="trHover">
                                    <td>{cartItem.pizza.pizzaName}</td>
                                    <td>
                                        {sizeNameFind(cartItem.pizza.sizeId)}
                                    </td>
                                    <td>{cartItem.pizza.price + " ₺"}</td>
                                    <td>{cartItem.quantity}</td>
                                    <td>
                                        <span
                                            className="btn btn-danger"
                                            onClick={() =>
                                                removeFromCartUI(cartItem.pizza)
                                            }
                                        >
                                            Remove
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="row">
                    <div className="d-flex justify-content-around align-items-center">
                        <h5>Total : {" " + cartTotal + " "} ₺</h5>
                        <h5>
                            <Link
                                to="/orderComplete"
                                className="btn btn-success"
                            >
                                Order
                            </Link>
                        </h5>
                    </div>
                </div>
            </div>
        );
    }

    return <div>{cart.length > 0 ? renderFinal() : renderEmpty()}</div>;
}

function mapStateToProps(state) {
    return {
        cart: state.cartReducer,
        sizes: state.sizeListReducer,
    };
}

const mapDispatchToProps = {
    removeFromCart,
    getSizes,
};

export default connect(mapStateToProps, mapDispatchToProps)(CartFinal);
