import React from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { connect } from 'react-redux';

import * as actions from '../../actions';
import modifyName from '../../utils/modifyName';
import { ErrorSpan } from '../elements/Error';

const AddCategory = ({submitTaskCategory}) => {
    const handleSubmitForm = ({name}, actions) => {
        name = modifyName(name);
        submitTaskCategory({ name }, actions);
    };

    const CategoryNewSchema = Yup.object().shape({
        name: Yup.string()
            .trim()
            .matches(/^[a-zA-Z ]+$/, {
                message: 'Invalid Category Name',
                excludeEmptyString: true
            })
            .required('Category Name Required!')
    });

    const renderForm = ({handleChange, handleSubmit, isSubmitting, values, errors, touched}) => {
        return (
            <form onSubmit={handleSubmit}>
                <div className="input-field col s7">
                    <input value={values.name || ''} className="validate" id="cat_name_input" type="text" name="name" onChange={handleChange} />
                    <label htmlFor="cat_name_input">Add Task Category</label>
                    {errors.name && touched.name ? <ErrorSpan errorText={errors.name} /> : null}
                </div>

                <div className="col s5">
                    <button 
                        className="teal btn-floating btn-large right white-text" 
                        disabled={isSubmitting}
                        type="submit"
                    >
                        <i className="material-icons">add</i>
                    </button>
                </div>
            </form>
        );
    };

    return (
        <div className="section">
            <div className="row">
                <Formik
                    initialValues={{name: ''}}
                    validationSchema={CategoryNewSchema}
                    onSubmit={handleSubmitForm}
                    render={renderForm}
                >
                </Formik>
            </div>
        </div>
    );
    
};

export default connect(null, actions)(AddCategory);