import React, { Component } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

import styles from './PageLoader.css';

export default class PageLoader extends Component {
  render() {
    return (
      <div className={styles.pageLoader}>
        <CircularProgress color="secondary" />
      </div>
    );
  }
}
