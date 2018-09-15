import React from 'react';
import {login, forgot, reset} from 'requests/auth';
import getErrorMessage from 'utils/getErrorMessage';
import notify from 'utils/notify';
import initAxios from 'utils/initAxios';

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

      initAxios();

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

  logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.setState(
      {
        user: null,
        token: null,
      },
      () => {
        notify({
          type: 'success',
          text: 'Successfully logged out!',
        });
      }
    );
  };

  reset = async (data = {}) => {
    try {
      await reset(data);
      notify({
        type: 'success',
        text: 'Successfully logged in!',
      });
      setTimeout(() => {
        window.location.replace('/auth/login');
      });
    } catch (error) {
      notify({
        type: 'error',
        text: getErrorMessage(error),
      });
    }
  };

  forgot = async (data = {}) => {
    try {
      await forgot(data);
      notify({
        type: 'success',
        text: 'Successfully logged in!',
      });
      setTimeout(() => {
        window.location.replace('/auth/login');
      });
    } catch (error) {
      notify({
        type: 'error',
        text: getErrorMessage(error),
      });
    }
  };

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
          reset: this.reset,
        }}
      >
        {this.props.children}
      </AuthContext.Provider>
    );
  }
}

const AuthConsumer = AuthContext.Consumer;

export {AuthProvider, AuthConsumer};
