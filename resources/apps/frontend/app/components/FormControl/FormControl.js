import React, { Component } from 'react';

import styles from './FormControl.css';

export default class FormControl extends Component {
  render() {
    return <div className={styles.formControl}>{this.props.children}</div>;
  }
}
