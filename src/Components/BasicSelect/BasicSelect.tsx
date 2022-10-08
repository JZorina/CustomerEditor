import React, { forwardRef, ReactNode } from 'react';
import { FormControl, InputLabel, Select } from '@mui/material';
import { FieldError } from 'react-hook-form';

interface Props {
  id: string;
  label: string;
  defaultValue?: string;
  errors?: FieldError;
  renderItems: () => ReactNode;
  onChange: (e: any) => void;
}
function BasicSelect(
  { id, errors, renderItems, label, defaultValue, onChange, ...rest }: Props,
  ref: any,
) {
  return (
    <FormControl fullWidth className="formControl">
      <InputLabel id={id}>{label}</InputLabel>
      <Select
        ref={ref}
        label={id}
        onChange={onChange}
        value={defaultValue}
        {...rest}
      >
        {renderItems()}
      </Select>
      {errors && <p>{errors?.message}</p>}
    </FormControl>
  );
}

export default forwardRef(BasicSelect);
