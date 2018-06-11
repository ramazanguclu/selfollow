import React, { Component } from 'react';
import { connect } from 'react-redux';

import Loading from '../Loading';
import Login from '../Login';

export default (BaseComponent, id) => {
    class Restricted extends Component {
        render() {
            const auth = this.props.auth;

            return (
                <div>
                    {
                        id !== auth.id ? <Loading /> : id === auth.id && auth.data ? <BaseComponent {...this.props} /> : <Login />
                    }
                </div>
            );
        }
    }

    function mapStateToProps({ auth }) {
        return { auth };
    }

    return connect(mapStateToProps)(Restricted);
};
