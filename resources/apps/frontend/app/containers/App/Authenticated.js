import React, { Component } from 'react';
import PropTypes from 'prop-types';

import MetaTag from 'components/MetaTag/MetaTag';
import Sidebar from 'containers/Sidebar/Sidebar';

import styles from './App.css';

export default class AdminDashboard extends Component {

  static propTypes = {
    children: PropTypes.node,
  };

  render() {
    return (
      <div className={styles.appWrapper}>
        <MetaTag />
        <Sidebar />
        <div className={styles.appRight}>{this.props.children}</div>
      </div>
    );
  }
}
