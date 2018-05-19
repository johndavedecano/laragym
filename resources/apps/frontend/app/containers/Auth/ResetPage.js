import React, { Component } from 'react';

import PublicPage from 'components/Layouts/PublicPage';
import Container from 'components/Layouts/Container';

export default class ResetPage extends Component {
  render() {
    return (
      <PublicPage title="Reset">
        <Container>
          <h1>Reset Page</h1>
        </Container>
      </PublicPage>
    );
  }
}
