import React, { Component } from 'react';

class Header extends Component {
    render() {
        return (
            <nav className="teal lighten-2">
                <div className="nav-wrapper">
                    <a href="#" className="brand-logo right">Logo</a>
                    <ul id="nav-mobile" className="left hide-on-med-and-down">
                        <li><a href="#">login With Google</a></li>
                    </ul>
                </div>
            </nav>
        );
    };
};

export default Header;