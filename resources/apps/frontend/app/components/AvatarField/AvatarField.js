import React, { Component } from 'react';
import get from 'lodash/get';
import axios from 'axios';
import Avatar from '@material-ui/core/Avatar';

import {
  CreateButton,
  DeleteButton,
} from 'components/ActionButtons/ActionButtons';

import config from 'config';
import styles from './AvatarField.css';

export default class AvatarField extends Component {
  static defaultProps = {
    onChange: () => {},
    onRemove: () => {},
  };

  constructor(props) {
    super(props);
    this.file = React.createRef();
    this.state = {
      original: props.value || null,
      value: props.value || null,
      isUploading: false,
    };
  }

  onFileChange = (event) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      if (this.validMimes.indexOf(file.type) !== -1) {
        this.setState({ isUploading: true });
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          this.setState({ value: reader.result });
          this.upload(file);
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
    const nextValue = this.state.original || null;
    // Use the previous value if there is.
    this.setState(
      {
        value: nextValue,
      },
      () => {
        this.props.onChange(nextValue);
      }
    );
  };

  upload = async (file) => {
    try {
      const form = new FormData();
      form.append('file', file);

      const { data } = await axios.post('/api/upload', form);

      const avatarUrl = `${config.API_URL}/${get(
        data,
        'dimensions.size200.filedir'
      )}`;

      this.setState({
        isUploading: false,
        value: avatarUrl,
      });

      this.props.onChange(avatarUrl);
    } catch (error) {
      this.setState({
        isUploading: false,
        value: null,
      });
    }
  };

  validMimes = ['image/png', 'image/jpg', 'image/jpeg'];

  get preview() {
    return this.state.value || '/user.png';
  }

  render() {
    return (
      <div className={styles.avatarField}>
        <div className={styles.avatarFieldWrapper}>
          <Avatar alt="avatar" src={this.preview} className={styles.avatar} />
        </div>
        <div className={styles.avatarSelectAction}>
          <CreateButton
            onClick={this.onSelect}
            disabled={this.state.isUploading}
          />
          <DeleteButton
            onClick={this.onRemove}
            disabled={this.state.isUploading}
          />
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
