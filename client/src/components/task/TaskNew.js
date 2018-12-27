import React, { useRef, useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Formik } from 'formik';
import * as Yup from 'yup';

import * as actions from '../../actions';
import { BackButton, SubmitButtonSend } from '../elements/Button';
import Checkbox from '../elements/Checkbox';
import Select from '../elements/Select';
import { ErrorSpan } from '../elements/Error';

const TaskNew = (props) => {
    const progressEl = useRef(null);

    useEffect(() => {
        props.fetchTaskCategories();
    }, []);

    const handleSubmitForm = (formValues, actions) => {
        progressEl.current.classList.remove('hide');

        props.submitTask(formValues, progressEl, props.history, actions);
    };

    const handleBack = e => {
        e.preventDefault();
        props.history.goBack();
    };

    const TaskNewSchema = Yup.object().shape({
        name: Yup.string().trim().required('Name Required!'),
        description: Yup.string().trim().required('Description Required!'),
        _category: Yup.string().required('Category Required!')
    });

    const renderLoading = () => {
        return (
            <div className="col s12">
                <div ref={progressEl} className="progress hide">
                    <div className="indeterminate"></div>
                </div>
            </div>
        );
    };

    const renderForm = propsForm => {
        const {errors, touched, handleSubmit, isSubmitting, handleChange, values} = propsForm;
        
        return (
            <form onSubmit={handleSubmit}>
                <div className="input-field col s12">
                    <input 
                        value={values.name || ''}
                        className="validate" 
                        type="text" 
                        id="task_name" 
                        name="name" 
                        onChange={handleChange}
                    />
                    <label htmlFor="task_name">Task Name</label>
                    {errors.name && touched.name ? <ErrorSpan errorText={errors.name} /> : null}
                </div>

                <div className="input-field col s12">
                    <textarea
                        value={values.description || ''} 
                        id="task_desc" 
                        className="materialize-textarea" 
                        name="description" 
                        onChange={handleChange}>
                    </textarea>
                    <label htmlFor="task_desc">Task Description</label>
                    {errors.description && touched.description ? <ErrorSpan errorText={errors.description} /> : null}
                </div>

                <Select 
                    name={'_category'} 
                    onChange={handleChange} 
                    label={'Categories'} 
                    options={props.taskCategories}
                    defaultOptionLabel={'Choose Task Category'}
                    hasError={errors._category && touched._category}
                    errorText={errors._category}
                    value={values._category || ''}
                />

                <Checkbox 
                    name={'isFavorite'} 
                    onChange={handleChange} 
                    label={'Is Favorite'} 
                />

                <div className="input-field col s12 row margin-top-10">
                    <BackButton label={'Back'} onClick={handleBack} />
                    <SubmitButtonSend label={'Submit'} disabled={isSubmitting} />
                </div>

                {renderLoading()}            
            </form>
        );
    };

    
    return (
        <div className="section">
            <div className="row">
                <Formik
                    initialValues={{name: '', description:'', _category:''}}
                    validationSchema={TaskNewSchema}
                    onSubmit={handleSubmitForm}
                    render={renderForm}
                >
                </Formik>
            </div>
        </div>
    );
};

const mapStateToProps = ({ taskCategories }) => {
    return { taskCategories };
};

export default connect(mapStateToProps, actions)(withRouter(TaskNew));