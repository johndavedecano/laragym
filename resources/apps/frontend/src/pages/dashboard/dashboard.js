import React, {Component} from 'react';
import {PrivateLayout} from 'components/Layouts';
import {Card, CardBody, CardHeader} from 'reactstrap';

class Dashboard extends Component {
  state = {};

  render() {
    return (
      <PrivateLayout>
        <Card>
          <CardHeader>Manage Users</CardHeader>
          <CardBody>sgsdgds</CardBody>
        </Card>
      </PrivateLayout>
    );
  }
}

export default Dashboard;
