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
import Login from './Login';

import Restricted from './middlewares/Restricted';

import TaskNew from './task/TaskNew';

import M from 'materialize-css/dist/js/materialize.min.js';

class App extends Component {
    constructor(props) {
        super(props);
        this.props.fetchUser();
    }
 
    componentDidMount() {
        M.AutoInit();
    }

    render() {
        return (
            <div className="container">
                <BrowserRouter>
                    <div>
                        <Header />
                        <Route exact path="/login" component={Login} />

                        <Route exact path="/" component={Restricted(Main)} />
                        <Route exact path="/task/new" component={Restricted(TaskNew)} />

                        <Route exact path="/dictionary" component={Restricted(Dictionary)} />
                        <Route exact path="/dictionary/words/:groupName/:group_id" component={Restricted(DictionaryWords)} />
                        <Route exact path="/dictionary/words/:groupName/:group_id/new" component={Restricted(WordNew)} />
                        <Route exact path="/dictionary/words/:groupName/:group_id/update/:word_id" component={Restricted(WordUpdate)} />
                    </div>
                </BrowserRouter>
            </div>
        );
    }
}

function mapStateToProps({ auth }) {
    return { auth };
}

export default connect(mapStateToProps, actions)(App);