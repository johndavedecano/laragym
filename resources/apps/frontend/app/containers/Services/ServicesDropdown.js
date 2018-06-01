import React, { Component } from 'react';

import { SelectFieldSingle } from 'components/Select/SelectComponents';

export default class ServicesDropdown extends Component {
  static defaultProps = {
    value: '',
    onChange: () => {},
  };

  state = {
    value: '',
  };

  onChange = (value) => {
    this.setState(
      {
        value,
      },
      () => {
        this.props.onChange(value);
      }
    );
  };

  setValue = (value) => {
    this.setState({ value });
  };

  render() {
    return (
      <SelectFieldSingle
        async
        api="/api/services"
        onChange={this.onChange}
        value={this.state.value}
      />
    );
  }
}
