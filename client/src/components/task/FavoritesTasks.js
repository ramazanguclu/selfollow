import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import * as actions from '../../actions';
import Loading from '../Loading';
import { BackButton } from '../elements/Button';

class FavoritesTasks extends Component {
    constructor(props) {
        super(props);

        this.handleBack = this.handleBack.bind(this);
        const id = new Date().getTime();
        this.state = { id };
        this.props.fetchFavoritesTasks(id);
    }

    handleBack(e) {
        e.preventDefault();
        this.props.history.goBack();
    }

    renderTasks() {
        return this.props.favoritesTasks.data.map((v) => {
            return (
                <Link to={'/task/view/' + v._id} key={v._id} className="collection-item">{v.name}</Link>
            );
        });
    }

    render() {
        return (
            <div>
                <ul className="collection with-header">
                    <li className="collection-header"><h4>Favorite Tasks</h4></li>
                    {this.props.favoritesTasks.id === this.state.id ? this.renderTasks() : <Loading />}
                </ul>

                <BackButton label={'Back'} onClick={this.handleBack} />
            </div>
        );
    }
}

function mapStateToProps({ favoritesTasks }) {
    return { favoritesTasks };
}

export default connect(mapStateToProps, actions)(withRouter(FavoritesTasks));