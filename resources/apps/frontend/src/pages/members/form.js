import React from 'react';
import get from 'lodash/get';
import serialize from 'form-serialize';
import {
  Form,
  FormGroup,
  Input,
  Label,
  Button,
  Row,
  Col,
  FormText,
} from 'reactstrap';

import BooleanSelect from 'components/Form/Select/BooleanSelect';
import getErrorMessage from 'utils/getErrorMessage';
import notify from 'utils/notify';
import Avatar from 'components/Avatar';
import {uploadAvatar} from 'requests/members';

export default class extends React.Component {
  static defaultProps = {
    successMessage: 'Successfully submitted',
    onSubmit: () => {},
    isCreate: false,
  };

  state = {
    isSubmitting: false,
    avatar: null,
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

  get avatar() {
    if (this.state.avatar) return this.state.avatar;
    return this.props.avatar;
  }

  onChangeFile = async event => {
    try {
      const files = event.target.files;
      if (files.length === 0) return;

      const file = files[0];

      this.setState({isSubmitting: true});

      const data = new FormData();

      data.append('file', file);

      const response = await uploadAvatar(data);

      const path = get(response, 'dimensions.square50.filedir');
      const avatar = `${process.env.APP_API_URL}/${path.substring(1)}`;

      this.setState({isSubmitting: false, avatar});
    } catch (err) {
      alert(err.message);
      this.setState({isSubmitting: false});
    }
  };

  render() {
    return (
      <Form onSubmit={this.onSubmit}>
        <FormGroup>
          <Row>
            <div className="float-left pl-3 pr-3 d-flex align-items-center justify-content-end">
              <Avatar src={this.avatar} />
            </div>
            <div className="float-left">
              <Label for="exampleFile">Avatar</Label>
              <Input
                type="file"
                name="file"
                id="file"
                onChange={this.onChangeFile}
                accept="image/*"
              />
              <FormText color="muted">Debes seleccionar solo imágenes</FormText>
            </div>
          </Row>
        </FormGroup>
        <Row>
          <Col md={6}>
            <Input type="hidden" name="avatar" defaultValue={this.avatar} />
            <FormGroup>
              <Label for="name">Nombre</Label>
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
              <Label for="password">Contraseña</Label>
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
              <Label for="Password Confirmation">
                Confirmación de contraseña
              </Label>
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
              <Label for="date_of_birth">Fecha de nacimiento</Label>
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
              <Label for="mobile">Teléfono</Label>
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
              <Label for="address">Dirección</Label>
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
              <Label for="is_active">Activo</Label>
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
              <Label for="is_deleted">Eliminado</Label>
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
              <Label for="city">Ciudad</Label>
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
              <Label for="state">Estado</Label>
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
              <Label for="country">Pais</Label>
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
              <Label for="postal_code">Código postal</Label>
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
          {this.state.isSubmitting
            ? 'Espere por favor...'
            : 'Enviar formulario'}
        </Button>
      </Form>
    );
  }
}
