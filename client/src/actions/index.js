import axios from 'axios';
import { FETCH_USER, FETCH_WORD_GROUPS } from './types';

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
        type: FETCH_USER,
        payload: res.data
    });
}

export const fetchWordGroups = () => async (dispatch) => {
    const res = await axios.get('/api/dictionary/groups');

    dispatch({
        type: FETCH_WORD_GROUPS,
        payload: res.data
    });
}