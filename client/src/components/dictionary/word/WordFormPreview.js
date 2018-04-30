import React  from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as actions from '../../../actions';
import _ from 'lodash';

import formFields from './formFields';

const WordFormReview = ({ formValues, onCancel, history, submitDictionaryWord, match }) => {
    const reviewFields = _.map(formFields, ({ name, label, type }) => {
        formValues = Object.assign({}, formValues, match.params);

        return (
            <div key={name}>
                <label>{label}</label>
                <div>{formValues[name]}</div>
            </div>
        )
    });

    return (
        <div>
            {reviewFields}

            <button className="yellow darken-3 white-text btn-flat" onClick={onCancel}>Back</button>
            <button className="green white-text right btn-flat" onClick={() => submitDictionaryWord(formValues, history)}>
                Save Word
                <i className="material-icons right">add</i>
            </button>
        </div>
    )
}

function mapStateToProps(state) {
    return { formValues: state.form.wordForm.values }
}

export default connect(mapStateToProps, actions)(withRouter(WordFormReview));