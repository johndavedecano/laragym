import React from 'react';

import {Link} from 'react-router-dom';
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

import {showSubscription} from 'requests/subscriptions';
import Breadcrumbs from 'components/Breadcrumbs';
import date from 'utils/date';
import Loader from 'components/Loader';
import SubscriptionStatusSelect from 'components/Form/Select/SubscriptionStatusSelect';

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
      const {data} = await showSubscription(id);
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
        to: '/subscriptions',
        label: 'Subscriptions',
      },
    ];
  }

  render() {
    if (!this.state.isLoaded) return <Loader show />;
    const {id} = this.props.match.params;
    return (
      <React.Fragment>
        <Breadcrumbs
          previous={this.previous}
          active="Subscription Information"
        />
        <Card>
          <CardBody className="position-relative">
            {this.state.isNotFound && 'Page Not Found'}
            <Form>
              <Row>
                <Col md={6}>
                  <FormGroup>
                    <Label for="user_id">Member</Label>
                    <Input
                      type="text"
                      name="user_id"
                      id="user_id"
                      required
                      defaultValue={get(this.state.data, 'user.name')}
                      readOnly
                    />
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label for="email">Email Address</Label>
                    <Input
                      type="email"
                      name="email"
                      id="email"
                      required
                      defaultValue={get(this.state.data, 'user.email')}
                      readOnly
                    />
                  </FormGroup>
                </Col>
              </Row>

              <Row>
                <Col md={6}>
                  <FormGroup>
                    <Label for="amount">Amount</Label>
                    <Input
                      type="text"
                      name="amount"
                      id="amount"
                      required
                      defaultValue={get(this.state.data, 'package.amount')}
                      readOnly
                    />
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label for="package_status">Package</Label>
                    <Input
                      type="text"
                      name="package_status"
                      id="package_status"
                      required
                      defaultValue={get(this.state.data, 'package.name')}
                      readOnly
                    />
                  </FormGroup>
                </Col>
              </Row>

              <Row>
                <Col md={6}>
                  <FormGroup>
                    <Label for="cycle_id">Billing Cycle</Label>
                    <Input
                      type="text"
                      name="cycle_id"
                      id="cycle_id"
                      required
                      defaultValue={get(this.state.data, 'cycle.name')}
                      readOnly
                    />
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label for="service_id">Service</Label>
                    <Input
                      type="text"
                      name="service_id"
                      id="service_id"
                      required
                      defaultValue={get(this.state.data, 'service.name')}
                      readOnly
                    />
                  </FormGroup>
                </Col>
              </Row>

              <Row>
                <Col md={6}>
                  <FormGroup>
                    <Label for="interval">Interval</Label>
                    <Input
                      type="number"
                      name="interval"
                      id="interval"
                      required
                      defaultValue={get(this.state.data, 'interval')}
                      readOnly
                    />
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label for="status">Status</Label>
                    <SubscriptionStatusSelect
                      name="status"
                      id="status"
                      placeholder="Select Status"
                      defaultValue={get(this.state.data, 'status')}
                      isDisabled
                    />
                  </FormGroup>
                </Col>
              </Row>

              <Row>
                <Col md={6}>
                  <FormGroup>
                    <Label for="expires_at">Expiration At</Label>
                    <input
                      className="form-control"
                      type="date"
                      name="expires_at"
                      id="expires_at"
                      required
                      defaultValue={date(
                        get(this.state.data, 'expires_at'),
                        'YYYY-MM-DD'
                      )}
                      readOnly
                    />
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label for="suspended_at">Suspended At</Label>
                    <input
                      className="form-control"
                      type="date"
                      name="suspended_at"
                      id="suspended_at"
                      required
                      defaultValue={date(
                        get(this.state.data, 'suspended_at'),
                        'YYYY-MM-DD'
                      )}
                      readOnly
                    />
                  </FormGroup>
                </Col>
              </Row>

              <Row>
                <Col md={6}>
                  <FormGroup>
                    <Label for="created_at">Created At</Label>
                    <input
                      className="form-control"
                      type="date"
                      name="created_at"
                      id="created_at"
                      required
                      defaultValue={date(
                        get(this.state.data, 'created_at'),
                        'YYYY-MM-DD'
                      )}
                      readOnly
                    />
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label for="updated_at">Updated At</Label>
                    <input
                      className="form-control"
                      type="date"
                      name="updated_at"
                      id="updated_at"
                      required
                      defaultValue={date(
                        get(this.state.data, 'updated_at'),
                        'YYYY-MM-DD'
                      )}
                      readOnly
                    />
                  </FormGroup>
                </Col>
              </Row>

              <Link
                to={`/subscriptions/${id}/edit`}
                className="btn btn-primary align-right"
              >
                Edit Subscription
              </Link>
            </Form>
          </CardBody>
        </Card>
      </React.Fragment>
    );
  }
}

export default Component;
