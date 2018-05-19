import React from 'react';
import { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import { Link } from 'react-router-dom';

const MenuItem = (props) => (
  <Link to={props.to}>
    <ListItem button>
      <ListItemIcon>{props.children}</ListItemIcon>
      <ListItemText primary={props.primary} />
    </ListItem>
  </Link>
);

export default MenuItem;
