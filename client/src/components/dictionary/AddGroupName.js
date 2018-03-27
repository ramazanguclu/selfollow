import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import { withRouter } from 'react-router-dom';

class AddGroupName extends Component {
    state = { formGroupName: '' }

    render() {
        return (
            <form className="row">
                <input
                    className="col s8"
                    type="text"
                    placeholder="Add New Word Group"
                    name="name"
                    onChange={(e) => {
                        this.setState({
                            formGroupName: e.target.value
                        })
                    }}
                >
                </input>
                <div className="col s4">
                    <button
                        onClick={(e) => {
                            this.props.submitWordGroup({
                                name: this.state.formGroupName
                            }, this.props.history);

                            e.preventDefault();
                        }}
                        type="submit"
                        className="green btn-floating btn-large right white-text"
                    >
                        <i className="material-icons large right">add</i>
                    </button>
                </div>
            </form>
        )
    }
}

export default connect(null, actions)(withRouter(AddGroupName));