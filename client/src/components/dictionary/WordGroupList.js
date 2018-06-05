import React, { Component } from 'react';
import * as actions from '../../actions';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class WordGroupList extends Component {
    componentDidMount() {
        this.props.fetchWordGroups();
    }

    deleteGroup(id) {
        this.props.deleteWordGroup(id);
    }

    renderWordGroups() {
        return this.props.wordGroup.map((group) => {
            return (
                <li key={group._id} className="collection-item">
                    <div>
                        <Link to={'dictionary/words/' + group.name + '/' + group._id}>{group.name}</Link>
                        <a
                            onClick={(e) => {
                                e.preventDefault();
                                this.deleteGroup(group._id);
                            }}
                            className="secondary-content"
                        >
                            <i className="material-icons">delete</i>
                        </a>
                    </div>
                </li>
            );
        });
    }

    render() {
        return (
            <div className="row">
                <ul className="collection with-header">
                    <li className="collection-header"><h4>Word Groups</h4></li>
                    {this.renderWordGroups()}
                </ul>
            </div>
        );
    }
}

function mapStateToProps({ wordGroup }) {
    return { wordGroup };
}

export default connect(mapStateToProps, actions)(WordGroupList);