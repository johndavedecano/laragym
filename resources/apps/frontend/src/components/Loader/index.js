import React from 'react';

import StyleSheet from './Loader.scss';

export default function({show}) {
  return (
    show && (
      <div className={StyleSheet.loader}>
        <i className="fa fa-spinner fa-spin" />
      </div>
    )
  );
}
