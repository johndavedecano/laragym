import React, { Component } from 'react';
import Divider from 'material-ui/Divider';
import Drawer from 'material-ui/Drawer';
import List from 'material-ui/List';
import Logo from 'components/Logo/Logo';
import AppMenu from './AppMenu';

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
        <List>
          <Logo />
          <Divider />
          <AppMenu />
        </List>
      </Drawer>
    );
  }
}
