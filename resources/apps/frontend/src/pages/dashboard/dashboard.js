import React, {Component} from 'react';
import {PrivateLayout} from 'components/Layouts';
import {Card, CardBody, CardHeader, Row, Col, Form, Button} from 'reactstrap';
import serialize from 'form-serialize';

import StatisticCard from './StatisticCard';
import Loader from 'components/Loader';
import {load} from 'requests/statistics';
import Attendance from './Attendance';
import Activities from './Activities';
import MemberSelect from 'components/Form/Select/MemberSelect';
import LoginTypeSelect from 'components/Form/Select/LoginTypeSelect';
import notify from 'utils/notify';
import getErrorMessage from 'utils/getErrorMessage';
import {createAttendance} from 'requests/activities';

class Dashboard extends Component {
  state = {
    subscriptions: 0,
    services: 0,
    members: 0,
    packages: 0,
    isLoading: false,
    isSubmitting: false,
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

  onSubmit = async event => {
    try {
      event.preventDefault();

      this.setState({isSubmitting: true});

      const form = event.target;

      const data = serialize(form, {hash: true});

      await createAttendance(data);

      await this.attendance.load();

      this.setState({isSubmitting: false});

      notify({
        type: 'success',
        text: 'Successfully Submitted',
      });
    } catch (err) {
      notify({
        type: 'error',
        text: getErrorMessage(err),
      });

      this.setState({isSubmitting: false});
    }
  };

  render() {
    return (
      <PrivateLayout>
        <Loader show={this.state.isLoading} />
        <Row className="mb-3">
          <Col md={3}>
            <StatisticCard
              color="primary"
              iconClass="fa-id-card"
              message={`${this.state.subscriptions} Subscripciones`}
              messageLink="/subscriptions"
            />
          </Col>
          <Col md={3}>
            <StatisticCard
              color="warning"
              iconClass="fa-server"
              message={`${this.state.services} Servicios`}
              messageLink="/services"
            />
          </Col>
          <Col md={3}>
            <StatisticCard
              color="danger"
              iconClass="fa-box"
              message={`${this.state.packages} paquetes`}
              messageLink="/packages"
            />
          </Col>
          <Col md={3}>
            <StatisticCard
              color="success"
              iconClass="fa-users"
              message={`${this.state.members} miembros`}
              messageLink="/members"
            />
          </Col>
        </Row>
        <Row className="mb-4">
          <Col md={6}>
            <Card>
              <CardHeader>Últimas actividades</CardHeader>
              <CardBody>
                <Activities
                  ref={activities => (this.activities = activities)}
                  limit={11}
                />
              </CardBody>
            </Card>
          </Col>
          <Col md={6}>
            <Card className="mb-3">
              <CardHeader>Nueva asistencia</CardHeader>
              <CardBody>
                <Form onSubmit={this.onSubmit}>
                  <Row>
                    <Col md={6}>
                      <MemberSelect
                        disabled={this.state.isSubmitting}
                        isRequired
                        name="user_id"
                        placeholder="Select User"
                        plainLabel
                      />
                    </Col>
                    <Col md={4}>
                      <LoginTypeSelect
                        disabled={this.state.isSubmitting}
                        isRequired
                        name="description"
                        placeholder="Select Type"
                        plainLabel
                      />
                    </Col>
                    <Col md={2}>
                      <Button
                        color="primary"
                        disabled={this.state.isSubmitting}
                      >
                        {this.state.isSubmitting ? '......' : 'Submit'}
                      </Button>
                    </Col>
                  </Row>
                </Form>
              </CardBody>
            </Card>
            <Card>
              <CardHeader>Asistencia de hoy</CardHeader>
              <CardBody>
                <Attendance
                  limit={5}
                  ref={attendance => (this.attendance = attendance)}
                />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </PrivateLayout>
    );
  }
}

export default Dashboard;
