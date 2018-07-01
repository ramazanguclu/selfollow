import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';

import { FavoriteButton } from '../elements/Button';

class Favorite extends Component {
    constructor(props) {
        super(props);

        this.handleFavorite = this.handleFavorite.bind(this);
    }

    favoriteClass(isFav) {
        return isFav ? 'green' : 'red';
    }

    handleFavorite(e) {
        e.preventDefault();

        e.target.parentElement.classList.add('disabled');

        const type = this.props.task.isFavorite ? 'delete' : 'add';
        this.props.submitTaskFavorite(type, this.props.task._id);
    }

    render() {
        return (
            <FavoriteButton onClick={this.handleFavorite} colorClass={this.favoriteClass(this.props.task.isFavorite)} />
        );
    }
}

export default connect(null, actions)(Favorite);