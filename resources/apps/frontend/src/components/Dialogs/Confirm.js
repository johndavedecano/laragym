import React from 'react';

import {Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import Loader from 'components/Loader';

const INITIAL_STATE = {
  isOpen: false,
  title: '',
  content: '',
  payload: {},
  isLoading: false,
};

export default class Confirm extends React.Component {
  static defaultProps = {
    isLoading: false,
    onSubmit: () => {},
  };

  state = {...INITIAL_STATE};

  open = state => {
    this.setState(Object.assign(this.state, state));
  };

  onClose = () => {
    if (this.state.isLoading) return;
    this.setState(INITIAL_STATE);
  };

  onSubmit = async () => {
    this.setState({isLoading: true});
    await this.props.onSubmit(this.state.payload);
    this.setState(INITIAL_STATE, () => {
      this.props.onAfterSubmit();
    });
  };

  render() {
    return (
      <Modal isOpen={this.state.isOpen} toggle={this.props.onRequestClose}>
        <ModalHeader toggle={this.onClose}>{this.state.title}</ModalHeader>
        <ModalBody>
          {this.state.isLoading && <Loader show />}
          {this.state.content}
        </ModalBody>
        <ModalFooter>
          <Button
            disabled={this.state.isLoading}
            color="primary"
            type="submit"
            onClick={this.onSubmit}
          >
            Submit
          </Button>{' '}
          <Button
            disabled={this.state.isLoading}
            color="secondary"
            onClick={this.onClose}
            type="button"
          >
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}
