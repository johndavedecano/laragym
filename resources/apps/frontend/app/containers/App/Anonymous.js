import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import MetaTag from 'components/MetaTag/MetaTag';

import styles from './App.css';

export default class Anonymous extends Component {
  render() {
    return (
      <div className={styles.appWrapper}>
        <MetaTag />
        <Route {...this.props} />
      </div>
    );
  }
}
