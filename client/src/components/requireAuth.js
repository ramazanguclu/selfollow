import React  from 'react';
import { connect } from 'react-redux';

import Loading from './Loading';
import Login from './Login';

export default (BaseComponent, id) => {
    const ComposedComponent  = props => {
        const auth = props.auth;

        return (
            <div>
                {id !== auth.id ? <Loading /> : id === auth.id && auth.data ? <BaseComponent {...props} /> : <Login />}
            </div>
        );
    };

    const mapStateToProps = ({ auth }) => {
        return { auth };
    };

    return connect(mapStateToProps)(ComposedComponent);
};
