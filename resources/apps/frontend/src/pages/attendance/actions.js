import React from 'react';
import {Row, Col} from 'reactstrap';
import get from 'lodash/get';

import {TableFilters} from 'components/Table';
import MemberSelect from 'components/Form/Select/MemberSelect';
import queryFilters from 'utils/query-filters';
import Search from 'components/Form/Input/Search';
import withFilters from 'enhancers/withFilters';

class Component extends React.Component {
  static defaultProps = {
    isLoading: false,
  };

  state = queryFilters();

  onChangeStatus = option => {
    this.props.onChangeFilter('status', option.value);
    this.setState({status: option.value});
  };

  onSearch = keyword => {
    this.setState({q: keyword});
    this.props.onChangeFilter('q', keyword);
  };

  onChangeFilter = (key, valueKey = 'value') => option => {
    this.props.onChangeFilter(key, option[valueKey]);
    this.setState({[key]: option[valueKey]});
  };

  render() {
    return (
      <TableFilters>
        <Row>
          <Col md={2}>
            <MemberSelect
              placeholder="Select User"
              disabled={this.props.isLoading}
              defaultValue={get(this.state, 'entity_id')}
              onChange={this.onChangeFilter('entity_id', 'id')}
              plainLabel
            />
          </Col>

          <Col md={2}>
            <Search
              disabled={this.props.isLoading}
              name="search"
              defaultValue={get(this.state, 'q')}
              onSubmit={this.onSearch}
            />
          </Col>

          <Col md={6} />
          <Col md={2} />
        </Row>
      </TableFilters>
    );
  }
}

export default withFilters(Component);
