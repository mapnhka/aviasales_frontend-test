import {FETCH_SEARCH_ID} from '../constants/client.actions.js';
import axios from 'axios';

export const fetchSearchId = () => {
    return {
        type: FETCH_SEARCH_ID,
        payload: axios.get('/search')
    }
};