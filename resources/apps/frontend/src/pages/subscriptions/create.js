import React from 'react';

import {Card, CardBody} from 'reactstrap';
import Form from './form';
import Breadcrumbs from 'components/Breadcrumbs';
import {createSubscription} from 'requests/subscriptions';

class Component extends React.Component {
  state = {};

  get previous() {
    return [
      {
        to: '/subscriptions',
        label: 'Subscripciones',
      },
    ];
  }

  onSubmit = data => {
    return createSubscription(data).then(() => {
      setTimeout(() => {
        this.props.history.replace('/subscriptions');
      }, 1000);
    });
  };

  render() {
    return (
      <React.Fragment>
        <Breadcrumbs previous={this.previous} active="Crear Subscriptción" />
        <Card>
          <CardBody>
            <Form onSubmit={this.onSubmit} isCreate />
          </CardBody>
        </Card>
      </React.Fragment>
    );
  }
}

export default Component;
