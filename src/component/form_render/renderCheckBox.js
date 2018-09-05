import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
const renderCheckBox = ({ input, label }) => (
    <FormControlLabel
        control={
            <Checkbox
                checked={input.value ? true : false}
                onChange={input.onChange}
            />
        }
        label={label}
        />
)
export default renderCheckBox;