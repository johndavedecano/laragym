import React, { Component } from 'react';

import Page from 'components/Layouts/Page';
import Container from 'components/Layouts/Container';

export default class ProfilePage extends Component {
  render() {
    return (
      <Page title="Profile">
        <Container>Welcome to dashboard</Container>
      </Page>
    );
  }
}
