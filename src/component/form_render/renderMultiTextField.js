import React from 'react';
import TextField from '@material-ui/core/TextField';
const renderMultiTextField = ({ input, label, placeholder, type, readOnly, meta: { touched, error }, ...custom }) => (
    <TextField
        label={label}
        helperText={touched && error}
        error={touched && (error !== undefined)}
        {...input}
        {...custom}
        InputProps={{
            readOnly : readOnly,
        }}
        placeholder={placeholder}
        type={type}
        fullWidth
        multiline={true}
    />
);
export default renderMultiTextField;