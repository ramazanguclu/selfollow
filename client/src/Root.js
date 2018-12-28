import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import reducers from 'reducers';

export default ({ children, initialState = {} }) => {
    const store = createStore(
        reducers,
        initialState,
        applyMiddleware(reduxThunk)
    );

    return <Provider store={store}>{children}</Provider>;
};