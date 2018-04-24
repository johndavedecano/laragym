import React, { Component } from 'react';

import AppMeta from './AppMeta';
import AppSidebar from './AppSidebar';
import Header from 'components/Layouts/Header';
import HomePage from 'containers/Home/HomePage';

import styles from './App.css';

export default class AdminDashboard extends Component {
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
