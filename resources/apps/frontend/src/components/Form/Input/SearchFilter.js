import React from 'react';
import Search from 'components/Search/Search';
import withFilters from 'enhancers/withFilters';

class Component extends React.Component {
  onPageChanged = ({selected}) => {
    this.props.onChangeFilter('offset', selected);
  };

  render() {
    return <Search onChange={this.onPageChanged} />;
  }
}

export default withFilters(Component);
