import * as actionTypes from "../actions/actionTypes";
import initialState from "./initialState";

export default function cartReducer(state = initialState.cart, action) {
    switch (action.type) {
        case actionTypes.ADD_TO_CART:
            let addedItem = state.find(
                (cartItem) => cartItem.pizza.id === action.payload.pizza.id
            );

            if (addedItem) {
                let newState = state.map((cartItem) => {
                    if (cartItem.pizza.id === action.payload.pizza.id) {
                        return Object.assign({}, addedItem, {
                            quantity: addedItem.quantity + 1,
                        });
                    }
                    return cartItem;
                });
                return newState;
            } else {
                return [...state, { ...action.payload }];
            }
        case actionTypes.REMOVE_FROM_CART:
            let newState = state.filter(
                (cartItem) => cartItem.pizza.id !== action.payload.id
            );
            return newState;
        case actionTypes.CLEAN_CART:
            return action.payload;
        default:
            return state;
    }
}
