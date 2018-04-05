import React, { Component } from 'react';
import _ from 'lodash';
import * as actions from '../../../actions';
import { connect } from 'react-redux';

import WordField from './WordField';
import formFields from './formFields';

class WordNew extends Component {
    constructor(props) {
        super(props);
        this.groupName = this.props.match.params.groupName;
        this.groupId = this.props.match.params.groupId;
    }

    renderFields() {
        return _.map(formFields, ({ name, label, type }) => {
            return <WordField key={name} label={label} inputName={name} inputType={type} inputValue={name === '_group' ? this.groupId : ''} />
        });
    }

    render() {
        return (
            <div>
                <form>
                    <h1>{this.groupName}</h1>
                    {this.renderFields()}

                    <button type="submit" className="teal btn-flat right white-text">
                        ADD
                        <i className="material-icons right">done</i>
                    </button>
                </form>
            </div>
        )
    }
}

export default connect(null, actions)(WordNew);