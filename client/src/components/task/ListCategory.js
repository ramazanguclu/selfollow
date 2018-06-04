import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';

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

    handleStart(_task, _category, state, e) {
        e.target.classList.add('disabled');
        e.preventDefault();

        const button = e.target;

        this.props.submitTaskLog({ _task, _category, state, button });
    }

    detectState(state) {
        return state === 'end' ? 'START' : 'STOP';
    }

    detectNextState(state) {
        return state !== 'end' ? 'START' : 'STOP';
    }

    renderCollapsibleBody(id) {
        if (id === this.state.catId) {
            return this.props.tasksByCategory.map((v) => {
                return (
                    <div className="col s12 m6" key={v._id}>
                        <div className="card blue-grey darken-1">
                            <div className="card-content white-text">
                                <span className="card-title">
                                    {v.name}
                                </span>
                                <p>{v.description}</p>
                                <p>Total: {v.total}</p>
                            </div>
                            <div className="card-action">
                                <button className="btn waves-effect waves-light" onClick={this.handleStart.bind(this, v._id, v._category, this.detectNextState(v.state))}>
                                    {this.detectState(v.state)}
                                </button>
                                <div className="right white-text">00:00:00</div>
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
                        <a href="#" onClick={this.handleDeleteSubmit} className="secondary-content">
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
            <ul className="collapsible no-autoinit">
                {this.renderContent()}
            </ul>
        );
    }
}

function mapStateToProps({ taskCategories, tasksByCategory }) {
    return { taskCategories, tasksByCategory };
}

export default connect(mapStateToProps, actions)(ListCategory);