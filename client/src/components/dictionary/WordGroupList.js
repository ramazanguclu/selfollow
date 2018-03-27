import React, { Component } from 'react';
import * as actions from '../../actions';
import { connect } from 'react-redux';

class WordGroupList extends Component {
    componentDidMount() {
        this.props.fetchWordGroups();
    }

    renderWordGroups() {
        return this.props.wordGroup.reverse().map((group) => {
            return (
                <li key={group._id} className="collection-item">
                    <div>
                        <a href="#!">{group.name}</a>
                        <a href="#!" className="secondary-content">
                            <i className="material-icons">delete</i>
                        </a>
                    </div>
                </li>
            )
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
        )
    }
}

function mapStateToProps({ wordGroup }) {
    return { wordGroup };
}

export default connect(mapStateToProps, actions)(WordGroupList);