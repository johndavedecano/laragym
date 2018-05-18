import React from 'react';
import { Switch, Route } from 'react-router-dom';

import CyclesPage from 'containers/Cycles/CyclesPage';
import HomePage from 'containers/Home/HomePage';
import InvoicesPage from 'containers/Invoices/InvoicesPage';
import NotFoundPage from 'containers/NotFound/NotFoundPage';
import PackagesPage from 'containers/Packages/PackagesPage';
import ProfilePage from 'containers/Profile/ProfilePage';
import ServicesPage from 'containers/Services/ServicesPage';
import SettingsPage from 'containers/Settings/SettingsPage';
import SubscriptionsPage from 'containers/Subscriptions/SubscriptionsPage';
import UsersPage from 'containers/Users/UsersPage';
import AdminDashboard from './AdminDashboard';

export default function App() {
  return (
    <AdminDashboard>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route component={CyclesPage} exact path="/cycles" />
        <Route component={InvoicesPage} exact path="/invoices" />
        <Route component={PackagesPage} exact path="/packages" />
        <Route component={ProfilePage} exact path="/profile" />
        <Route component={ServicesPage} exact path="/services" />
        <Route component={SettingsPage} exact path="/settings" />
        <Route component={SubscriptionsPage} exact path="/subscriptions" />
        <Route component={UsersPage} exact path="/users" />
        <Route path="" component={NotFoundPage} />
      </Switch>
    </AdminDashboard>
  );
}
