import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';

export default (BaseComponent) => {
    class Restricted extends Component {
        componentWillMount() {
            this.authenticationCheck(this.props);
        }

        componentWillReceiveProps(nextProps) {
            if (nextProps.location !== this.props.location)
                this.authenticationCheck(nextProps);
        }

        authenticationCheck(props) {
            if (!this.props.auth) {
                props.history.push('/login');
            }
        }

        render() {
            return <BaseComponent {...this.props} />;
        }
    }

    function mapStateToProps({ auth }) {
        return { auth };
    }

    return connect(mapStateToProps, actions)(Restricted);
};
