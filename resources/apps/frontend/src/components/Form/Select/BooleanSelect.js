import React from 'react';
import Select from 'react-select';

const options = [
  {
    value: true,
    label: 'Yes',
  },
  {
    value: false,
    label: 'No',
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
