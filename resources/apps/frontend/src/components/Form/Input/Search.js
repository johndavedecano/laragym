import React from 'react';

export default class SearchInput extends React.Component {
  static defaultProps = {
    placeholder: 'Search',
  };

  state = {
    value: '',
  };

  onKeyUp = event => {
    if (event.keyCode === 13) {
      this.props.onSubmit(event.target.value);
    }
  };

  onChange = event => {
    this.setState({
      value: event.target.value,
    });
  };

  render() {
    return (
      <input
        {...this.props}
        disabled={this.props.disabled}
        name={this.props.name}
        value={this.state.value}
        type="search"
        className="form-control"
        placeholder={this.props.placeholder}
        onKeyUp={this.onKeyUp}
        onChange={this.onChange}
      />
    );
  }
}
