import { FETCH_TASK } from '../actions/types';

export default function (state = {}, action) {
    switch (action.type) {
        case FETCH_TASK:
            return action.payload || false;
        default:
            return state;
    }
}