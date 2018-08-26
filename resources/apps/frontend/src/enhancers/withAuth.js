import React from 'react';
import {AuthConsumer} from 'contexts/auth-context';

const withAuth = Component => {
  return class extends React.Component {
    render() {
      return (
        <AuthConsumer>
          {authProps => {
            return <Component {...this.props} {...authProps} />;
          }}
        </AuthConsumer>
      );
    }
  };
};

export default withAuth;
