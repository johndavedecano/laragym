import React, { Component } from 'react';
import PropTypes from 'prop-types';
import omit from 'lodash/omit';

import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { DatePicker } from 'material-ui-pickers';

import AvatarField from 'components/AvatarField/AvatarField';
import FormDialog from 'components/FormDialog/FormDialog';

const INITIAL_STATE = {
  form: {},
  originalValues: {},
  isSubmitting: false,
  passwordChanged: false,
  errors: {},
};

export default class UserCreateDialog extends Component {
  static defaultProps = {
    isOpen: false,
    onClose: () => {},
  };

  static propTypes = {
    isOpen: PropTypes.bool,
    onClose: PropTypes.func,
  };

  constructor(props) {
    super(props);
    const { user } = props;

    this.state = {
      ...INITIAL_STATE,
      originalValues: {
        address: user.get('address') || '',
        avatar: user.get('avatar') || '',
        city: user.get('city') || '',
        date_of_birth: user.get('date_of_birth') || new Date(),
        email: user.get('email') || '',
        is_active: user.get('is_active'),
        is_admin: user.get('is_admin'),
        mobile: user.get('mobile') || '',
        name: user.get('name') || '',
        postal_code: user.get('postal_code') || '',
        state: user.get('state') || '',
        password_confirmation: user.get('password_confirmation') || '',
        password: user.get('password') || '',
      },
    };
  }

  componentDidMount() {
    this.isStillMounted = true;
  }

  componentWillUnmount() {
    this.isStillMounted = false;
  }

  onCheckboxChange = (name) => () => {
    this.setState({
      form: {
        ...this.state.form,
        [name]: !this.getFieldValue(name),
      },
    });
  };

  onChange = (event) => {
    this.setState({
      form: {
        ...this.state.form,
        [event.target.name]: event.target.value,
      },
    });
  };

  onChangeAvatar = (avatar) => {
    this.setState({
      form: {
        ...this.state.form,
        avatar,
      },
    });
  };

  onChangeDOB = (dob) => {
    this.setState({
      form: {
        ...this.state.form,
        date_of_birth: dob,
      },
    });
  };

  onChangePassword = (event) => {
    this.setState({
      form: {
        ...this.state.form,
        [event.target.name]: event.target.value,
      },
    });
  };

  onSubmit = async (event) => {
    try {
      if (this.state.isSubmitting) return;
      event.preventDefault();
      this.setState({ isSubmitting: true, errors: {} });
      await this.props.onSubmit(
        this.props.user.get('id'),
        this.getFormValues()
      );
      this.setState({ isSubmitting: false }, () => {
        this.props.onClose();
      });
    } catch (error) {
      this.setState({
        isSubmitting: false,
        errors: error.errors ? error.errors : {},
      });
    }
  };

  getFormValues() {
    const values = omit(this.state.form, ['password']);

    // Somehow password gets autofield.
    if (this.state.form.password !== '') {
      values.password = this.state.form.password;
      values.password_confirmation = this.state.form.password_confirmation;
    }

    return values;
  }

  /**
   * @param {String} name
   *
   * @returns {String|Boolean}
   */
  getFieldValue(name) {
    const str = (value) => (value === null ? '' : value);
    const formValue = str(this.state.form[name]);
    const origValue = str(this.state.originalValues[name]);

    if (formValue === origValue) return origValue;
    if (formValue === false) return false;
    if (typeof formValue === 'undefined') return origValue;

    return formValue;
  }

  /**
   * @param {String} name
   *
   * @returns {String|Boolean}
   */
  getHelperText(name) {
    return this.state.errors[name] && this.state.errors[name][0]
      ? this.state.errors[name][0]
      : String('');
  }

  render() {
    if (!this.props.isOpen) return null;
    return (
      <FormDialog
        method="POST"
        title="Update User Account"
        contentText=""
        isOpen={this.props.isOpen}
        isSubmitting={this.state.isSubmitting}
        onSubmit={this.onSubmit}
        onClose={this.props.onClose}
      >
        <AvatarField
          onChange={this.onChangeAvatar}
          value={this.getFieldValue('avatar')}
        />

        <Grid spacing={16} container>
          <Grid sm={12} md={6} item>
            <TextField
              margin="dense"
              id="name"
              name="name"
              label="Full name"
              type="text"
              fullWidth
              helperText={this.getHelperText('name')}
              error={!!this.state.errors.name}
              onChange={this.onChange}
              placeholder={this.state.originalValues.name}
              value={this.getFieldValue('name')}
            />
          </Grid>
          <Grid sm={12} md={6} item>
            <TextField
              margin="dense"
              id="email"
              name="email"
              label="Email Address"
              type="email"
              fullWidth
              helperText={this.getHelperText('email')}
              error={!!this.state.errors.email}
              placeholder={this.state.originalValues.email}
              onChange={this.onChange}
              value={this.getFieldValue('email')}
            />
          </Grid>
        </Grid>

        <Grid spacing={16} container>
          <Grid sm={12} md={6} item>
            <TextField
              margin="dense"
              id="mobile"
              name="mobile"
              label="Mobile Number"
              type="text"
              fullWidth
              helperText={this.getHelperText('mobile')}
              error={!!this.state.errors.mobile}
              onChange={this.onChange}
              value={this.getFieldValue('mobile')}
            />
          </Grid>
          <Grid sm={12} md={6} item>
            <DatePicker
              keyboard
              margin="dense"
              format="YYYY-MM-DD"
              label="Date of Birth"
              fullWidth
              value={this.getFieldValue('date_of_birth')}
              onChange={this.onChangeDOB}
              animateYearScrolling={false}
            />
          </Grid>
        </Grid>

        <Grid spacing={16} container>
          <Grid item xs={12}>
            <TextField
              margin="dense"
              id="address"
              name="address"
              label="Address"
              type="text"
              fullWidth
              helperText={this.getHelperText('address')}
              error={!!this.state.errors.address}
              onChange={this.onChange}
              value={this.getFieldValue('address')}
            />
          </Grid>
        </Grid>

        <Grid spacing={16} container>
          <Grid sm={12} md={6} item>
            <TextField
              margin="dense"
              id="city"
              name="city"
              label="City"
              type="text"
              fullWidth
              helperText={this.getHelperText('city')}
              error={!!this.state.errors.city}
              onChange={this.onChange}
              value={this.getFieldValue('city')}
            />
          </Grid>
          <Grid sm={12} md={3} item>
            <TextField
              margin="dense"
              id="state"
              name="state"
              label="State"
              type="text"
              fullWidth
              helperText={this.getHelperText('state')}
              error={!!this.state.errors.state}
              onChange={this.onChange}
              value={this.getFieldValue('state')}
            />
          </Grid>
          <Grid sm={12} md={3} item>
            <TextField
              margin="dense"
              id="postal_code"
              name="postal_code"
              label="Postal Code"
              type="text"
              fullWidth
              helperText={this.getHelperText('postal_code')}
              error={!!this.state.errors.postal_code}
              onChange={this.onChange}
              value={this.getFieldValue('postal_code')}
            />
          </Grid>
        </Grid>

        <Grid spacing={16} container>
          <Grid sm={12} md={6} item>
            <TextField
              margin="dense"
              id="password"
              name="password"
              label="Password"
              type="password"
              fullWidth
              helperText={this.getHelperText('password')}
              error={!!this.state.errors.password}
              onChange={this.onChangePassword}
              value={this.getFieldValue('password')}
              data-lpignore="true"
            />
          </Grid>
          <Grid sm={12} md={6} item>
            <TextField
              margin="dense"
              id="password_confirmation"
              name="password_confirmation"
              label="Password Confirmation"
              type="password"
              fullWidth
              helperText={this.getHelperText('password_confirmation')}
              error={!!this.state.errors.password_confirmation}
              onChange={this.onChangePassword}
              value={this.getFieldValue('password_confirmation')}
              data-lpignore="true"
            />
          </Grid>
        </Grid>

        <FormControlLabel
          control={
            <Checkbox
              checked={this.getFieldValue('is_admin')}
              onChange={this.onCheckboxChange('is_admin')}
              value="is_admin"
              color="primary"
            />
          }
          label="Administrator"
        />

        <FormControlLabel
          control={
            <Checkbox
              checked={this.getFieldValue('is_active')}
              onChange={this.onCheckboxChange('is_active')}
              value="is_active"
              color="primary"
            />
          }
          label="Active"
        />
      </FormDialog>
    );
  }
}
