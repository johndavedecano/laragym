import React from 'react';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import Authenticated from './Authenticated';
import Anonymous from './Anonymous';

class AuthenticatedComponent extends React.Component {
  static propTypes = {
    isLoggedIn: PropTypes.bool,
  };

  render() {
    return this.props.isLoggedIn ? (
      <Authenticated {...this.props} />
    ) : (
      <Anonymous {...this.props} />
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.getIn(['auth', 'user']),
  isLoggedIn: state.getIn(['auth', 'isLoggedIn']),
});

export default compose(connect(mapStateToProps), withRouter)(AuthenticatedComponent);
