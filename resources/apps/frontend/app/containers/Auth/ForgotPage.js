import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

import AuthScreen from 'components/Auth/AuthScreen';
import AuthPanel from 'components/Auth/AuthPanel';

export default class ForgotPage extends Component {
  state = {
    form: {
      email: '',
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
        <AuthPanel title="Forgot Password">
          <form method="POST" action="" onSubmit={this.onSubmit}>
            <Grid direction="row" wrap="wrap" container>
              <Grid item xs={12}>
                <TextField
                  id="email"
                  label="Email Address"
                  value={this.state.form.email}
                  onChange={this.onChange('email')}
                  margin="normal"
                  type="email"
                  fullWidth
                  required
                  autoFocus
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
                <Link to="/login">Back to login</Link>
              </Typography>
            </div>
          </form>
        </AuthPanel>
      </AuthScreen>
    );
  }
}
