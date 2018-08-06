/* eslint-disable react/prop-types, react/no-multi-comp */

import React from 'react';
import axios from 'axios';
import { withStyles } from '@material-ui/core/styles';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import CancelIcon from '@material-ui/icons/Cancel';
import Chip from '@material-ui/core/Chip';
import ClearIcon from '@material-ui/icons/Clear';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
// import PropTypes from 'prop-types';
import Select from 'react-select';
// import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

import styles from './SelectClasses';

class Option extends React.Component {
  handleClick = (event) => {
    this.props.onSelect(this.props.option, event);
  };

  render() {
    const { children, isFocused, isSelected, onFocus } = this.props;

    return (
      <MenuItem
        onFocus={onFocus}
        selected={isFocused}
        onClick={this.handleClick}
        component="div"
        style={{
          fontWeight: isSelected ? 500 : 400,
        }}
      >
        {children}
      </MenuItem>
    );
  }
}

export function SelectWrapped(props) {
  const { classes, options, ...other } = props;

  return (
    <Select
      optionComponent={Option}
      noResultsText={<Typography>{'No results found'}</Typography>}
      arrowRenderer={(arrowProps) =>
        arrowProps.isOpen ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />
      }
      clearRenderer={() => <ClearIcon />}
      valueComponent={(valueProps) => {
        const { value, children, onRemove } = valueProps;
        const onDelete = (event) => {
          event.preventDefault();
          event.stopPropagation();
          onRemove(value);
        };

        if (onRemove) {
          return (
            <Chip
              tabIndex={-1}
              label={children}
              className={classes.chip}
              deleteIcon={<CancelIcon onTouchEnd={onDelete} />}
              onDelete={onDelete}
            />
          );
        }

        return <div className="Select-value">{children}</div>;
      }}
      options={options}
      {...other}
    />
  );
}

class SelectWrappedAsync extends React.Component {
  getOptions = (api) => async (query) => {
    try {
      const { data } = await axios.get(api, {
        params: {
          q: query,
          is_archived: false,
        },
      });
      return {
        options: this.normalizeResponseData(data),
      };
    } catch (error) {
      return {
        options: [],
      };
    }
  };

  normalizeResponseData = ({ data }) =>
    data.map((option) => ({
      value: option.id,
      label: option.name,
    }));

  render() {
    const { classes, api, ...other } = this.props;
    return (
      <Select.Async
        optionComponent={Option}
        noResultsText={<Typography>{'No results found'}</Typography>}
        arrowRenderer={(arrowProps) =>
          arrowProps.isOpen ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />
        }
        clearRenderer={() => <ClearIcon />}
        valueComponent={(valueProps) => {
          const { value, children, onRemove } = valueProps;
          const onDelete = (event) => {
            event.preventDefault();
            event.stopPropagation();
            onRemove(value);
          };

          if (onRemove) {
            return (
              <Chip
                tabIndex={-1}
                label={children}
                className={classes.chip}
                deleteIcon={<CancelIcon onTouchEnd={onDelete} />}
                onDelete={onDelete}
              />
            );
          }

          return <div className="Select-value">{children}</div>;
        }}
        {...other}
        loadOptions={this.getOptions(api)}
      />
    );
  }
}

class SelectFieldSingleComponent extends React.Component {
  static defaultProps = {
    options: [],
    api: '',
  };

  render() {
    return (
      <Input
        fullWidth
        inputComponent={this.props.async ? SelectWrappedAsync : SelectWrapped}
        value={this.props.value}
        onChange={this.props.onChange}
        placeholder={this.props.placeholder}
        id="react-select-single"
        inputProps={{
          options: this.props.options,
          api: this.props.api,
          classes: this.props.classes,
          instanceId: 'react-select-single',
          name: 'react-select-single',
          simpleValue: true,
        }}
      />
    );
  }
}

export const SelectFieldSingle = withStyles(styles)(SelectFieldSingleComponent);
