import { FETCH_FAVORITES_TASKS } from '../actions/types';

export default function (state = { data: [], id: '' }, action) {
    switch (action.type) {
        case FETCH_FAVORITES_TASKS:
            return { data: action.payload, id: action.id } || false;
        default:
            return state;
    }
}