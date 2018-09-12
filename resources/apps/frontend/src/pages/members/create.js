import React from 'react';

import {Card, CardBody} from 'reactstrap';
import Form from './form';
import Breadcrumbs from 'components/Breadcrumbs';
import {createMember} from 'requests/members';

class Component extends React.Component {
  state = {};

  get previous() {
    return [
      {
        to: '/members',
        label: 'Members',
      },
    ];
  }

  onSubmit = data => {
    return createMember(data).then(() => {
      setTimeout(() => {
        this.props.history.replace('/members');
      }, 1000);
    });
  };

  render() {
    return (
      <React.Fragment>
        <Breadcrumbs previous={this.previous} active="Create Member" />
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
