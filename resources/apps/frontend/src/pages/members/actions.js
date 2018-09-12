import React from 'react';
import {Link} from 'react-router-dom';
import {Row, Col} from 'reactstrap';
import get from 'lodash/get';
import {TableFilters} from 'components/Table';
import BooleanSelect from 'components/Form/Select/BooleanSelect';
import Search from 'components/Form/Input/Search';
import withFilters from 'enhancers/withFilters';
import queryFilters from 'utils/query-filters';

class Component extends React.Component {
  static defaultProps = {
    isLoading: false,
  };

  state = queryFilters();

  onChangeFilter = key => option => {
    this.props.onChangeFilter(key, option.value);

    this.setState({[key]: option.value});
  };

  onSearch = keyword => {
    this.setState({q: keyword});

    this.props.onChangeFilter('q', keyword);
  };

  render() {
    return (
      <TableFilters>
        <Row>
          <Col md={2}>
            <BooleanSelect
              placeholder="Select Deleted"
              disabled={this.props.isLoading}
              value={get(this.state, 'is_deleted')}
              onChange={this.onChangeFilter('is_deleted')}
            />
          </Col>
          <Col md={2}>
            <BooleanSelect
              placeholder="Select Admin"
              disabled={this.props.isLoading}
              value={get(this.state, 'is_admin')}
              onChange={this.onChangeFilter('is_admin')}
            />
          </Col>
          <Col md={2}>
            <Search
              disabled={this.props.isLoading}
              name="search"
              value={get(this.state, 'q')}
              onSubmit={this.onSearch}
            />
          </Col>
          <Col md={4} />
          <Col md={2}>
            <Link to="/members/create" className="float-right btn btn-primary">
              <i className="fa fa-plus" /> Add Member
            </Link>
          </Col>
        </Row>
      </TableFilters>
    );
  }
}

export default withFilters(Component);
