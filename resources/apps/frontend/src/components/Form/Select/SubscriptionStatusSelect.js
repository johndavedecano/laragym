import React from 'react';
import Select from 'react-select';

const options = [
  {value: 'active', label: 'Active'},
  {value: 'inactive', label: 'Inactive'},
  {value: 'deleted', label: 'Deleted'},
  {value: 'suspended', label: 'Suspended'},
  {value: 'expired', label: 'Expired'},
];

export default props => {
  return (
    <Select
      {...props}
      defaultValue={options.find(option => option.value === props.defaultValue)}
      value={options.find(option => option.value === props.value)}
      getOptionLabel={option => option.label}
      getOptionValue={option => option.value}
      options={options}
    />
  );
};
