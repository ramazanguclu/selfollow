import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import _ from 'lodash';

class ListCategory extends Component {
    constructor(props) {
        super(props);

        this.handleDeleteSubmit = this.handleDeleteSubmit.bind(this);
    }

    handleDeleteSubmit(e) {
        const id = e.target.previousSibling.getAttribute('data');
        this.props.deleteTaskCategory(id);
    }

    componentDidMount() {
        this.props.fetchTaskCategories();
    }

    renderContent() {
        return this.props.taskCategory.map((v, k) => {
            console.log(k)
            return (
                <li key={v._id}>
                    <div className="collapsible-header">
                        <div style={{ width: '100%' }}>{v.name}</div>
                        <a href="#" onClick={this.handleDeleteSubmit} className="secondary-content">
                            <input data={v._id} type="hidden" name="" />
                            <i className="material-icons">delete</i>
                        </a>
                    </div>
                    <div className="collapsible-body"></div>
                </li>
            );
        });
    }

    render() {
        return (
            <div className="test">
                <ul className="collapsible">
                    {this.renderContent()}
                </ul>
            </div>
        );
    }
}

function mapStateToProps({ taskCategory }) {
    return { taskCategory };
}

export default connect(mapStateToProps, actions)(ListCategory);