import {CHANGE_FILTERS} from '../constants/filter.actions';

export const changeFilter = (filterArr) => {
    return {
        type: CHANGE_FILTERS,
        payload: filterArr
    }
};