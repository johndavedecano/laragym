import React from 'react';

import {Card, CardBody, Form, FormGroup, Input, Label} from 'reactstrap';

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
        label: 'Package',
      },
    ];
  }

  render() {
    if (!this.state.isLoaded) return <Loader show />;
    const {id} = this.props.match.params;
    const {name, is_archived, is_default, description} = this.state.data;
    return (
      <React.Fragment>
        <Breadcrumbs previous={this.previous} active="Edit Package" />
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
                <Label check>
                  <Input
                    type="checkbox"
                    name="is_archived"
                    defaultChecked={!!is_archived}
                    readOnly={true}
                    disabled
                  />{' '}
                  Archived
                </Label>
              </FormGroup>

              <FormGroup check className="mb-3">
                <Label check>
                  <Input
                    type="checkbox"
                    name="is_default"
                    defaultChecked={!!is_default}
                    readOnly={true}
                    disabled
                  />{' '}
                  System Default
                </Label>
              </FormGroup>

              <hr />

              <Link
                to={`/packages/${id}/edit`}
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
