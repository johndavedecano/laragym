import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import styles from './FormDialog.css';

export default class UserCreateDialog extends Component {
  static defaultProps = {
    cancelText: 'Cancel',
    contentText: null,
    customActions: undefined,
    isOpen: false,
    isSubmitting: false,
    onClose: () => {},
    submitText: 'Submit',
    title: '',
  };

  static propTypes = {
    isOpen: PropTypes.bool,
    isSubmitting: PropTypes.bool,
    onClose: PropTypes.func,
    contentText: PropTypes.oneOfType([PropTypes.node, PropTypes.element]),
    children: PropTypes.oneOfType([PropTypes.node, PropTypes.element]),
    title: PropTypes.string,
    customActions: PropTypes.func,
  };

  onSubmit = (event) => {
    if (this.props.isSubmitting) return;
    event.preventDefault();
    this.props.onSubmit(event);
  };

  onClose = (event) => {
    if (this.props.isSubmitting) return;
    event.preventDefault();
    this.props.onClose();
  };

  renderDialogActions() {
    if (this.props.customActions) {
      return this.props.customActions();
    }
    return (
      <React.Fragment>
        <Button
          type="button"
          onClick={this.onClose}
          color="primary"
          disabled={this.props.isSubmitting}
        >
          {this.props.cancelText}
        </Button>
        <Button
          type="submit"
          color="primary"
          disabled={this.props.isSubmitting}
        >
          {this.props.isSubmitting ? 'Please Wait...' : this.props.submitText}
        </Button>
      </React.Fragment>
    );
  }

  render() {
    return (
      <Dialog
        open={this.props.isOpen}
        onClose={this.onClose}
        aria-labelledby="form-dialog-title"
        disableBackdropClick
      >
        <DialogTitle id="form-dialog-title">{this.props.title}</DialogTitle>
        <form method="POST" action="/" onSubmit={this.onSubmit}>
          <DialogContent className={styles.formDialog}>
            {this.props.contentText && (
              <DialogContentText>{this.props.contentText}</DialogContentText>
            )}
            {this.props.children}
          </DialogContent>
          <DialogActions>{this.renderDialogActions()}</DialogActions>
        </form>
      </Dialog>
    );
  }
}
