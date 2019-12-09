import {

} from "../constants/tickets.actions";

const InitialState = {
    tickets: [],
    errors: [],
    fetching: false,
    fetched: false
};

export default function TicketsReducer(state = InitialState, action) {

    switch (action.type) {
        default: {
            return state;
        }
    }
}