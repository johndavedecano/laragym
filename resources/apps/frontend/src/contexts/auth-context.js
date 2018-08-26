import React from 'react';
import {login} from 'requests/auth';
import getErrorMessage from 'utils/getErrorMessage';
import notify from 'utils/notify';

const AuthContext = React.createContext();

const __state__ = () => {
  try {
    return {
      user: JSON.parse(localStorage.getItem('user')),
      token: localStorage.getItem('token'),
    };
  } catch (err) {
    return {
      user: null,
      token: null,
    };
  }
};

class AuthProvider extends React.Component {
  state = __state__();

  login = async (data = {}) => {
    try {
      const {token, user} = await login(data);

      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));

      this.setState(
        {
          user,
          token,
        },
        () => {
          notify({
            type: 'success',
            text: 'Successfully logged in!',
          });
        }
      );
    } catch (error) {
      notify({
        type: 'error',
        text: getErrorMessage(error),
      });
    }
  };

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.setState({
      user: null,
      token: null,
    });
  }

  forgot() {}

  render() {
    const {user, token} = this.state;
    return (
      <AuthContext.Provider
        value={{
          user,
          token,
          isAuth: !!user && !!token,
          login: this.login,
          logout: this.logout,
          forgot: this.forgot,
        }}
      >
        {this.props.children}
      </AuthContext.Provider>
    );
  }
}

const AuthConsumer = AuthContext.Consumer;

export {AuthProvider, AuthConsumer};
