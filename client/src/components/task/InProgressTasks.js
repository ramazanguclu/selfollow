import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import * as actions from '../../actions';
import Loading from '../Loading';
import { BackButton } from '../elements/Button';

class InProgressTasks extends Component {
    constructor(props) {
        super(props);

        this.handleBack = this.handleBack.bind(this);
        const id = new Date().getTime();
        this.state = { id };
        this.props.fetchWorkingTask(id);
    }

    handleBack(e) {
        e.preventDefault();
        this.props.history.goBack();
    }

    renderTasks() {
        return this.props.workingTasks.data.map(({ _task }) => {
            return (
                <Link to={'/task/view/' + _task._id} key={_task._id} className="collection-item teal lighten-5">{_task.name}</Link>
            );
        });
    }

    render() {
        return (
            <div>
                <ul className="collection with-header">
                    <li className="collection-header teal lighten-3"><h4>In Progress Tasks</h4></li>
                    {this.props.workingTasks.id === this.state.id ? this.renderTasks() : <Loading />}
                </ul>

                <BackButton label={'Back'} onClick={this.handleBack} />
            </div>
        );
    }
}

function mapStateToProps({ workingTasks }) {
    return { workingTasks };
}

export default connect(mapStateToProps, actions)(withRouter(InProgressTasks));
