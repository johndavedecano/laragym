import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import styles from './Modal.css';

export default class UserCreateDialog extends Component {
  static defaultProps = {
    isOpen: false,
    onClose: () => {},
    title: '',
    actions: null,
  };

  static propTypes = {
    isOpen: PropTypes.bool,
    onClose: PropTypes.func,
    children: PropTypes.oneOfType([PropTypes.node, PropTypes.element]),
    actions: PropTypes.oneOfType([PropTypes.node, PropTypes.element]),
    title: PropTypes.string,
  };

  render() {
    return (
      <Dialog
        open={this.props.isOpen}
        onClose={this.props.onClose}
        aria-labelledby="form-dialog-title"
      >
        {this.props.title && (
          <DialogTitle id="form-dialog-title">{this.props.title}</DialogTitle>
        )}

        <DialogContent className={styles.modal}>
          {this.props.children}
        </DialogContent>

        {this.props.actions && (
          <DialogActions>{this.props.actions}</DialogActions>
        )}
      </Dialog>
    );
  }
}
