import * as actionTypes from "./actionTypes";

export function addToCart(pizza) {
    return {
        type: actionTypes.ADD_TO_CART,
        payload: pizza,
    };
}

export function removeFromCart(pizza) {
    return {
        type: actionTypes.REMOVE_FROM_CART,
        payload: pizza,
    };
}

export function cleanCart() {
    return {
        type: actionTypes.CLEAN_CART,
        payload: [],
    };
}
