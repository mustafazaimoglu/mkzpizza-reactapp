import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { bindActionCreators } from "redux";
import searchIcon from "../../img/svg/search.svg";
import * as pizzaActions from "../../redux/actions/pizzaActions";
import * as sizeActions from "../../redux/actions/sizeActions";

class MainPage extends Component {
    componentDidMount() {
        this.props.actions.getRandomPizzasForMainPage();
        this.props.actions.getSizes();
    }

    findActualSize = (sizeId) => {
        let temp;
        this.props.sizes.forEach((s) => {
            if (s.id === sizeId) {
                temp = s.actualSize;
            }
        });

        return temp + " CM";
    };

    card = () => {
        const result = [];

        for (let index = 0; index < 3; index++) {
            result.push(this.props.pizzas[index]);
        }

        return result.map((r) => (
            <div className="col-md-4 mb-3">
                <Link
                    key={r.id}
                    to={"/detail/" + r.id}
                    className="text-decoration-none text-dark"
                >
                    <div
                        className="card border-dark mkzTest shadow"
                        style={{ height: "100%" }}
                    >
                        <img
                            src={r.imageUrl}
                            className="card-img-top imageTestAlignment"
                            alt="pizzaImage"
                        />
                        <h5 className="card-header">{r.pizzaName}</h5>
                        <div className="card-body d-flex flex-column justify-content-between">
                            <h5 className="card-title">Ingredients</h5>
                            <p className="card-text">
                                {r.ingredients.map((i) => (
                                    <span
                                        className="badge bg-success"
                                        style={{ marginRight: "8px" }}
                                    >
                                        {i.toUpperCase() + " "}
                                    </span>
                                ))}
                            </p>
                            <div className="d-flex justify-content-end ">
                                <button
                                    type="button"
                                    className="btn btn-danger px-3"
                                    disabled
                                >
                                    {r.price + " ₺"}
                                </button>
                            </div>
                        </div>
                    </div>
                </Link>
            </div>
        ));
    };

    table = () => {
        const result = [];

        for (let index = 0; index < 4; index++) {
            result.push(this.props.pizzas[3 + index]);
        }

        return (
            <table className="table table-dark table-striped px-2 text-center">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Actual Size</th>
                        <th>Price</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {result.map((r) => (
                        <tr className="trHover" key={r.id}>
                            <td>{r.pizzaName}</td>
                            <td>{this.findActualSize(r.sizeId)}</td>
                            <td>{r.price + " ₺"}</td>
                            <td>
                                <Link to={"/detail/" + r.id}>
                                    <span className="btn btn-info">Detail</span>
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        );
    };

    render() {
        return (
            <div>
                <div className="container p-3">
                    <div className="text-center pb-3">
                        <h3>Welcome to MKZ Pizza</h3>
                    </div>
                    <div className="row">
                        <div className="col-md-3  mb-3">
                            <Link to="/search" className="text-decoration-none">
                                <div className="card mkzTest border-dark shadow mkzHover2">
                                    <div className="card-body d-flex flex-column justify-content-center align-items-center">
                                        <img
                                            src={searchIcon}
                                            alt="searchIcon"
                                            style={{ width: "120px" }}
                                        />
                                        <hr />
                                        <h5 className="card-title">DETAILED</h5>
                                        <h5 className="card-title">SEARCH</h5>
                                    </div>
                                </div>
                            </Link>
                        </div>
                        <div className="col-md-9">
                            <div className="row">
                                {this.props.pizzas.length === 0
                                    ? ""
                                    : this.card()}
                            </div>
                        </div>
                    </div>

                    <div className="sizeList mt-4 mb-4">
                        {this.props.sizes.map((s) => (
                            <Link
                                className="text-decoration-none mb-3 d-flex align-items-center justify-content-center sizeListItem "
                                to={"/search/" + s.id}
                                key={s.id}
                            >
                                {s.sizeName}
                            </Link>
                        ))}
                    </div>

                    <div className="row" style={{ overflowX: "auto" }}>
                        {this.props.pizzas.length === 0 ? "" : this.table()}
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        pizzas: state.pizzaMainPageReducer,
        sizes: state.sizeListReducer,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: {
            getRandomPizzasForMainPage: bindActionCreators(
                pizzaActions.getRandomPizzasForMainPage,
                dispatch
            ),
            getSizes: bindActionCreators(sizeActions.getSizes, dispatch),
        },
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);
