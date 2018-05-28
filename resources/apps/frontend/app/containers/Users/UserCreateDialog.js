import React, { Component } from 'react';
import PropTypes from 'prop-types';
import pick from 'lodash/pick';

import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import TextField from '@material-ui/core/TextField';

import AvatarField from 'components/AvatarField/AvatarField';
import FormDialog from 'components/FormDialog/FormDialog';

export default class UserCreateDialog extends Component {
  static defaultProps = {
    isOpen: false,
    onClose: () => {},
  };

  static propTypes = {
    isOpen: PropTypes.bool,
    onClose: PropTypes.func,
  };

  state = {
    name: '',
    email: '',
    is_admin: false,
    avatar: null,
    password: '',
    password_confirmation: '',
    isSubmitting: false,
    errors: {},
  };

  onCheckboxChange = (name) => () => {
    this.setState({
      [name]: !this.state[name],
    });
  };

  onChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  onChangeAvatar = (avatar) => {
    this.setState({
      avatar,
    });
  };

  onSubmit = async (event) => {
    try {
      if (this.state.isSubmitting) return;
      event.preventDefault();
      this.setState({ isSubmitting: true, errors: {} });
      await this.props.onSubmit(
        pick(this.state, [
          'email',
          'name',
          'avatar',
          'is_admin',
          'password',
          'password_confirmation',
        ])
      );
      this.setState({ isSubmitting: false, errors: {} });
      this.props.onClose();
    } catch (error) {
      if (error.errors) {
        this.setState({ errors: error.errors });
      }
      this.setState({
        isSubmitting: false,
      });
    }
  };

  getHelperText(name) {
    if (this.state.errors[name] && this.state.errors[name][0]) {
      return this.state.errors[name][0];
    }
    return String('');
  }

  render() {
    return (
      <FormDialog
        title="Create User Account"
        contentText="Please make sure that you provide unique email address and valid name. Also you can only select jpg and png for your the avatar."
        isOpen={this.props.isOpen}
        isSubmitting={this.state.isSubmitting}
        onSubmit={this.onSubmit}
        onClose={this.props.onClose}
      >
        <AvatarField onChange={this.onChangeAvatar} value={this.state.avatar} />

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
          value={this.state.name}
        />

        <TextField
          margin="dense"
          id="email"
          name="email"
          label="Email Address"
          type="email"
          fullWidth
          helperText={this.getHelperText('email')}
          error={!!this.state.errors.email}
          onChange={this.onChange}
          value={this.state.email}
        />

        <TextField
          margin="dense"
          id="password"
          name="password"
          label="Password"
          type="password"
          fullWidth
          helperText={this.getHelperText('password')}
          error={!!this.state.errors.password}
          onChange={this.onChange}
          value={this.state.password}
        />

        <TextField
          margin="dense"
          id="password_confirmation"
          name="password_confirmation"
          label="Password Confirmation"
          type="password"
          fullWidth
          helperText={this.getHelperText('password_confirmation')}
          error={!!this.state.errors.password_confirmation}
          onChange={this.onChange}
          value={this.state.password_confirmation}
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={this.state.is_admin}
              onChange={this.onCheckboxChange('is_admin')}
              value="is_admin"
              color="primary"
            />
          }
          label="Administrator"
        />
      </FormDialog>
    );
  }
}
