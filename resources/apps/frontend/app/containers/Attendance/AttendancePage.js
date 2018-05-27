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
  PanelFooter
} from 'components/Panel/Panel';

import Container from 'components/Layouts/Container';

export default class AttendancePage extends Component {
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
          <PanelHeader title="Manage Attendance" />
          <PanelSearch
            placeholder="Search..."
            value={this.state.query}
            onChange={this.onSearchChange}
            onSubmit={this.onSubmitSearch}
          />
          <PanelBody>sdfsdfsfs</PanelBody>
          <PanelFooter>Hello</PanelFooter>
        </Panel>
      </Container>
    );
  }
}
