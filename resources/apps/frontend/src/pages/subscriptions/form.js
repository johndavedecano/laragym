import React from 'react';
import serialize from 'form-serialize';
import {Form, FormGroup, Input, Label, Button, Row, Col} from 'reactstrap';

import MemberSelect from 'components/Form/Select/MemberSelect';
import SubscriptionStatusSelect from 'components/Form/Select/SubscriptionStatusSelect';
import PackageSelect from 'components/Form/Select/PackageSelect';

import getErrorMessage from 'utils/getErrorMessage';
import notify from 'utils/notify';
import date from 'utils/date';

export default class extends React.Component {
  static defaultProps = {
    successMessage: 'Successfully submitted',
    onSubmit: () => {},
    isCreate: false,
    status: 'active',
    interval: 1,
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
              <Label for="user_id">Miembro</Label>
              <MemberSelect
                name="user_id"
                id="user_id"
                placeholder="Select Member"
                defaultValue={this.props.user_id}
              />
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label for="package_id">Paquete</Label>
              <PackageSelect
                name="package_id"
                id="package_id"
                placeholder="Select Package"
                defaultValue={this.props.package_id}
              />
            </FormGroup>
          </Col>
        </Row>

        <Row>
          <Col md={6}>
            <FormGroup>
              <Label for="interval">Intervalo</Label>
              <Input
                type="number"
                name="interval"
                id="interval"
                required
                min={1}
                defaultValue={this.props.interval}
              />
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label for="status">Estatus</Label>
              <SubscriptionStatusSelect
                name="status"
                id="status"
                placeholder="Select Status"
                defaultValue={this.props.status}
                isDisabled={this.props.isCreate}
              />
            </FormGroup>
          </Col>
        </Row>

        <Row>
          <Col md={6}>
            <FormGroup>
              <Label for="expires_at">Fecha de Expiración</Label>
              <input
                className="form-control"
                type="date"
                name="expires_at"
                id="expires_at"
                required
                min={1}
                defaultValue={date(this.props.expires_at, 'YYYY-MM-DD')}
                disabled={this.props.isCreate}
              />
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label for="suspended_at">Fecha de suspención</Label>
              <input
                className="form-control"
                type="date"
                name="suspended_at"
                id="suspended_at"
                required
                min={1}
                defaultValue={date(this.props.suspended_at, 'YYYY-MM-DD')}
                disabled={this.props.isCreate}
              />
            </FormGroup>
          </Col>
        </Row>

        <Button
          color="primary"
          className="float-right"
          disabled={this.state.isSubmitting}
        >
          {this.state.isSubmitting ? 'Porfavor Espere...' : 'Enviar Formulario'}
        </Button>
      </Form>
    );
  }
}
