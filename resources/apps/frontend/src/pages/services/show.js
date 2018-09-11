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
import {showService} from 'requests/services';
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
      const {data} = await showService(id);
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
        to: '/services',
        label: 'Services',
      },
    ];
  }

  render() {
    if (!this.state.isLoaded) return <Loader show />;
    const {id} = this.props.match.params;
    const {name, description, status, created_at, updated_at} = this.state.data;
    return (
      <React.Fragment>
        <Breadcrumbs previous={this.previous} active="Service Information" />
        <Card>
          <CardBody className="position-relative">
            {this.state.isNotFound && 'Page Not Found'}
            <Form>
              <FormGroup>
                <Label for="Name">Name</Label>
                <Input
                  type="text"
                  name="name"
                  id="name"
                  bsSize="lg"
                  placeholder="Name"
                  required
                  defaultValue={name}
                  readOnly={true}
                />
              </FormGroup>

              <FormGroup>
                <Label for="description">Description</Label>
                <Input
                  type="textarea"
                  name="description"
                  id="description"
                  bsSize="lg"
                  required
                  defaultValue={description}
                  readOnly={true}
                />
              </FormGroup>

              <FormGroup>
                <Label for="status">Status</Label>
                <Input
                  type="text"
                  name="status"
                  id="status"
                  bsSize="lg"
                  required
                  defaultValue={status}
                  readOnly={true}
                />
              </FormGroup>

              <Row>
                <Col md={6}>
                  <FormGroup>
                    <Label for="created_at">Created At</Label>
                    <Input
                      type="text"
                      name="created_at"
                      id="created_at"
                      bsSize="lg"
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
                      bsSize="lg"
                      required
                      defaultValue={updated_at}
                      readOnly={true}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Link
                to={`/services/${id}/edit`}
                className="btn btn-primary btn-lg align-right"
              >
                Edit Service
              </Link>
            </Form>
          </CardBody>
        </Card>
      </React.Fragment>
    );
  }
}

export default Component;
