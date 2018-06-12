import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Header extends Component {
    renderContent() {
        if (this.props.auth.data) return <li><a href="/api/logout">Logout</a></li>;

        return <li><a href="/auth/google">Login With Google</a></li>;
    }

    listNavBar() {
        return (
            <div>
                <li><Link to={this.props.auth.data ? '/task/new' : '/login'} className="btn">Task Create</Link></li>
                {this.renderContent()}
            </div>
        );
    }

    render() {
        return (
            <div>
                <nav className="teal lighten-2">
                    <div className="nav-wrapper container">
                        <Link to={this.props.auth.data ? '/' : '/login'} className="brand-logo">Selfollow</Link>
                        <ul className="right hide-on-med-and-down">
                            {this.listNavBar()}
                        </ul>
                        <ul className="sidenav" id="nav-mobile">
                            {this.listNavBar()}
                        </ul>
                        <a href="" data-target="nav-mobile" className="sidenav-trigger">
                            <i className="material-icons">menu</i>
                        </a>
                    </div>
                </nav>
            </div>
        );
    }
}

function mapStateToProps({ auth }) {
    return { auth };
}

export default connect(mapStateToProps)(Header);