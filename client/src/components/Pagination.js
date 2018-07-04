import React, { Component } from 'react';

class Pagination extends Component {
    constructor(props) {
        super(props);

        this.state = { currentPage: 1 };
        this.handleClickNumbers = this.handleClickNumbers.bind(this);
        this.handleClickArrows = this.handleClickArrows.bind(this);
    }

    handleClickNumbers(e) {
        e.preventDefault();

        const currentPage = Number(e.target.getAttribute('data'));
        if (this.state.currentPage === currentPage) return;

        this.getNewPageData(currentPage);
    }

    handleClickArrows(type, e) {
        e.preventDefault();

        if (this.isDisabled(type)) return;

        const target = type === 'right' ? 1 : -1;
        const currentPage = this.state.currentPage + target;

        this.getNewPageData(currentPage);
    }

    getNewPageData(currentPage) {
        this.setState({ currentPage }, () => {
            this.props.setCurrentPage(currentPage);
            this.props.callback(this.props.callbackParam, this.props.itemPerPage, this.state.currentPage);
        });
    }

    getPageCount() {
        const { count, itemPerPage } = this.props;
        return (parseInt(count / itemPerPage) + (count % itemPerPage ? 1 : 0));
    }

    itemClass(index) {
        return (index + 1) === this.state.currentPage ? ' active disabled' : '';
    }

    isDisabled(type) {
        if (type === 'right') {
            return (this.state.currentPage) === this.getPageCount();
        } else {
            return this.state.currentPage === 1;
        }
    }

    renderPageNumbers() {
        const pageCount = this.getPageCount();
        const items = [];

        if (pageCount === 1) return;

        for (let index = 0; index < pageCount; index++) {
            items.push(<li key={index} className={'waves-effect' + this.itemClass(index)}><a data={index + 1} onClick={this.handleClickNumbers} href="#!">{index + 1}</a></li>);
        }

        return items;
    }

    render() {
        return (
            this.getPageCount() > 1 &&
            <ul className="pagination">
                <li className={this.isDisabled('left') ? 'disabled' : 'waves-effect'}>
                    <a href="#!" onClick={this.handleClickArrows.bind(this, 'left')}><i className="material-icons">chevron_left</i></a>
                </li>

                {this.renderPageNumbers()}

                <li className={this.isDisabled('right') ? 'disabled' : 'waves-effect'}>
                    <a href="#!" onClick={this.handleClickArrows.bind(this, 'right')}><i className="material-icons disabled">chevron_right</i></a>
                </li>
            </ul>
        );
    }
}

export default Pagination;