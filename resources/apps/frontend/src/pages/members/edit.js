import React from 'react';

import {Card, CardBody} from 'reactstrap';
import {updateMember, showMember} from 'requests/members';
import Breadcrumbs from 'components/Breadcrumbs';
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
    this.load();
  }

  load = async () => {
    try {
      this.setState({isLoading: true});
      const {id} = this.props.match.params;
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

  get previous() {
    return [
      {
        to: '/members',
        label: 'Members',
      },
    ];
  }

  get form() {
    return <Form onSubmit={this.onSubmit} {...this.state.data} />;
  }

  onSubmit = data => {
    const {id} = this.props.match.params;
    this.setState({isLoading: true});
    return updateMember(id, data).then(() => {
      this.load();
    });
  };

  render() {
    if (!this.state.isLoaded) return <Loader show />;
    return (
      <React.Fragment>
        <Breadcrumbs previous={this.previous} active="Editart Miembro" />
        <Card>
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
