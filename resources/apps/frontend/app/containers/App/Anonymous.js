import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import MetaTag from 'components/MetaTag/MetaTag';
import Snackbars from 'containers/AppNotification/Snackbars';
import styles from './App.css';

export default class Anonymous extends Component {
  render() {
    return (
      <div className={styles.loginWrapper}>
        <MetaTag />
        <Route {...this.props} />
        <Snackbars />
      </div>
    );
  }
}
