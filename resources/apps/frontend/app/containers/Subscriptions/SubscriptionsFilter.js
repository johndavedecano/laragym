import React, { Component } from 'react';

import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';

import { PanelFilterContainter } from 'components/Panel/Panel';
import PackagesDropdown from 'containers/Dropdowns/PackagesDropdown';
import UsersDropdown from 'containers/Dropdowns/UsersDropdown';
// import ServicesDropdown from 'containers/Dropdowns/ServicesDropdown';
// import CyclesDropdown from 'containers/Dropdowns/CyclesDropdown';

export default class SubscriptionsFilter extends Component {
  static defaultProps = {
    user_id: '',
    cycle_id: '',
    service_id: '',
    package_id: '',
    is_archived: false,
    is_suspended: false,
    by_user: true,
    onChange: () => {},
    onChangeFilter: () => {},
  };

  onCheckboxChange = (name) => () => {
    this.props.onChange(name, !this.props[name]);
  };

  onChangePackage = (value) => {
    this.props.onChange('package_id', value);
  };

  onChangeUser = (value) => {
    this.props.onChange('user_id', value);
  };

  onSubmit = (event) => {
    event.preventDefault();
    this.props.onSubmit();
  };

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <PanelFilterContainter>
          <Grid spacing={16} container>
            <Grid item xs={12} md={6}>
              <UsersDropdown
                value={this.props.user_id}
                clearable
                onChange={this.onChangeUser}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <PackagesDropdown
                value={this.props.package_id}
                clearable
                onChange={this.onChangePackage}
              />
            </Grid>

            <Grid item xs={12}>
              <Grid container alignItems="center">
                <Grid item sm={12} md={11}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={this.props.is_suspended}
                        onChange={this.onCheckboxChange('is_suspended')}
                        value="is_suspended"
                        color="primary"
                      />
                    }
                    label="Suspended"
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
                <Grid item sm={12} md={1}>
                  <Button
                    type="button"
                    variant="raised"
                    color="primary"
                    onClick={this.props.onSubmit}
                    fullWidth
                  >
                    Filter
                  </Button>
                </Grid>
              </Grid>
            </Grid>
            {/* <Grid item sm={12} md={6} lg={3}>
              <CyclesDropdown />
            </Grid> */}
            {/* <Grid item sm={12} md={6} lg={3}>
              <ServicesDropdown />
            </Grid>
            <Grid item sm={12} md={6} lg={3}>
              <PackagesDropdown />
            </Grid> */}
          </Grid>
          {/* <Grid spacing={16} container>
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
          </Grid> */}
        </PanelFilterContainter>
      </form>
    );
  }
}
