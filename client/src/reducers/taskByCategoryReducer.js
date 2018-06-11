import { FETCH_TASKS_BY_CATEGORY } from '../actions/types';

export default function (state = { data: [], id: '' }, action) {
    switch (action.type) {
        case FETCH_TASKS_BY_CATEGORY:
            return { data: action.payload, id: action.id } || false;
        default:
            return state;
    }
}