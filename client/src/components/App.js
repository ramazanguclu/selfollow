import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';

import Header from './Header';
import Main from './Main';
import Dictionary from './dictionary/Dictionary';

class App extends Component {
    componentDidMount() {
        this.props.fetchUser();
    }

    render() {
        return (
            <div className="container">
                <BrowserRouter>
                    <div>
                        <Header />
                        <Route exact path="/" component={Main} />
                        <Route exact path="/dictionary" component={Dictionary}/>
                    </div>
                </BrowserRouter>
            </div>
        )
    }
};

export default connect(null, actions)(App);