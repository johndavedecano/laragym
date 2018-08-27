import React from 'react';
import get from 'lodash/get';

import Pagination from 'components/Pagination/Pagination';
import withFilters from 'enhancers/withFilters';

class Component extends React.Component {
  onPageChanged = ({selected}) => {
    this.props.onChangeFilter('offset', selected);
  };

  render() {
    return (
      <Pagination
        onChange={this.onPageChanged}
        totalPages={get(this.props.meta, 'total_pages', 0)}
        offset={get(this.props.meta, 'offset', 0)}
      />
    );
  }
}

export default withFilters(Component);
