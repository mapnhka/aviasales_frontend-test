import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";

import TicketsReducer from "./tickets.reducer";
import FilterReducer from "./filter.reducer";

const rootReducer = combineReducers({
    routing: routerReducer,
    TicketsReducer,
    FilterReducer
});

export default rootReducer;