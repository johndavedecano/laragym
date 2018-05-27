import React from 'react';
import DnsIcon from '@material-ui/icons/Dns';
import HomeIcon from '@material-ui/icons/Home';
import PaymentIcon from '@material-ui/icons/Payment';
import ReceiptIcon from '@material-ui/icons/Receipt';
import RedeemIcon from '@material-ui/icons/Redeem';
import SettingsIcon from '@material-ui/icons/Settings';
import UpdateIcon from '@material-ui/icons/Update';
import UserIcon from '@material-ui/icons/SupervisorAccount';
import AlarmIcon from '@material-ui/icons/Alarm';
import ActivitiesIcon from '@material-ui/icons/Dvr';

import MenuItem from 'components/MenuItem/MenuItem';

const SidebarMenu = () => (
  <div>
    <MenuItem to="/" primary="Dashboard">
      <HomeIcon />
    </MenuItem>

    <MenuItem to="/activities" primary="Activities">
      <ActivitiesIcon />
    </MenuItem>

    <MenuItem to="/attendance" primary="Attendance">
      <AlarmIcon />
    </MenuItem>

    <MenuItem to="/users" primary="Users">
      <UserIcon />
    </MenuItem>

    <MenuItem to="/invoices" primary="Invoices">
      <ReceiptIcon />
    </MenuItem>

    <MenuItem to="/subscriptions" primary="Subscriptions">
      <PaymentIcon />
    </MenuItem>

    <MenuItem to="/packages" primary="Packages">
      <RedeemIcon />
    </MenuItem>

    <MenuItem to="/cycles" primary="Billing Cycles">
      <UpdateIcon />
    </MenuItem>

    <MenuItem to="/services" primary="Services">
      <DnsIcon />
    </MenuItem>

    <MenuItem to="/settings" primary="Settings">
      <SettingsIcon />
    </MenuItem>
  </div>
);
export default SidebarMenu;
