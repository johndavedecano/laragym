import React, { Component } from 'react';

import Grid from '@material-ui/core/Grid';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import { PanelFilterContainter } from 'components/Panel/Panel';
import PackagesDropdown from 'containers/Dropdowns/PackagesDropdown';
import UsersDropdown from 'containers/Dropdowns/UsersDropdown';
import ServicesDropdown from 'containers/Dropdowns/ServicesDropdown';
import CyclesDropdown from 'containers/Dropdowns/CyclesDropdown';

export default class SubscriptionsFilter extends Component {
  static defaultProps = {
    user_id: '',
    cycle_id: '',
    service_id: '',
    package_id: '',
    is_archived: false,
    is_suspended: false,
    onChange: () => {},
  };

  onCheckboxChange = (name) => () => {
    this.props.onChange(name, !this.props[name]);
  };

  onSubmit = (event) => event.preventDefault();

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <PanelFilterContainter>
          <Grid spacing={16} container>
            <Grid item sm={12} md={6} lg={3}>
              <UsersDropdown />
            </Grid>
            <Grid item sm={12} md={6} lg={3}>
              <CyclesDropdown />
            </Grid>
            <Grid item sm={12} md={6} lg={3}>
              <ServicesDropdown />
            </Grid>
            <Grid item sm={12} md={6} lg={3}>
              <PackagesDropdown />
            </Grid>
          </Grid>
          <Grid spacing={16} container>
            <Grid item>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={this.props.is_suspended}
                    onChange={this.onCheckboxChange('is_suspended')}
                    value="is_suspended"
                    color="primary"
                  />
                }
                label="Expired"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={this.props.is_expired}
                    onChange={this.onCheckboxChange('is_expired')}
                    value="is_expired"
                    color="primary"
                  />
                }
                label="Expired"
              />
            </Grid>
          </Grid>
        </PanelFilterContainter>
      </form>
    );
  }
}
