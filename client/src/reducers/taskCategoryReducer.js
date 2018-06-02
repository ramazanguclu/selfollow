import { FETCH_TASK_CATEGORIES } from '../actions/types';

export default function (state = [], action) {
    switch (action.type) {
        case FETCH_TASK_CATEGORIES:
            return action.payload || false;
        default:
            return state;
    }
}