import React, { Component } from 'react';

import Avatar from '@material-ui/core/Avatar';
import {
  CreateButton,
  DeleteButton,
} from 'components/ActionButtons/ActionButtons';

import styles from './AvatarField.css';

export default class AvatarField extends Component {
  static defaultProps = {
    onChange: () => {},
    onRemove: () => {},
  };

  constructor(props) {
    super(props);
    this.file = React.createRef();
  }

  state = {
    default: '/user.png',
    selected: null,
  };

  onFileChange = (event) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      if (this.validMimes.indexOf(file.type)) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          this.setState({
            selected: reader.result,
          });
          this.props.onChange(file);
        };
      }
    }
  };

  onSelect = () => {
    if (this.file.current) {
      this.file.current.value = '';
      this.file.current.click();
    }
  };

  onRemove = () => {
    if (this.state.selected) {
      this.setState({
        selected: null,
      });
    } else {
      this.props.onRemove();
    }
  };

  setDefault = (value) => {
    this.setState({
      default: value,
    });
  };

  getSelectedValue = () => {
    if (
      this.file.current &&
      this.file.current.files &&
      this.file.current.files.length > 0
    ) {
      return this.file.files[0];
    }
    return null;
  };

  validMimes = ['image/png', 'image/jpg', 'image/jpeg'];

  get preview() {
    if (this.state.selected) {
      return this.state.selected;
    }
    return this.state.default;
  }

  render() {
    return (
      <div className={styles.avatarField}>
        <div className={styles.avatarFieldWrapper}>
          <Avatar alt="" src={this.preview} className={styles.avatar} />
        </div>
        <div className={styles.avatarSelectAction}>
          <CreateButton onClick={this.onSelect} />
          <DeleteButton onClick={this.onRemove} />
          <input
            className={styles.inputAvatar}
            ref={this.file}
            type="file"
            accept="image/*"
            onChange={this.onFileChange}
          />
        </div>
      </div>
    );
  }
}
