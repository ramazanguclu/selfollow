import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';

import CollapsibleBody from './CollapsibleBody';
import Loading from '../Loading';

import M from 'materialize-css/dist/js/materialize.min.js';

class ListCategory extends Component {
    constructor(props) {
        super(props);

        this.handleDeleteSubmit = this.handleDeleteSubmit.bind(this);
        this.state = { catId: '' };
    }

    componentWillMount() {
        this.props.fetchTaskCategories();
    }

    componentDidMount() {
        this.handleOpenCollapsible();
    }

    openStartCollapsible(item) {
        const catId = item.getAttribute('data');
        const catName = item.getAttribute('name');

        this.setState({ catId });

        this.props.fetchTasksByCategory(catName, catId);
    }

    handleOpenCollapsible() {
        const elem = document.querySelector('.collapsible');

        M.Collapsible.init(elem, {
            onOpenStart: this.openStartCollapsible.bind(this)
        });
    }

    handleDeleteSubmit(e) {
        const id = e.target.previousSibling.getAttribute('data');
        this.props.deleteTaskCategory(id);
    }

    renderContent() {
        return this.props.taskCategories.map((v) => {
            const cond1 = v._id === this.state.catId;
            const cond2 = v._id === this.props.tasksByCategory.id;

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
                        {
                            cond1 && cond2 ?
                                <div className="row"><CollapsibleBody /></div>
                                : cond1 ? <Loading /> : <div></div>
                        }
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

function mapStateToProps({ taskCategories, tasksByCategory }) {
    return { taskCategories, tasksByCategory };
}

export default connect(mapStateToProps, actions)(ListCategory);