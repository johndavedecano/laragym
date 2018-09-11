import React from 'react';
import serialize from 'form-serialize';
import {Form, FormGroup, Input, Label, Button} from 'reactstrap';

import getErrorMessage from 'utils/getErrorMessage';
import notify from 'utils/notify';
import StatusSelect from 'components/Form/Select/StatusSelect';

export default class extends React.Component {
  static defaultProps = {
    successMessage: 'Successfully submitted',
    name: undefined,
    description: undefined,
    status: '',
    onSubmit: () => {},
  };

  state = {
    isSubmitting: false,
  };

  onSubmit = async event => {
    try {
      event.preventDefault();
      this.setState({isSubmitting: true});
      const form = event.target;
      const data = serialize(form, {hash: true});
      await this.props.onSubmit(data);
      this.setState({isSubmitting: false});
      notify({
        type: 'success',
        text: this.props.successMessage,
      });
    } catch (error) {
      notify({
        type: 'error',
        text: getErrorMessage(error),
      });
      this.setState({isSubmitting: false});
    }
  };

  render() {
    return (
      <Form onSubmit={this.onSubmit}>
        <FormGroup>
          <Label for="Name">Name</Label>
          <Input
            type="text"
            name="name"
            id="name"
            placeholder="Name"
            required
            defaultValue={this.props.name}
            disabled={this.state.isSubmitting}
          />
        </FormGroup>

        <FormGroup>
          <Label for="description">Description</Label>
          <Input
            type="textarea"
            name="description"
            id="description"
            required
            defaultValue={this.props.description}
            disabled={this.state.isSubmitting}
          />
        </FormGroup>

        {this.props.status && (
          <FormGroup>
            <Label for="status">Status</Label>
            <StatusSelect defaultValue={this.props.status} name="status" />
          </FormGroup>
        )}

        <Button
          color="primary"
          className="float-right"
          disabled={this.state.isSubmitting}
        >
          {this.state.isSubmitting ? 'Please Wait...' : 'Submit Form'}
        </Button>
      </Form>
    );
  }
}
