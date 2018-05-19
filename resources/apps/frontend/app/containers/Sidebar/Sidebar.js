import React, { Component } from 'react';
import Divider from 'material-ui/Divider';
import Drawer from 'material-ui/Drawer';
import List from 'material-ui/List';
import Logo from 'components/Logo/Logo';
import SidebarMenu from './SidebarMenu';

import styles from './Sidebar.css';

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
          <SidebarMenu />
        </List>
      </Drawer>
    );
  }
}
