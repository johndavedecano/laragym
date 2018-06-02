import React, { Component } from 'react';

import { SelectFieldSingle } from 'components/Select/SelectComponents';

export default class ServicesDropdown extends Component {
  static defaultProps = {
    value: '',
    onChange: () => {},
    clearable: false,
  };

  render() {
    return (
      <SelectFieldSingle
        async
        api="/api/services"
        onChange={this.props.onChange}
        value={this.props.value}
        placeholder="Select Service"
        clearable={this.props.clearable}
      />
    );
  }
}
