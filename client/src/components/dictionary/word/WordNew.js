import React, { Component } from 'react';

class WordNew extends Component {
    constructor(props) {
        super(props);
        this.groupName = this.props.match.params.groupName;
        this.groupId = this.props.match.params.groupId;
    }

    render() {
        return (
            <div>
                <h1>{this.groupName}</h1>
            </div>
        )
    }
}

export default WordNew;