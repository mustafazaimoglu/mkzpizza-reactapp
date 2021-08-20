import * as actionTypes from "../actions/actionTypes";
import initialState from "./initialState";

export default function sizeListReducer(state=initialState.sizes,action)
{
    switch (action.type)
    {
        case actionTypes.GET_SIZES_SUCCESS:
            return action.payload;
        case actionTypes.GET_SIZES_ERROR:
            return action.payload;
        default:
            return state;
    }
}