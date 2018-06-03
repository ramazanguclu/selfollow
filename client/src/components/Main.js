import React, { Component } from 'react';
import AddCategory from './task/AddCategory';
import ListCategory from './task/ListCategory';

class Main extends Component {
    render() {
        return (
            <div>
                <AddCategory />
                <ListCategory />
            </div>
        );
    }
}

export default Main;