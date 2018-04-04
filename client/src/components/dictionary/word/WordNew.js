import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import _ from 'lodash';

import WordField from './WordField';
import formFields from './formFields';

class WordNew extends Component {
    constructor(props) {
        super(props);
        this.groupName = this.props.match.params.groupName;
        this.groupId = this.props.match.params.groupId;
    }

    renderFields() {
        return _.map(formFields, ({ name, label }) => {
            return <Field
                type="text"
                key={name}
                label={label}
                component={WordField}
                name={name}
            />
        });
    }

    render() {
        return (
            <div>
                <h1>{this.groupName}</h1>
                {this.renderFields()}
            </div>
        )
    }
}

export default reduxForm({
    form: 'WordNew'
})(WordNew);