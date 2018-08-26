import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Button, Form, FormGroup, Label, Input} from 'reactstrap';

import withAuth from 'enhancers/withAuth';

class Login extends Component {
  state = {
    isLoading: false,
  };

  isStillMounted = false;

  componentDidMount() {
    this.isStillMounted = true;
  }

  componentWillUnmount() {
    this.isStillMounted = false;
  }

  onSubmit = async event => {
    event.preventDefault();
    this.setState({isLoading: true});
    await this.props.login({
      email: this.email.value,
      password: this.password.value,
    });
    this.isStillMounted && this.setState({isLoading: false});
  };

  render() {
    return (
      <div className="card card-login mx-auto mt-5">
        <div className="card-header text-center">Admin Login</div>
        <div className="card-body">
          <Form onSubmit={this.onSubmit}>
            <FormGroup>
              <div className="form-label-group">
                <Input
                  innerRef={email => (this.email = email)}
                  type="email"
                  id="inputEmail"
                  className="form-control"
                  placeholder="Email address"
                  autoFocus
                  disabled={this.state.isLoading}
                />
                <Label for="inputEmail">Email address</Label>
              </div>
            </FormGroup>
            <FormGroup>
              <div className="form-label-group">
                <Input
                  innerRef={password => (this.password = password)}
                  type="password"
                  id="inputPassword"
                  className="form-control"
                  placeholder="Password"
                  disabled={this.state.isLoading}
                />
                <Label for="inputPassword">Password</Label>
              </div>
            </FormGroup>
            <Button
              disabled={this.state.isLoading}
              size="lg"
              color="primary"
              block
            >
              Login
            </Button>
          </Form>
          <div className="text-center mt-3">
            <Link to="/auth/forgot" className="d-block small">
              Forgot Password?
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default withAuth(Login);
