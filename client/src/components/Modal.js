import React, { Component } from 'react';

import M from 'materialize-css/dist/js/materialize.min.js';

class Modal extends Component {
    componentDidMount() {
        const elem = document.querySelector('.modal');
        M.Modal.init(elem);
    }

    render() {
        return (
            <div id={this.props.modalId} className="modal">
                <div className="modal-content">
                    <h4>Are you sure?</h4>
                    <p>{this.props.text}</p>
                </div>
                <div className="modal-footer">
                    <a href="#!" className="modal-close waves-effect waves-green btn-flat" onClick={this.props.cancel}>Cancel</a>
                    <a href="#!" className="modal-close waves-effect waves-green btn-flat" onClick={this.props.agree}>Yes</a>
                </div>
            </div>
        );
    }
}

export default Modal;