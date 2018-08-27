import React from 'react';
import Select from 'react-select';

const options = [{value: true, label: 'Yes'}, {value: false, label: 'No'}];

export default props => {
  return <Select {...props} options={options} />;
};
