import React, { Component } from "react";
import Sidebar from "../sidebar/Sidebar";
import PizzaList from "../main/PizzaList"

export default class Dashboard extends Component {
    render() {
        return (
            <div>
                <div className="container">
                    <div className="row my-3">
                        <div className="col-md-3">
                            <Sidebar/>
                        </div>
                        <div className="col-md-9">
                            <PizzaList/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
