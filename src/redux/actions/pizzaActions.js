import * as actionTypes from "./actionTypes";

export function getPizzasSuccess(pizzas) {
    return {
        type: actionTypes.GET_PIZZAS_SUCCESS,
        payload: pizzas,
    };
}

export function getPizzaSuccess(pizza) {
    return {
        type: actionTypes.GET_PIZZA_SUCCESS,
        payload: pizza,
    };
}

export function getPizzasForMainPage(pizzas) {
    let number = Math.floor(Math.random() * (pizzas.length - 7));
    let newPayload = [];
    for (let i = 0; i < 7; i++) {
        newPayload.push(pizzas[number + i]);
    }

    return {
        type: actionTypes.GET_PIZZAS_FOR_MAINPAGE,
        payload: newPayload,
    };
}

export function getPizzas(sizeId) {
    return function (dispatch) {
        let url =
            "https://my-json-server.typicode.com/mustafazaimoglu/mkzpizzaserver/pizzas";
        if (sizeId) {
            url = url + "?sizeId=" + sizeId;
        }
        return fetch(url)
            .then((response) => response.json())
            .then((data) => dispatch(getPizzasSuccess(data)));
    };
}

export function getPizza(pizzaId) {
    return function (dispatch) {
        let url =
            "https://my-json-server.typicode.com/mustafazaimoglu/mkzpizzaserver/pizzas";
        if (pizzaId) {
            url = url + "/" + pizzaId;
        }
        return fetch(url)
            .then((response) => response.json())
            .then((data) => dispatch(getPizzaSuccess(data)));
    };
}

export function getRandomPizzasForMainPage() {
    return function (dispatch) {
        let url =
            "https://my-json-server.typicode.com/mustafazaimoglu/mkzpizzaserver/pizzas";
        return fetch(url)
            .then((response) => response.json())
            .then((data) => dispatch(getPizzasForMainPage(data)));
    };
}

export function getPriceFilteredPizzasSuccess(pizzas, fstart, fend) {
    let newPayload = [];
    pizzas.forEach((p) => {
        if (parseInt(p.price) >= parseInt(fstart) && parseInt(p.price) <= parseInt(fend)) {
            newPayload.push(p);
        }
    });

    return {
        type: actionTypes.GET_PRICE_FILTERED_PIZZAS_SUCCESS,
        payload: newPayload,
    };
}

export function getPriceFilteredPizzas(sizeId, fstart, fend) {
    return function (dispatch) {
        let url =
            "https://my-json-server.typicode.com/mustafazaimoglu/mkzpizzaserver/pizzas";
        if (sizeId) {
            url = url + "?sizeId=" + sizeId;
        }
        return fetch(url)
            .then((response) => response.json())
            .then((data) =>
                dispatch(getPriceFilteredPizzasSuccess(data, fstart, fend))
            );
    };
}
