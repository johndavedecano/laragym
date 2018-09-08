import React from 'react';
import serialize from 'form-serialize';
import {Form, FormGroup, Input, Label, Button} from 'reactstrap';
import notify from 'utils/notify';
import getErrorMessage from 'utils/getErrorMessage';

export default class extends React.Component {
  static defaultProps = {
    successMessage: 'Successfully submitted',
    name: undefined,
    description: undefined,
    is_archived: undefined,
    is_default: undefined,
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
            bsSize="lg"
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
            name="text"
            id="description"
            bsSize="lg"
            required
            defaultValue={this.props.description}
            disabled={this.state.isSubmitting}
          />
        </FormGroup>

        <FormGroup check className="mb-3">
          <Label check>
            <Input
              type="checkbox"
              name="is_archived"
              defaultChecked={!!this.props.is_archived}
              disabled={this.state.isSubmitting}
            />{' '}
            Archived
          </Label>
        </FormGroup>

        <FormGroup check className="mb-3">
          <Label check>
            <Input
              type="checkbox"
              name="is_default"
              defaultChecked={!!this.props.is_default}
              disabled={this.state.isSubmitting}
            />{' '}
            System Default
          </Label>
        </FormGroup>

        <hr />

        <Button
          color="dark"
          size="lg"
          className="float-left"
          type="reset"
          disabled={this.state.isSubmitting}
        >
          Reset
        </Button>

        <Button
          color="primary"
          size="lg"
          className="float-right"
          disabled={this.state.isSubmitting}
        >
          Submit
        </Button>
      </Form>
    );
  }
}
