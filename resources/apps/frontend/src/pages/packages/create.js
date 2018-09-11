import React from 'react';

import {Card, CardBody} from 'reactstrap';
import Form from './form';
import Breadcrumbs from 'components/Breadcrumbs';
import {createPackage} from 'requests/packages';

class Component extends React.Component {
  state = {};

  get previous() {
    return [
      {
        to: '/packages',
        label: 'Packages',
      },
    ];
  }

  onSubmit = data => {
    return createPackage(data).then(() => {
      setTimeout(() => {
        this.props.history.replace('/packages');
      }, 1000);
    });
  };

  render() {
    return (
      <React.Fragment>
        <Breadcrumbs previous={this.previous} active="Create Package" />
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
