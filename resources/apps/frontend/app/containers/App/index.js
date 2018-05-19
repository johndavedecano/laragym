import React from 'react';
import { Switch } from 'react-router-dom';

import Authenticated from 'containers/App/Authenticated';
import Anonymous from 'containers/App/Anonymous';

import CyclesPage from 'containers/Cycles/CyclesPage';
import HomePage from 'containers/Home/HomePage';
import InvoicesPage from 'containers/Invoices/InvoicesPage';
import PackagesPage from 'containers/Packages/PackagesPage';
import ProfilePage from 'containers/Profile/ProfilePage';
import ServicesPage from 'containers/Services/ServicesPage';
import SettingsPage from 'containers/Settings/SettingsPage';
import SubscriptionsPage from 'containers/Subscriptions/SubscriptionsPage';
import UsersPage from 'containers/Users/UsersPage';

import LoginPage from 'containers/Auth/LoginPage';
import ForgotPage from 'containers/Auth/ForgotPage';
import ResetPage from 'containers/Auth/ResetPage';
import NotFoundPage from 'containers/NotFound/NotFoundPage';

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
      <Authenticated component={SubscriptionsPage} exact path="/subscriptions" />
      <Authenticated component={UsersPage} exact path="/users" />
      <Anonymous component={LoginPage} path="/login" />
      <Anonymous component={ForgotPage} path="/forgot" />
      <Anonymous component={ResetPage} path="/reset" />
      <Anonymous component={NotFoundPage} exact path="" />
    </Switch>
  );
}
