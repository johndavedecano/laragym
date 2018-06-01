import React, { Component } from 'react';
import { Map } from 'immutable';
import PropTypes from 'prop-types';
import pick from 'lodash/pick';

import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import TextField from '@material-ui/core/TextField';
import FormDialog from 'components/FormDialog/FormDialog';
import CyclesDropdown from 'containers/Dropdowns/CyclesDropdown';
import ServicesDropdown from 'containers/Dropdowns/ServicesDropdown';
import FormControl from 'components/FormControl/FormControl';

const INITIAL_STATE = {
  amount: '',
  cycle_id: '',
  errors: {},
  isSubmitting: false,
  name: '',
  service_id: '',
};

export default class UserCreateDialog extends Component {
  static defaultProps = {
    entity: Map(),
    isOpen: false,
    onClose: () => {},
  };

  static propTypes = {
    entity: PropTypes.instanceOf(Map),
    isOpen: PropTypes.bool,
    onClose: PropTypes.func,
  };

  constructor(props) {
    super(props);
    const { entity } = props;
    this.state = {
      ...INITIAL_STATE,
      amount: entity.get('amount'),
      cycle_id: entity.get('cycle_id'),
      is_archived: entity.get('is_archived'),
      name: entity.get('name'),
      service_id: entity.get('service_id'),
    };
  }

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

      await this.props.onSubmit(
        this.props.entity.get('id'),
        this.getFormData()
      );

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
    return pick(this.state, [
      'amount',
      'cycle_id',
      'is_archived',
      'name',
      'service_id',
    ]);
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
        <TextField
          error={!!this.state.errors.name}
          helperText={this.getHelperText('name')}
          id="name"
          label="Package Name"
          margin="dense"
          name="name"
          onChange={this.onChange}
          type="text"
          value={this.state.name}
          fullWidth
        />

        <FormControl>
          <ServicesDropdown
            onChange={this.onChangeService}
            value={this.state.service_id}
          />
        </FormControl>

        <FormControl>
          <CyclesDropdown
            onChange={this.onChangeCycle}
            value={this.state.cycle_id}
          />
        </FormControl>

        <TextField
          error={!!this.state.errors.amount}
          helperText={this.getHelperText('amount')}
          id="amount"
          label="Amount"
          margin="dense"
          name="amount"
          onChange={this.onChange}
          type="number"
          value={this.state.amount}
          fullWidth
        />

        <FormControlLabel
          control={
            <Checkbox
              checked={this.state.is_archived}
              onChange={this.onCheckboxChange('is_archived')}
              value="is_archived"
              color="primary"
            />
          }
          label="Archived"
        />
      </FormDialog>
    );
  }
}
