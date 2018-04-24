import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import styles from './Logo.css';

export default () => {
  return (
    <div className={styles.logo}>
      <Link to="/">
        Gym Management <span>Version 2</span>
      </Link>
    </div>
  );
};
