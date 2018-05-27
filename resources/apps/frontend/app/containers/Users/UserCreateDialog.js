import React, { Component } from 'react';
import PropTypes from 'prop-types';

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

  onSubmit = (event) => {
    event.preventDefault();
  };

  render() {
    return (
      <FormDialog
        title="Create User Account"
        contentText="Please make sure that you provide unique email address and valid name. Also you can only select jpg and png for your the avatar."
        isOpen={this.props.isOpen}
        onSubmit={this.onSubmit}
        onClose={this.props.onClose}
      >
        <AvatarField />
        <TextField
          margin="dense"
          id="name"
          name="name"
          label="Full name"
          type="text"
          fullWidth
          onChange={this.onChange}
          value={this.state.name}
          required
        />
        <TextField
          margin="dense"
          id="email"
          name="email"
          label="Email Address"
          type="email"
          fullWidth
          onChange={this.onChange}
          value={this.state.email}
          required
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
