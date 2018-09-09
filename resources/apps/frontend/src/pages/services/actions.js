import React from 'react';
import {Link} from 'react-router-dom';
import {Row, Col} from 'reactstrap';
import get from 'lodash/get';
import {TableFilters} from 'components/Table';
import StatusSelect from 'components/Form/Select/StatusSelect';
import Search from 'components/Form/Input/Search';
import withFilters from 'enhancers/withFilters';
import queryFilters from 'utils/query-filters';

class Component extends React.Component {
  static defaultProps = {
    isLoading: false,
  };

  state = queryFilters();

  onChangeFilter = key => value => {
    this.props.onChangeFilter(key, value);
    this.setState({[key]: value});
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
            <StatusSelect
              placeholder="All Status"
              disabled={this.props.isLoading}
              value={get(this.state, 'status')}
              onChange={this.onChangeFilter('status')}
              simpleValue
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
          <Col md={6} />
          <Col md={2}>
            <Link to="/services/create" className="float-right btn btn-primary">
              <i className="fa fa-plus" /> Add Service
            </Link>
          </Col>
        </Row>
      </TableFilters>
    );
  }
}

export default withFilters(Component);
