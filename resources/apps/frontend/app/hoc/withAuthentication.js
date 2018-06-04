import React from 'react';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import { logout, check } from 'actions/auth-actions';

export default function requireAuthentication(Component) {
  class AuthenticatedComponent extends React.Component {
    static propTypes = {
      isLoggedIn: PropTypes.bool,
      location: PropTypes.object,
    };

    componentDidMount() {
      this.checkAuth(this.props.isLoggedIn);
    }

    componentWillReceiveProps(nextProps) {
      if (nextProps.location.pathname !== this.props.location.pathname) {
        this.checkAuth(nextProps.isLoggedIn);
        return;
      }

      if (!nextProps.isLoggedIn) {
        this.redirectToLoginPage();
      }
    }

    async checkAuth(isLoggedIn) {
      try {
        if (!isLoggedIn) {
          throw new Error('You are not allowed to access this page.');
        } else {
          await this.props.check();
        }
      } catch (error) {
        this.redirectToLoginPage();
      }
    }

    redirectToLoginPage() {
      const after = this.props.location.pathname;
      this.props.logout();
      this.props.history.replace(`/login?after=${after}`);
    }

    render() {
      return this.props.isLoggedIn ? <Component {...this.props} /> : null;
    }
  }

  const mapStateToProps = (state) => ({
    user: state.getIn(['auth', 'user']),
    isLoggedIn: state.getIn(['auth', 'isLoggedIn']),
  });

  return compose(connect(mapStateToProps, { logout, check }), withRouter)(
    AuthenticatedComponent
  );
}
