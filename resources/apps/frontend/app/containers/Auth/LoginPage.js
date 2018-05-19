import React, { Component } from 'react';

import PublicPage from 'components/Layouts/PublicPage';
import Container from 'components/Layouts/Container';

export default class LoginPage extends Component {
  render() {
    return (
      <PublicPage title="Login">
        <Container>
          <h1>Login Page</h1>
        </Container>
      </PublicPage>
    );
  }
}
