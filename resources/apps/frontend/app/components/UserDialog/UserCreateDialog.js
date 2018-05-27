import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import Dialog from '@material-ui/core/Dialog';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';

import styles from './UserModal.css';

export default class UserCreateDialog extends Component {
  static defaultProps = {
    isOpen: false,
    isSubmitting: false,
    onClose: () => {},
  };

  static propTypes = {
    isOpen: PropTypes.bool,
    isSubmitting: PropTypes.bool,
    onClose: PropTypes.func,
  };

  state = {
    name: '',
    email: '',
    is_admin: false,
  };

  onClose = () => {
    if (!this.props.isSubmitting) {
      this.props.onClose();
    }
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
      <Dialog
        open={this.props.isOpen}
        onClose={this.onClose}
        aria-labelledby="form-dialog-title"
      >
        <form onSubmit={this.onSubmit}>
          <DialogTitle id="form-dialog-title">Create User Account</DialogTitle>
          <DialogContent className={styles.userModal}>
            <DialogContentText>
              Please select valid name and email address.
            </DialogContentText>
            <TextField
              autoFocus
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
          </DialogContent>
          <DialogActions>
            <Button
              type="reset"
              onClick={this.handleClose}
              color="primary"
              disabled={this.props.isSubmitting}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              onClick={this.handleClose}
              color="primary"
              disabled={this.props.isSubmitting}
            >
              {this.props.isSubmitting ? 'Please Wait...' : 'Submit'}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    );
  }
}
