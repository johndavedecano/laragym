import React, { Component } from 'react';

import AppBar from '@material-ui/core/AppBar';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import styles from './Auth.css';

export default class LoginPage extends Component {
  render() {
    return (
      <Grid item xs={12} sm={12} md={6} lg={4}>
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
      </Grid>
    );
  }
}
