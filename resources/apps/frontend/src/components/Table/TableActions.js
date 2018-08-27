import React from 'react';
import {Link} from 'react-router-dom';
import {Dropdown, DropdownToggle, DropdownMenu, DropdownItem} from 'reactstrap';

export default class TableActions extends React.Component {
  static defaultProps = {
    items: [],
    buttonLabel: 'Actions',
  };

  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: false,
    };
  }

  toggle() {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen,
    }));
  }

  onClick = (payload, item) => event => {
    this.props.onClick({
      payload,
      ...item,
    });
  };

  render() {
    return (
      <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
        <DropdownToggle color="primary" caret>
          {this.props.buttonLabel}
        </DropdownToggle>
        <DropdownMenu>
          {this.props.items.map(item => {
            if (item.type === 'divider') {
              return <DropdownItem key={item.label} divider />;
            } else if (item.href) {
              return (
                <Link key={item.label} className="dropdown-item" to={item.href}>
                  <span className={item.color}>{item.label}</span>
                </Link>
              );
            } else {
              return (
                <DropdownItem
                  key={item.label}
                  onClick={this.onClick(this.props.payload, item)}
                >
                  <span className={item.color}>{item.label}</span>
                </DropdownItem>
              );
            }
          })}
        </DropdownMenu>
      </Dropdown>
    );
  }
}
