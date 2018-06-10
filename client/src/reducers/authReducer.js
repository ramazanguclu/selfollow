import { FETCH_USER } from '../actions/types';

export default function (state = { data: false, id: '' }, action) {
    switch (action.type) {
        case FETCH_USER:
            return { data: action.payload, id: action.id } || false;
        default:
            return state;
    }
}