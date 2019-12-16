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
               fetching: true,
               fetched: false
           }
        }

        case FETCH_SEARCH_ID_FULFILLED: {
            return {
                ...state,
                searchId: action.payload.data.searchId,
                fetching: false,
                fetched: true
            }
        }

        case FETCH_SEARCH_ID_REJECTED: {
            return {
                ...state,
                fetching: false,
                fetched: true
            }
        }

        default: {
            return state;
        }
    }
}