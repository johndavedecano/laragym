import React, { Component } from 'react';

import { SelectFieldSingle } from 'components/Select/SelectComponents';

export default class PackageDropdown extends Component {
  static defaultProps = {
    value: '',
    onChange: () => {},
  };

  render() {
    return (
      <SelectFieldSingle
        async
        api="/api/packages"
        onChange={this.props.onChange}
        value={this.props.value}
        placeholder="Select Package"
      />
    );
  }
}
