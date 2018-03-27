import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Dropdown, Navbar } from 'react-materialize';
import '../style/custom.css';

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
                <Navbar className="teal lighten-2">
                    <Link to={'/'} className="brand-logo right">Selfollow</Link>
                    {this.renderContent()}
                    <li><Link to={'/dictionary'}>Dictionary</Link></li>
                </Navbar>
            </div>
        );
    };
};

function mapStateToProps({ auth }) {
    return { auth };
}

export default connect(mapStateToProps)(Header);