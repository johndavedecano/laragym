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
  };

  state = {
    auth: true,
    anchorEl: null,
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

  render() {
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);

    return (
      <AppBar position="static">
        <Helmet title={this.props.title} />
        <Toolbar className={styles.toolbar}>
          <IconButton color="inherit" aria-label="Menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="title" color="inherit">
            {this.props.title}
          </Typography>

          <IconButton
            className={styles.menuRight}
            aria-owns={open ? 'menu-appbar' : null}
            aria-haspopup="true"
            onClick={this.handleMenu}
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
        </Toolbar>

        <Menu
          className={styles.menu}
          id="menu-bar"
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={open}
          onClose={this.handleClose}
        >
          <MenuItem className={styles.menuItem}>
            <UserIcon />
            <Link to="/account">Account Settings</Link>
          </MenuItem>
          <MenuItem className={styles.menuItem}>
            <Link to="/logout">Logout</Link>
          </MenuItem>
        </Menu>
      </AppBar>
    );
  }
}
