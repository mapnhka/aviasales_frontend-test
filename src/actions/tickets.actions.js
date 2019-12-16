import {FETCH_TICKETS, CHANGE_SORT} from '../constants/tickets.actions';
import axios from 'axios';

export const fetchTickets = (searchId) => {
    return {
        type: FETCH_TICKETS,
        payload: axios.get(`/tickets?searchId=${searchId}`)
    }
};

export const changeSort = (sortType) => {
    return {
        type: CHANGE_SORT,
        payload: sortType
    }
};