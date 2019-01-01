import axios from 'axios';
import {
    FETCH_USER,
    FETCH_TASK_CATEGORIES,
    FETCH_TASKS,
    FETCH_TASKS_BY_CATEGORY,
    FETCH_WORKING_TASKS,
    FETCH_TASK,
    FETCH_LOGS,
    FETCH_LOG_STATISTICS,
    FETCH_FAVORITES_TASKS
} from './types';

export const fetchUser = (id) => async (dispatch) => {
    const res = await axios.get('/api/current_user');

    dispatch({
        id: id,
        type: FETCH_USER,
        payload: res.data
    });
};

export const fetchTaskCategories = () => async (dispatch) => {
    const res = await axios.get('/api/task/categories');

    dispatch({
        type: FETCH_TASK_CATEGORIES,
        payload: res.data.reverse()
    });
};

export const submitTaskCategory = (category, actions) => async (dispatch) => {
    const res = await axios.post('/api/task/categories/new', category);

    if (res.status === 200 && res.statusText === 'OK') { 
        actions.setSubmitting(false);
        actions.resetForm();
    }

    dispatch({
        type: FETCH_TASK_CATEGORIES,
        payload: res.data.reverse()
    });
};

export const deleteTaskCategory = (deleteId) => async (dispatch) => {
    const res = await axios.post('/api/task/categories/delete', { deleteId });

    dispatch({
        type: FETCH_TASK_CATEGORIES,
        payload: res.data.reverse()
    });
};

export const deleteTask = (_task, history) => async (dispatch) => {
    const res = await axios.post('/api/task/delete', { _task });

    history.push('/');

    dispatch({
        type: FETCH_TASK_CATEGORIES,
        payload: res.data.reverse()
    });
};

export const submitTask = (task, progressEl, history, actions) => async (dispatch) => {
    const res = await axios.post('/api/task/new', task);
    
    if (res.status === 200 && res.statusText === 'OK') {
        progressEl.current.classList.add('hide');
        actions.setSubmitting(false);
        actions.resetForm();
    }

    history.push(`/task/view/${res.data.createdTask._id}`);

    dispatch({
        type: FETCH_TASKS,
        payload: res.data.list.reverse()
    });
};

export const fetchFavoritesTasks = (id) => async (dispatch) => {
    const res = await axios.get('/api/tasks/favorites');

    dispatch({
        id,
        type: FETCH_FAVORITES_TASKS,
        payload: res.data
    });
};

export const fetchTasksByCategory = (categoryId) => async (dispatch) => {
    const res = await axios.get('/api/tasks/category/' + categoryId);

    dispatch({
        id: categoryId,
        type: FETCH_TASKS_BY_CATEGORY,
        payload: res.data
    });
};

export const submitTaskLog = ({ _task, _category, button, _type, itemPerPage = 10, pageNumber = 1 }) => async (dispatch) => {
    const res = await axios.post('/api/log/new', { _task, _category, _type, itemPerPage, pageNumber });

    if (res.status === 200 && res.statusText === 'OK') {
        button.classList.remove('disabled');
    }

    const isSingleTask = _type === 'singleTask';

    dispatch({
        id: isSingleTask ? _task : _category,
        type: isSingleTask ? FETCH_LOGS : FETCH_TASKS_BY_CATEGORY,
        payload: isSingleTask ? res.data.data : res.data,
        count: isSingleTask ? res.data.count : 0
    });
};

export const fetchWorkingTask = (id) => async (dispatch) => {
    const res = await axios.get('/api/log/working');

    dispatch({
        id,
        type: FETCH_WORKING_TASKS,
        payload: res.data
    });
};

export const fetchTask = (id) => async (dispatch) => {
    const res = await axios.get('/api/task/' + id);

    dispatch({
        type: FETCH_TASK,
        payload: res.data
    });
};

export const submitTaskFavorite = (type, id) => async (dispatch) => {
    const res = await axios.post('/api/task/favorite/' + type + '/' + id);

    dispatch({
        type: FETCH_TASK,
        payload: res.data
    });
};

export const fetchLogs = (_task, itemPerPage = 10, pageNumber = 1) => async (dispatch) => {
    const res = await axios.get('/api/log/list/' + _task + '/' + itemPerPage + '/' + pageNumber);

    dispatch({
        id: _task,
        type: FETCH_LOGS,
        count: res.data.count,
        payload: res.data.data
    });
};

export const fetchLogStatistics = ({ _type = 'daily', _category = '', _task = '' }, id, itemPerPage = 10, pageNumber = 1) => async (dispatch) => {
    const res = await axios.get('/api/log/statistic', {
        params: { _type, _category, _task, itemPerPage, pageNumber }
    });

    dispatch({
        id,
        type: FETCH_LOG_STATISTICS,
        payload: res.data.data,
        count: res.data.count
    });
};