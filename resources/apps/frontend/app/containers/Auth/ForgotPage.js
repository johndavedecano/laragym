import React, { Component } from 'react';

import PublicPage from 'components/Layouts/PublicPage';
import Container from 'components/Layouts/Container';

export default class ForgotPage extends Component {
  render() {
    return (
      <PublicPage title="Forgot">
        <Container>
          <h1>Forgot Page</h1>
        </Container>
      </PublicPage>
    );
  }
}
