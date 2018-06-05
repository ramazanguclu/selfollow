import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import { Link } from 'react-router-dom';
import totalTimeHuman from '../../utils/totalTimeHuman';
import humanDate  from 'human-date';

import M from 'materialize-css/dist/js/materialize.min.js';

class ListCategory extends Component {
    constructor(props) {
        super(props);

        this.handleDeleteSubmit = this.handleDeleteSubmit.bind(this);
        this.state = { catId: '' };
    }

    handleDeleteSubmit(e) {
        const id = e.target.previousSibling.getAttribute('data');
        this.props.deleteTaskCategory(id);
    }

    componentDidMount() {
        this.props.fetchTaskCategories();
        this.props.fetchWorkingTask();
        this.handleOpenCollapsible();
    }

    openStartCollapsible(item) {
        const catId = item.getAttribute('data');
        const catName = item.getAttribute('name');

        this.props.fetchTasksByCategory(catName, catId);

        this.setState({ catId });
    }

    handleOpenCollapsible() {
        const elem = document.querySelector('.collapsible');

        M.Collapsible.init(elem, {
            onOpenStart: this.openStartCollapsible.bind(this)
        });
    }

    handleStart(_task, _category, e) {
        e.target.classList.add('disabled');
        e.preventDefault();

        const button = e.target;

        this.props.submitTaskLog({ _task, _category, button });
        this.props.fetchWorkingTask();
    }

    detectState(state) {
        return state === 'end' ? 'START' : 'STOP';
    }

    workingTask(id) {
        const match = this.props.workingTasks.filter(v => { return v._task === id; })[0];
        
        if (!match) {
            return '00:00:00';
        }

        return humanDate.relativeTime(new Date(match));
    }

    renderCollapsibleBody(id) {
        if (id === this.state.catId) {
            if (this.props.tasksByCategory.length === 0) {
                return (
                    <div className="col s12">
                        There is no task for this category please &nbsp;
                        <Link to="/task/new">
                            create task
                        </Link>
                    </div>
                );
            }

            return this.props.tasksByCategory.map((v) => {
                if (this.props.task._id === v._id) {
                    v = this.props.task;
                }

                return (
                    <div className="col s12 m6" key={v._id}>
                        <div className="card blue-grey darken-1">
                            <div className="card-content white-text">
                                <span className="card-title">
                                    {v.name}
                                </span>
                                <p>{v.description}</p>
                                <p>Total: {totalTimeHuman(v.total, 3)}</p>
                            </div>
                            <div className="card-action">
                                <button className="btn waves-effect waves-light" onClick={this.handleStart.bind(this, v._id, v._category)}>
                                    {this.detectState(v.state)}
                                </button>
                                <div className="right white-text">{this.workingTask(v._id)}</div>
                            </div>
                        </div>
                    </div>
                );
            });
        }

        return;
    }

    renderContent() {
        return this.props.taskCategories.map((v) => {
            return (
                <li key={v._id} data={v._id} name={v.name}>
                    <div className="collapsible-header">
                        <div style={{ width: '100%' }}>{v.name}</div>
                        <a onClick={this.handleDeleteSubmit} className="secondary-content">
                            <input data={v._id} type="hidden" />
                            <i className="material-icons">delete</i>
                        </a>
                    </div>
                    <div className="collapsible-body">
                        <div className="row">
                            {this.renderCollapsibleBody(v._id)}
                        </div>
                    </div>
                </li>
            );
        });
    }

    render() {
        return (
            <ul className="collapsible popout no-autoinit">
                {this.renderContent()}
            </ul>
        );
    }
}

function mapStateToProps({ taskCategories, tasksByCategory, task, workingTasks }) {
    return { taskCategories, tasksByCategory, task, workingTasks };
}

export default connect(mapStateToProps, actions)(ListCategory);