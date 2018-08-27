import React from 'react';
import {Link} from 'react-router-dom';
import {Breadcrumb, BreadcrumbItem} from 'reactstrap';

export default class extends React.Component {
  static defaultProps = {
    previous: [],
    active: '',
  };

  render() {
    return (
      <React.Fragment>
        <Breadcrumb>
          {this.props.previous.map(item => {
            return (
              <BreadcrumbItem key={item.to}>
                <Link to={item.to}>{item.label}</Link>
              </BreadcrumbItem>
            );
          })}
          <BreadcrumbItem active>{this.props.active}</BreadcrumbItem>
        </Breadcrumb>
      </React.Fragment>
    );
  }
}
