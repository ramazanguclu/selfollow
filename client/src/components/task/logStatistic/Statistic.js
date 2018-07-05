import React, { Component } from 'react';
import FilterStatisticForm from './FilterStatisticForm';
import ViewLogStatistic from './ViewLogStatistic';

import { connect } from 'react-redux';
import * as actions from '../../../actions';

const itemPerPage = 10;

class Statistic extends Component {
    constructor(props) {
        super(props);

        this.handleChangePage = this.handleChangePage.bind(this);
        this.state = { title: '', clear: true, logId: '' };
    }

    handleChangePage(pageNumber) {
        this.props.fetchLogStatistics(this.state.data, this.state.logId, itemPerPage, pageNumber);
    }

    render() {
        return (
            <div>
                <FilterStatisticForm
                    itemPerPage={itemPerPage}
                    handleClear={() => this.setState({ clear: true })}
                    handleSubmit={(data, title, logId) => { this.setState({ data, title, logId, clear: false }); }}
                />

                <ViewLogStatistic
                    itemPerPage={itemPerPage}
                    logId={this.state.logId}
                    title={this.state.title}
                    clear={this.state.clear}
                    handleChangePage={this.handleChangePage}
                />
            </div>
        );
    }
}

export default connect(null, actions)(Statistic);