import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import Loading from '../Loading';

class TaskView extends Component {
    constructor(props) {
        super(props);

        this.props.fetchTask(this.props.match.params.id);
    }

    render() {
        const data = this.props.task;
    
        return (
            <div>
                {!data._id || data._id !== this.props.match.params.id ? <Loading /> :
                    <div className="section">
                        <h1>{data.name}</h1>
                        <h4>{data.description}</h4>
                    </div>
                }
            </div>
        );
    }
}

function mapStateToProps({ task }) {
    return { task };
}

export default connect(mapStateToProps, actions)(TaskView);