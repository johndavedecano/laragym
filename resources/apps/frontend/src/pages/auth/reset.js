import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Button, Form, FormGroup, Label, Input} from 'reactstrap';

import withAuth from 'enhancers/withAuth';

class Reset extends Component {
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

    await this.props.reset({
      token: this.props.match.params.token,
      password: this.password.value,
      password_confirmation: this.password_confirmation.value,
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
            <FormGroup>
              <div className="form-label-group">
                <Input
                  innerRef={password_confirmation =>
                    (this.password_confirmation = password_confirmation)
                  }
                  type="password"
                  id="inputPasswordConfirmation"
                  className="form-control"
                  placeholder="Password Confirmation"
                  disabled={this.state.isLoading}
                />
                <Label for="inputPasswordConfirmation">
                  Password Confirmation
                </Label>
              </div>
            </FormGroup>
            <Button
              disabled={this.state.isLoading}
              size="lg"
              color="primary"
              block
            >
              {this.state.isLoading ? 'Please Wait...' : 'Reset Password'}
            </Button>
          </Form>
          <div className="text-center mt-3">
            <Link to="/auth/login" className="d-block small">
              Back To Login
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default withAuth(Reset);
