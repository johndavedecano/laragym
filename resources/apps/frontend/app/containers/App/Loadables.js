import Loadable from 'react-loadable';

import Loading from 'components/PageLoader/PageLoader';

const GLOBAL_DELAY = 3000;

export const CyclesPage = Loadable({
  loader: () => import('containers/Cycles/CyclesPage'),
  loading: Loading,
  delay: GLOBAL_DELAY,
});

export const HomePage = Loadable({
  loader: () => import('containers/Home/HomePage'),
  loading: Loading,
  delay: GLOBAL_DELAY,
});

export const InvoicesPage = Loadable({
  loader: () => import('containers/Invoices/InvoicesPage'),
  loading: Loading,
  delay: GLOBAL_DELAY,
});

export const PackagesPage = Loadable({
  loader: () => import('containers/Packages/PackagesPage'),
  loading: Loading,
  delay: GLOBAL_DELAY,
});

export const AccountPage = Loadable({
  loader: () => import('containers/Account/AccountPage'),
  loading: Loading,
  delay: GLOBAL_DELAY,
});

export const AttendancePage = Loadable({
  loader: () => import('containers/Attendance/AttendancePage'),
  loading: Loading,
  delay: GLOBAL_DELAY,
});

export const ActivitiesPage = Loadable({
  loader: () => import('containers/Activities/ActivitiesPage'),
  loading: Loading,
  delay: GLOBAL_DELAY,
});

export const ServicesPage = Loadable({
  loader: () => import('containers/Services/ServicesPage'),
  loading: Loading,
  delay: GLOBAL_DELAY,
});

export const SettingsPage = Loadable({
  loader: () => import('containers/Settings/SettingsPage'),
  loading: Loading,
  delay: GLOBAL_DELAY,
});

export const SubscriptionsPage = Loadable({
  loader: () => import('containers/Subscriptions/SubscriptionsPage'),
  loading: Loading,
  delay: GLOBAL_DELAY,
});

export const UsersPage = Loadable({
  loader: () => import('containers/Users/UsersPage'),
  loading: Loading,
  delay: GLOBAL_DELAY,
});

export const LoginPage = Loadable({
  loader: () => import('containers/Auth/LoginPage'),
  loading: Loading,
  delay: GLOBAL_DELAY,
});

export const ForgotPage = Loadable({
  loader: () => import('containers/Auth/ForgotPage'),
  loading: Loading,
  delay: GLOBAL_DELAY,
});

export const ResetPage = Loadable({
  loader: () => import('containers/Auth/ResetPage'),
  loading: Loading,
  delay: GLOBAL_DELAY,
});

export const NotFoundPage = Loadable({
  loader: () => import('containers/NotFound/NotFoundPage'),
  loading: Loading,
  delay: GLOBAL_DELAY,
});
