import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { compose } from 'recompose';

import withAuthentication from 'hoc/withAuthentication';

import MetaTag from 'components/MetaTag/MetaTag';
import Sidebar from 'containers/Sidebar/Sidebar';

import styles from './App.css';

class Authenticated extends Component {
  render() {
    return (
      <div className={styles.appWrapper}>
        <MetaTag />
        <Sidebar />
        <div className={styles.appRight}>
          <Route {...this.props} />
        </div>
      </div>
    );
  }
}

export default compose(withAuthentication)(Authenticated);
