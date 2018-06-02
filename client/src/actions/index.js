import axios from 'axios';
import { FETCH_USER, FETCH_WORD_GROUPS, FETCH_DICTIONARY_WORDS, FETCH_TASK_CATEGORIES } from './types';

export const fetchUser = () => async (dispatch) => {
    const res = await axios.get('/api/current_user');

    dispatch({
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