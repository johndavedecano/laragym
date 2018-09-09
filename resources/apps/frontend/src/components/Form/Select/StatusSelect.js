import React from 'react';
import Select from 'react-select';

const options = [
  {value: 'active', label: 'Active'},
  {value: 'inactive', label: 'Inactive'},
  {value: 'deleted', label: 'Deleted'},
];

export default props => {
  return <Select {...props} options={options} />;
};
