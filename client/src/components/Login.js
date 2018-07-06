import React, { Component } from 'react';
import { connect } from 'react-redux';

class Login extends Component {
    componentDidMount() {
        this.checkLogin();
    }

    componentDidUpdate() {
        this.checkLogin();
    }

    checkLogin() {
        if (this.props.auth.data) {
            this.props.history.push('/');
        }
    }

    render() {
        return (
            <div>
                <div className="section valign-wrapper">
                    <div className="row">
                        <a href="/auth/google" className="login-btn login-btn--google">Login with Google</a>
                    </div>
                </div>
                <div className="divider"></div>
            </div>
        );
    }
}

function mapStateToProps({ auth }) {
    return { auth };
}

export default connect(mapStateToProps)(Login);