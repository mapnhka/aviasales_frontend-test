import {FETCH_TICKETS} from '../constants/tickets.actions';
import axios from 'axios';

export const fetchTickets = (searchId) => {
    return {
        type: FETCH_TICKETS,
        payload: axios.get(`/tickets?searchId=${searchId}`)
    }
};