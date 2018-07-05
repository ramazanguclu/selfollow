import { FETCH_LOGS } from '../actions/types';

export default function (state = { data: [], id: '', count: 0 }, action) {
    switch (action.type) {
        case FETCH_LOGS:
            return { data: action.payload, id: action.id, count: action.count } || false;
        default:
            return state;
    }
}