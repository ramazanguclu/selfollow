import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';

import CollapsibleBody from './CollapsibleBody';
import Loading from '../Loading';
import Modal from '../Modal';

import M from 'materialize-css/dist/js/materialize.min.js';
const textDeleteCategory = 'All tasks and logs which belong this category will be deleted!';

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

        this.setState({ catId });

        this.props.fetchTasksByCategory(catId);
    }

    handleOpenCollapsible() {
        const elem = document.querySelector('.collapsible');

        M.Collapsible.init(elem, {
            onOpenStart: this.openStartCollapsible.bind(this)
        });
    }

    handleDeleteSubmit() {
        this.props.deleteTaskCategory(this.state.catId);
    }

    renderContent() {
        return this.props.taskCategories.map((v) => {
            const cond1 = v._id === this.state.catId;
            const cond2 = v._id === this.props.tasksByCategory.id;

            return (
                <li key={v._id} data={v._id} name={v.name}>
                    <div className="collapsible-header">
                        <div>{v.name}</div>
                    </div>
                    <div className="collapsible-body">
                        <div className="row">
                            <button data-target="modal1" className="btn modal-trigger">Delete This Category</button>
                        </div>
                        {
                            cond1 && cond2 ? <div className="row"><CollapsibleBody /></div> : cond1 ? <Loading /> : <div></div>
                        }
                    </div>
                </li>
            );
        });
    }

    render() {
        return (
            <div>
                <Modal modalId="modal1" agree={this.handleDeleteSubmit} text={textDeleteCategory} />
                <div className="divider"></div>
                <div className="section center-align">
                    <h4>Categories</h4>
                </div>
                <div className="divider"></div>
                <ul className="collapsible popout no-autoinit">
                    {this.renderContent()}
                </ul>
            </div>
        );
    }
}

function mapStateToProps({ taskCategories, tasksByCategory }) {
    return { taskCategories, tasksByCategory };
}

export default connect(mapStateToProps, actions)(ListCategory);