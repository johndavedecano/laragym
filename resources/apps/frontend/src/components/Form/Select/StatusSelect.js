import React from 'react';
import Select from 'react-select';

const options = [
  {
    value: 'active',
    label: 'Active',
  },
  {
    value: 'deleted',
    label: 'Deleted',
  },
];

export default props => {
  return (
    <Select
      options={options}
      {...props}
      defaultValue={options.find(option => option.value === props.defaultValue)}
      value={options.find(option => option.value === props.value)}
      getOptionLabel={option => option.label}
      getOptionValue={option => option.value}
    />
  );
};
