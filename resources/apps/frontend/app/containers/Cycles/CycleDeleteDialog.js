import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FormDialog from 'components/FormDialog/FormDialog';

const INITIAL_STATE = {
  isSubmitting: false,
};

export default class CycleDeleteDialog extends Component {
  static defaultProps = {
    title: 'Delete Confirmation',
    description: 'Are you sure you want to delete this item?',
    isOpen: false,
    onClose: () => {},
  };

  static propTypes = {
    isOpen: PropTypes.bool,
    onClose: PropTypes.func,
  };

  state = INITIAL_STATE;

  onClose = () => {
    if (this.state.isSubmitting) return;
    this.props.onClose();
  };

  onSubmit = async (event) => {
    try {
      if (this.state.isSubmitting) return;
      event.preventDefault();

      this.setState({ isSubmitting: true, errors: {} });

      await this.props.onSubmit(this.props.id);

      this.setState(INITIAL_STATE);

      this.props.onClose();
    } catch (error) {
      this.setState({
        isSubmitting: false,
      });
      this.props.onClose();
    }
  };

  render() {
    return (
      <FormDialog
        method="DELETE"
        title={this.props.title}
        contentText={this.props.description}
        isOpen={this.props.isOpen}
        isSubmitting={this.state.isSubmitting}
        onSubmit={this.onSubmit}
        onClose={this.onClose}
      >
        <input type="hidden" name="id" value={this.props.id} />
      </FormDialog>
    );
  }
}
