import React, { Component } from 'react';

import { SelectFieldSingle } from 'components/Select/SelectComponents';

export default class UsersDropdown extends Component {
  static defaultProps = {
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
      />
    );
  }
}
