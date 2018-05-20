import React, { Component } from 'react';

import AuthScreen from 'components/Auth/AuthScreen';
import AuthPanel from 'components/Auth/AuthPanel';

export default class ResetPage extends Component {
  render() {
    return (
      <AuthScreen>
        <AuthPanel title="Reset Password">
          Hello
        </AuthPanel>
      </AuthScreen>
    );
  }
}
