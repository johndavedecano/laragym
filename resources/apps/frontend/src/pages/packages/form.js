import React from 'react';
import serialize from 'form-serialize';
import {Form, FormGroup, Input, Label, Button} from 'reactstrap';

import getErrorMessage from 'utils/getErrorMessage';
import notify from 'utils/notify';
import StatusSelect from 'components/Form/Select/StatusSelect';
import ServiceSelect from 'components/Form/Select/ServiceSelect';
import CycleSelect from 'components/Form/Select/CycleSelect';

export default class extends React.Component {
  static defaultProps = {
    successMessage: 'Successfully submitted',
    name: undefined,
    amount: undefined,
    cycle_id: undefined,
    service_id: undefined,
    status: undefined,
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
          <Label for="amount">Amount</Label>
          <Input
            type="number"
            name="amount"
            id="amount"
            required
            defaultValue={this.props.amount}
            disabled={this.state.isSubmitting}
          />
        </FormGroup>

        {this.props.status && (
          <FormGroup>
            <Label for="status">Status</Label>
            <StatusSelect defaultValue={this.props.status} name="status" />
          </FormGroup>
        )}

        <FormGroup>
          <Label for="service_id">Service</Label>
          <ServiceSelect
            defaultValue={this.props.service_id}
            name="service_id"
          />
        </FormGroup>

        <FormGroup>
          <Label for="cycle_id">Billing Cycle</Label>
          <CycleSelect defaultValue={this.props.cycle_id} name="cycle_id" />
        </FormGroup>

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
