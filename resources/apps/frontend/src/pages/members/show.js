import React from 'react';
import get from 'lodash/get';
import {
  Card,
  CardBody,
  Form,
  FormGroup,
  Input,
  Label,
  Row,
  Col,
} from 'reactstrap';

import {Link} from 'react-router-dom';
import {showMember} from 'requests/members';
import Breadcrumbs from 'components/Breadcrumbs';
import Loader from 'components/Loader';

class Component extends React.Component {
  state = {
    isLoading: false,
    isLoaded: false,
    isNotFound: false,
    data: {},
  };

  componentDidMount() {
    this.load();
  }

  load = async () => {
    try {
      this.setState({isLoading: true});
      const {id} = this.props.match.params;
      const {data} = await showMember(id);
      this.setState({
        isLoading: false,
        isNotFound: false,
        data,
        isLoaded: true,
      });
    } catch (error) {
      this.setState({isLoading: false, isNotFound: true});
    }
  };

  get previous() {
    return [
      {
        to: '/members',
        label: 'Members',
      },
    ];
  }

  render() {
    if (!this.state.isLoaded) return <Loader show />;
    const {id} = this.props.match.params;
    return (
      <React.Fragment>
        <Breadcrumbs previous={this.previous} active="Member Information" />
        <Card>
          <CardBody className="position-relative">
            {this.state.isNotFound && 'Page Not Found'}
            <Form>
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
                      defaultValue={get(this.state.data, 'name')}
                      readOnly
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
                      defaultValue={get(this.state.data, 'email')}
                      readOnly
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
                      defaultValue={get(this.state.data, 'date_of_birth')}
                      readOnly
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
                      defaultValue={get(this.state.data, 'mobile')}
                      readOnly
                    />
                  </FormGroup>
                </Col>
              </Row>

              <Row>
                <Col md={4}>
                  <FormGroup>
                    <Label for="is_active">Active</Label>
                    <Input
                      type="text"
                      name="is_active"
                      id="is_active"
                      placeholder="Active"
                      defaultValue={get(this.state.data, 'is_active')}
                      readOnly
                    />
                  </FormGroup>
                </Col>
                <Col md={4}>
                  <FormGroup>
                    <Label for="is_admin">Admin</Label>
                    <Input
                      type="text"
                      name="is_admin"
                      id="is_admin"
                      placeholder="Admin"
                      defaultValue={get(this.state.data, 'is_admin')}
                      readOnly
                    />
                  </FormGroup>
                </Col>

                <Col md={4}>
                  <FormGroup>
                    <Label for="is_deleted">Deleted</Label>
                    <Input
                      type="text"
                      name="is_deleted"
                      id="is_deleted"
                      placeholder="Deleted"
                      defaultValue={get(this.state.data, 'is_deleted')}
                      readOnly
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
                      readOnly
                      defaultValue={get(this.state.data, 'address')}
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
                      defaultValue={get(this.state.data, 'city')}
                      readOnly
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
                      defaultValue={get(this.state.data, 'state')}
                      readOnly
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
                      defaultValue={get(this.state.data, 'country')}
                      readOnly
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
                      defaultValue={get(this.state.data, 'postal_code')}
                      readOnly
                    />
                  </FormGroup>
                </Col>
              </Row>

              <Link
                to={`/members/${id}/edit`}
                className="btn btn-primary align-right"
              >
                Edit Member
              </Link>
            </Form>
          </CardBody>
        </Card>
      </React.Fragment>
    );
  }
}

export default Component;
