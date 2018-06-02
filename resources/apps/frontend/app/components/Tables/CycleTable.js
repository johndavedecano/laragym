import React from 'react';
// import * as formatDate from 'date-fns/format';
// import Hidden from '@material-ui/core/Hidden';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import {
  EditButton,
  DeleteButton,
} from 'components/ActionButtons/ActionButtons';

export const CycleTableHead = () => (
  <TableHead>
    <TableRow>
      <TableCell>#</TableCell>
      <TableCell>Name</TableCell>
      <TableCell>Description</TableCell>
      <TableCell>Archived</TableCell>
      <TableCell>System Default</TableCell>
      <TableCell>Action</TableCell>
    </TableRow>
  </TableHead>
);

const onClickHandler = (id, type, callback) => () => callback(id, type);

export const CycleTableRow = ({ cycle, onHandleAction }) => (
  <TableRow key={cycle.get('id')}>
    <TableCell component="th" scope="row">
      {cycle.get('id')}
    </TableCell>
    <TableCell>{cycle.get('name')}</TableCell>
    <TableCell>{cycle.get('description')}</TableCell>
    <TableCell>{cycle.get('is_archived') ? 'Yes' : 'No'}</TableCell>
    <TableCell>{cycle.get('is_default') ? 'Yes' : 'No'}</TableCell>
    <TableCell>
      <EditButton onClick={onClickHandler(cycle, 'EDIT', onHandleAction)} />
      <DeleteButton
        onClick={onClickHandler(cycle.get('id'), 'DELETE', onHandleAction)}
      />
    </TableCell>
  </TableRow>
);

export const CycleTable = ({ cycles, onHandleAction }) => (
  <Table>
    <CycleTableHead />
    <TableBody>
      {cycles
        .map((cycle) => (
          <CycleTableRow
            key={cycle.get('id')}
            cycle={cycle}
            onHandleAction={onHandleAction}
          />
        ))
        .toArray()}
    </TableBody>
  </Table>
);
