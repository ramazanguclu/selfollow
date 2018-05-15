import React, { Component } from 'react';
import { reduxForm } from 'redux-form';

import WordForm from './WordForm';
import WordFormReview from './WordFormPreview';

class WordNew extends Component {
    constructor(props) {
        super(props);
        this.groupName = this.props.match.params.groupName;
        this.groupId = this.props.match.params.group_id;
    }

    state = { showWordReview: false };

    renderContent() {
        if (this.state.showWordReview) {
            return <WordFormReview onCancel={() => this.setState({ showWordReview: false })} />;
        }

        return <WordForm groupId={this.groupId} groupName={this.groupName} onWordSubmit={() => this.setState({ showWordReview: true })} />;
    }

    render() {
        return (
            <div>
                {this.renderContent()}
            </div>
        );
    }
}

export default reduxForm({
    form: 'wordForm'
})(WordNew);