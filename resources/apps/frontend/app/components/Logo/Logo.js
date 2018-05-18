import React from 'react';
import { Link } from 'react-router-dom';

import styles from './Logo.css';

const Logo = () => (
  <div className={styles.logo}>
    <Link to="/">
        Gym Management
    </Link>
  </div>
  );

export default Logo;
