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

        this.state = { _type: 'daily', _category: '', filter: '_category' };
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

        this.props.fetchTasksByCategory(id);
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
        }, () => {
            console.log(this.state);
        });
    }

    handleFilter(e) {
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

    modifyTitle(cat, task) {
        return (cat ? 'Category: ' + cat : '') + '  ' + (task ? 'Task: ' + task : '');
    }

    handleSubmit(e) {
        e.preventDefault();

        if (!this.state._category) return;

        let catText = this.state._categoryText;
        let taskText = this.state._taskText;

        this.props.handleSubmit(this.modifyTitle(catText, taskText));
        this.props.fetchLogStatistics(this.state);
    }

    renderForm() {
        return (
            <div className="row">
                <form className="col s12">

                    <div className="input-field col s12">
                        <select name="_type" onChange={this.handleChange}>
                            {this.renderTypes()}
                        </select>
                        <label>Types</label>
                    </div>


                    <div className="input-field col s12">
                        <div className="divider"></div>
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
                        <button className="red btn-flat left white-text">
                            Clear
                            <i className="material-icons left">clear</i>
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