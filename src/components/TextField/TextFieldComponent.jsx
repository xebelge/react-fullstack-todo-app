import React, { forwardRef } from 'react';
import { TextField } from '@mui/material';

const TextFieldComponent = forwardRef(({
    id, label, className, name, type, placeHolder, isAutoFocus, onChange, value, variantType, isFullWidth = false, endAdornment, accept
}, ref) => {
    return (
        <TextField
            type={type || "text"}
            id={id}
            fullWidth={isFullWidth}
            autoFocus={isAutoFocus}
            className={className}
            name={name}
            placeholder={placeHolder}
            label={label}
            variant={variantType}
            value={value}
            onChange={onChange}
            inputProps={{
                endAdornment: endAdornment,
                accept: type === 'file' ? accept : null,
                ref: ref
            }}
        />
    );
});

export default TextFieldComponent;
