import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import Loading from '../Loading';
import Pagination from '../Pagination';
import totalTimeHuman from '../../utils/totalTimeHuman';
import { withRouter } from 'react-router-dom';
import { startLog, detectState, datePretty } from '../../utils/viewHumanDate';
import { BackButton } from '../elements/Button';
import Favorite from './Favorite';
import Modal from '../Modal';

const textDeleteTask = 'All logs which belong this category will be deleted!';
const itemPerPage = 10;

class TaskView extends Component {
    constructor(props) {
        super(props);

        this.props.fetchLogs(this.props.match.params.id, itemPerPage);
        this.props.fetchTask(this.props.match.params.id);

        this.state = { currentPage: 1 };
    }

    handleStart(data, _type, e) {
        e.target.classList.add('disabled');
        e.preventDefault();

        const _task = data._id;
        const _category = data._category;
        const button = e.target;

        const pageNumber = this.state.currentPage;
        this.props.submitTaskLog({ _task, _category, button, _type, itemPerPage, pageNumber });
    }

    handleChangePage(currentPage) {
        this.setState({ currentPage });
        this.props.fetchLogs(this.props.match.params.id, itemPerPage, currentPage);
    }

    handleDeleteSubmit(_task) {
        this.props.deleteTask(_task, this.props.history);
    }

    contentLogs() {
        return this.props.taskLogs.data.map(v => {
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

    render() {
        const taskLog = this.props.taskLogs.data[0] || {};
        const task = taskLog._task || this.props.task;

        return (
            <div>
                {(!task || task._id !== this.props.match.params.id) ? <Loading /> :
                    <div className="card-panel blue-grey lighten-1 z-depth-2 white-text">
                        <div className="row"><button data-target="modal1" className="btn modal-trigger">Delete This Task</button></div>
                        <h1>{task.name}</h1>
                        <p className="flow-text">{task.description}</p>
                        <p>{'Total: ' + totalTimeHuman(task.total, 3)}</p>

                        <button
                            className="btn waves-effect waves-light"
                            onClick={this.handleStart.bind(this, task, 'singleTask')}
                        >
                            {detectState(task.state)}
                        </button>

                        <Favorite task={this.props.task} />
                    </div>
                }

                {this.renderLogs()}

                <Pagination
                    handleChangePage={this.handleChangePage.bind(this)}
                    count={this.props.taskLogs.count}
                    itemPerPage={itemPerPage}
                />

                <div className="input-field col s12 row"><BackButton label={'Back'} onClick={() => { this.props.history.goBack(); }} /></div>
                <Modal modalId="modal1" agree={this.handleDeleteSubmit.bind(this, task._id)} text={textDeleteTask} />
            </div>
        );
    }
}

function mapStateToProps({ task, taskLogs }) {
    return { task, taskLogs };
}

export default connect(mapStateToProps, actions)(withRouter(TaskView));