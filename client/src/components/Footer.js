import React, { Component } from 'react';

class Footer extends Component {
    render() {
        return (
            <footer className="page-footer teal lighten-2">
                <div className="container">
                    <div className="row">
                        <div className="col l6 s12">
                            <p className="black-text text-lighten-4">by <b>ramazanguclu</b> follow me on <b><a href="https://github.com/ramazanguclu">github</a></b>.</p>
                        </div>
                    </div>

                    <div className="footer-copyright">
                        © {new Date().getFullYear()} Self Follow, All rights reserved.
                        <a className="white-text text-darken-1 right" href="https://github.com/ramazanguclu/selfollow/blob/master/LICENSE">MIT License</a>
                    </div>
                </div>

            </footer>
        );
    }
}

export default Footer;