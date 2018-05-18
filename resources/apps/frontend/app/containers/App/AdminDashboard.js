import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AppMeta from './AppMeta';
import AppSidebar from './AppSidebar';

import styles from './App.css';

export default class AdminDashboard extends Component {

  static propTypes = {
    children: PropTypes.node,
  };

  render() {
    return (
      <div className={styles.appWrapper}>
        <AppMeta />
        <AppSidebar />
        <div className={styles.appRight}>{this.props.children}</div>
      </div>
    );
  }
}
