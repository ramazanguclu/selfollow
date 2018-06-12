import { FETCH_LOGS } from '../actions/types';

export default function (state = { data: [], id: '' }, action) {
    switch (action.type) {
        case FETCH_LOGS:
            return { data: action.payload, id: action.id } || false;
        default:
            return state;
    }
}