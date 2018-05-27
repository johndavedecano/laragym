import React, { Component } from 'react';
import { connect } from 'react-redux';

import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import TablePagination from '@material-ui/core/TablePagination';

import {
  Panel,
  PanelBody,
  PanelHeader,
  PanelSearch,
  PanelFooter,
  PanelActions,
} from 'components/Panel/Panel';

import Container from 'components/Layouts/Container';
import { UserTable } from 'components/UserTable/UserTable';

import { load, create, update, destroy } from 'actions/user-actions';

class UsersPage extends Component {
  state = {
    query: '',
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
    console.log(id, action);
  };

  render() {
    return (
      <Container>
        <Panel>
          <PanelHeader title="Manage Users">
            <Button size="large" variant="raised" color="primary">
              <AddIcon />
              Add User
            </Button>
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
