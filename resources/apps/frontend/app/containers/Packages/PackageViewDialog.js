import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Modal from 'components/Modal/Modal';
import AbsoluteLoader from 'components/PageLoader/AbsoluteLoader';

export default class ServiceDeleteDialog extends Component {
  static defaultProps = {
    isOpen: false,
    onClose: () => {},
  };

  static propTypes = {
    isOpen: PropTypes.bool,
    onClose: PropTypes.func,
  };

  state = {
    isLoading: false,
  };

  async componentDidMount() {
    try {
      await this.load();
    } catch (error) {
      this.props.onClose();
    }
  }

  load = async () => {
    await this.props.onShow(this.props.id);
    this.setState({ isLoading: false });
  };

  render() {
    return (
      <Modal
        title="Package Information"
        isOpen={this.props.isOpen}
        onClose={this.props.onClose}
      >
        <AbsoluteLoader />
      </Modal>
    );
  }
}
