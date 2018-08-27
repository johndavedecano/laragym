import React from 'react';
import {Card, CardBody, CardHeader} from 'reactstrap';
import {Table} from 'components/Table';
import Loader from 'components/Loader';
import CardActions from './actions';
import queryFilters from 'utils/query-filters';
import notify from 'utils/notify';
import date from 'utils/date';
import getErrorMessage from 'utils/getErrorMessage';
import {loadServices} from 'requests/services';

class Component extends React.Component {
  state = {
    data: [],
    meta: {},
    isLoading: false,
  };

  componentDidMount() {
    this.load();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.location.search !== this.props.location.search) {
      this.load();
    }
  }

  load = async () => {
    try {
      this.setState({isLoading: true});
      const {data, meta} = await loadServices(queryFilters());
      this.setState({
        data,
        meta,
        isLoading: false,
      });
    } catch (err) {
      this.setState({isLoading: false}, () => {
        notify({
          type: 'error',
          text: getErrorMessage(err),
        });
      });
    }
  };

  get loader() {
    return this.state.isLoading && <Loader show />;
  }

  get headers() {
    return ['ID', 'Name', 'System', 'Updated', 'Actions'];
  }

  renderItem = item => {
    return (
      <tr key={item.id}>
        <td>{item.id}</td>
        <td>{item.name}</td>
        <td>{item.is_default ? 'Yes' : 'No'}</td>
        <td>{date(item.created_at)}</td>
        <td>{item.id}</td>
      </tr>
    );
  };

  render() {
    return (
      <Card>
        <CardHeader>Manage Services</CardHeader>
        <CardActions isLoading={this.state.isLoading} />
        <CardBody className="position-relative">
          {this.loader}
          <Table headers={this.headers}>
            {this.state.data.map(item => {
              return this.renderItem(item);
            })}
          </Table>
        </CardBody>
      </Card>
    );
  }
}

export default Component;
