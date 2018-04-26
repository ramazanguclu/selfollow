import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { Link } from 'react-router-dom';
import _ from 'lodash';

import formFields from './formFields';
import WordField from './WordField';

class WordForm extends Component {
    renderFields() {
        return _.map(formFields, ({ label, name, type, isRequired, error }) => {
            let required = value => (isRequired && !value ? error : '');

            return <Field
                name={name}
                component={WordField}
                key={name}
                label={label}
                validate={required}
            >
            </Field>
        });
    }

    render() {
        return (
            <div>
                <form onSubmit={this.props.handleSubmit(this.props.onWordSubmit)}>
                    {this.renderFields()}
                    <Link to={'/dictionary/words/' + this.props.groupName + '/' + this.props.groupId} className="red btn-flat left white-text">CANCEL</Link>
                    <button type="submit" className="teal btn-flat right white-text">NEXT<i className="material-icons right">done</i></button>
                </form>
            </div>
        );
    }
}

export default reduxForm({
    form: 'wordForm',
    destroyOnUnmount: false
})(WordForm);
