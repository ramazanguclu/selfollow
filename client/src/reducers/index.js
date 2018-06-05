import { combineReducers } from 'redux';
import authReducer from './authReducer';
import wordGroupReducer from './wordGroupReducer';
import dictionaryWordsReducer from './dictionaryWordsReducer';
import taskCategoryReducer from './taskCategoryReducer';
import taskReducer from './taskReducer';
import taskByCategoryReducer from './taskByCategoryReducer';
import taskByIdReducer from './taskByIdReducer';
import taskWorkingReducer from './taskWorkingReducer';
import { reducer as reduxForm } from 'redux-form';

export default combineReducers({
    auth: authReducer,
    wordGroup: wordGroupReducer,
    dictionaryWords: dictionaryWordsReducer,
    taskCategories: taskCategoryReducer,
    tasks: taskReducer,
    tasksByCategory: taskByCategoryReducer,
    task: taskByIdReducer,
    workingTasks: taskWorkingReducer,
    form: reduxForm
});