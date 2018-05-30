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

export const ServiceTableHead = () => (
  <TableHead>
    <TableRow>
      <TableCell>#</TableCell>
      <TableCell>Name</TableCell>
      <TableCell>Description</TableCell>
      <TableCell>Archived</TableCell>
      <TableCell>Action</TableCell>
    </TableRow>
  </TableHead>
);

const onClickHandler = (id, type, callback) => () => callback(id, type);

export const ServiceTableRow = ({ service, onHandleAction }) => (
  <TableRow key={service.get('id')}>
    <TableCell component="th" scope="row">
      {service.get('id')}
    </TableCell>
    <TableCell>{service.get('name')}</TableCell>
    <TableCell>{service.get('description')}</TableCell>
    <TableCell>{service.get('is_archived') ? 'Yes' : 'No'}</TableCell>
    <TableCell>
      <EditButton onClick={onClickHandler(service, 'EDIT', onHandleAction)} />
      <DeleteButton
        onClick={onClickHandler(service.get('id'), 'DELETE', onHandleAction)}
      />
    </TableCell>
  </TableRow>
);

export const ServiceTable = ({ services, onHandleAction }) => (
  <Table>
    <ServiceTableHead />
    <TableBody>
      {services
        .map((service) => (
          <ServiceTableRow
            key={service.get('id')}
            service={service}
            onHandleAction={onHandleAction}
          />
        ))
        .toArray()}
    </TableBody>
  </Table>
);
