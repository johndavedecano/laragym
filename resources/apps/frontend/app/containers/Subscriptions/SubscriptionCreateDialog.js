import React, { Component } from 'react';
import PropTypes from 'prop-types';
import pick from 'lodash/pick';

import TextField from '@material-ui/core/TextField';
import FormDialog from 'components/FormDialog/FormDialog';
import FormControl from 'components/FormControl/FormControl';
import UsersDropdown from 'containers/Dropdowns/UsersDropdown';
import PackagesDropdown from 'containers/Dropdowns/PackagesDropdown';

const INITIAL_STATE = {
  package_id: '',
  errors: {},
  isSubmitting: false,
  interval: '',
  user_id: '',
};

export default class UserCreateDialog extends Component {
  static defaultProps = {
    isOpen: false,
    onClose: () => {},
  };

  static propTypes = {
    isOpen: PropTypes.bool,
    onClose: PropTypes.func,
  };

  state = INITIAL_STATE;

  /**
   * @param {Event} event
   *
   * @returns {void}
   */
  onChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  /**
   * @param {Event} event
   *
   * @returns {void}
   */
  onChangeUser = (value) => {
    this.setState({
      user_id: value,
    });
  };

  /**
   * @param {Event} event
   *
   * @returns {void}
   */
  onChangePackage = (value) => {
    this.setState({
      package_id: value,
    });
  };

  /**
   * @param {Event} event
   *
   * @async
   *
   * @returns {void}
   */
  onSubmit = async (event) => {
    try {
      if (this.state.isSubmitting) return;
      event.preventDefault();
      this.setState({ isSubmitting: true, errors: {} });
      await this.props.onSubmit(this.getFormData());
      this.setState(INITIAL_STATE, () => {
        this.props.onClose();
      });
    } catch (error) {
      this.setState({
        isSubmitting: false,
        errors: error.errors ? error.errors : {},
      });
    }
  };

  /**
   * @param {String} name
   *
   * @returns {String}
   */
  getHelperText(name) {
    return this.state.errors[name] && this.state.errors[name][0]
      ? this.state.errors[name][0]
      : String('');
  }

  /**
   * @returns {Object}
   */
  getFormData() {
    return pick(this.state, ['package_id', 'interval', 'user_id']);
  }

  render() {
    return (
      <FormDialog
        contentText="Please provide information below."
        isOpen={this.props.isOpen}
        isSubmitting={this.state.isSubmitting}
        method="POST"
        onClose={this.props.onClose}
        onSubmit={this.onSubmit}
        title="Create Package"
      >
        <FormControl>
          <UsersDropdown
            onChange={this.onChangeUser}
            value={this.state.user_id}
          />
        </FormControl>

        <FormControl>
          <PackagesDropdown
            onChange={this.onChangePackage}
            value={this.state.package_id}
          />
        </FormControl>

        <TextField
          error={!!this.state.errors.interval}
          helperText={this.getHelperText('interval')}
          id="interval"
          label="Interval"
          margin="dense"
          name="interval"
          onChange={this.onChange}
          type="number"
          value={this.state.interval}
          fullWidth
        />
      </FormDialog>
    );
  }
}
