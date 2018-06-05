import { FETCH_WORKING_TASKS } from '../actions/types';

export default function (state = [], action) {
    switch (action.type) {
        case FETCH_WORKING_TASKS:
            return action.payload || false;
        default:
            return state;
    }
}