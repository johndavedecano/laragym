/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React from 'react';

import { Switch, Route } from 'react-router-dom';

import Header from 'components/Layouts/Header';
import AppMeta from './AppMeta';
import AppSidebar from './AppSidebar';
import HomePage from 'containers/Home/HomePage';
import NotFoundPage from 'containers/NotFound/NotFoundPage';

import styles from './App.css';

export default function App() {
  return (
    <div className={styles.appWrapper}>
      <AppMeta />
      <AppSidebar />
      <div className={styles.appRight}>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="" component={NotFoundPage} />
        </Switch>
      </div>
    </div>
  );
}
