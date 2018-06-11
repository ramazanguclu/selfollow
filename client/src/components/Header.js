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
                {this.renderContent()}
                <li><Link to={this.props.auth.data ? '/dictionary' : '/login'}>Dictionary</Link></li>
                <Link to={this.props.auth.data ? '/task/new' : '/login'} className="btn">Task Create</Link>
            </div>
        );
    }

    render() {
        return (
            <div>
                <nav className="teal lighten-2">
                    <div className="nav-wrapper">
                        <Link to={this.props.auth.data ? '/' : '/login'} className="brand-logo right">Selfollow</Link>
                        <a data-target="mobile-nav" className="sidenav-trigger">
                            <i className="material-icons">menu</i>
                        </a>
                        <ul className="left hide-on-med-and-down">
                            {this.listNavBar()}
                        </ul>
                    </div>
                </nav>

                <ul className="sidenav teal lighten-2" id="mobile-nav">
                    {this.listNavBar()}
                </ul>
            </div>
        );
    }
}

function mapStateToProps({ auth }) {
    return { auth };
}

export default connect(mapStateToProps)(Header);