import React from 'react';
import AsyncSelect from 'react-select/lib/Async';
import Select from 'react-select';

import {loadPackages, showPackage} from 'requests/packages';

export default class PackageSelect extends React.Component {
  state = {
    defaultValue: null,
    defaultOptions: [],
  };

  static defaultProps = {
    plainLabel: false,
    name: 'service_id',
    onChange: () => {},
  };

  componentWillUnmount() {
    this._isMounted = false;
  }

  componentDidMount() {
    this._isMounted = true;

    if (this.props.defaultValue) {
      this.loadInitialOption(this.props.defaultValue);
    }
  }

  loadInitialOption = async id => {
    try {
      this.setState({isInitializing: true});

      const response = await showPackage(id);

      if (!this._isMounted) return;

      this.setState({
        defaultValue: response.data,
        defaultOptions: [response.data],
        isInitializing: false,
      });
    } catch (error) {
      this.setState({isInitializing: false});
      return;
    }
  };

  loadOptions = async q => {
    try {
      const response = await loadPackages({q, limit: 10});
      return response.data;
    } catch (err) {
      return [];
    }
  };

  renderOptionLabel = option => {
    if (this.props.plainLabel) return option.name || 'No Package name';

    return (
      <div>
        <p className="mb-0 font-weight-bold text-uppercase">
          [{option.name || 'package'}]{' '}
          <span className="small text-muted">{`${option.service.name} $${
            option.amount
          } ${option.cycle.name}`}</span>
        </p>
      </div>
    );
  };

  render() {
    if (this.state.isInitializing) return <Select isLoading />;
    return (
      <AsyncSelect
        options={this.state.defaultOptions}
        name={this.props.name}
        defaultValue={this.state.defaultValue}
        getOptionLabel={this.renderOptionLabel}
        getOptionValue={option => option.id}
        cacheOptions={true}
        defaultOptions
        loadOptions={this.loadOptions}
        onChange={this.props.onChange}
      />
    );
  }
}
