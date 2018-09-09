import React from 'react';
import get from 'lodash/get';
import cx from 'classnames';
import ucfirst from 'utils/ucfirst';

const Status = props => {
  const value = get(props, 'value') || 'inactive';

  return (
    <span
      className={cx({
        badge: true,
        'badge-success': value.toLowerCase() === 'active',
        'badge-secondary': value.toLowerCase() === 'inactive',
        'badge-danger': value.toLowerCase() === 'deleted',
        'badge-light': value.toLowerCase() === 'suspended',
        'badge-warning': value.toLowerCase() === 'expired',
      })}
    >
      {ucfirst(value)}
    </span>
  );
};

export default Status;
