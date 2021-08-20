import * as actionTypes from "../actions/actionTypes";
import initalState from "./initialState";

export default function pizzaDetailReducer(state = initalState.pizza, action) {
    switch (action.type) {
        case actionTypes.GET_PIZZA_SUCCESS:
            return action.payload;
        default:
            return state;
    }
}
