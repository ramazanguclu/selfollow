import { FETCH_LOG_STATISTICS } from '../actions/types';

export default function (state = { data: [], id: '' }, action) {
    switch (action.type) {
        case FETCH_LOG_STATISTICS:
            return { data: action.payload, id: action.id } || false;
        default:
            return state;
    }
}