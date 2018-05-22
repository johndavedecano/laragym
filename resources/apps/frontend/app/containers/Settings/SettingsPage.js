import React, { Component } from 'react';

import SaveIcon from '@material-ui/icons/Save';
import Button from '@material-ui/core/Button';

import {
  Panel,
  PanelBody,
  PanelHeader,
  PanelFooter,
  PanelActions,
} from 'components/Panel/Panel';

import Container from 'components/Layouts/Container';

export default class InvoicesPage extends Component {
  render() {
    return (
      <Container>
        <Panel>
          <PanelHeader title="Manage Invoices" />
          <PanelBody>sdfsdfsfs</PanelBody>
          <PanelFooter>
            <PanelActions>
              <Button size="large" variant="raised" color="primary">
                <SaveIcon />
                Save Settings
              </Button>
            </PanelActions>
          </PanelFooter>
        </Panel>
      </Container>
    );
  }
}
