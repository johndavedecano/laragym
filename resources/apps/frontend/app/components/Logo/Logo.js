import React from 'react';
import { Link } from 'react-router-dom';

import styles from './Logo.css';

const Logo = ({ isSidebarOpen }) => (
  <div className={styles.logo}>
    {isSidebarOpen ? <Link to="/">Gym Management</Link> : <Link to="/">G</Link>}
  </div>
);

export default Logo;
