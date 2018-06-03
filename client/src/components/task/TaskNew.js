import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as actions from '../../actions';
import M from 'materialize-css/dist/js/materialize.min.js';

class TaskNew extends Component {
    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleBack = this.handleBack.bind(this);
    }

    componentDidMount() {
        this.props.fetchTaskCategories();
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

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
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
                            <option value="" disabled selected>Choose Task Category</option>
                            {this.renderTaskCategories()}
                        </select>
                        <label>Categories</label>
                    </div>

                    <div className="col s12">
                        <button className="red btn-flat left white-text" onClick={this.handleBack}>
                            Back
                            <i className="material-icons left">arrow_back</i>
                        </button>

                        <button className="btn waves-effect waves-light right" type="submit" onClick={this.handleSubmit}>
                            Submit
                            <i className="material-icons right">send</i>
                        </button>
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