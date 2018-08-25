import React from 'react';

const AuthContext = React.createContext();

const __state__ = () => {
  try {
    return {
      user: JSON.parse(localStorage.getItem('user')),
      token: JSON.parse(localStorage.getItem('token')),
    };
  } catch (err) {
    return {
      user: null,
      token: null,
    };
  }
};

class AuthProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = __state__();
  }
  render() {
    const {user, token} = this.state;
    return (
      <AuthContext.Provider
        value={{
          user,
          token,
          isAuth: !!user && !!token,
        }}
      >
        {this.props.children}
      </AuthContext.Provider>
    );
  }
}

const AuthConsumer = AuthContext.Consumer;

export {AuthProvider, AuthConsumer};
