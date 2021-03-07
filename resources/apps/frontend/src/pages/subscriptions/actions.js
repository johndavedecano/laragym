import React from 'react';
import {Link} from 'react-router-dom';
import {Row, Col} from 'reactstrap';
import get from 'lodash/get';
import {TableFilters} from 'components/Table';

import SubscriptionStatusSelect from 'components/Form/Select/SubscriptionStatusSelect';
import PackageSelect from 'components/Form/Select/PackageSelect';
import MemberSelect from 'components/Form/Select/MemberSelect';

import Search from 'components/Form/Input/Search';
import withFilters from 'enhancers/withFilters';
import queryFilters from 'utils/query-filters';

class Component extends React.Component {
  static defaultProps = {
    isLoading: false,
  };

  state = queryFilters();

  onChangeFilter = (key, valueKey = 'value') => option => {
    this.props.onChangeFilter(key, option[valueKey]);
    this.setState({[key]: option[valueKey]});
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
            <SubscriptionStatusSelect
              placeholder="Seleccionar Estatus"
              disabled={this.props.isLoading}
              defaultValue={get(this.state, 'status')}
              onChange={this.onChangeFilter('status')}
            />
          </Col>

          <Col md={2}>
            <PackageSelect
              placeholder="Seleccionar paquete"
              disabled={this.props.isLoading}
              defaultValue={get(this.state, 'package_id')}
              onChange={this.onChangeFilter('package_id', 'id')}
              plainLabel
            />
          </Col>

          <Col md={2}>
            <MemberSelect
              placeholder="Seleccionar Usuario"
              disabled={this.props.isLoading}
              defaultValue={get(this.state, 'user_id')}
              onChange={this.onChangeFilter('user_id', 'id')}
              plainLabel
            />
          </Col>

          <Col md={2}>
            <Search
              disabled={this.props.isLoading}
              name="Buscar"
              value={get(this.state, 'q')}
              onSubmit={this.onSearch}
            />
          </Col>
          <Col md={2} />
          <Col md={2}>
            <Link
              to="/subscriptions/create"
              className="float-right btn btn-primary"
            >
              <i className="fa fa-plus" /> Agregar Subscripción
            </Link>
          </Col>
        </Row>
      </TableFilters>
    );
  }
}

export default withFilters(Component);
