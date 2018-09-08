import React from 'react';

import {Card, CardBody} from 'reactstrap';
import Form from './form';
import Breadcrumbs from 'components/Breadcrumbs';
import {createService} from 'requests/services';

class Component extends React.Component {
  state = {};

  get previous() {
    return [
      {
        to: '/services',
        label: 'Services',
      },
    ];
  }

  onSubmit = data => createService(data);

  render() {
    return (
      <React.Fragment>
        <Breadcrumbs previous={this.previous} active="Create Service" />
        <Card>
          <CardBody>
            <Form onSubmit={this.onSubmit} />
          </CardBody>
        </Card>
      </React.Fragment>
    );
  }
}

export default Component;
