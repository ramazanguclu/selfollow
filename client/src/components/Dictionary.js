import React, { Component } from 'react';

class Dictionary extends Component {
    render() {
        return (
            <div>
                <div className="section">
                    <h1 className="header">Dictionary</h1>
                </div>
                <div className="divider"></div>
                <div className="section">
                    <form className="row">
                        <input className="col s8" type="text" placeholder="Add New Word Group"></input>
                        <div className="col s4">
                            <button className="green btn-floating btn-large right white-text">
                                <i className="material-icons large right">add</i>
                            </button>
                        </div>
                    </form>
                </div>
                <div className="divider"></div>
            </div>
        )
    }
}

export default Dictionary;