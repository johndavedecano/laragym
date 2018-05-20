import React, { Component } from 'react';

import AuthScreen from 'components/Auth/AuthScreen';
import AuthPanel from 'components/Auth/AuthPanel';

export default class ForgotPage extends Component {
  render() {
    return (
      <AuthScreen>
        <AuthPanel title="Forgot Password">
          Hello
        </AuthPanel>
      </AuthScreen>
    );
  }
}
