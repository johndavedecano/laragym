import React from 'react';

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
import {showPackage} from 'requests/packages';
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
      const {data} = await showPackage(id);
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
        to: '/packages',
        label: 'Packages',
      },
    ];
  }

  render() {
    if (!this.state.isLoaded) return <Loader show />;
    const {id} = this.props.match.params;
    const {
      name,
      amount,
      status,
      created_at,
      updated_at,
      service,
      cycle,
    } = this.state.data;
    return (
      <React.Fragment>
        <Breadcrumbs previous={this.previous} active="Package Information" />
        <Card>
          <CardBody className="position-relative">
            {this.state.isNotFound && 'Page Not Found'}
            <Form>
              <Row>
                <Col md={6}>
                  <FormGroup>
                    <Label for="Name">Name</Label>
                    <Input
                      type="text"
                      name="name"
                      id="name"
                      placeholder="Name"
                      required
                      defaultValue={name}
                      readOnly={true}
                    />
                  </FormGroup>
                </Col>
                <Col md={3}>
                  <FormGroup>
                    <Label for="amount">Amount</Label>
                    <Input
                      type="text"
                      name="amount"
                      id="amount"
                      required
                      defaultValue={amount}
                      readOnly={true}
                    />
                  </FormGroup>
                </Col>

                <Col md={3}>
                  <FormGroup>
                    <Label for="status">Status</Label>
                    <Input
                      type="text"
                      name="status"
                      id="status"
                      required
                      defaultValue={status}
                      readOnly={true}
                    />
                  </FormGroup>
                </Col>
              </Row>

              <Row>
                <Col md={6}>
                  <FormGroup>
                    <Label for="service">Service</Label>
                    <Input
                      type="text"
                      required
                      defaultValue={service.name}
                      readOnly={true}
                    />
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label for="amount">Service ID</Label>
                    <Input
                      type="text"
                      required
                      defaultValue={service.id}
                      readOnly={true}
                    />
                  </FormGroup>
                </Col>
              </Row>

              <Row>
                <Col md={6}>
                  <FormGroup>
                    <Label>Billing Cycle</Label>
                    <Input
                      type="text"
                      required
                      defaultValue={cycle.name}
                      readOnly={true}
                    />
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label>Billing Cycle ID</Label>
                    <Input
                      type="text"
                      required
                      defaultValue={cycle.id}
                      readOnly={true}
                    />
                  </FormGroup>
                </Col>
              </Row>

              <Row>
                <Col md={6}>
                  <FormGroup>
                    <Label for="created_at">Created At</Label>
                    <Input
                      type="text"
                      name="created_at"
                      id="created_at"
                      required
                      defaultValue={created_at}
                      readOnly={true}
                    />
                  </FormGroup>
                </Col>

                <Col md={6}>
                  <FormGroup>
                    <Label for="updated_at">Updated At</Label>
                    <Input
                      type="text"
                      name="updated_at"
                      id="updated_at"
                      required
                      defaultValue={updated_at}
                      readOnly={true}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Link
                to={`/packages/${id}/edit`}
                className="btn btn-primary align-right"
              >
                Edit Package
              </Link>
            </Form>
          </CardBody>
        </Card>
      </React.Fragment>
    );
  }
}

export default Component;
