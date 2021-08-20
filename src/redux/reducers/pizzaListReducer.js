import * as actionTypes from "../actions/actionTypes";
import initalState from "./initialState";

export default function pizzaListReducer(state = initalState.pizzas, action) {
    switch (action.type) {
        case actionTypes.GET_PIZZAS_SUCCESS:
            return action.payload;
        case actionTypes.GET_PRICE_FILTERED_PIZZAS_SUCCESS:
            return action.payload;
        default:
            return state;
    }
}
