import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import LoginWrapper from 'components/Layouts/LoginWrapper';
import MetaTag from 'components/MetaTag/MetaTag';
import Snackbars from 'containers/AppNotification/Snackbars';

export default class Anonymous extends Component {
  render() {
    return (
      <LoginWrapper>
        <MetaTag />
        <Route {...this.props} />
        <Snackbars />
      </LoginWrapper>
    );
  }
}
