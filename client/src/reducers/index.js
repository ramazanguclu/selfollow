import { combineReducers } from 'redux';
import authReducer from './authReducer';
import taskCategoryReducer from './taskCategoryReducer';
import taskReducer from './taskReducer';
import taskByCategoryReducer from './taskByCategoryReducer';
import taskByIdReducer from './taskByIdReducer';
import taskWorkingReducer from './taskWorkingReducer';
import taskLogReducer from './taskLogReducer';
import logStatisticReducer from './logStatisticReducer';
import favoritesTasksReducer from './favoritesTasksReducer';
import { reducer as reduxForm } from 'redux-form';

export default combineReducers({
    auth: authReducer,
    taskCategories: taskCategoryReducer,
    tasks: taskReducer,
    tasksByCategory: taskByCategoryReducer,
    task: taskByIdReducer,
    workingTasks: taskWorkingReducer,
    taskLogs: taskLogReducer,
    logStatistics: logStatisticReducer,
    favoritesTasks: favoritesTasksReducer,
    form: reduxForm
});