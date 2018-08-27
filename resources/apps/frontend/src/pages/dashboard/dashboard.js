import React, {Component} from 'react';
import {PrivateLayout} from 'components/Layouts';
import {
  Table,
  Card,
  CardBody,
  CardHeader,
  Row,
  Col,
  Input,
  Button,
} from 'reactstrap';

import {TableFilters} from 'components/Table/Table';

class Dashboard extends Component {
  state = {};

  render() {
    return (
      <PrivateLayout>
        <Card>
          <CardHeader>Manage Users</CardHeader>
          <TableFilters>
            <Row>
              <Col md={2}>
                <Input type="select" name="select" id="exampleSelect">
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                </Input>
              </Col>
              <Col md={2}>
                <Input type="text" placeholder="Search" />
              </Col>
              <Col md={6} />
              <Col md={2}>
                <Button className="float-right" color="primary">
                  <i className="fa fa-plus" /> Add Item
                </Button>
              </Col>
            </Row>
          </TableFilters>
          <CardBody>
            <Table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Username</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">1</th>
                  <td>Mark</td>
                  <td>Otto</td>
                  <td>@mdo</td>
                </tr>
                <tr>
                  <th scope="row">2</th>
                  <td>Jacob</td>
                  <td>Thornton</td>
                  <td>@fat</td>
                </tr>
                <tr>
                  <th scope="row">3</th>
                  <td>Larry</td>
                  <td>the Bird</td>
                  <td>@twitter</td>
                </tr>
              </tbody>
            </Table>
          </CardBody>
        </Card>
      </PrivateLayout>
    );
  }
}

export default Dashboard;
