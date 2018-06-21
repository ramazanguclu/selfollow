import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../../actions';
import M from 'materialize-css/dist/js/materialize.min.js';

const statisticType = ['daily', 'monthly', 'yearly'];

class FilterStatisticForm extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleFilter = this.handleFilter.bind(this);
        this.handleBack = this.handleBack.bind(this);

        this.state = { _type: 'daily', _category: '', filter: '_category', logId: '' };
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

    renderTypes() {
        return statisticType.map((v) => {
            return (
                <option key={v} value={v}>{v}</option>
            );
        });
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

    renderTaskByCategories() {
        if (this.props.tasksByCategory.id !== this.state._category) {
            return;
        }

        return this.props.tasksByCategory.data.map((v) => {
            return (
                <option key={v._id} value={v._id}>{v.name}</option>
            );
        });
    }

    getTaskByCategory(id) {
        if (!id) {
            return;
        }

        this.setState({
            _task: ''
        });

        this.props.fetchTasksByCategory(id);
    }

    handleBack(e) {
        e.preventDefault();
        this.props.history.goBack();
    }

    handleChange(e) {
        const name = e.target.name;
        const value = e.target.value;

        if (name === '_category') {
            this.getTaskByCategory(value);
        }

        const text = e.target.options[e.target.selectedIndex]['text'];

        this.setState({
            [name]: value,
            [name + 'Text']: text
        });
    }

    handleFilter(e) {
        this.props.handleClear();
        const filter = e.target.getAttribute('data');

        if (filter === 'task') {
            this.setState({ filter: '_task' });
            this.getTaskByCategory(this.state._category);
            document.getElementById('_task_select').classList.remove('hide');
        } else {
            this.setState({ filter: '_category', _task: '' });
            document.querySelector('[name=_task]').selectedIndex = 0;
            document.getElementById('_task_select').classList.add('hide');
        }
    }

    handleSubmit(e) {
        let title = {};
        this.props.handleClear();

        e.preventDefault();

        if (!this.state._category) return;

        title['_category'] = this.state._categoryText;

        if (this.state.filter === '_task') {
            if (this.state._task) {
                title['_task'] = this.state._taskText;
            } else {
                return;
            }
        }

        const logId = this.state._category + this.state._task;
        this.props.handleSubmit(title, logId);
        this.props.fetchLogStatistics(this.state, logId);
    }

    renderForm() {
        return (
            <div className="row">
                <form className="col s12">

                    <div className="input-field col s12">
                        <p>
                            <label>
                                <input className="with-gap" name="filter" type="radio" data="category" defaultChecked onChange={this.handleFilter} />
                                <span>Filter By Category</span>
                            </label>
                        </p>
                        <p>
                            <label>
                                <input className="with-gap" name="filter" type="radio" data="task" onChange={this.handleFilter} />
                                <span>Filter By Task</span>
                            </label>
                        </p>
                        <div className="divider"></div>
                    </div>

                    <div className="input-field col s12">
                        <select name="_type" onChange={this.handleChange}>
                            {this.renderTypes()}
                        </select>
                        <label>Time Period</label>
                    </div>

                    <div className="input-field col s12">
                        <select name="_category" onChange={this.handleChange}>
                            <option value="" >Choose Task Category</option>
                            {this.renderTaskCategories()}
                        </select>
                        <label>Categories</label>
                    </div>

                    <div id="_task_select" className="input-field col s12 hide">
                        <select name="_task" onChange={this.handleChange}>
                            <option value="">Choose Task By Category</option>
                            {this.renderTaskByCategories()}
                        </select>
                        <label>Tasks</label>
                    </div>

                    <div className="input-field col s12">
                        <button className="red btn-flat left white-text" onClick={this.handleBack}>
                            Back
                            <i className="material-icons left">arrow_back</i>
                        </button>

                        <button className="btn waves-effect waves-light right" type="submit" onClick={this.handleSubmit}>
                            Statistics
                            <i className="material-icons right">done</i>
                        </button>
                    </div>

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

function mapStateToProps({ taskCategories, tasksByCategory, logStatistics }) {
    return { taskCategories, tasksByCategory, logStatistics };
}

export default connect(mapStateToProps, actions)(withRouter(FilterStatisticForm));