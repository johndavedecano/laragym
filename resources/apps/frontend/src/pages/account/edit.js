import React from 'react';
import {Card, CardBody, CardHeader} from 'reactstrap';
import {updateMember, showMember} from 'requests/members';
import Form from './form';
import Loader from 'components/Loader';

class Component extends React.Component {
  state = {
    isLoading: false,
    isLoaded: false,
    isNotFound: false,
    data: {},
  };

  componentDidMount() {
    this.user = this.user();
    this.load(this.user.id);
  }

  user() {
    try {
      return JSON.parse(localStorage.getItem('user'));
    } catch (err) {
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      window.location.replace('/login');
    }
  }

  load = async id => {
    try {
      this.setState({isLoading: true});
      const {data} = await showMember(id);
      this.setState({
        isLoading: false,
        isNotFound: false,
        data,
        isLoaded: true,
      });
    } catch (error) {
      this.setState({isLoading: false, isNotFound: true});
    }
  };

  get form() {
    return <Form onSubmit={this.onSubmit} {...this.state.data} />;
  }

  onSubmit = data => {
    this.setState({isLoading: true});
    return updateMember(this.user.id, data);
  };

  render() {
    if (!this.state.isLoaded) return <Loader show />;
    return (
      <React.Fragment>
        <Card>
          <CardHeader>Update Account</CardHeader>
          <CardBody className="position-relative">
            {this.state.isNotFound && 'Page Not Found'}
            {this.form}
          </CardBody>
        </Card>
      </React.Fragment>
    );
  }
}

export default Component;
