import {
    CHANGE_FILTERS,
    filterValues
} from "../constants/filter.actions";
import {difference} from 'lodash';

const InitialState = {
    filters: filterValues,
};

export default function FilterReducer(state = InitialState, action) {
    switch (action.type) {
        case CHANGE_FILTERS: {
            let newFilters = action.payload;
            const added = difference(action.payload, state.filters);
            const removed = difference(state.filters, action.payload);

            if (added.includes('transfer_all')) {
                newFilters = filterValues;
            }

            if (newFilters.includes('transfer_all') && state.filters.includes('transfer_all') && removed.length > 0) {
                newFilters.splice(newFilters.indexOf('transfer_all'), 1);
            }
            return {
                ...state,
                filters: newFilters
            }
        }
        default: {
            return state;
        }
    }
}