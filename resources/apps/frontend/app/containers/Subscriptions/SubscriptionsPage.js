import React, { Component } from 'react';
import { connect } from 'react-redux';

import TablePagination from '@material-ui/core/TablePagination';

import {
  Panel,
  PanelBody,
  PanelHeader,
  PanelFooter,
  PanelActions,
} from 'components/Panel/Panel';

import { AddButton } from 'components/ActionButtons/ActionButtons';
import { SubscriptionTable } from 'components/Tables/SubscriptionTable';
import Container from 'components/Layouts/Container';

import {
  load,
  create,
  update,
  destroy,
  updateParams,
  show,
} from 'actions/subscription-actions';

import SubscriptionCreateDialog from './SubscriptionCreateDialog';
import SubscriptionDeleteDialog from './SubscriptionDeleteDialog';
import SubscriptionUpdateDialog from './SubscriptionUpdateDialog';
import SubscriptionViewDialog from './SubscriptionViewDialog';
import SubscriptionsFilter from './SubscriptionsFilter';

const PAGINATION_LIMIT_OPTIONS = [30, 60, 120];

class Subscription extends Component {
  state = {
    isCreateDialogOpen: false,
    isDeleteDialogOpen: false,
    isUpdateDialogOpen: false,
    isViewDialogOpen: false,
  };

  componentDidMount() {
    this.props.load({
      page: this.props.params.get('current_page'),
      per_page: this.props.params.get('per_page'),
    });
  }

  onSubmitFilter = (event) => {
    event.preventDefault();
    this.props.load(this.getParams());
  };

  onChangePage = (event, page) => {
    const params = {
      ...this.getParams(),
      page: page + 1,
      per_page: this.props.params.get('per_page', 30),
    };

    this.props.updateParams(params);

    this.props.load(params);
  };

  onChangeLimit = (event) => {
    const params = {
      ...this.getParams(),
      page: this.props.params.get('current_page', 1),
      per_page: event.target.value,
    };

    this.props.updateParams(params);

    this.props.load(params);
  };

  onHandleAction = (id, action) => {
    if (action === 'DELETE') {
      return this.onDeleteDialogOpen(id);
    } else if (action === 'EDIT') {
      return this.onUpdateDialogOpen(id);
    } else if (action === 'VIEW') {
      return this.onViewDialogOpen(id);
    }
    return false;
  };

  onViewDialogOpen = (id) => {
    this.setState({
      isViewDialogOpen: id,
    });
  };

  onViewDialogClose = () => {
    this.setState({
      isViewDialogOpen: false,
    });
  };

  onUpdateDialogOpen = (id) => {
    this.setState({
      isUpdateDialogOpen: id,
    });
  };

  onUpdateDialogClose = () => {
    this.setState({
      isUpdateDialogOpen: false,
    });
  };

  onCreateDialogOpen = () => {
    this.setState({
      isCreateDialogOpen: true,
    });
  };

  onCreateDialogClose = () => {
    this.setState({
      isCreateDialogOpen: false,
    });
  };

  onDeleteDialogOpen = (id) => {
    this.setState({
      isDeleteDialogOpen: id,
    });
  };

  onDeleteDialogClose = () => {
    this.setState({
      isDeleteDialogOpen: false,
    });
  };

  onChangeFilter = (name, value) => {
    this.props.updateParams({
      ...this.getParams(),
      [name]: value,
    });
  };

  getParams() {
    return {
      page: this.props.params.get('current_page'),
      per_page: this.props.params.get('per_page'),
      user_id: this.props.params.get('user_id'),
      package_id: this.props.params.get('package_id'),
      service_id: this.props.params.get('service_id'),
      cycle_id: this.props.params.get('cycle_id'),
      is_expired: this.props.params.get('is_expired'),
      is_suspended: this.props.params.get('is_suspended'),
    };
  }

  render() {
    return (
      <Container>
        <Panel>
          <PanelHeader title="Manage Subscriptions">
            <AddButton
              label="Add Subscription"
              onClick={this.onCreateDialogOpen}
            />
            {this.state.isCreateDialogOpen && (
              <SubscriptionCreateDialog
                isOpen
                onClose={this.onCreateDialogClose}
                onSubmit={this.props.create}
              />
            )}
          </PanelHeader>

          <SubscriptionsFilter
            user_id={this.props.params.get('user_id')}
            cycle_id={this.props.params.get('cycle_id')}
            service_id={this.props.params.get('service_id')}
            package_id={this.props.params.get('package_id')}
            is_expired={this.props.params.get('is_expired')}
            is_suspended={this.props.params.get('is_suspended')}
            by_user={this.state.by_user}
            onChange={this.onChangeFilter}
            onSubmit={this.onSubmitFilter}
          />

          <PanelBody isLoading={this.props.isLoading}>
            <SubscriptionTable
              subscriptions={this.props.subscriptions}
              onHandleAction={this.onHandleAction}
            />
          </PanelBody>

          <PanelFooter>
            <PanelActions>
              <TablePagination
                component="div"
                count={this.props.params.get('total', 0)}
                rowsPerPage={Number(this.props.params.get('per_page', 30))}
                rowsPerPageOptions={PAGINATION_LIMIT_OPTIONS}
                page={this.props.params.get('current_page', 0) - 1}
                backIconButtonProps={{
                  'aria-label': 'Previous Page',
                }}
                nextIconButtonProps={{
                  'aria-label': 'Next Page',
                }}
                onChangePage={this.onChangePage}
                onChangeRowsPerPage={this.onChangeLimit}
              />
            </PanelActions>
          </PanelFooter>
        </Panel>

        {this.state.isDeleteDialogOpen && (
          <SubscriptionDeleteDialog
            id={this.state.isDeleteDialogOpen}
            isOpen
            onClose={this.onDeleteDialogClose}
            onSubmit={this.props.destroy}
          />
        )}

        {this.state.isUpdateDialogOpen && (
          <SubscriptionUpdateDialog
            entity={this.state.isUpdateDialogOpen}
            isOpen
            onClose={this.onUpdateDialogClose}
            onSubmit={this.props.update}
          />
        )}

        {this.state.isViewDialogOpen && (
          <SubscriptionViewDialog
            id={this.state.isViewDialogOpen}
            isOpen
            onClose={this.onViewDialogClose}
            onShow={this.props.show}
          />
        )}
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  isLoaded: state.getIn(['subscription', 'isLoaded']),
  isLoading: state.getIn(['subscription', 'isLoading']),
  subscriptions: state.getIn(['subscription', 'subscriptions']),
  params: state.getIn(['subscription', 'params']),
});

export default connect(mapStateToProps, {
  load,
  create,
  update,
  destroy,
  updateParams,
  show,
})(Subscription);
