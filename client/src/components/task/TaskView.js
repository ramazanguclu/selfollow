import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import Loading from '../Loading';
import totalTimeHuman from '../../utils/totalTimeHuman';
import { withRouter } from 'react-router-dom';
import { startLog, detectState, datePretty } from '../../utils/viewHumanDate';

class TaskView extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.handleFavorite = this.handleFavorite.bind(this);
    }

    componentDidMount() {
        this.props.fetchTask(this.props.match.params.id);
        this.props.fetchLogs(this.props.match.params.id);
    }

    handleStart(data, _type, e) {
        e.target.classList.add('disabled');
        e.preventDefault();

        const _task = data._id;
        const _category = data._category;
        const button = e.target;

        this.props.submitTaskLog({ _task, _category, button, _type });
        this.props.fetchTask(this.props.match.params.id);
    }

    contentLogs() {
        return this.props.taskLogs.data.reverse().map(v => {
            return (
                <tr key={v._id}>
                    <td>{datePretty(v.startDate)}</td>
                    <td>{datePretty(v.endDate)}</td>
                    <td>{totalTimeHuman(v.duration, 3) || startLog(v.startDate)}</td>
                </tr>
            );
        });
    }

    renderLogs() {
        return (
            <table className="striped centered responsive-table teal lighten-4 z-depth-2">
                <thead>
                    <tr>
                        <th>Start</th>
                        <th>Stop</th>
                        <th>Duration</th>
                    </tr>
                </thead>
                <tbody>
                    {this.props.taskLogs.id === this.props.match.params.id ?
                        this.contentLogs() :
                        <tr>
                            <th><Loading /></th>
                            <th><Loading /></th>
                            <th><Loading /></th>
                        </tr>
                    }
                </tbody>
            </table>
        );
    }

    favorite(isFavorite) {
        return isFavorite ? 'green' : 'red';
    }

    handleFavorite(e) {
        e.preventDefault();

        e.target.parentElement.classList.add('disabled');
        const type = this.props.task.isFavorite ? 'delete' : 'add';
        this.props.submitTaskFavorite(type, this.props.task._id);
    }

    render() {
        const taskLog = this.props.taskLogs.data[0];
        const task = taskLog ? taskLog['_task'] : this.props.task;
        //TODO
        return (
            <div>
                {!task._id || task._id !== this.props.match.params.id ?
                    <Loading /> :
                    <div className="card-panel blue-grey lighten-1 z-depth-2 white-text">
                        <h1>{task.name}</h1>
                        <p className="flow-text">{task.description}</p>
                        <p>{'Total: ' + totalTimeHuman(task.total, 3)}</p>
                        <button className="btn waves-effect waves-light" onClick={this.handleStart.bind(this, task, 'singleTask')}>{detectState(task.state)}</button>
                        <button
                            className={this.favorite(task.isFavorite, task._id) + ' btn-floating btn-large right white-text'}
                            onClick={this.handleFavorite}
                        >
                            <i className="material-icons">favorite_border</i>
                        </button>
                    </div>
                }

                {this.renderLogs()}
                <div className="row">
                    <div className="input-field col s12">
                        <button
                            className="red btn-flat left white-text"
                            onClick={() => { this.props.history.goBack(); }}
                        >
                            Back
                            <i className="material-icons left">arrow_back</i>
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps({ task, taskLogs }) {
    return { task, taskLogs };
}

export default connect(mapStateToProps, actions)(withRouter(TaskView));