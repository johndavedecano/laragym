import React, {Component} from 'react';

import {Link} from 'react-router-dom';
import {Button, Form, FormGroup, Label, Input} from 'reactstrap';

class Login extends Component {
  state = {
    isLoading: false,
  };

  render() {
    return (
      <div className="card card-login mx-auto mt-5">
        <div className="card-header text-center">Admin Login</div>
        <div className="card-body">
          <Form>
            <FormGroup>
              <div className="form-label-group">
                <Input
                  type="email"
                  id="inputEmail"
                  className="form-control"
                  placeholder="Email address"
                  required="required"
                  autoFocus
                />
                <Label for="inputEmail">Email address</Label>
              </div>
            </FormGroup>
            <FormGroup>
              <div className="form-label-group">
                <Input
                  type="password"
                  id="inputPassword"
                  className="form-control"
                  placeholder="Password"
                  required="required"
                />
                <Label for="inputPassword">Password</Label>
              </div>
            </FormGroup>
            <Button size="lg" color="primary" block>
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

export default Login;
