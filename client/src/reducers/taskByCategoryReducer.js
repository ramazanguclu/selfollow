import { FETCH_TASKS_BY_CATEGORY } from '../actions/types';

export default function (state = [], action) {
    switch (action.type) {
        case FETCH_TASKS_BY_CATEGORY:
            return action.payload || false;
        default:
            return state;
    }
}