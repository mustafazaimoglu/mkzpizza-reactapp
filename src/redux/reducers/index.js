import { combineReducers } from "redux";
import changeSizeReducer from "./changeSizeReducer";
import sizeListReducer from "./sizeListReducer";
import pizzaListReducer from "./pizzaListReducer";
import pizzaDetailReducer from "./pizzaDetailReducer";
import pizzaMainPageReducer from "./pizzaMainPageReducer";
import cartReducer from "./cartReducer";

const rootReducer = combineReducers({
    changeSizeReducer,
    sizeListReducer,
    pizzaListReducer,
    pizzaMainPageReducer,
    pizzaDetailReducer,
    cartReducer
});

export default rootReducer;
