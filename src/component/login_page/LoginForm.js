import React, {Component} from 'react';
import {reduxForm, Field} from 'redux-form';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import LockIcon from '@material-ui/icons/Lock';
import {renderTextField} from "../form_render";
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';

function validate(values){
    var errors = {};
    var hasErrors = false;
    if(!values.identity || values.identity.trim() === ''){
        errors.identity = '사용자 아이디를 입력하세요.';
        hasErrors = true;
    }
    if(!values.password || values.password.trim() === ''){
        errors.password = '비밀번호를 입력하세요.';
        hasErrors = true;
    }
    return hasErrors && errors;
}

const validateAndAccountLogin = (values, dispatch) => {
    console.log(values);
}

const styles = theme => ({
    form: {
        width: '100%',
        marginTop: theme.spacing.unit,
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 300,
    },
    avatar: {
        margin: theme.spacing.unit,
        backgroundColor: theme.palette.secondary.main,
    }
});

class LoginForm extends Component{
    render(){
        const { handleSubmit, classes } = this.props;
        return(
            <form onSubmit={handleSubmit(validateAndAccountLogin)} className={classes.form}>
                <Grid align="center">
                    <div>
                        <Avatar className={classes.avatar}>
                            <LockIcon />
                        </Avatar>
                    </div>
                    <div>
                        <Field name="identity" className={classes.textField} type="text" component={renderTextField} label="사용자 ID" placeholder="ID를 입력하세요." />
                    </div>
                    <div>
                        <Field name="password" className={classes.textField} type="password" component={renderTextField} label="사용자 비밀번호" placeholder="비밀번호를 입력하세요." />
                    </div>
                    <button type="submit" className="button primary fit large">Login!!!</button>
                </Grid>
            </form>
        )
    }
}

LoginForm.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default reduxForm({
    form : 'loginForm',
    validate
})(withStyles(styles)(LoginForm));