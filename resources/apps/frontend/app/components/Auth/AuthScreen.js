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
        {this.props.children}
      </Grid>
    );
  }
}
