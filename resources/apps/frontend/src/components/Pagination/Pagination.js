import React from 'react';
import ReactPaginate from 'react-paginate';
import PropTypes from 'prop-types';
import cx from 'classnames';

export default class Pagination extends React.Component {
  static defaultProps = {
    offset: 0,
    marginPagesDisplayed: 2,
    onChange: () => {},
    pageRangeDisplayed: 5,
    totalPages: 1,
    className: 'justify-content-center',
  };

  static propTypes = {
    marginPagesDisplayed: PropTypes.number,
    onChange: PropTypes.func,
    pageRangeDisplayed: PropTypes.number,
    className: PropTypes.string,
  };

  render() {
    return (
      <ReactPaginate
        activeClassName={'active'}
        breakClassName="page-item"
        containerClassName={cx('pagination', this.props.className)}
        forcePage={Number(this.props.offset)}
        marginPagesDisplayed={this.props.marginPagesDisplayed}
        nextClassName="page-item"
        nextLabel={'next'}
        nextLinkClassName="page-link"
        onPageChange={this.props.onChange}
        pageClassName="page-item"
        pageCount={Number(this.props.totalPages)}
        pageLinkClassName="page-link"
        pageRangeDisplayed={this.props.pageRangeDisplayed}
        previousClassName="page-item"
        previousLabel={'previous'}
        previousLinkClassName="page-link"
        subContainerClassName={'pages pagination'}
        breakLabel={
          <a href="" className="page-link">
            ...
          </a>
        }
      />
    );
  }
}
