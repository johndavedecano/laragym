import React, { Component } from 'react';
import { connect } from 'react-redux';

import TablePagination from '@material-ui/core/TablePagination';

import {
  Panel,
  PanelBody,
  PanelHeader,
  PanelSearch,
  PanelFooter,
  PanelActions,
} from 'components/Panel/Panel';

import { AddButton } from 'components/ActionButtons/ActionButtons';
import { UserTable } from 'components/UserTable/UserTable';
import Container from 'components/Layouts/Container';
import UserCreateDialog from './UserCreateDialog';

import { load, create, update, destroy } from 'actions/user-actions';

class UsersPage extends Component {
  state = {
    query: '',
    isCreateModalOpen: false,
  };

  componentDidMount() {
    if (!this.props.isLoaded) {
      this.props.load({}, true);
    }
  }

  onSearchChange = (event) => {
    this.setState({
      query: event.target.value,
    });
  };

  onSubmitSearch = (event) => {
    event.preventDefault();
  };

  onChangePage = (event, page) => {
    console.log(page);
  };

  onHandleAction = (id, action) => {
    if (action === 'DELETE') {
      return this.onDeleteAction(id);
    } else if (action === 'EDIT') {
      return this.onEditAction(id);
    } else if (action === 'VIEW') {
      return this.onViewAction(id);
    }
    return false;
  };

  onDeleteAction = (id) => {};

  onEditAction = (id) => {};

  onViewAction = (id) => {};

  onOpenCreateModal = () => {
    this.setState({
      isCreateModalOpen: true,
    });
  };

  onCloseCreateModal = () => {
    this.setState({
      isCreateModalOpen: false,
    });
  };

  render() {
    return (
      <Container>
        <Panel>
          <PanelHeader title="Manage Users">
            <AddButton label="Add User" onClick={this.onOpenCreateModal} />
            {this.state.isCreateModalOpen && (
              <UserCreateDialog
                isOpen
                onClose={this.onCloseCreateModal}
                onSubmit={this.props.create}
              />
            )}
          </PanelHeader>

          <PanelSearch
            value={this.state.query}
            onChange={this.onSearchChange}
            onSubmit={this.onSubmitSearch}
          />

          <PanelBody isLoading={this.props.isLoading}>
            <UserTable
              users={this.props.users}
              onHandleAction={this.onHandleAction}
            />
          </PanelBody>

          <PanelFooter>
            <PanelActions>
              <TablePagination
                component="div"
                count={this.props.params.get('total')}
                rowsPerPage={15}
                rowsPerPageOptions={[15]}
                page={this.props.params.get('current_page') - 1}
                backIconButtonProps={{
                  'aria-label': 'Previous Page',
                }}
                nextIconButtonProps={{
                  'aria-label': 'Next Page',
                }}
                onChangePage={this.onChangePage}
                onChangeRowsPerPage={() => {}}
              />
            </PanelActions>
          </PanelFooter>
        </Panel>
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  isLoaded: state.getIn(['user', 'isLoaded']),
  isLoading: state.getIn(['user', 'isLoading']),
  users: state.getIn(['user', 'users']),
  params: state.getIn(['user', 'params']),
});

export default connect(mapStateToProps, { load, create, update, destroy })(
  UsersPage
);
