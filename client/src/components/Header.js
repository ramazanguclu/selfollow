import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Header extends Component {
    renderContent() {
        switch (this.props.auth) {
            case null: return;
            case false: return <li><a href="/auth/google">Login With Google</a></li>;
            default: return <li><a href="/api/logout">Logout</a></li>
        }
    };

    render() {
        return (
            <div>
                <ul id="dropdown1" className="dropdown-content">
                    <li><a href="#!">one</a></li>
                    <li><a href="#!">two</a></li>
                    <li className="divider"></li>
                    <li><a href="#!">three</a></li>
                </ul>
                <nav className="teal lighten-2">
                    <div className="nav-wrapper">
                        <Link to={'/'} className="brand-logo right">Selfollow</Link>
                        <ul id="nav-mobile" className="left hide-on-med-and-down">
                            {this.renderContent()}
                            <li>
                                <a className="dropdown-trigger" href="#!" data-target="dropdown1">
                                    Dropdown
                                    <i className="material-icons right">arrow_drop_down</i>
                                </a>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
        );
    };
};

function mapStateToProps({ auth }) {
    return { auth };
}

export default connect(mapStateToProps)(Header);