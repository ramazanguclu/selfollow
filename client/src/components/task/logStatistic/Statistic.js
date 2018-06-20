import React, { Component } from 'react';
import FilterStatisticForm from './FilterStatisticForm';
import ViewLogStatistic from './ViewLogStatistic';

class Statistic extends Component {
    constructor(props) {
        super(props);

        this.state = { title: '', show: false };
    }
    render() {
        return (
            <div>
                <FilterStatisticForm handleSubmit={(t) => { this.setState({ title: t,show: true }); }} />
                <ViewLogStatistic title={this.state.title} show={this.state.show} />
            </div>
        );
    }
}

export default Statistic;