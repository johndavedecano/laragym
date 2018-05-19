import React from 'react';
import { Switch } from 'react-router-dom';

import Authenticated from 'containers/App/Authenticated';
import Anonymous from 'containers/App/Anonymous';

/**
 * Code Splitting Baby. Yeah
 */
import {
  CyclesPage,
  HomePage,
  InvoicesPage,
  PackagesPage,
  ProfilePage,
  ServicesPage,
  SettingsPage,
  SubscriptionsPage,
  UsersPage,
  LoginPage,
  ForgotPage,
  ResetPage,
  NotFoundPage,
} from './Loadables';

export default function App() {
  return (
    <Switch>
      <Authenticated exact path="/" component={HomePage} />
      <Authenticated component={CyclesPage} exact path="/cycles" />
      <Authenticated component={InvoicesPage} exact path="/invoices" />
      <Authenticated component={PackagesPage} exact path="/packages" />
      <Authenticated component={ProfilePage} exact path="/profile" />
      <Authenticated component={ServicesPage} exact path="/services" />
      <Authenticated component={SettingsPage} exact path="/settings" />
      <Authenticated
        component={SubscriptionsPage}
        exact
        path="/subscriptions"
      />
      <Authenticated component={UsersPage} exact path="/users" />
      <Anonymous component={LoginPage} path="/login" />
      <Anonymous component={ForgotPage} path="/forgot" />
      <Anonymous component={ResetPage} path="/reset" />
      <Anonymous component={NotFoundPage} exact path="" />
    </Switch>
  );
}
