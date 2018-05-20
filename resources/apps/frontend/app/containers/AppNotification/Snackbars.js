import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

import {
  showNotification,
  closeNotification,
  removeNotification,
} from 'actions/notification-actions';

class Snackbars extends Component {
  showNotification = (event) => {
    event.preventDefault();
    this.props.showNotification({
      type: 'snackbar',
      message: 'Hello World',
    });
  };

  handleExited = (id) => () => {
    this.props.closeNotification(id);
    setTimeout(() => {
      this.props.removeNotification(id);
    }, 2000);
  };

  handleClose = (id) => () => this.props.removeNotification(id);

  render() {
    return this.props.notifications
      .map((notification) => (
        <Snackbar
          key={notification.get('id')}
          anchorOrigin={{
            vertical: notification.get('vertical', 'bottom'),
            horizontal: notification.get('horizontal', 'center'),
          }}
          open={notification.get('isOpen', false)}
          autoHideDuration={notification.get('autoHideDuration', 6000)}
          onClose={this.handleClose(notification.get('id'))}
          onExited={this.handleExited(notification.get('id'))}
          ContentProps={{
            'aria-describedby': notification.get('id'),
          }}
          message={
            <span id={notification.get('id')}>
              {notification.get('message')}
            </span>
          }
          action={[
            <IconButton
              key="close"
              aria-label="Close"
              color="inherit"
              onClick={this.handleClose(notification.get('id'))}
            >
              <CloseIcon />
            </IconButton>,
          ]}
        />
      ))
      .toArray();
  }
}

const mapStateToProps = createSelector(
  (state) => state.getIn(['notification', 'items']),
  (notifications) => ({
    notifications,
  })
);

const mapActionsToProps = {
  showNotification,
  closeNotification,
  removeNotification,
};

export default connect(mapStateToProps, mapActionsToProps)(Snackbars);
