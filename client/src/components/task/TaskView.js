import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import Loading from '../Loading';
import humanDate from 'human-date';
import totalTimeHuman from '../../utils/totalTimeHuman';
import { withRouter } from 'react-router-dom';

class TaskView extends Component {
    constructor(props) {
        super(props);

        this.props.fetchTask(this.props.match.params.id);
        this.props.fetchLogs(this.props.match.params.id);
    }

    datePretty(ms) {
        return !ms ? 'in progress' : humanDate.prettyPrint(new Date(ms), { showTime: true });
    }

    contentLogs() {
        return this.props.taskLogs.data.map(v => {
            return (
                <tr key={v._id}>
                    <td>{this.datePretty(v.start)}</td>
                    <td>{this.datePretty(v.end)}</td>
                    <td>{totalTimeHuman(v.duration, 3)}</td>
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
                    {this.props.taskLogs.id === this.props.task._id ?
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

    render() {
        const task = this.props.task;

        return (
            <div>
                {!task._id || task._id !== this.props.match.params.id ?
                    <Loading /> :
                    <div className="card-panel blue-grey lighten-1 z-depth-2 white-text">
                        <h1>{task.name}</h1>
                        <p className="flow-text">{task.description}</p>
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