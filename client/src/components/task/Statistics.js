import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import M from 'materialize-css/dist/js/materialize.min.js';
import totalTimeHuman from '../../utils/totalTimeHuman';
import Loading from '../Loading';

const statisticType = ['daily', 'monthly', 'yearly'];

class Statictics extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = { _category: '', _type: 'daily' };
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

    handleChange(e) {
        const name = e.target.name;
        const value = e.target.value;

        if ('_category' === name) {
            this.props.fetchTasksByCategory(value);
        }

        this.setState({
            [name]: value
        });
    }

    handleSubmit(e) {
        e.preventDefault();

        if (!this.state._category) {
            return;
        }

        this.props.fetchLogStatistics(this.state);
    }

    renderStatisticItem() {
        return this.props.logStatistics.data.map((v, k) => {
            return (
                <li key={k} className="collection-item">
                    <p className="title">{v._id.day + '-' + v._id.month + '-' + v._id.year}</p>
                    <p className="title">{totalTimeHuman(v.total, 3)}</p>

                </li>
            );
        });
    }

    renderStatistics() {
        return (
            <ul className="collection with-header">
                <li className="collection-header"><h4>First Names</h4></li>
                {this.renderStatisticItem()}
            </ul>
        );
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
                        <select name="_category" onChange={this.handleChange}>
                            <option value="" disabled>Choose Task Category</option>
                            {this.renderTaskCategories()}
                        </select>
                        <label>Categories</label>
                    </div>

                    <div className="input-field col s12">
                        <select name="_task" onChange={this.handleChange}>
                            <option value="" disabled>Choose Task By Category</option>
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

                    {this.renderStatistics()}

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

export default connect(mapStateToProps, actions)(withRouter(Statictics));