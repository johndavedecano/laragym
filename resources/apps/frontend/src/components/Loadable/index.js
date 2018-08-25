import React from 'react';
import ReactLoadable from 'react-loadable';

const LoadingComponent = ({error, timedOut, pastDelay}) => {
  if (error) {
    // When the loader has errored
    return <div className="loading-container">Error!</div>;
  } else if (timedOut) {
    // When the loader has taken longer than the timeout
    return <div className="loading-container">Taking a long time...</div>;
  } else if (pastDelay) {
    // When the loader has taken longer than the delay
    return <div className="loading-container">Loading...</div>;
  } else {
    // When the loader has just started
    return null;
  }
};

export default opts => {
  return ReactLoadable(
    Object.assign(
      {
        loading: LoadingComponent,
      },
      opts
    )
  );
};
