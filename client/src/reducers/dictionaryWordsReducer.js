import { FETCH_DICTIONARY_WORDS } from '../actions/types';

export default function (state = [], action) {
    switch (action.type) {
        case FETCH_DICTIONARY_WORDS:
            return action.payload || false;
        default:
            return state;
    }
}