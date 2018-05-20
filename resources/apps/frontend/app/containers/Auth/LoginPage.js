import React, { Component } from 'react';

import AuthScreen from 'components/Auth/AuthScreen';
import AuthPanel from 'components/Auth/AuthPanel';

export default class LoginPage extends Component {
  render() {
    return (
      <AuthScreen>
        <AuthPanel title="Account Login">
          Hello
        </AuthPanel>
      </AuthScreen>
    );
  }
}
