import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class Sidebar extends Component {
  state = {};

  render() {
    return (
      <ul className="sidebar navbar-nav">
        <li className="nav-item">
          <Link className="nav-link" to="/">
            <i className="fas fa-fw fa-home" />
            <span> Dashboard</span>
          </Link>
        </li>

        <li className="nav-item">
          <Link className="nav-link" to="/activities">
            <i className="fas fa-fw fa-user-clock" />
            <span> Activities</span>
          </Link>
        </li>

        <li className="nav-item">
          <Link className="nav-link" to="/attendance">
            <i className="fas fa-fw fa-calendar-alt" />
            <span> Attendance</span>
          </Link>
        </li>

        <li className="nav-item">
          <Link className="nav-link" to="/members">
            <i className="fas fa-fw fa-users" />
            <span> Members</span>
          </Link>
        </li>

        {/* <li className="nav-item">
          <Link className="nav-link" to="/invoices">
            <i className="fas fa-fw fa-file-invoice-dollar" />
            <span> Invoices</span>
          </Link>
        </li> */}
        <li className="nav-item">
          <Link className="nav-link" to="/subscriptions">
            <i className="fas fa-fw fa-id-card" />
            <span> Subscriptions</span>
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/packages">
            <i className="fas fa-fw fa-box" />
            <span> Packages</span>
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/billing-cycles">
            <i className="fas fa-fw fa-clock" />
            <span> Billing Cycles</span>
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/services">
            <i className="fas fa-fw fa-server" />
            <span> Services</span>
          </Link>
        </li>
      </ul>
    );
  }
}

export default Sidebar;
