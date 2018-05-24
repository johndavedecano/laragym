import React from 'react';
import cx from 'classnames';
import styles from './Layouts.css';

export default (props) => (
  <div
    className={cx({
      [styles.appRight]: props.isSidebarOpen,
      [styles.appRightMobile]: !props.isSidebarOpen,
    })}
  >
    {props.children}
  </div>
);
