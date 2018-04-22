/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React from 'react';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import { Switch, Route } from 'react-router-dom';
import CssBaseline from 'material-ui/CssBaseline';

import HomePage from 'containers/Home/HomePage';
import NotFoundPage from 'containers/NotFound/NotFoundPage';

export default function App() {
  return (
    <div>
      <CssBaseline />
      <Helmet
        titleTemplate="%s - React.js Boilerplate"
        defaultTitle="React.js Boilerplate"
      >
        <meta name="description" content="A React.js Boilerplate application" />
      </Helmet>
      {/* <Header /> */}
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="" component={NotFoundPage} />
      </Switch>
      {/* <Footer /> */}
    </div>
  );
}
