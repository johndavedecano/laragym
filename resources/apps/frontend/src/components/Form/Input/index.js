import React from 'react';
import {FormGroup, Label, Input as BaseInput, FormFeedback} from 'reactstrap';

export const InputWrapper = ({children, label}) => {
  return (
    <FormGroup>
      <Label className="font-weight-bold">{label}</Label>
      {children}
    </FormGroup>
  );
};

export const FormInput = props => {
  const {
    name,
    type = 'text',
    onChange = Function,
    value,
    label,
    error,
    children,
    ...rest
  } = props;
  return (
    <InputWrapper label={label}>
      <BaseInput
        name={name}
        type={type}
        onChange={onChange}
        value={value}
        invalid={!!error}
        {...rest}
      />
      {children}
      {error && <FormFeedback>{error}</FormFeedback>}
    </InputWrapper>
  );
};
