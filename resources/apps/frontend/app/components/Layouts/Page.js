import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Header from './Header';

import styles from './Layouts.css';

export default class Page extends Component {
  static propTypes = {
    children: PropTypes.node,
  };

  render() {
    return [
      <Header
        key="title"
        title={this.props.title}
        onLogout={this.props.onLogout}
      />,
      <main key="content" className={styles.appMain}>
        {this.props.children}
      </main>,
    ];
  }
}
