import React, { Component } from 'react';
import Header from './Header';

import styles from './Layouts.css';

export default class Page extends Component {
  render() {
    return [
      <Header key="title" title={this.props.title} />,
      <main key="content" className={styles.appMain}>{this.props.children}</main>
    ]
  }
}
