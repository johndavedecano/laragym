import React from 'react';
import { Switch } from 'react-router-dom';

import Authenticated from 'containers/App/Authenticated';
import Anonymous from 'containers/App/Anonymous';
import NotFound from 'containers/App/NotFound';
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
      <Authenticated title="Dashboard" exact path="/" component={HomePage} />
      <Authenticated
        title="Cycles"
        component={CyclesPage}
        exact
        path="/cycles"
      />
      <Authenticated
        title="Invoices"
        component={InvoicesPage}
        exact
        path="/invoices"
      />
      <Authenticated
        title="Packages"
        component={PackagesPage}
        exact
        path="/packages"
      />
      <Authenticated
        title="Profile"
        component={ProfilePage}
        exact
        path="/profile"
      />
      <Authenticated
        title="Services"
        component={ServicesPage}
        exact
        path="/services"
      />
      <Authenticated
        title="Settings"
        component={SettingsPage}
        exact
        path="/settings"
      />
      <Authenticated title="Users" component={UsersPage} exact path="/users" />
      <Authenticated
        title="Subscriptions"
        component={SubscriptionsPage}
        exact
        path="/subscriptions"
      />
      <Anonymous title="Account Login" component={LoginPage} path="/login" />
      <Anonymous
        title="Forgot Password"
        component={ForgotPage}
        path="/forgot"
      />
      <Anonymous title="Reset Password" component={ResetPage} path="/reset" />
      <NotFound title="Page Not Found" component={NotFoundPage} exact path="" />
    </Switch>
  );
}
