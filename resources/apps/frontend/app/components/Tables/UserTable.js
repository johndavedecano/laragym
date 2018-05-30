import React from 'react';
import * as formatDate from 'date-fns/format';
import Hidden from '@material-ui/core/Hidden';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import {
  EditButton,
  DeleteButton,
} from 'components/ActionButtons/ActionButtons';

export const UserTableHead = () => (
  <TableHead>
    <TableRow>
      <TableCell>Account #</TableCell>
      <TableCell>Name</TableCell>
      <Hidden only={['xs', 'sm']}>
        <React.Fragment>
          <TableCell>Email</TableCell>
          <TableCell>Member Since</TableCell>
        </React.Fragment>
      </Hidden>
      <TableCell>Action</TableCell>
    </TableRow>
  </TableHead>
);

const onClickHandler = (id, type, callback) => () => callback(id, type);

export const UserTableRow = ({ user, onHandleAction }) => (
  <TableRow key={user.get('id')}>
    <TableCell component="th" scope="row">
      {user.get('account_number')}
    </TableCell>
    <TableCell>{user.get('name')}</TableCell>

    <Hidden only={['xs', 'sm']}>
      <React.Fragment>
        <TableCell>{user.get('email')}</TableCell>
        <TableCell>
          {formatDate(user.get('created_at'), 'YYYY-MM-DD')}
        </TableCell>
      </React.Fragment>
    </Hidden>

    <TableCell>
      <EditButton onClick={onClickHandler(user, 'EDIT', onHandleAction)} />
      <DeleteButton
        onClick={onClickHandler(user.get('id'), 'DELETE', onHandleAction)}
      />
    </TableCell>
  </TableRow>
);

export const UserTable = ({ users, onHandleAction }) => (
  <Table>
    <UserTableHead />
    <TableBody>
      {users
        .map((user) => (
          <UserTableRow
            key={user.get('id')}
            user={user}
            onHandleAction={onHandleAction}
          />
        ))
        .toArray()}
    </TableBody>
  </Table>
);
