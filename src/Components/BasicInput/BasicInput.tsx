import React, { forwardRef } from 'react';
import { Input } from '@mui/material';
import { FieldError } from 'react-hook-form';

interface Props {
  type: string;
  placeholder: string;
  errors?: FieldError;
}
function BasicInput({ type, placeholder, errors, ...rest }: Props, ref: any) {
  return (
    <div className="inputContainer">
      <Input
        ref={ref}
        className="input"
        type={type}
        placeholder={placeholder}
        {...rest}
      />
      {errors && <p>{errors?.message}</p>}
    </div>
  );
}

export default forwardRef(BasicInput);
