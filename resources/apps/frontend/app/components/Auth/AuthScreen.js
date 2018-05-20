import React, { Component } from 'react';

import Grid from '@material-ui/core/Grid';

import styles from './Auth.css';

export default class AuthScreen extends Component {
  render() {
    return (
      <Grid
        container
        spacing={16}
        justify="center"
        className={styles.loginScreen}
      >
        <Grid item xs={12} sm={12} md={4} lg={3}>
          {this.props.children}
        </Grid>
      </Grid>
    );
  }
}
