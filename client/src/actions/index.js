import axios from 'axios';
import {
    FETCH_USER,
    FETCH_WORD_GROUPS,
    FETCH_DICTIONARY_WORDS,
    FETCH_TASK_CATEGORIES,
    FETCH_TASKS,
    FETCH_TASKS_BY_CATEGORY,
    FETCH_WORKING_TASKS,
    FETCH_TASK,
    FETCH_LOGS,
    FETCH_LOG_STATISTICS
} from './types';

export const fetchUser = (id) => async (dispatch) => {
    const res = await axios.get('/api/current_user');

    dispatch({
        id: id,
        type: FETCH_USER,
        payload: res.data
    });
};

export const submitWordGroup = (values, history) => async (dispatch) => {
    const res = await axios.post('/api/dictionary/groups', values);

    history.push('/dictionary');

    dispatch({
        type: FETCH_WORD_GROUPS,
        payload: res.data.reverse()
    });
};

export const fetchWordGroups = () => async (dispatch) => {
    const res = await axios.get('/api/dictionary/groups');

    dispatch({
        type: FETCH_WORD_GROUPS,
        payload: res.data.reverse()
    });
};

export const deleteWordGroup = (delete_id) => async (dispatch) => {
    const res = await axios.post('/api/dictionary/groups/delete', { delete_id });

    dispatch({
        type: FETCH_WORD_GROUPS,
        payload: res.data.reverse()
    });
};

export const fetchDictionaryWords = (groupName, groupId) => async (dispatch) => {
    const res = await axios.get('/api/dictionary/words/' + groupName + '/' + groupId);

    dispatch({
        type: FETCH_DICTIONARY_WORDS,
        payload: res.data.reverse()
    });
};

export const submitDictionaryWord = (word, history) => async (dispatch) => {
    const res = await axios.post('/api/dictionary/words/new', word);

    history.push('/dictionary/words/' + word.groupName + '/' + word.group_id);

    dispatch({
        type: FETCH_DICTIONARY_WORDS,
        payload: res.data.reverse()
    });
};

export const deleteDictionaryWord = (deleteId, group_id) => async (dispatch) => {
    const res = await axios.post('/api/dictionary/words/delete', { deleteId, group_id });

    dispatch({
        type: FETCH_DICTIONARY_WORDS,
        payload: res.data.reverse()
    });
};

export const updateDictionaryWord = (word, history) => async (dispatch) => {
    const res = await axios.post('/api/dictionary/words/update', word);

    history.push('/dictionary/words/' + word.groupName + '/' + word.group_id);

    dispatch({
        type: FETCH_DICTIONARY_WORDS,
        payload: res.data.reverse()
    });
};

export const fetchTaskCategories = () => async (dispatch) => {
    const res = await axios.get('/api/task/categories');

    dispatch({
        type: FETCH_TASK_CATEGORIES,
        payload: res.data.reverse()
    });
};

export const submitTaskCategory = (category) => async (dispatch) => {
    const res = await axios.post('/api/task/categories/new', category);

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

export const submitTask = (task, button) => async (dispatch) => {
    const res = await axios.post('/api/task/new', task);

    if (res.status === 200 && res.statusText === 'OK') {
        button.classList.remove('disabled');
        document.querySelector('.progress').classList.add('hide');
    }

    dispatch({
        type: FETCH_TASKS,
        payload: res.data.reverse()
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

export const submitTaskLog = ({ _task, _category, button, _type }) => async (dispatch) => {
    const res = await axios.post('/api/log/new', { _task, _category, _type });

    if (res.status === 200 && res.statusText === 'OK') {
        button.classList.remove('disabled');
    }

    const id = (_type !== 'singleTask') ? _category : _task;
    const type = (_type !== 'singleTask') ? FETCH_TASKS_BY_CATEGORY : FETCH_LOGS;

    dispatch({
        id,
        type,
        payload: res.data
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

export const fetchLogs = (taskId) => async (dispatch) => {
    const res = await axios.get('/api/log/list/' + taskId);

    dispatch({
        id: taskId,
        type: FETCH_LOGS,
        payload: res.data
    });
};

export const fetchLogStatistics = ({ _type, _category, _task = '' }, id) => async (dispatch) => {
    const res = await axios.get('/api/log/statistic/' + _type + '?catId=' + _category + '&taskId=' + _task);

    dispatch({
        id,
        type: FETCH_LOG_STATISTICS,
        payload: res.data
    });
};