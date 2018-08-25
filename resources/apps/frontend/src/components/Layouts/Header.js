import React from 'react';

import {Link} from 'react-router-dom';

import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';

export default class Example extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false,
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }
  render() {
    return (
      <div>
        <Navbar color="dark" dark expand="md">
          <Link className="navbar-brand" to="/">
            Laragym
          </Link>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav>
                  <i className="fas fa-user-circle fa-fw" />
                </DropdownToggle>
                <DropdownMenu right>
                  <Link className="dropdown-item" to="/account">
                    Account
                  </Link>
                  <Link className="dropdown-item" to="/settings">
                    Settings
                  </Link>
                  <DropdownItem divider />
                  <Link className="dropdown-item" to="/logout">
                    Logout
                  </Link>
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}
