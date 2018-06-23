import React, { Component } from 'react';
import FilterStatisticForm from './FilterStatisticForm';
import ViewLogStatistic from './ViewLogStatistic';

class Statistic extends Component {
    constructor(props) {
        super(props);

        this.state = { title: '', clear: true, logId: '' };
    }
    render() {
        return (
            <div>
                <FilterStatisticForm handleClear={() => this.setState({ clear: true })} handleSubmit={(title, logId) => { this.setState({ title, logId, clear: false }); }} />
                <ViewLogStatistic logId={this.state.logId} title={this.state.title} clear={this.state.clear} />
            </div>
        );
    }
}

export default Statistic;