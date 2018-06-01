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

export const PackageTableHead = () => (
  <TableHead>
    <TableRow>
      <TableCell>#</TableCell>
      <TableCell>Name</TableCell>
      <TableCell>Service</TableCell>
      <TableCell>Cycle</TableCell>
      <TableCell>Amount</TableCell>
      <TableCell>Archived</TableCell>
      <TableCell>Action</TableCell>
    </TableRow>
  </TableHead>
);

const onClickHandler = (id, type, callback) => () => callback(id, type);

export const PackageTableRow = ({ pkg, onHandleAction }) => (
  <TableRow key={pkg.get('id')}>
    <TableCell component="th" scope="row">
      {pkg.get('id')}
    </TableCell>
    <TableCell>{pkg.get('name')}</TableCell>
    <TableCell>{pkg.getIn(['service', 'name'])}</TableCell>
    <TableCell>{pkg.getIn(['cycle', 'name'])}</TableCell>
    <TableCell>{pkg.get('amount', 0).toFixed(2)}</TableCell>
    <TableCell>{pkg.get('is_archived') ? 'Yes' : 'No'}</TableCell>
    <TableCell>
      <EditButton onClick={onClickHandler(pkg, 'EDIT', onHandleAction)} />
      <DeleteButton
        onClick={onClickHandler(pkg.get('id'), 'DELETE', onHandleAction)}
      />
    </TableCell>
  </TableRow>
);

export const PackageTable = ({ pkgs, onHandleAction }) => (
  <Table>
    <PackageTableHead />
    <TableBody>
      {pkgs
        .map((pkg) => (
          <PackageTableRow
            key={pkg.get('id')}
            pkg={pkg}
            onHandleAction={onHandleAction}
          />
        ))
        .toArray()}
    </TableBody>
  </Table>
);
