import React from 'react';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

export default function requireAuthentication(Component) {
  class AuthenticatedComponent extends React.Component {

    static propTypes = {
      isLoggedIn: PropTypes.bool,
      location: PropTypes.object,
    };

    componentWillMount() {
      this.checkAuth(this.props.isLoggedIn);
    }

    componentWillReceiveProps(nextProps) {
      this.checkAuth(nextProps.isLoggedIn);
    }

    checkAuth(isLoggedIn) {
      if (!isLoggedIn) {
        const after = this.props.location.pathname;
        this.props.history.replace(`/login?after=${after}`);
      }
    }

    render() {
      return this.props.isLoggedIn ? <Component {...this.props} /> : null;
    }
  }

  const mapStateToProps = (state) => ({
    user: state.getIn(['auth', 'user']),
    isLoggedIn: state.getIn(['auth', 'isLoggedIn']),
  });

  return compose(connect(mapStateToProps), withRouter)(AuthenticatedComponent);
}
