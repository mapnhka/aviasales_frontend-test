import {
    FETCH_SEARCH_ID_PENDING,
    FETCH_SEARCH_ID_FULFILLED,
    FETCH_SEARCH_ID_REJECTED
} from "../constants/client.actions";

const InitialState = {
    searchId: null,
    errors: [],
    fetching: false,
    fetched: false
};

export default function ClientReducer(state = InitialState, action) {

    switch (action.type) {
        case FETCH_SEARCH_ID_PENDING: {
           return {
               ...state,
               searchId: action.payload.data.searchId
           }
        }

        default: {
            return state;
        }
    }
}