import React from 'react';

import {Card, CardBody} from 'reactstrap';
import Form from './form';
import Breadcrumbs from 'components/Breadcrumbs';
import {createBillingCycle} from 'requests/billing-cycles';

class Component extends React.Component {
  state = {};

  get previous() {
    return [
      {
        to: '/billing-cycles',
        label: 'Billing Cycles',
      },
    ];
  }

  onSubmit = data => {
    return createBillingCycle(data).then(() => {
      setTimeout(() => {
        this.props.history.replace('/billing-cycles');
      }, 1000);
    });
  };

  render() {
    return (
      <React.Fragment>
        <Breadcrumbs previous={this.previous} active="Create Billing Cycle" />
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
