import React, { Component } from 'react';

import { SelectFieldSingle } from 'components/Select/SelectComponents';

export default class UsersDropdown extends Component {
  static defaultProps = {
    clearable: false,
    value: '',
    onChange: () => {},
  };

  render() {
    return (
      <SelectFieldSingle
        async
        api="/api/users"
        onChange={this.props.onChange}
        value={this.props.value}
        placeholder="Select User"
        clearable={this.props.clearable}
      />
    );
  }
}
