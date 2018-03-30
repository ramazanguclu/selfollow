import { combineReducers } from 'redux';
import authReducer from './authReducer';
import wordGroupReducer from './wordGroupReducer';
import dictionaryWords from './dictionaryWordsReducer';

export default combineReducers({
    auth: authReducer,
    wordGroup: wordGroupReducer,
    dictionaryWords: dictionaryWords
});