import {
    FETCH_TICKETS_FULFILLED,
    FETCH_TICKETS_PENDING,
    FETCH_TICKETS_REJECTED,
    CHANGE_SORT,
    sortValues
} from "../constants/tickets.actions";

import {filterValues} from '../constants/filter.actions';

const InitialState = {
    tickets: [],
    ticketsByTransfer: [],
    index: filterValues.reduce((resObj, filter) => {
        return {
            ...resObj,
            [filter]: sortValues.reduce((resObj, sort) => {
                return {
                    ...resObj,
                    [sort]: []
                }
            }, {})
        }
    }, {}),
    sort: 'cost',
    errors: [],
    fetching: false,
    fetched: false,
    stop: false
};

export default function TicketsReducer(state = InitialState, action) {

    switch (action.type) {
        case CHANGE_SORT: {
            return {
                ...state,
                sort: action.payload
            }
        }

        case FETCH_TICKETS_PENDING: {
            return {
                ...state,
                fetching: true,
                fetched: false
            }
        }

        case FETCH_TICKETS_FULFILLED: {
            const insertedTickets = action.payload.data.tickets;
            const newTickets = [...state.tickets, ...insertedTickets];
            const newIndex = {...state.index};

            for (let i = insertedTickets.length - 1; i >= 0; --i) {
                const maxTransfers = insertedTickets[i].segments.reduce((maxTransfers, segment) => {
                    return Math.max(segment.stops.length, maxTransfers);
                }, 0);

                const maxDuration = insertedTickets[i].segments.reduce((maxDuration, segment) => {
                    return Math.max(segment.duration, maxDuration);
                }, 0);

             /*   const arrByCost = newIndex[`transfer_all`]['cost'];
                const arrByTime = newIndex[`transfer_all`]['time'];

                const placeToInsertSortedByCost = findInsertPosition(arrByCost, insertedTickets[i].price, 'price');
                const placeToInsertSortedByTime = findInsertPosition(arrByTime, insertedTickets[i].maxDuration, 'maxDuration');

                arrByCost.splice(placeToInsertSortedByCost, 0, insertedTickets[i]);
                arrByTime.splice(placeToInsertSortedByTime, 0, insertedTickets[i]);*/

                if (newIndex.hasOwnProperty(`transfer_${maxTransfers}`)) {
                    const arrByCost = newIndex[`transfer_${maxTransfers}`]['cost'];
                    const arrByTime = newIndex[`transfer_${maxTransfers}`]['time'];

                    insertedTickets[i].maxTransfers = maxTransfers;
                    insertedTickets[i].maxDuration = maxDuration;

                    const placeToInsertSortedByCost = findInsertPosition(arrByCost, insertedTickets[i].price, 'price');
                    const placeToInsertSortedByTime = findInsertPosition(arrByTime, insertedTickets[i].maxDuration, 'maxDuration');

                    arrByCost.splice(placeToInsertSortedByCost, 0, insertedTickets[i]);
                    arrByTime.splice(placeToInsertSortedByTime, 0, insertedTickets[i]);
                }
            }

            return {
                ...state,
                fetching: false,
                fetched: true,
                tickets: newTickets,
                index: newIndex,
                stop: action.payload.data.stop
            }
        }

        case FETCH_TICKETS_REJECTED: {
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

function findInsertPosition(arrOfObj, value, objFieldName) {
    const binarySearch = (start, end) => {
        if (end < 1) {
            return 0;
        }
        if (start === end - 1) {
            if (value <= arrOfObj[start][objFieldName]) {
                return start;
            } else if (value <= arrOfObj[end][objFieldName]) {
                return end;
            } else {
                return end + 1;
            }
        }

        const middle = Math.floor((start + (end - start) / 2));

        if (value > arrOfObj[middle][objFieldName]) return binarySearch(middle, end);
        if (value <= arrOfObj[middle][objFieldName]) return binarySearch(start, middle);
    };

    const start = 0,
        end = arrOfObj.length - 1;

    return binarySearch(start, end);
}