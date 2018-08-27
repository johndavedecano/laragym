import React from 'react';

export default class SearchInput extends React.Component {
  static defaultProps = {
    placeholder: 'Search',
  };

  constructor(props) {
    super(props);
    this.state = {value: props.value};
  }

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
        disabled={this.props.disabled}
        name={this.props.name}
        defaultValue={this.state.value}
        type="search"
        className="form-control"
        placeholder={this.props.placeholder}
        onKeyUp={this.onKeyUp}
        onChange={this.onChange}
      />
    );
  }
}
