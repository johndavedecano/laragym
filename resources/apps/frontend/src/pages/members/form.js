import React from 'react';
import serialize from 'form-serialize';
import {Form, FormGroup, Input, Label, Button, Row, Col} from 'reactstrap';

import BooleanSelect from 'components/Form/Select/BooleanSelect';
import getErrorMessage from 'utils/getErrorMessage';
import notify from 'utils/notify';

export default class extends React.Component {
  static defaultProps = {
    successMessage: 'Successfully submitted',
    onSubmit: () => {},
    isCreate: false,
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
        <Row>
          <Col md={6}>
            <FormGroup>
              <Label for="name">Name</Label>
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
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label for="email">Email</Label>
              <Input
                type="email"
                name="email"
                id="email"
                placeholder="Email"
                required
                defaultValue={this.props.email}
                disabled={this.state.isSubmitting}
              />
            </FormGroup>
          </Col>
        </Row>

        <Row>
          <Col md={6}>
            <FormGroup>
              <Label for="password">Password</Label>
              <Input
                type="password"
                name="password"
                id="password"
                required={this.props.isCreate}
                placeholder="Password"
                disabled={this.state.isSubmitting}
              />
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label for="Password Confirmation">Password Confirmation</Label>
              <Input
                type="password"
                name="password_confirmation"
                id="password_confirmation"
                placeholder="Password Confirmation"
                disabled={this.state.isSubmitting}
              />
            </FormGroup>
          </Col>
        </Row>

        <Row>
          <Col md={6}>
            <FormGroup>
              <Label for="date_of_birth">Date of Birth</Label>
              <Input
                type="date"
                name="date_of_birth"
                id="date_of_birth"
                placeholder="date_of_birth"
                defaultValue={this.props.date_of_birth}
                disabled={this.state.isSubmitting}
              />
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label for="mobile">Mobile Number</Label>
              <Input
                type="text"
                name="mobile"
                id="mobile"
                placeholder="Mobile Number"
                defaultValue={this.props.mobile}
                disabled={this.state.isSubmitting}
              />
            </FormGroup>
          </Col>
        </Row>

        <Row>
          <Col md={12}>
            <FormGroup>
              <Label for="address">Address</Label>
              <Input
                rows={8}
                type="textarea"
                name="address"
                id="address"
                placeholder="address"
                disabled={this.state.isSubmitting}
                defaultValue={this.props.address}
              />
            </FormGroup>
          </Col>
        </Row>

        <Row>
          <Col md={4}>
            <FormGroup>
              <Label for="is_active">Active</Label>
              <BooleanSelect
                name="is_active"
                id="is_active"
                placeholder="Select Active"
                defaultValue={this.props.is_active}
              />
            </FormGroup>
          </Col>
          <Col md={4}>
            <FormGroup>
              <Label for="is_admin">Admin</Label>
              <BooleanSelect
                name="is_admin"
                id="is_admin"
                placeholder="Select Admin"
                defaultValue={this.props.is_admin}
              />
            </FormGroup>
          </Col>

          <Col md={4}>
            <FormGroup>
              <Label for="is_deleted">Deleted</Label>
              <BooleanSelect
                name="is_deleted"
                id="is_deleted"
                placeholder="Select Deleted"
                defaultValue={this.props.is_deleted}
              />
            </FormGroup>
          </Col>
        </Row>

        <Row>
          <Col md={6}>
            <FormGroup>
              <Label for="city">City</Label>
              <Input
                type="text"
                name="city"
                id="city"
                placeholder="city"
                defaultValue={this.props.city}
                disabled={this.state.isSubmitting}
              />
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label for="state">State</Label>
              <Input
                type="text"
                name="state"
                id="state"
                placeholder="State"
                defaultValue={this.props.state}
                disabled={this.state.isSubmitting}
              />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <FormGroup>
              <Label for="country">Country</Label>
              <Input
                type="text"
                name="country"
                id="country"
                placeholder="Country"
                defaultValue={this.props.country}
                disabled={this.state.isSubmitting}
              />
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label for="postal_code">Postal Code</Label>
              <Input
                type="text"
                name="postal_code"
                id="postal_code"
                placeholder="Postal Code"
                defaultValue={this.props.postal_code}
                disabled={this.state.isSubmitting}
              />
            </FormGroup>
          </Col>
        </Row>

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
