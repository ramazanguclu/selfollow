import { combineReducers } from 'redux';
import authReducer from './authReducer';
import wordGroupReducer from './wordGroupReducer';

export default combineReducers({
    auth: authReducer,
    wordGroup: wordGroupReducer
});