import React, { Component } from 'react';

import AppBar from '@material-ui/core/AppBar';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import styles from './Auth.css';

export default class LoginPage extends Component {
  render() {
    return (
      <div>
        <AppBar position="static" className={styles.loginTitle}>
          <Typography
            variant="title"
            color="inherit"
            align="center"
            className={styles.loginHeader}
          >
            {this.props.title}
          </Typography>
        </AppBar>
        <Paper className={styles.loginForm}>{this.props.children}</Paper>
      </div>
    );
  }
}
