import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';

import Header from './Header';
import Main from './Main';
import Dictionary from './dictionary/Dictionary';
import DictionaryWords from './dictionary/DictionaryWords';
import WordNew from './dictionary/word/WordNew';
import WordUpdate from './dictionary/word/WordUpdate';

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
                        <Route exact path="/dictionary" component={Dictionary} />
                        <Route exact path="/dictionary/words/:groupName/:group_id" component={DictionaryWords} />
                        <Route exact path="/dictionary/words/:groupName/:group_id/new" component={WordNew} />
                        <Route exact path="/dictionary/words/:groupName/:group_id/update/:word_id" component={WordUpdate} />
                    </div>
                </BrowserRouter>
            </div>
        );
    }
}

export default connect(null, actions)(App);