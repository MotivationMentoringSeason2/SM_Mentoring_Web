import React from 'react';
import RadioGroup  from '@material-ui/core/RadioGroup';

const styles = theme => ({
    group: {
        margin: `${theme.spacing.unit}px 0`,
    }
});

const renderRadioGroup = ({ input, ...rest }) => (
    <RadioGroup
        {...input}
        {...rest}
        className={styles.group}
        value={input.value}
        onChange={(event, value) => input.onChange(value)}
    />
);

export default renderRadioGroup;