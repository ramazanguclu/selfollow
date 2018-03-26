import 'materialize-css/dist/css/materialize.min.css';
import React, { Component } from 'react';

import Header from './Header';

class App extends Component {
    render() {
        return (
            <div className="container">
                <div>
                    <Header />
                </div>
            </div>
        )
    }
};

export default App;