import React, { Component } from 'react';
import totalTimeHuman from '../../../utils/totalTimeHuman';

import { connect } from 'react-redux';
import * as actions from '../../../actions';

import Loading from '../../Loading';

class ViewLogStatistic extends Component {
    modifyDate(date) {
        return Object.values(date).map((v) => {
            let substrNumber = ('' + v).length > 2 ? 4 : 2;

            return ('00' + v).substr(-substrNumber, substrNumber);
        }).join('/');
    }

    renderStatisticItem() {
        return this.props.logStatistics.data.map((v, k) => {
            return (
                <li key={k} className="collection-item teal lighten-5">
                    <div className="row">
                        <div className="col s12 m6 l6">
                            {this.modifyDate(v._id)}
                        </div>
                        <div className="col s12 m6 l6">
                            <a className="secondary-content">
                                {totalTimeHuman(v.total, 3)}
                            </a>
                        </div>
                    </div>
                </li>
            );
        });
    }

    renderStatistics() {
        return (
            <ul className="collection with-header">
                <li className="collection-header teal lighten-3">
                    <h1>{this.props.title._category}</h1>
                    <h4>{this.props.title._task}</h4>
                </li>
                {this.renderStatisticItem()}
            </ul>
        );
    }

    render() {
        return (
            <div>
                {this.props.clear ? <div></div> : this.props.logId !== this.props.logStatistics.id ? <Loading /> : this.renderStatistics()}
            </div>
        );
    }
}

function mapStateToProps({ logStatistics }) {
    return { logStatistics };
}

export default connect(mapStateToProps, actions)(ViewLogStatistic);