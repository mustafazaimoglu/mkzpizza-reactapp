import * as actionTypes from "./actionTypes";

export function changeSize(size) {
    return {
        type: actionTypes.CHANGE_SIZE,
        payload: size,
    };
}

export function getSizesSuccess(sizes) {
    return {
        type: actionTypes.GET_SIZES_SUCCESS,
        payload: sizes,
    };
}

export function getSizesError(error) {
    return {
        type: actionTypes.GET_SIZES_ERROR,
        payload: error,
    };
}

export function getSizes() {
    return function (dispatch) {
        let url =
            "https://my-json-server.typicode.com/mustafazaimoglu/mkzpizzaserver/sizes";
        return fetch(url)
            .then((response) => response.json())
            .then((data) => dispatch(getSizesSuccess(data)))
            .catch((error) => dispatch(getSizesError(error)));
    };
}
