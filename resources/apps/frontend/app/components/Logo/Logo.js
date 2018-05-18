import React from 'react';
import { Link } from 'react-router-dom';

import styles from './Logo.css';

const Logo = () => (
  <div className={styles.logo}>
    <Link to="/">
        Gym Management <span>Version 2</span>
    </Link>
  </div>
  );

export default Logo;
