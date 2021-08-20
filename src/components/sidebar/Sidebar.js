import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getPizzas } from "../../redux/actions/pizzaActions";
import { getPriceFilteredPizzas } from "../../redux/actions/pizzaActions";
import { getSizes } from "../../redux/actions/sizeActions";
import { changeSize } from "../../redux/actions/sizeActions";

function Sidebar({
    getSizes,
    changeSize,
    getPizzas,
    getPriceFilteredPizzas,
    currentSize,
    pizzas,
    sizes,
}) {
    const [start, setStart] = useState("");
    const [end, setEnd] = useState("");

    useEffect(() => {
        if (sizes.length === 0) {
            getSizes();
        }
    });

    function selectSize(size) {
        changeSize(size);
        getPizzas(size.id);
        setStart("");
        setEnd("");
    }

    function inputChangeHandler(event) {
        let tempName = event.target.name;
        let tempValue = event.target.value;
        if (tempName === "start") {
            setStart(tempValue);
        } else {
            setEnd(tempValue);
        }
    }

    function priceFilter(event) {
        event.preventDefault();

        if (start === "" || end === "") {
            alert("Please enter the filter values!");
        } else if (parseInt(start) > parseInt(end)) {
            alert("Start price cannot be bigger than end price!");
        } else {
            if (currentSize.id === undefined) {
                getPriceFilteredPizzas(undefined, start, end);
            } else {
                getPriceFilteredPizzas(currentSize.id, start, end);
            }
        }
    }

    return (
        <div className="stickyDiv">
            <div>
                <h4 className="text-center">Select Size</h4>
                <ul className="list-group">
                    {sizes.map((s) => (
                        <li
                            className={
                                s.id === currentSize.id
                                    ? "list-group-item list-group-item-action active"
                                    : "list-group-item list-group-item-action"
                            }
                            key={s.id}
                            onClick={() => selectSize(s)}
                        >
                            {s.sizeName}
                        </li>
                    ))}
                </ul>

                <div id="priceFilter" className="my-3">
                    <h4 className="text-center">Price Filter</h4>
                    <form onSubmit={priceFilter}>
                        <div className="input-group mb-3">
                            <span className="input-group-text">₺</span>
                            <input
                                type="number"
                                className="form-control"
                                placeholder="Enter start price"
                                name="start"
                                onChange={inputChangeHandler}
                                value={start}
                            />
                        </div>
                        <div className="input-group mb-3">
                            <span className="input-group-text">₺</span>
                            <input
                                type="number"
                                className="form-control"
                                placeholder="Enter end price"
                                name="end"
                                onChange={inputChangeHandler}
                                value={end}
                            />
                        </div>
                        <div className="text-center">
                            <button className="btn btn-info" type="submit">
                                Apply Filter
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

function mapStateToProps(state) {
    return {
        currentSize: state.changeSizeReducer,
        sizes: state.sizeListReducer,
        pizzas: state.pizzaListReducer,
    };
}

const mapDispatchToProps = {
    getSizes,
    changeSize,
    getPizzas,
    getPriceFilteredPizzas,
};

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
