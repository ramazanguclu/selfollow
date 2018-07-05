import { FETCH_LOG_STATISTICS } from '../actions/types';

export default function (state = { data: [], id: '', count: 0 }, action) {
    switch (action.type) {
        case FETCH_LOG_STATISTICS:
            return { data: action.payload, id: action.id, count: action.count } || false;
        default:
            return state;
    }
}