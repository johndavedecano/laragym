import React, { Component } from 'react';
import cx from 'classnames';
import CircularProgress from '@material-ui/core/CircularProgress';

import styles from './PageLoader.css';

export default class AbsoluteLoader extends Component {
  render() {
    return (
      <div className={cx(styles.pageLoader, styles['pageLoader--absolute'])}>
        <CircularProgress color="secondary" />
      </div>
    );
  }
}
