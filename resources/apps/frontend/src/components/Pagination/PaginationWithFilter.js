import React from 'react';
import get from 'lodash/get';

import Pagination from 'components/Pagination/Pagination';
import withFilters from 'enhancers/withFilters';

class Component extends React.Component {
  onPageChanged = ({selected}) => {
    this.props.onChangeFilter('page', selected + 1);
  };

  render() {
    return (
      <Pagination
        onChange={this.onPageChanged}
        totalPages={get(this.props.meta, 'last_page', 1)}
        offset={get(this.props.meta, 'current_page', 1) - 1}
      />
    );
  }
}

export default withFilters(Component);
