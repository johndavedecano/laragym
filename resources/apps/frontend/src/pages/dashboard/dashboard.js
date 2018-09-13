import React, {Component} from 'react';
import {PrivateLayout} from 'components/Layouts';
import {Card, CardBody, CardHeader, Row, Col} from 'reactstrap';

import StatisticCard from './StatisticCard';
import Loader from 'components/Loader';
import {load} from 'requests/statistics';

class Dashboard extends Component {
  state = {
    subscriptions: 0,
    services: 0,
    members: 0,
    packages: 0,
    isLoading: false,
  };

  componentDidMount() {
    this.setState({isLoading: true});
    load()
      .then(({subscriptions, services, members, packages}) => {
        this.setState({
          subscriptions,
          services,
          members,
          packages,
          isLoading: false,
        });
      })
      .catch(error => {
        console.error(error);
        this.setState({isLoading: false});
      });
  }

  render() {
    return (
      <PrivateLayout>
        <Loader show={this.state.isLoading} />
        <Row className="mb-3">
          <Col md={3}>
            <StatisticCard
              color="primary"
              message={`${this.state.subscriptions} subscriptions`}
              messageLink="/subscriptions"
              iconClass="fa-id-card"
            />
          </Col>
          <Col md={3}>
            <StatisticCard
              color="warning"
              message={`${this.state.services} services`}
              messageLink="/services"
              iconClass="fa-server"
            />
          </Col>
          <Col md={3}>
            <StatisticCard
              color="danger"
              message={`${this.state.packages} packages`}
              messageLink="/packages"
              iconClass="fa-box"
            />
          </Col>
          <Col md={3}>
            <StatisticCard
              color="success"
              message={`${this.state.members} members`}
              messageLink="/members"
              iconClass="fa-users"
            />
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <Card>
              <CardHeader>Latest Activities</CardHeader>
              <CardBody>Coming Soon</CardBody>
            </Card>
          </Col>
          <Col md={6}>
            <Card>
              <CardHeader>Todays Attendance</CardHeader>
              <CardBody>Coming Soon</CardBody>
            </Card>
          </Col>
        </Row>
      </PrivateLayout>
    );
  }
}

export default Dashboard;
