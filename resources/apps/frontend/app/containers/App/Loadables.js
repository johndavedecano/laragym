import React from 'react';
import Loadable from 'react-loadable';

const Loading = () => <div>Please Wait...</div>;

export const CyclesPage = Loadable({
  loader: () => import('containers/Cycles/CyclesPage'),
  loading: Loading,
});

export const HomePage = Loadable({
  loader: () => import('containers/Home/HomePage'),
  loading: Loading,
});

export const InvoicesPage = Loadable({
  loader: () => import('containers/Invoices/InvoicesPage'),
  loading: Loading,
});

export const PackagesPage = Loadable({
  loader: () => import('containers/Packages/PackagesPage'),
  loading: Loading,
});

export const ProfilePage = Loadable({
  loader: () => import('containers/Profile/ProfilePage'),
  loading: Loading,
});

export const ServicesPage = Loadable({
  loader: () => import('containers/Services/ServicesPage'),
  loading: Loading,
});

export const SettingsPage = Loadable({
  loader: () => import('containers/Settings/SettingsPage'),
  loading: Loading,
});

export const SubscriptionsPage = Loadable({
  loader: () => import('containers/Subscriptions/SubscriptionsPage'),
  loading: Loading,
});

export const UsersPage = Loadable({
  loader: () => import('containers/Users/UsersPage'),
  loading: Loading,
});

export const LoginPage = Loadable({
  loader: () => import('containers/Auth/LoginPage'),
  loading: Loading,
});

export const ForgotPage = Loadable({
  loader: () => import('containers/Auth/ForgotPage'),
  loading: Loading,
});

export const ResetPage = Loadable({
  loader: () => import('containers/Auth/ResetPage'),
  loading: Loading,
});

export const NotFoundPage = Loadable({
  loader: () => import('containers/NotFound/NotFoundPage'),
  loading: Loading,
});
