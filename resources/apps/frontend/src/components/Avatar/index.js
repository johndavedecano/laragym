import React from 'react';
import avatar from './../../assets/avatar.jpg';
import styles from './Avatar.scss';

class Avatar extends React.Component {
  static defaultProps = {
    size: 'small',
    src: '',
  };

  get src() {
    if (!this.props.src) return avatar;
    return this.props.src;
  }

  render() {
    return <img src={this.src} alt="" className={styles[this.props.size]} />;
  }
}

export default Avatar;
