import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../../actions';
import M from 'materialize-css/dist/js/materialize.min.js';
import Select from '../../elements/Select';
import RadioButton from '../../elements/RadioButton';
import { BackButton, SubmitButton } from '../../elements/Button';

const statisticTimePeriod = ['daily', 'monthly', 'yearly'];
const formInputs = { type: '_type', category: '_category', task: '_task' };

class FilterStatisticForm extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleFilter = this.handleFilter.bind(this);
        this.handleBack = this.handleBack.bind(this);

        this.state = { [formInputs.type]: statisticTimePeriod[0], [formInputs.category]: '', filter: formInputs.category, logId: '' };
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

    getTaskByCategory(id) {
        if (!id) return;

        this.setState({ [formInputs.task]: '' });

        this.props.fetchTasksByCategory(id);
    }

    handleBack(e) {
        e.preventDefault();
        this.props.history.goBack();
    }

    handleChange(e) {
        const elem = e.target;
        const name = elem.name;
        const value = elem.value;

        if (name === formInputs.category) {
            this.getTaskByCategory(value);
        }

        this.setState({
            [name]: value,
            [name + 'Text']: elem.options[elem.selectedIndex]['text']
        });
    }

    handleFilter(e) {
        this.props.handleClear();
        const filter = e.target.getAttribute('data');
        const elemTaskSelect = document.querySelector('.tasks-container');

        this.setState({ filter });

        if (filter === formInputs.task) {
            this.getTaskByCategory(this.state[formInputs.category]);
            elemTaskSelect.classList.remove('hide');
        } else {
            this.setState({ [formInputs.task]: '' });

            elemTaskSelect.querySelector('select').selectedIndex = 0;
            elemTaskSelect.classList.add('hide');
        }
    }

    handleSubmit(e) {
        this.props.handleClear();

        e.preventDefault();

        if (!this.state[formInputs.category]) return;

        let title = {};
        title[formInputs.category] = this.state._categoryText;

        if (this.state.filter === formInputs.task) {
            if (this.state[formInputs.task])
                title[formInputs.task] = this.state._taskText;
            else return;
        }

        const logId = this.state[formInputs.category] + this.state[formInputs.task];
        this.props.handleSubmit(title, logId);
        this.props.fetchLogStatistics(this.state, logId);
    }

    getRadioButtonData() {
        return {
            onChange: this.handleFilter,
            name: 'filter',
            items: [
                { dataItem: formInputs.category, label: 'Filter By Category', defaultChecked: true },
                { dataItem: formInputs.task, label: 'Filter By Task', defaultChecked: false }
            ]
        };
    }

    renderOptions(items) {
        return items.map(v => {
            return (
                <option key={v._id || v} value={v._id || v}>{v.name || v}</option>
            );
        });
    }

    renderForm() {
        return (
            <div className="row">
                <form className="col s12">
                    <RadioButton data={this.getRadioButtonData()} />

                    <Select
                        name={formInputs.type}
                        onChange={this.handleChange}
                        label={'Time Period'}
                        options={this.renderOptions(statisticTimePeriod)}
                    />

                    <Select
                        name={formInputs.category}
                        onChange={this.handleChange}
                        label={'Categories'}
                        options={this.renderOptions(this.props.taskCategories)}
                        defaultOptionLabel={'Choose Task Category'}
                    />

                    <Select
                        name={formInputs.task}
                        onChange={this.handleChange}
                        label={'Tasks'}
                        options={this.props.tasksByCategory.id === this.state[formInputs.category] && this.renderOptions(this.props.tasksByCategory.data)}
                        defaultOptionLabel={'Choose Task By Category'}
                        hideClass={'hide'}
                        customClass={'tasks-container'}
                    />

                    <div className="input-field col s12">
                        <BackButton label={'Back'} onClick={this.handleBack} />
                        <SubmitButton label={'Statistics'} onClick={this.handleSubmit} />
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

function mapStateToProps({ taskCategories, tasksByCategory }) {
    return { taskCategories, tasksByCategory };
}

export default connect(mapStateToProps, actions)(withRouter(FilterStatisticForm));