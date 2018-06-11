import React, { Component } from 'react';
import { connect } from 'react-redux';

class Login extends Component {
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
                <div className="divider"></div>
                <div className="section valign-wrapper">
                    <div className="row">
                        <a href="/auth/google">Login With Google</a>
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