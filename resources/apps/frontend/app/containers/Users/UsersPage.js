import React, { Component } from 'react';

import Page from 'components/Layouts/Page';
import Container from 'components/Layouts/Container';

export default class UsersPage extends Component {
  render() {
    return (
      <Page title="Users">
        <Container>Welcome to dashboard</Container>
      </Page>
    );
  }
}
