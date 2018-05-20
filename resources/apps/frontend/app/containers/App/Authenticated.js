import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { compose } from 'recompose';

import withAuthentication from 'hoc/withAuthentication';

import MetaTag from 'components/MetaTag/MetaTag';
import Sidebar from 'containers/Sidebar/Sidebar';
import Snackbars from 'containers/AppNotification/Snackbars';
import Page from 'components/Layouts/Page';

import styles from './App.css';

class Authenticated extends Component {
  render() {
    return (
      <div className={styles.appWrapper}>
        <MetaTag />
        <Sidebar />
        <div className={styles.appRight}>
          <Page title={this.props.title} onLogout={this.props.logout}>
            <Route {...this.props} />
          </Page>
        </div>
        <Snackbars />
      </div>
    );
  }
}

export default compose(withAuthentication)(Authenticated);
