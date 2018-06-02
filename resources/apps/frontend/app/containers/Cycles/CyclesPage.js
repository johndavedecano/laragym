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
import { CycleTable } from 'components/Tables/CycleTable';
import Container from 'components/Layouts/Container';

import {
  load,
  create,
  update,
  destroy,
  updateParams,
} from 'actions/cycle-actions';

import CycleCreateDialog from './CycleCreateDialog';
import CycleDeleteDialog from './CycleDeleteDialog';
import CycleUpdateDialog from './CycleUpdateDialog';

const PAGINATION_LIMIT_OPTIONS = [30, 60, 120];

class CyclesPage extends Component {
  state = {
    isCreateDialogOpen: false,
    isDeleteDialogOpen: false,
    isUpdateDialogOpen: false,
    isViewDialogOpen: false,
  };

  componentDidMount() {
    if (!this.props.isLoaded) {
      this.props.load();
    }
  }

  onSearchChange = (event) => {
    this.props.updateParams({ q: event.target.value });
  };

  onSubmitSearch = (event) => {
    event.preventDefault();
    this.props.load({ q: this.props.params.get('q') });
  };

  onChangePage = (event, page) => {
    const params = {
      page: page + 1,
      per_page: this.props.params.get('per_page', 30),
    };

    if (this.state.q) {
      params.q = this.state.q;
    }

    this.props.load(params);
  };

  onChangeLimit = (event) => {
    const params = {
      page: this.props.params.get('current_page', 1),
      per_page: event.target.value,
    };

    if (this.state.q) {
      params.q = this.state.q;
    }

    this.props.load(params);
  };

  onHandleAction = (id, action) => {
    if (action === 'DELETE') {
      return this.onDeleteDialogOpen(id);
    } else if (action === 'EDIT') {
      return this.onUpdateDialogOpen(id);
    }
    return false;
  };

  onUpdateDialogOpen = (service) => {
    this.setState({
      isUpdateDialogOpen: service,
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

  render() {
    return (
      <Container>
        <Panel>
          <PanelHeader title="Manage Cycles">
            <AddButton label="Add Cycle" onClick={this.onCreateDialogOpen} />
            {this.state.isCreateDialogOpen && (
              <CycleCreateDialog
                isOpen
                onClose={this.onCreateDialogClose}
                onSubmit={this.props.create}
              />
            )}
          </PanelHeader>

          <PanelSearch
            placeholder="Search Cycles"
            value={this.props.params.get('q', '')}
            onChange={this.onSearchChange}
            onSubmit={this.onSubmitSearch}
          />

          <PanelBody isLoading={this.props.isLoading}>
            <CycleTable
              cycles={this.props.cycles}
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
          <CycleDeleteDialog
            id={this.state.isDeleteDialogOpen}
            isOpen
            onClose={this.onDeleteDialogClose}
            onSubmit={this.props.destroy}
          />
        )}

        {this.state.isUpdateDialogOpen && (
          <CycleUpdateDialog
            entity={this.state.isUpdateDialogOpen}
            isOpen
            onClose={this.onUpdateDialogClose}
            onSubmit={this.props.update}
          />
        )}
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  isLoaded: state.getIn(['cycle', 'isLoaded']),
  isLoading: state.getIn(['cycle', 'isLoading']),
  cycles: state.getIn(['cycle', 'cycles']),
  params: state.getIn(['cycle', 'params']),
});

export default connect(mapStateToProps, {
  load,
  create,
  update,
  destroy,
  updateParams,
})(CyclesPage);
