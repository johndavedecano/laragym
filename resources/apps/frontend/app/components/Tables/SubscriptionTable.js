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
  ViewButton,
} from 'components/ActionButtons/ActionButtons';

export const SubscriptionTableHead = () => (
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

export const SubscriptionTableRow = ({ subscription, onHandleAction }) => (
  <TableRow key={subscription.get('id')}>
    <TableCell component="th" scope="row">
      {subscription.get('id')}
    </TableCell>
    <TableCell>{subscription.get('name')}</TableCell>
    <TableCell>{subscription.getIn(['service', 'name'])}</TableCell>
    <TableCell>{subscription.getIn(['cycle', 'name'])}</TableCell>
    <TableCell>{subscription.get('amount', 0).toFixed(2)}</TableCell>
    <TableCell>{subscription.get('is_archived') ? 'Yes' : 'No'}</TableCell>
    <TableCell>
      <ViewButton onClick={onClickHandler(subscription.get('id'), 'VIEW', onHandleAction)} />
      <EditButton onClick={onClickHandler(subscription, 'EDIT', onHandleAction)} />
      <DeleteButton
        onClick={onClickHandler(subscription.get('id'), 'DELETE', onHandleAction)}
      />
    </TableCell>
  </TableRow>
);

export const SubscriptionTable = ({ subscriptions, onHandleAction }) => (
  <Table>
    <SubscriptionTableHead />
    <TableBody>
      {subscriptions
        .map((subscription) => (
          <SubscriptionTableRow
            key={subscription.get('id')}
            subscription={subscription}
            onHandleAction={onHandleAction}
          />
        ))
        .toArray()}
    </TableBody>
  </Table>
);
