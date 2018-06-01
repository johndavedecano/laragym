import React, { Component } from 'react';
import PropTypes from 'prop-types';
import pick from 'lodash/pick';

import TextField from '@material-ui/core/TextField';
import FormDialog from 'components/FormDialog/FormDialog';
import ServicesDropdown from './ServicesDropdown';

const INITIAL_STATE = {
  name: '',
  description: '',
  isSubmitting: false,
  errors: {},
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
   * @param {String} name
   *
   * @returns {void}
   */
  onCheckboxChange = (name) => () => {
    this.setState({
      [name]: !this.state[name],
    });
  };

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
    return pick(this.state, ['name', 'description']);
  }

  render() {
    return (
      <FormDialog
        contentText=""
        isOpen={this.props.isOpen}
        isSubmitting={this.state.isSubmitting}
        method="POST"
        onClose={this.props.onClose}
        onSubmit={this.onSubmit}
        title="Create Service"
      >
        <ServicesDropdown />
        <TextField
          error={!!this.state.errors.name}
          helperText={this.getHelperText('name')}
          id="name"
          label="Full name"
          margin="dense"
          name="name"
          onChange={this.onChange}
          type="text"
          value={this.state.name}
          fullWidth
        />

        <TextField
          error={!!this.state.errors.description}
          helperText={this.getHelperText('description')}
          id="description"
          label="Description"
          margin="dense"
          name="description"
          onChange={this.onChange}
          type="text"
          value={this.state.description}
          fullWidth
          multiline
        />
      </FormDialog>
    );
  }
}
