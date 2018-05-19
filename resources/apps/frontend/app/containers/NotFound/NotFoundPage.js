import React, { Component } from 'react';

import PublicPage from 'components/Layouts/PublicPage';
import Container from 'components/Layouts/Container';

export default class NotFoundPage extends Component {
  render() {
    return (
      <PublicPage title="404">
        <Container>
          <h1>Page Not Found</h1>
        </Container>
      </PublicPage>
    );
  }
}
