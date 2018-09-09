import React from 'react';

import {Card, CardBody, Form, FormGroup, Input, Label} from 'reactstrap';

import {Link} from 'react-router-dom';
import {showService} from 'requests/services';
import Breadcrumbs from 'components/Breadcrumbs';
import Loader from 'components/Loader';
import Status from 'components/Badges/Status';

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
    const {name, description, status} = this.state.data;
    return (
      <React.Fragment>
        <Breadcrumbs previous={this.previous} active="Edit Service" />
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

              <FormGroup check className="mb-3">
                <Label for="status">Status</Label>
                <p>
                  <Status value={status} />
                </p>
              </FormGroup>

              <hr />

              <Link
                to={`/services/${id}/edit`}
                className="btn btn-primary btn-lg"
              >
                Edit
              </Link>
            </Form>
          </CardBody>
        </Card>
      </React.Fragment>
    );
  }
}

export default Component;
