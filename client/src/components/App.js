import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';

import Dictionary from './dictionary/Dictionary';
import DictionaryWords from './dictionary/DictionaryWords';
import WordNew from './dictionary/word/WordNew';
import WordUpdate from './dictionary/word/WordUpdate';

import Header from './Header';
import Footer from './Footer';
import Main from './Main';

import TaskNew from './task/TaskNew';
import TaskView from './task/TaskView';
import Statistics from './task/logStatistic/Statistic';
import InProgressTasks from './task/InProgressTasks';
import FavoritesTasks from './task/FavoritesTasks';
import Login from './Login';
import NotFound from './NotFound';

import Restricted from './middlewares/Restricted';

import M from 'materialize-css/dist/js/materialize.min.js';

class App extends Component {
    constructor(props) {
        super(props);

        const id = new Date().getTime();

        this.state = { id };
        this.props.fetchUser(id);
    }

    componentDidMount() {
        M.AutoInit();
    }

    render() {
        const id = this.state.id;

        return (
            <BrowserRouter>
                <div>
                    <Header />
                    <main className="container">
                        <Switch>
                            <Route exact path="/login" component={Login} />

                            <Route exact path="/" component={Restricted(Main, id)} />
                            <Route exact path="/task/new" component={Restricted(TaskNew, id)} />
                            <Route exact path="/task/view/:id" component={Restricted(TaskView, id)} />
                            <Route exact path="/task/statistics" component={Restricted(Statistics, id)} />
                            <Route exact path="/task/inprogress" component={Restricted(InProgressTasks, id)} />
                            <Route exact path="/task/favorites" component={Restricted(FavoritesTasks, id)} />

                            <Route exact path="/dictionary" component={Restricted(Dictionary, id)} />
                            <Route exact path="/dictionary/words/:groupName/:group_id" component={Restricted(DictionaryWords, id)} />
                            <Route exact path="/dictionary/words/:groupName/:group_id/new" component={Restricted(WordNew, id)} />
                            <Route exact path="/dictionary/words/:groupName/:group_id/update/:word_id" component={Restricted(WordUpdate, id)} />

                            <Route component={NotFound} />
                        </Switch>
                    </main>
                    <Footer />
                </div>
            </BrowserRouter>
        );
    }
}

function mapStateToProps({ auth }) {
    return { auth };
}

export default connect(mapStateToProps, actions)(App);