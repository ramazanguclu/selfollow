import React, { Component } from 'react';
import * as actions from '../../actions';
import { connect } from 'react-redux';

class AddCategory extends Component {
    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.state = {};
    }

    handleChange(e) {
        const name = e.target.name;
        const val = e.target.value;

        this.setState({
            [name]: val
        });
    }

    handleSubmit(e) {
        e.preventDefault();

        if (!this.state['name']) return;

        this.props.submitTaskCategory(this.state);
    }

    render() {
        return (
            <div className="section">
                <div className="row">
                    <input className="col s7" placeholder="Add Task Category" type="text" name="name" onChange={this.handleChange} />
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