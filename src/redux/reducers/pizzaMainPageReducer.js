import * as actionTypes from "../actions/actionTypes";
import initalState from "./initialState";

export default function pizzaMainPageReducer(state=initalState.pizzas,action){
    switch (action.type) {
        case actionTypes.GET_PIZZAS_FOR_MAINPAGE:
            return action.payload;      
        default:
            return state;
    }

}