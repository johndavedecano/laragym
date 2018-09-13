import React from 'react';
import cx from 'classnames';
import {Link} from 'react-router-dom';

export default class extends React.Component {
  static defaultProps = {
    color: 'primary',
    message: '',
    messageLink: '',
    iconClass: 'fa-comments',
  };

  get wrapperClass() {
    return cx('card text-white o-hidden h-100', {
      'bg-primary': this.props.color === 'primary',
      'bg-danger': this.props.color === 'danger',
      'bg-warning': this.props.color === 'warning',
      'bg-success': this.props.color === 'success',
    });
  }

  get iconClass() {
    return cx('fas fa-fw', this.props.iconClass);
  }

  render() {
    return (
      <div className={this.wrapperClass}>
        <div className="card-body">
          <div className="card-body-icon">
            <i className={this.iconClass} />
          </div>
          <div className="mr-5">{this.props.message}</div>
        </div>
        <Link
          className="card-footer text-white clearfix small z-1"
          to={this.props.messageLink}
        >
          <span className="float-left">View Details</span>
          <span className="float-right">
            <i className="fas fa-angle-right" />
          </span>
        </Link>
      </div>
    );
  }
}
