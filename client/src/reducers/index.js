import { combineReducers } from 'redux';
import authReducer from './authReducer';
import wordGroupReducer from './wordGroupReducer';
import dictionaryWordsReducer from './dictionaryWordsReducer';
import { reducer as reduxForm } from 'redux-form';

export default combineReducers({
    auth: authReducer,
    wordGroup: wordGroupReducer,
    dictionaryWords: dictionaryWordsReducer,
    form: reduxForm
});