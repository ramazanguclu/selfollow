import React, { Component } from 'react';
import totalTimeHuman from '../../../utils/totalTimeHuman';

import { connect } from 'react-redux';
import * as actions from '../../../actions';

class ViewLogStatistic extends Component {
    renderStatisticItem() {
        return this.props.logStatistics.data.map((v, k) => {
            return (
                <li key={k} className="collection-item">
                    <p className="title">{v._id.day + '-' + v._id.month + '-' + v._id.year}</p>
                    <p className="title">{totalTimeHuman(v.total, 3)}</p>

                </li>
            );
        });
    }

    renderStatistics() {
        if (!this.props.show) return;

        return (
            <ul className="collection with-header">
                <li className="collection-header"><h4>{this.props.title}</h4></li>
                {this.renderStatisticItem()}
            </ul>
        );
    }

    render() {
        return (
            <div>
                {this.renderStatistics()}
            </div>
        );
    }
}

function mapStateToProps({ taskCategories, tasksByCategory, logStatistics }) {
    return { taskCategories, tasksByCategory, logStatistics };
}

export default connect(mapStateToProps, actions)(ViewLogStatistic);