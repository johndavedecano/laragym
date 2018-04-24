import React, { Component } from 'react';

import Page from 'components/Layouts/Page';
import Container from 'components/Layouts/Container';

export default class HomePage extends Component {
  render() {
    return (
      <Page title="Dashboard">
        <Container>Welcome to dashboard</Container>
      </Page>
    );
  }
}
