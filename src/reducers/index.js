import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";

import TicketsReducer from "./tickets.reducer";

const rootReducer = combineReducers({
    routing: routerReducer,
    TicketsReducer,
});

export default rootReducer;