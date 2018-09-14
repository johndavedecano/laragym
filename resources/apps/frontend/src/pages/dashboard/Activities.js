import React from 'react';
import {Table} from 'components/Table';
import notify from 'utils/notify';
import date from 'utils/date';
import getErrorMessage from 'utils/getErrorMessage';
import {loadSystemLogs} from 'requests/activities';

class Component extends React.Component {
  _isMounted = false;

  state = {
    data: [],
    meta: {},
  };

  componentDidMount() {
    this._isMounted = true;

    this.load();
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  load = async () => {
    try {
      const {data, meta} = await loadSystemLogs({limit: this.props.limit});
      if (!this._isMounted) return;
      this.setState({
        data,
        meta,
      });
    } catch (err) {
      notify({
        type: 'error',
        text: getErrorMessage(err),
      });
    }
  };

  get headers() {
    return ['ID', 'Description', 'Date'];
  }

  renderItem = item => {
    return (
      <tr key={item.id}>
        <td>{item.id}</td>
        <td className="align-center">{item.description}</td>
        <td>{date(item.created_at)}</td>
      </tr>
    );
  };

  render() {
    return (
      <Table headers={this.headers}>
        {this.state.data.map(item => {
          return this.renderItem(item);
        })}
      </Table>
    );
  }
}

export default Component;
