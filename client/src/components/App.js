import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';

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

import requireAuth from './requireAuth';

import M from 'materialize-css/dist/js/materialize.min.js';
import '../styles/custom.css';

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
            <div>
                <Header />
                <main className="container">
                    <Switch>
                        <Route exact path="/login" component={Login} />

                        <Route exact path="/" component={requireAuth(Main, id)} />
                        <Route exact path="/task/new" component={requireAuth(TaskNew, id)} />
                        <Route exact path="/task/view/:id" component={requireAuth(TaskView, id)} />
                        <Route exact path="/task/statistics" component={requireAuth(Statistics, id)} />
                        <Route exact path="/task/inprogress" component={requireAuth(InProgressTasks, id)} />
                        <Route exact path="/task/favorites" component={requireAuth(FavoritesTasks, id)} />

                        <Route component={NotFound} />
                    </Switch>
                </main>
                <Footer />
            </div>
        );
    }
}

function mapStateToProps({ auth }) {
    return { auth };
}

export default connect(mapStateToProps, actions)(App);