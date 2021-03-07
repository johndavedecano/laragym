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
          <Col md={3}>
            <BooleanSelect
              placeholder="Seleccionar Eliminado"
              disabled={this.props.isLoading}
              value={get(this.state, 'is_deleted')}
              onChange={this.onChangeFilter('is_deleted')}
            />
          </Col>
          <Col md={3}>
            <BooleanSelect
              placeholder="Seleccionar Administrador"
              disabled={this.props.isLoading}
              value={get(this.state, 'is_admin')}
              onChange={this.onChangeFilter('is_admin')}
            />
          </Col>
          <Col md={3}>
            <Search
              disabled={this.props.isLoading}
              name="Buscar"
              value={get(this.state, 'q')}
              onSubmit={this.onSearch}
            />
          </Col>
          <Col md={2} />
          <Col md={1}>
            <Link to="/members/create" className="float-right btn btn-primary">
              <i className="fa fa-plus" /> Agregar Miembro
            </Link>
          </Col>
        </Row>
      </TableFilters>
    );
  }
}

export default withFilters(Component);
