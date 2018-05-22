import React, { Component } from 'react';

import Grid from '@material-ui/core/Grid';

import { Panel, PanelBody, PanelHeader } from 'components/Panel/Panel';

import Container from 'components/Layouts/Container';

export default class UsersPage extends Component {
  render() {
    return (
      <Container>
        <Grid container>
          <Grid item xs={12}>
            <Panel>
              <PanelHeader title="Latest Activities" />
              <PanelBody>sdfsdfsfs</PanelBody>
            </Panel>
          </Grid>
        </Grid>
        <Grid container spacing={16}>
          <Grid item xs={12} lg={4}>
            <Panel>
              <PanelHeader title="Statistic 1" />
              <PanelBody>sdfsdfsfs</PanelBody>
            </Panel>
          </Grid>
          <Grid item xs={12} lg={4}>
            <Panel>
              <PanelHeader title="Statistic 2" />
              <PanelBody>sdfsdfsfs</PanelBody>
            </Panel>
          </Grid>
          <Grid item xs={12} lg={4}>
            <Panel>
              <PanelHeader title="Statistic 3" />
              <PanelBody>sdfsdfsfs</PanelBody>
            </Panel>
          </Grid>
        </Grid>
      </Container>
    );
  }
}
