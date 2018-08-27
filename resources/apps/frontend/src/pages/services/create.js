import React from 'react';
import {Card, CardBody} from 'reactstrap';
import Breadcrumbs from 'components/Breadcrumbs';

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

  render() {
    return (
      <React.Fragment>
        <Breadcrumbs previous={this.previous} active="Create Service" />
        <Card>
          <CardBody>sdgsdgasdg</CardBody>
        </Card>
      </React.Fragment>
    );
  }
}

export default Component;
