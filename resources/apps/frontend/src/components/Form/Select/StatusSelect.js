import React from 'react';
import {Input} from 'reactstrap';

export default props => {
  return (
    <Input type="select" {...props} name={props.name}>
      <option value="active">Active</option>
      <option value="deleted">Deleted</option>
    </Input>
  );
};
