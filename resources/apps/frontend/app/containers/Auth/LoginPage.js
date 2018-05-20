import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

import AuthScreen from 'components/Auth/AuthScreen';
import AuthPanel from 'components/Auth/AuthPanel';

export default class LoginPage extends Component {
  state = {
    form: {
      email: '',
      password: '',
      isSubmitting: false,
    },
  };

  /**
   * @param {Event} event
   *
   * @returns {void}
   */
  onSubmit = (event) => {
    event.preventDefault();
    this.setState({
      form: {
        ...this.state.form,
        isSubmitting: true,
      },
    });

    setTimeout(() => {
      this.setState({
        form: {
          ...this.state.form,
          isSubmitting: false,
        },
      });
    }, 1000);
  };

  /**
   * @param {String} name
   *
   * @returns {Function}
   */
  onChange = (name) => (event) => {
    this.setState({
      form: {
        ...this.state.form,
        [name]: event.target.value,
      },
    });
  };

  render() {
    return (
      <AuthScreen>
        <AuthPanel title="Account Login">
          <form method="POST" action="" onSubmit={this.onSubmit}>
            <Grid direction="row" wrap="wrap" container>
              <Grid item xs={12}>
                <TextField
                  autoFocus
                  fullWidth
                  id="email"
                  label="Email Address"
                  margin="normal"
                  onChange={this.onChange('email')}
                  required
                  type="email"
                  value={this.state.form.email}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="password"
                  label="Password"
                  margin="normal"
                  onChange={this.onChange('password')}
                  required
                  type="password"
                  value={this.state.form.password}
                />
              </Grid>
            </Grid>
            <p />
            <Grid direction="row" wrap="wrap" container>
              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="raised"
                  color="primary"
                  size="large"
                  disabled={this.state.form.isSubmitting}
                  fullWidth
                >
                  {this.state.form.isSubmitting ? 'Please Wait...' : 'Submit'}
                </Button>
              </Grid>
            </Grid>
            <div>
              <br />
              <Typography align="right" color="primary">
                <Link to="/forgot">Forgot Password?</Link>
              </Typography>
            </div>
          </form>
        </AuthPanel>
      </AuthScreen>
    );
  }
}
