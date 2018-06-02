import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import { Link } from 'react-router-dom';

class DictionaryWords extends Component {
    constructor(props) {
        super(props);

        this.groupName = this.props.match.params.groupName;
        this.groupId = this.props.match.params.group_id;
    }

    componentDidMount() {
        this.props.fetchDictionaryWords(this.groupName, this.groupId);
    }

    deleteWordItem(id, e) {
        this.props.deleteDictionaryWord(id, this.groupId);
        e.preventDefault();
    }

    renderWords() {
        return this.props.dictionaryWords.map((v) => {
            return (
                <div key={v._id} className="row">
                    <div className="col s12">
                        <div className="card blue-grey darken-1">
                            <div className="card-content white-text">
                                <span className="card-title">{v.word}</span>
                                <p>{v.synonym}</p>
                                <p>{v.description}</p>
                                <p>{v.example}</p>
                            </div>
                            <div className="card-action">
                                <Link
                                    to={{ pathname: '/dictionary/words/' + this.groupName + '/' + this.groupId + '/update/' + v._id, query: { data: v } }}
                                >
                                    <i className="material-icons">update</i>
                                </Link>
                                <a onClick={(e) => this.deleteWordItem(v._id, e)} href="/"><i className="material-icons">delete</i></a>
                            </div>
                        </div>
                    </div>
                </div>
            );
        });
    }

    render() {
        return (
            <div>
                {this.renderWords()}
                <div className="fixed-action-btn">
                    <Link to={'/dictionary/words/' + this.groupName + '/' + this.groupId + '/new'} className="btn-floating btn-large teal">
                        <i className="large material-icons">add</i>
                    </Link>
                </div>
            </div>
        );
    }
}

function mapStateToProps({ dictionaryWords }) {
    return { dictionaryWords };
}

export default connect(mapStateToProps, actions)(DictionaryWords);