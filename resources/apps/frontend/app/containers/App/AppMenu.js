import React from 'react';
import { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import { Link } from 'react-router-dom';

import DnsIcon from '@material-ui/icons/Dns';
import HomeIcon from '@material-ui/icons/Home';
import PaymentIcon from '@material-ui/icons/Payment';
import ReceiptIcon from '@material-ui/icons/Receipt';
import RedeemIcon from '@material-ui/icons/Redeem';
import SettingsIcon from '@material-ui/icons/Settings';
import UpdateIcon from '@material-ui/icons/Update';
import UserIcon from '@material-ui/icons/SupervisorAccount';

const AppMenu = () => {
  return (
    <div>
      <Link to="/">
        <ListItem button>
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>
      </Link>

      <Link to="/users">
        <ListItem button>
          <ListItemIcon>
            <UserIcon />
          </ListItemIcon>
          <ListItemText primary="Users" />
        </ListItem>
      </Link>

      <Link to="/invoices">
        <ListItem button>
          <ListItemIcon>
            <ReceiptIcon />
          </ListItemIcon>
          <ListItemText primary="Invoices" />
        </ListItem>
      </Link>

      <Link to="/subscriptions">
        <ListItem button>
          <ListItemIcon>
            <PaymentIcon />
          </ListItemIcon>
          <ListItemText primary="Subscriptions" />
        </ListItem>
      </Link>

      <Link to="/packages">
        <ListItem button>
          <ListItemIcon>
            <RedeemIcon />
          </ListItemIcon>
          <ListItemText primary="Packages" />
        </ListItem>
      </Link>

      <Link to="/cycles">
        <ListItem button>
          <ListItemIcon>
            <UpdateIcon />
          </ListItemIcon>
          <ListItemText primary="Billing Cycles" />
        </ListItem>
      </Link>

      <Link to="/services">
        <ListItem button>
          <ListItemIcon>
            <DnsIcon />
          </ListItemIcon>
          <ListItemText primary="Services" />
        </ListItem>
      </Link>

      <Link to="/settings">
        <ListItem button>
          <ListItemIcon>
            <SettingsIcon />
          </ListItemIcon>
          <ListItemText primary="Settings" />
        </ListItem>
      </Link>
    </div>
  );
};
export default AppMenu;
