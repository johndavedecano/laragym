import React, { Component } from 'react';

import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
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

export default class UsersPage extends Component {
  state = {
    query: '',
  };

  onSearchChange = (event) => {
    this.setState({
      query: event.target.value,
    });
  };

  onSubmitSearch = (event) => {
    event.preventDefault();
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
          <PanelBody>sdfsdfsfs</PanelBody>
          <PanelFooter>
            <PanelActions>
              <TablePagination
                component="div"
                count={10}
                rowsPerPage={5}
                page={1}
                backIconButtonProps={{
                  'aria-label': 'Previous Page',
                }}
                nextIconButtonProps={{
                  'aria-label': 'Next Page',
                }}
                onChangePage={() => {}}
                onChangeRowsPerPage={() => {}}
              />
            </PanelActions>
          </PanelFooter>
        </Panel>
      </Container>
    );
  }
}
