import { Component } from "react";
import { Route, Switch } from "react-router-dom";
import Footer from "../footer/Footer";
import Navbar from "../navbar/Navbar";
import Dashboard from "./Dashboard";
import MainPage from "../main/MainPage";
import PizzaDetail from "../main/PizzaDetail";
import CartFinal from "../cart/CartFinal"
import NotFound from "../common/NotFound"
import OrderComplete from "../order/OrderComplete";

export default class App extends Component {
    render() {
        return (
            <div className="mkz-background">
                <Navbar/>
                <Switch>
                    <Route path="/" exact component={MainPage}/>
                    <Route path="/search/:id" component={Dashboard}/>
                    <Route path="/search/" component={Dashboard}/>
                    <Route path="/detail/:pizzaId" component={PizzaDetail}/>
                    <Route path="/cart" component={CartFinal}/>
                    <Route path="/orderComplete" component={OrderComplete}/>
                    <Route component={NotFound}/>
                </Switch>
                <Footer/>
            </div>
        );
    }
}
