import React, { Component } from 'react';
import Drawer from 'material-ui/Drawer';

import styles from './App.css';

export default class AppSidebar extends Component {
  render() {
    return (
      <Drawer
        variant="permanent"
        classes={{
          paper: styles.appDrawer,
        }}
        anchor="left"
      >
      bbsdgsdgsdgs
      </Drawer>
    );
  }
}
