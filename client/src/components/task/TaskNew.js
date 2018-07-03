import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as actions from '../../actions';
import M from 'materialize-css/dist/js/materialize.min.js';

import modifyName from '../../utils/modifyName';
import taskFormField from './taskFormField';
import { BackButton, SubmitButtonSend } from '../elements/Button';
import Checkbox from '../elements/Checkbox';

class TaskNew extends Component {
    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleBack = this.handleBack.bind(this);

        this.state = {};
    }

    componentWillMount() {
        this.props.fetchTaskCategories();
    }

    componentDidMount() {
        M.AutoInit();
    }

    componentDidUpdate() {
        M.AutoInit();
    }

    renderTaskCategories() {
        return (
            this.props.taskCategories.map(v => {
                return (
                    <option key={v._id} value={v._id}>{v.name}</option>
                );
            })
        );
    }

    renderLoading() {
        return (
            <div className="col s12">
                <div className="progress hide">
                    <div className="indeterminate"></div>
                </div>
            </div>
        );
    }

    handleSubmit(e) {
        e.preventDefault();
        e.target.classList.add('disabled');
        document.querySelector('.progress').classList.remove('hide');

        this.props.submitTask(this.state, e.target);
    }

    error() {
        const button = document.querySelector('button[type=submit]');

        for (const v of taskFormField) {
            const val = this.state[v.key];

            if (!val) {
                button.classList.add('disabled');
                break;
            } else {
                button.classList.remove('disabled');
            }
        }
    }

    handleChange(e) {
        const val = e.target.type === 'checkbox' ? e.target.checked : modifyName(e.target.value);
        this.setState({
            [e.target.name]: val
        }, this.error);
    }

    handleBack(e) {
        e.preventDefault();
        this.props.history.goBack();
    }

    renderForm() {
        return (
            <div className="row">
                <form className="col s12">

                    <div className="input-field col s12">
                        <input className="validate" type="text" id="task_name" name="name" onChange={this.handleChange} />
                        <label htmlFor="task_name">Task Name</label>
                    </div>

                    <div className="input-field col s12">
                        <textarea id="task_desc" className="materialize-textarea" name="description" onChange={this.handleChange}></textarea>
                        <label htmlFor="task_desc">Task Description</label>
                    </div>

                    <div className="input-field col s12">
                        <select name="_category" onChange={this.handleChange}>
                            <option value="" disabled>Choose Task Category</option>
                            {this.renderTaskCategories()}
                        </select>
                        <label>Categories</label>
                    </div>

                    <Checkbox name={'isFavorite'} onChange={this.handleChange} label={'Is Favorite'} />

                    <div className="input-field col s12 row margin-top-10">
                        <BackButton label={'Back'} onClick={this.handleBack} />
                        <SubmitButtonSend label={'Submit'} onClick={this.handleSubmit} />
                    </div>

                    {this.renderLoading()}
                </form>
            </div>
        );
    }

    render() {
        return (
            <div className="section">
                {this.renderForm()}
            </div>
        );
    }
}

function mapStateToProps({ taskCategories }) {
    return { taskCategories };
}

export default connect(mapStateToProps, actions)(withRouter(TaskNew));