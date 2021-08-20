import * as actionTypes from "../actions/actionTypes";
import initialState from "./initialState";

export default function changeSizeReducer(
    state = initialState.currentSize,
    action
) {
    switch (action.type) {
        case actionTypes.CHANGE_SIZE:
            return action.payload;
        default:
            return (state);
    }
}
