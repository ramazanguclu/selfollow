import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';

class DictionaryWords extends Component {
    componentDidMount() {
        this.props.fetchDictionaryWords(this.props.match.params.groupName, this.props.match.params.groupId);
    }

    renderWords() {
        return this.props.dictionaryWords.reverse().map((v) => {
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
                                <a href="#"><i className="material-icons">update</i></a>
                                <a href="#"><i className="material-icons">delete</i></a>
                            </div>
                        </div>
                    </div>
                </div>
            )
        });
    }

    render() {
        return (
            <div>
                {this.renderWords()}
            </div>
        )
    }
}

function mapStateToProps({ dictionaryWords }) {
    return { dictionaryWords };
}

export default connect(mapStateToProps, actions)(DictionaryWords);