import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AccountCircle from '@material-ui/icons/AccountCircle';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import Helmet from 'react-helmet';
import Menu, { MenuItem } from 'material-ui/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import UserIcon from '@material-ui/icons/SupervisorAccount';
import { Link } from 'react-router-dom';

import styles from './Layouts.css';

export default class Header extends Component {
  static propTypes = {
    title: PropTypes.string,
    showMenu: PropTypes.bool,
  };

  static defaultProps = {
    showMenu: true,
  };

  state = {
    auth: true,
    anchorEl: null,
  };

  onLogout = (event) => {
    event.stopPropagation();
    event.preventDefault();
    this.props.onLogout();
  };

  handleChange = (event, checked) => {
    this.setState({ auth: checked });
  };

  handleMenu = (event) => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  get showMenu() {
    if (this.props.showMenu) {
      return (
        <Menu
          className={styles.menu}
          id="menu-bar"
          anchorEl={this.state.anchorEl}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={this.isOpen}
          onClose={this.handleClose}
        >
          <MenuItem className={styles.menuItem}>
            <UserIcon />
            <Link to="/account">Account Settings</Link>
          </MenuItem>
          <MenuItem className={styles.menuItem} onClick={this.onLogout}>
            <Link to="/" onClick={this.onLogout}>
              Logout
            </Link>
          </MenuItem>
        </Menu>
      );
    }
    return null;
  }

  get isOpen() {
    return Boolean(this.state.anchorEl);
  }

  render() {
    return (
      <AppBar position="static">
        <Helmet title={this.props.title} />
        <Toolbar className={styles.toolbar}>
          <IconButton color="inherit" aria-label="Menu" onClick={this.props.onToggleSidebar}>
            <MenuIcon />
          </IconButton>
          {/* <Typography variant="title" color="inherit">
            {this.props.title}
          </Typography> */}

          {this.props.showMenu && (
            <IconButton
              className={styles.menuRight}
              aria-owns={this.isOpen ? 'menu-appbar' : null}
              aria-haspopup="true"
              onClick={this.handleMenu}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          )}
        </Toolbar>
        {this.showMenu}
      </AppBar>
    );
  }
}
