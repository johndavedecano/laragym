import React, { Component } from 'react';
import PropTypes from 'prop-types';

import styles from './Layouts.css';

export default class Container extends Component {
  static propTypes = {
    children: PropTypes.node,
  };

  render() {
    return <div className={styles.container}>{this.props.children}</div>;
  }
}
