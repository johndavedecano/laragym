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
        key={this.props.isSidebarOpen}
        variant="permanent"
        classes={{
          paper: this.props.isSidebarOpen
            ? styles.appDrawer
            : styles.appDrawerMobile,
        }}
        anchor="left"
      >
        <List>
          <Logo isSidebarOpen={this.props.isSidebarOpen} />
          <Divider />
          <SidebarMenu />
        </List>
      </Drawer>
    );
  }
}
