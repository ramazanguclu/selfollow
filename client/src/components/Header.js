import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import M from 'materialize-css/dist/js/materialize.min.js';

class Header extends Component {
    renderContent() {
        switch (this.props.auth) {
            case null: return;
            case false: return <li><a href="/auth/google">Login With Google</a></li>;
            default: return <li><a href="/api/logout">Logout</a></li>;
        }
    }

    componentDidMount() {
        M.AutoInit();
    }

    render() {
        return (
            <div>
                <nav className="teal lighten-2">
                    <div className="nav-wrapper">
                        <Link to={'/'} className="brand-logo right">Selfollow</Link>
                        <a href="#" data-target="mobile-nav" className="sidenav-trigger">
                            <i className="material-icons">menu</i>
                        </a>
                        <ul className="left hide-on-med-and-down">
                            {this.renderContent()}
                            <li><Link to={this.props.auth ? '/dictionary' : '/'}>Dictionary</Link></li>
                            <li><button className="btn">Task Create</button></li>
                        </ul>
                    </div>
                </nav>

                <ul className="sidenav teal lighten-2" id="mobile-nav">
                    {this.renderContent()}
                    <li><Link to={this.props.auth ? '/dictionary' : '/'}>Dictionary</Link></li>
                    <li>
                        <span>
                            <button className="btn">Task Create</button>
                        </span>
                    </li>
                </ul>
            </div>
        );
    }
}

function mapStateToProps({ auth }) {
    return { auth };
}

export default connect(mapStateToProps)(Header);