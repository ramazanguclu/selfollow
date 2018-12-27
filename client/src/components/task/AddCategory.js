import React, { Component } from 'react';
import * as actions from '../../actions';
import { connect } from 'react-redux';

import validateName from '../../utils/validateName';
import modifyName from '../../utils/modifyName';

class AddCategory extends Component {
    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.state = { name: '' };
    }

    handleChange(e) {
        const name = e.target.name;
        const val = e.target.value;

        this.setState({
            [name]: val
        });

        this.errorMessage(val);
    }

    errorMessage(v) {
        const elem = document.querySelector('#cat_name_error');

        if (validateName(v)) {
            elem.classList.add('hide');
            return;
        }

        elem.classList.remove('hide');
    }

    handleSubmit(e) {
        e.preventDefault();

        let name = this.state['name'];
        name = modifyName(name);

        if (!validateName(name)) return;

        this.props.submitTaskCategory({ name });
    }

    render() {
        return (
            <div className="section">
                <div className="row">
                    <div className="input-field col s7">
                        <input className="validate" id="cat_name_input" type="text" name="name" onChange={this.handleChange} />
                        <label htmlFor="cat_name_input">Add Task Category</label>
                        <span id="cat_name_error" className="red-text hide">Not Valid Name</span>
                    </div>

                    <div className="col s5">
                        <button className="teal btn-floating btn-large right white-text" onClick={this.handleSubmit}>
                            <i className="material-icons">add</i>
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(null, actions)(AddCategory);