import React, { Component } from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';

import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';

import Modal from 'components/Modal/Modal';
import AbsoluteLoader from 'components/PageLoader/AbsoluteLoader';

export default class PackageViewDialog extends Component {
  static defaultProps = {
    isOpen: false,
    onClose: () => {},
  };

  static propTypes = {
    isOpen: PropTypes.bool,
    onClose: PropTypes.func,
  };

  state = {
    isLoading: true,
    package: {},
  };

  async componentDidMount() {
    try {
      await this.load();
    } catch (error) {
      this.props.onClose();
    }
  }

  load = async () => {
    const response = await this.props.onShow(this.props.id);
    this.setState({ package: response }, () => {
      this.setState({
        isLoading: false,
      });
    });
  };

  render() {
    return (
      <Modal
        title="Package Information"
        isOpen={this.props.isOpen}
        onClose={this.props.onClose}
        actions={
          <Button type="button" onClick={this.props.onClose} color="primary">
            Close
          </Button>
        }
      >
        {this.state.isLoading && <AbsoluteLoader />}
        {!this.state.isLoading && (
          <Table>
            <TableBody>
              <TableRow>
                <TableCell>
                  <Typography variant="caption" gutterBottom align="left">
                    Name
                  </Typography>
                </TableCell>
                <TableCell>{get(this.state.package, 'name')}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Typography variant="caption" gutterBottom align="left">
                    Service
                  </Typography>
                </TableCell>
                <TableCell>{get(this.state.package, 'service.name')}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Typography variant="caption" gutterBottom align="left">
                    Billing Cycle
                  </Typography>
                </TableCell>
                <TableCell>{get(this.state.package, 'cycle.name')}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Typography variant="caption" gutterBottom align="left">
                    Amount
                  </Typography>
                </TableCell>
                <TableCell>
                  {get(this.state.package, 'amount', 0).toFixed(2)}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Typography variant="caption" gutterBottom align="left">
                    Archived
                  </Typography>
                </TableCell>
                <TableCell>
                  {get(this.state.package, 'is_archived') ? 'Yes' : 'No'}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Typography variant="caption" gutterBottom align="left">
                    Total Subscriptions
                  </Typography>
                </TableCell>
                <TableCell>
                  {get(this.state.package, 'subscriptions_count')}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        )}
      </Modal>
    );
  }
}
