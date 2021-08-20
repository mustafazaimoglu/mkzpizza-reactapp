import React, { Component } from "react";
import { Link } from "react-router-dom";
import CartSummary from "../cart/CartSummary";

export default class Navbar extends Component {
    render() {
        return (
            <div>
                <div className="navbar navbar-light bg-dark text-light">
                    <div className="container d-flex justify-content-between">
                        <div>
                            <Link
                                to="/"
                                className="text-decoration-none text-warning"
                            >
                                MKZ Pizza
                            </Link>
                        </div>
                        <div className="d-flex justify-content-center align-items-center">
                            <div className="px-2">
                                <a
                                    href="https://mustafazaimoglu.github.io"
                                    className="text-decoration-none text-light mkzHover"
                                    data-toggle="tooltip"
                                    data-placement="bottom"
                                    title="Mustafa Zaimoğlu"
                                >
                                    Personal Website
                                </a>
                            </div>
                            <CartSummary />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
