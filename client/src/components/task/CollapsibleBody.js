import React, { Component } from 'react';
import totalTimeHuman from '../../utils/totalTimeHuman';
import { Link } from 'react-router-dom';
import humanDate from 'human-date';

import { connect } from 'react-redux';
import * as actions from '../../actions';

class CollapsibleBody extends Component {
    constructor(props) {
        super(props);

        this.state = { _task: '' };
    }

    detectState(state) {
        return state === 'end' ? 'START' : 'STOP';
    }

    logStart(date) {
        return date ? humanDate.relativeTime(new Date(date)) : '00:00:00';
    }

    handleStart(_task, _category, e) {
        e.target.classList.add('disabled');
        this.setState({ _task });
        e.preventDefault();

        const button = e.target;

        this.props.submitTaskLog({ _task, _category, button });
    }

    renderEmptyCollapsibleBody() {
        return (
            <div className="col s12">
                There is no task for this category please &nbsp;
                <Link to="/task/new">create task</Link>
            </div>
        );
    }

    renderCollapsibleBody() {
        const state = this.state._task;
        const reducerTask = this.props.task;

        return this.props.tasksByCategory.data.map(v => {
            if (v._id === reducerTask._id && v._id === state) {
                v = reducerTask;
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
                            <div className="right white-text">{this.logStart(v.start)}</div>
                        </div>
                    </div>
                </div>
            );
        });
    }

    render() {
        return (
            <div>
                {this.props.tasksByCategory.data.length ?
                    this.renderCollapsibleBody() :
                    this.renderEmptyCollapsibleBody()
                }
            </div>
        );
    }
}

function mapStateToProps({ tasksByCategory, task }) {
    return { tasksByCategory, task };
}

export default connect(mapStateToProps, actions)(CollapsibleBody);

