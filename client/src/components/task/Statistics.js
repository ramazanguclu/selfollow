import React, { Component } from 'react';

import M from 'materialize-css/dist/js/materialize.min.js';

class Statictics extends Component {
    renderForm() {
        return (
            <div className="row">
                <form className="col s12">
                    <div className="input-field col s12">
                        <select name="_category" onChange={this.handleChange}>
                            <option value="" disabled>Choose Task Category</option>
                        </select>
                        <label>Categories</label>
                    </div>

                    <div className="input-field col s12">
                        <button className="red btn-flat left white-text">
                            Clear
                            <i className="material-icons left">clear</i>
                        </button>

                        <button className="btn waves-effect waves-light right" type="submit">
                            Submit
                            <i className="material-icons right">send</i>
                        </button>
                    </div>
                </form>
            </div>
        );
    }

    render() {
        return (
            <div className="section">
                {this.renderForm()}
            </div>
        );
    }
}

export default Statictics;