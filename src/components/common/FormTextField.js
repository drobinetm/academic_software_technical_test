import React from 'react';
import { TextField } from '@material-ui/core';

export function FormTextField({ error, helperText, InputLabelProps, label, placeholder, select, type, keepLabel, InputProps, rows, multiline, ...props }) {
  const shouldUseFloatingLabel = Boolean(keepLabel || select || type === 'date');
  const resolvedPlaceholder = placeholder || (!shouldUseFloatingLabel ? label : undefined);
  const multilineProps = multiline && rows ? { minRows: rows } : {};

  return (
    <TextField
      variant="outlined"
      fullWidth
      margin="normal"
      error={Boolean(error)}
      helperText={error || helperText}
      label={shouldUseFloatingLabel ? label : undefined}
      placeholder={resolvedPlaceholder}
      select={select}
      type={type}
      multiline={multiline}
      InputLabelProps={{
        ...InputLabelProps,
        shrink: shouldUseFloatingLabel,
      }}
      InputProps={{
        ...InputProps,
      }}
      {...multilineProps}
      {...props}
    />
  );
}
